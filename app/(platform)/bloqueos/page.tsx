'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
// import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OperationalBlock, initialBlocks } from '../../modules/bloqueos/components/data';
import { CreateBlockDialog } from '../../modules/bloqueos/components/CreateBlockDialog';
import { BlockCard } from '../../modules/bloqueos/components/BlockCard';
export default function BloqueosPage() {
  // const { data: session } = useSession();
  // const user = session?.user;
  // Mock user para pruebas sin sesión
  const user = { name: 'Usuario de Prueba', role: 'coordinador' };

  // Lógica de permisos simple basada en el rol del usuario.
  const hasPermission = (permission: 'create') => {
    if (!user) return false;
    // Asegúrate de que tu sesión de next-auth incluya el 'role'.
    const userRole = (user as any).role;

    // Lógica de ejemplo: solo los coordinadores pueden crear bloqueos.
    if (permission === 'create') {
      return userRole === 'coordinador';
    }
    return false;
  };
  const [blocks, setBlocks] = useState<OperationalBlock[]>(initialBlocks);

  const handleBlockCreated = (newBlock: OperationalBlock) => {
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  };

  const activeBlocksCount = blocks.filter((block) => block.status === 'active').length;
  const upcomingBlocksCount = blocks.filter((block) => block.status === 'upcoming').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Gestión de Bloqueos Operativos</h1>
          <p className="text-muted-foreground">
            Administre bloqueos por vacaciones, eventos o incapacidades
          </p>
        </div>

        {hasPermission('create') && (
          <CreateBlockDialog onBlockCreated={handleBlockCreated} />
        )}
      </div>

      {/* Active Blocks Alert */}
      {activeBlocksCount > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium">
                Hay {activeBlocksCount} bloqueo(s) activo(s) afectando la disponibilidad.
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blocks List */}
      <div className="space-y-4">
        {blocks.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                No hay bloqueos operativos registrados.
              </p>
            </CardContent>
          </Card>
        ) : (
          blocks
            .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
            .map((block) => (
              <BlockCard key={block.id} block={block} />
            ))
        )}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Bloqueos Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {activeBlocksCount}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Bloqueos Próximos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {upcomingBlocksCount}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Franjas Afectadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {blocks
                .filter(block => block.status !== 'expired')
                .reduce((sum, block) => sum + block.affectedSlots, 0)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}