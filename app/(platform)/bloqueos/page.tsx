'use client';

import { useState } from 'react';
import { Plus, Calendar, User, AlertTriangle } from 'lucide-react';
// import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OperationalBlock {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  doctor: string;
  specialty: string;
  status: 'active' | 'upcoming' | 'expired';
  affectedSlots: number;
}

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
  const [blocks, setBlocks] = useState<OperationalBlock[]>([
    {
      id: '1',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      reason: 'Vacaciones programadas',
      doctor: 'Dr. García',
      specialty: 'Cardiología',
      status: 'upcoming',
      affectedSlots: 15
    },
    {
      id: '2',
      startDate: '2024-01-10',
      endDate: '2024-01-12',
      reason: 'Capacitación médica',
      doctor: 'Dr. Martínez',
      specialty: 'Neurología',
      status: 'expired',
      affectedSlots: 8
    },
    {
      id: '3',
      startDate: '2024-01-15',
      endDate: '2024-01-15',
      reason: 'Incapacidad médica',
      doctor: 'Dr. Rodríguez',
      specialty: 'Pediatría',
      status: 'active',
      affectedSlots: 6
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    doctor: '',
    specialty: ''
  });

  const doctors = [
    { name: 'Dr. García', specialty: 'Cardiología' },
    { name: 'Dr. Martínez', specialty: 'Neurología' },
    { name: 'Dr. Rodríguez', specialty: 'Pediatría' },
    { name: 'Dr. López', specialty: 'Dermatología' },
    { name: 'Dr. Fernández', specialty: 'Oftalmología' }
  ];

  const reasonOptions = [
    'Vacaciones programadas',
    'Incapacidad médica',
    'Capacitación médica',
    'Congreso médico',
    'Mantenimiento de consultorio',
    'Emergencia personal',
    'Otro'
  ];

  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.startDate || !formData.endDate || !formData.reason || !formData.doctor) {
      toast.error('Todos los campos son requeridos');
      return;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    if (startDate > endDate) {
      toast.error('La fecha de fin debe ser posterior a la fecha de inicio');
      return;
    }

    const selectedDoctor = doctors.find(d => d.name === formData.doctor);
    
    const newBlock: OperationalBlock = {
      id: Date.now().toString(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      doctor: formData.doctor,
      specialty: selectedDoctor?.specialty || '',
      status: startDate > new Date() ? 'upcoming' : 'active',
      affectedSlots: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) * 3 // Estimate
    };

    setBlocks([...blocks, newBlock]);
    setFormData({ startDate: '', endDate: '', reason: '', doctor: '', specialty: '' });
    setIsCreateDialogOpen(false);
    
    toast.success('Bloqueo operativo creado exitosamente', {
      description: `${formData.doctor} - ${formData.startDate} al ${formData.endDate}`
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-red-500 text-white">Activo</Badge>;
      case 'upcoming':
        return <Badge className="bg-orange-500 text-white">Próximo</Badge>;
      case 'expired':
        return <Badge className="bg-gray-500 text-white">Expirado</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate).toLocaleDateString('es-ES');
    const end = new Date(endDate).toLocaleDateString('es-ES');
    
    if (startDate === endDate) {
      return start;
    }
    
    return `${start} - ${end}`;
  };

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
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                Crear Bloqueo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Bloqueo Operativo</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleCreateBlock} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doctor">Médico *</Label>
                  <Select
                    value={formData.doctor}
                    onValueChange={(value) => {
                      const doctor = doctors.find(d => d.name === value);
                      setFormData(prev => ({
                        ...prev,
                        doctor: value,
                        specialty: doctor?.specialty || ''
                      }));
                    }}
                  >
                    <SelectTrigger id="doctor">
                      <SelectValue placeholder="Seleccione un médico" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map(doctor => (
                        <SelectItem key={doctor.name} value={doctor.name}>
                          {doctor.name} - {doctor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Fecha de Inicio *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">Fecha de Fin *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Motivo del Bloqueo *</Label>
                  <Select
                    value={formData.reason}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, reason: value }))}
                  >
                    <SelectTrigger id="reason">
                      <SelectValue placeholder="Seleccione un motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      {reasonOptions.map(reason => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.reason === 'Otro' && (
                  <div className="space-y-2">
                    <Label htmlFor="customReason">Especifique el motivo</Label>
                    <Textarea
                      id="customReason"
                      placeholder="Describa el motivo del bloqueo..."
                      onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                    />
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Crear Bloqueo
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Active Blocks Alert */}
      {blocks.some(block => block.status === 'active') && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium">
                Hay {blocks.filter(block => block.status === 'active').length} bloqueo(s) activo(s) afectando la disponibilidad.
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
              <Card key={block.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3>{block.doctor}</h3>
                        {getStatusBadge(block.status)}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="h-4 w-4" aria-hidden="true" />
                          <span>{block.specialty}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" aria-hidden="true" />
                          <span>{formatDateRange(block.startDate, block.endDate)}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-sm">Motivo:</span>
                          <p className="text-sm text-muted-foreground mt-1">{block.reason}</p>
                        </div>
                        
                        <div>
                          <span className="font-medium text-sm">
                            Franjas afectadas: {block.affectedSlots}
                          </span>
                        </div>
                      </div>
                    </div>

                    {block.status === 'active' && (
                      <div className="flex flex-col items-end gap-2">
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          No disponible
                        </Badge>
                        <p className="text-xs text-muted-foreground text-right">
                          Las citas están canceladas automáticamente
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
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
              {blocks.filter(block => block.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Bloqueos Próximos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {blocks.filter(block => block.status === 'upcoming').length}
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