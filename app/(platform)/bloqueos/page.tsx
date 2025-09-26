'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
// import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { OperationalBlock, initialBlocks } from '../../modules/bloqueos/components/data';
import { Skeleton } from '@/components/ui/skeleton';
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
  const [blocks, setBlocks] = useState<OperationalBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoData, setIsDemoData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsDemoData(false);
      try {
        // --- SIMULACIÓN DE FETCH ---
        // Aquí iría la llamada real al backend, por ejemplo:
        // const response = await fetch('/api/blocks');
        // if (!response.ok) throw new Error('Fallo al cargar los bloqueos');
        // const data = await response.json();
        // setBlocks(data);

        // Por ahora, simulamos un fallo para mostrar los datos de prueba.
        throw new Error("Backend no disponible, usando datos de prueba.");
      } catch (error) {
        console.warn(error);
        setBlocks(initialBlocks);
        setIsDemoData(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

      {/* Demo Data Notice */}
      {isDemoData && !isLoading && (
        <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200">
          <Info className="h-4 w-4 !text-blue-800" />
          <AlertDescription>
            Estás viendo datos de prueba. La información real se mostrará cuando el backend esté conectado.
          </AlertDescription>
        </Alert>
      )}

      {/* Active Blocks Alert */}
      {!isLoading && activeBlocksCount > 0 && (
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
        {isLoading ? (
          <>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </>
        ) : (
          blocks.length === 0 ? (
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
          )
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