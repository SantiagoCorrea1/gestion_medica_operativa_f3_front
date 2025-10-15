import { useState, useEffect } from 'react';
import { Send, Mail, CheckCircle, XCircle, Clock, Users, Info } from 'lucide-react';
// import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TimeSlot } from '../../horario/components/data';

interface NotificationLog {
  id: string;
  date: string;
  time: string;
  recipients: number;
  subject: string;
  status: 'sent' | 'failed' | 'pending';
  reason: string;
  affectedDoctors: string[];
}

interface CancellationData {
  doctors: string[];
  dates: string[];
  reason: string;
  customMessage: string;
}

interface NotificationCenterProps {
  notificationLogs: NotificationLog[];
  setNotificationLogs: React.Dispatch<React.SetStateAction<NotificationLog[]>>;
  timeSlots: TimeSlot[]; // Añadimos los timeSlots para obtener los médicos dinámicamente
  isLoading: boolean;
  isDemoData: boolean;
}

export function NotificationCenter({ notificationLogs, setNotificationLogs, timeSlots, isLoading, isDemoData }: NotificationCenterProps) {
  const user = { name: 'Usuario de Prueba', role: 'coordinador' };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState<CancellationData>({
    doctors: [],
    dates: [],
    reason: '',
    customMessage: ''
  });

  // Generamos la lista de doctores dinámicamente desde los timeSlots
  const doctors = Array.from(
    new Set(timeSlots.map(slot => `${slot.nombreProfesional} - ${slot.nombreEspecialidad}`))
  );

  const cancellationReasons = [
    'Incapacidad médica',
    'Emergencia en el hospital',
    'Mantenimiento de consultorio',
    'Capacitación obligatoria',
    'Reunión médica urgente',
    'Problema técnico',
    'Otro'
  ];

  const predefinedMessages = {
    'Incapacidad médica': 'Estimado paciente, debido a una incapacidad médica imprevista, su cita ha sido cancelada. Nos pondremos en contacto para reprogramar a la brevedad.',
    'Emergencia en el hospital': 'Estimado paciente, debido a una emergencia médica en el hospital, debemos cancelar su cita. Le ofrecemos disculpas por las molestias.',
    'Mantenimiento de consultorio': 'Estimado paciente, debido a mantenimiento programado en el consultorio, su cita ha sido reprogramada. Le contactaremos pronto.',
    'Capacitación obligatoria': 'Estimado paciente, por motivos de capacitación médica obligatoria, su cita ha sido reprogramada.',
    'Reunión médica urgente': 'Estimado paciente, debido a una reunión médica urgente, su cita debe ser reprogramada.',
    'Problema técnico': 'Estimado paciente, debido a problemas técnicos, su cita ha sido cancelada temporalmente.',
    'Otro': ''
  };

  const handleDoctorChange = (doctor: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      doctors: checked 
        ? [...prev.doctors, doctor]
        : prev.doctors.filter(d => d !== doctor)
    }));
  };

  const handleReasonChange = (reason: string) => {
    setFormData(prev => ({
      ...prev,
      reason,
      customMessage: predefinedMessages[reason as keyof typeof predefinedMessages] || ''
    }));
  };

  const handleSendNotifications = () => {
    // Validaciones básicas
    if (formData.doctors.length === 0) {
      toast.error('Debe seleccionar al menos un médico');
      return;
    }

    if (formData.dates.length === 0) {
      toast.error('Debe seleccionar fechas afectadas');
      return;
    }

    if (!formData.reason) {
      toast.error('El motivo es obligatorio');
      return;
    }

    if (!formData.customMessage.trim()) {
      toast.error('El mensaje no puede estar vacío');
      return;
    }

    // Confirmación adicional para envíos masivos
    const totalDocs = formData.doctors.length;
    if (totalDocs > 3) {
      console.warn(`Enviando a ${totalDocs} médicos - confirmar`);
    }

    // Cálculo aproximado de pacientes afectados
    const estimatedRecipients = formData.doctors.length * formData.dates.length * 6.5; // promedio más realista

    const newLog: NotificationLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      recipients: estimatedRecipients,
      subject: `Cancelación masiva - ${formData.reason}`,
      status: 'sent',
      reason: formData.reason,
      affectedDoctors: formData.doctors
    };

    setNotificationLogs([newLog, ...notificationLogs]);
    setFormData({ doctors: [], dates: [], reason: '', customMessage: '' });
    setIsDialogOpen(false);

    toast.success('Notificaciones enviadas exitosamente', {
      description: `${estimatedRecipients} pacientes notificados`
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-500 text-white">Enviado</Badge>;
      case 'failed':
        return <Badge className="bg-red-500 text-white">Fallido</Badge>;
      case 'pending':
        return <Badge className="bg-orange-500 text-white">Pendiente</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Centro de Notificaciones</h1>
          <p className="text-muted-foreground">
            Envíe notificaciones masivas por cancelaciones no programadas
          </p>
        </div>

        {(user as any)?.role === 'coordinador' && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Send className="h-4 w-4 mr-2" aria-hidden="true" />
                Enviar Notificación
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Enviar Notificación de Cancelación Masiva</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Doctor Selection */}
                <div className="space-y-3">
                  <Label>Médicos Afectados *</Label>
                  <div className="grid grid-cols-1 gap-3 max-h-40 overflow-y-auto border rounded-md p-3">
                    {doctors.map(doctor => (
                      <div key={doctor} className="flex items-center space-x-2">
                        <Checkbox
                          id={doctor}
                          checked={formData.doctors.includes(doctor)}
                          onCheckedChange={(checked) => 
                            handleDoctorChange(doctor, checked as boolean)
                          }
                        />
                        <Label htmlFor={doctor} className="text-sm font-normal cursor-pointer">
                          {doctor}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {formData.doctors.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {formData.doctors.length} médico(s) seleccionado(s)
                    </p>
                  )}
                </div>

                {/* Date Range */}
                <div className="space-y-3">
                  <Label htmlFor="dateRange">Fechas Afectadas *</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate" className="text-sm">Fecha de inicio</Label>
                      <Input
                        id="startDate"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          if (e.target.value) {
                            setFormData(prev => ({
                              ...prev,
                              dates: [e.target.value, prev.dates[1]].filter(Boolean)
                            }));
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate" className="text-sm">Fecha de fin</Label>
                      <Input
                        id="endDate"
                        type="date"
                        min={formData.dates[0] || new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          if (e.target.value) {
                            setFormData(prev => ({
                              ...prev,
                              dates: [prev.dates[0], e.target.value].filter(Boolean)
                            }));
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Cancellation Reason */}
                <div className="space-y-2">
                  <Label htmlFor="reason">Motivo de la Cancelación *</Label>
                  <Select value={formData.reason} onValueChange={handleReasonChange}>
                    <SelectTrigger id="reason">
                      <SelectValue placeholder="Seleccione un motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      {cancellationReasons.map(reason => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Custom Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje de Notificación *</Label>
                  <Textarea
                    id="message"
                    placeholder="Escriba el mensaje que se enviará a los pacientes..."
                    value={formData.customMessage}
                    onChange={(e) => setFormData(prev => ({ ...prev, customMessage: e.target.value }))}
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">
                    Este mensaje se enviará por email a todos los pacientes afectados.
                  </p>
                </div>

                {/* Preview */}
                {formData.doctors.length > 0 && formData.dates.length > 0 && (
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <h4 className="font-medium mb-2">Vista Previa del Envío</h4>
                    <div className="text-sm space-y-1">
                      <p><strong>Médicos:</strong> {formData.doctors.length}</p>
                      <p><strong>Fechas:</strong> {formData.dates.length}</p>
                      <p><strong>Pacientes estimados:</strong> {formData.doctors.length * formData.dates.length * 8}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={handleSendNotifications} className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Notificaciones
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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

      {/* Access restriction notice for non-coordinators */}
      {(user as any)?.role !== 'coordinador' && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-orange-800">
              <Users className="h-4 w-4" aria-hidden="true" />
              <span>
                Solo los coordinadores pueden enviar notificaciones masivas. 
                Puede ver el historial de notificaciones enviadas.
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Notificaciones Enviadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {notificationLogs.filter(log => log.status === 'sent').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Notificaciones Fallidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {notificationLogs.filter(log => log.status === 'failed').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Pacientes Notificados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notificationLogs
                  .filter(log => log.status === 'sent')
                  .reduce((sum, log) => sum + log.recipients, 0)}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notification History */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Notificaciones</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              {notificationLogs.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No hay notificaciones en el historial.
                </p>
              ) : (
                notificationLogs.map((log, index) => (
                  <div key={log.id}>
                    <div className="flex items-start justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(log.status)}
                          <h3 className="font-medium">{log.subject}</h3>
                          {getStatusBadge(log.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div>
                            <strong>Fecha:</strong> {new Date(log.date).toLocaleDateString('es-ES')} a las {log.time}
                          </div>
                          <div>
                            <strong>Destinatarios:</strong> {log.recipients} pacientes
                          </div>
                          <div>
                            <strong>Motivo:</strong> {log.reason}
                          </div>
                          <div>
                            <strong>Médicos:</strong> {log.affectedDoctors.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {index < notificationLogs.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}