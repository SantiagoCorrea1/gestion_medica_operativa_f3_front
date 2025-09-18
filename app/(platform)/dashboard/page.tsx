'use client';

// import { useSession } from 'next-auth/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, AlertTriangle } from 'lucide-react';


export default function DashboardPage() {
  // const { data: session } = useSession();
  // const user = session?.user;
  // Mock user para pruebas sin sesión
  const user = { name: 'Usuario de Prueba', role: 'coordinador' };

  // Lógica de permisos simple basada en el rol del usuario.
  // Esto podría centralizarse en un hook o utility si se usa en más lugares.
  const hasPermission = (permission: 'create') => {
    if (!user) return false;
    // Asegúrate de que tu sesión de next-auth incluya el 'role'.
    const userRole = (user as any).role;

    // Lógica de ejemplo: solo coordinadores y médicos pueden ver acciones rápidas.
    if (permission === 'create') return userRole === 'coordinador' || userRole === 'medico';
    return false;
  };

  // Los números cambian según el día - conectar con la BD real
  const stats = [
    {
      title: 'Citas Programadas Hoy',
      value: (user as any)?.role === 'coordinador' ? '27' : '24', // coordinadores ven más info
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Franjas Disponibles',
      value: '12', // este número está hardcodeado, arreglar
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Pacientes en Espera',
      value: '7', // viene de la cola en tiempo real
      icon: Users,
      color: 'text-orange-600'
    },
    {
      title: 'Cancelaciones Hoy',
      value: '4', // incluyendo las de último minuto
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ];

  // Actividad reciente - esto debería venir de la API de logs
  const recentActivity = [
    {
      id: 1,
      action: 'Cita programada',
      patient: 'Ana M. García', // solo iniciales por privacidad
      time: '09:30',
      doctor: 'Dr. García',
      specialty: 'Cardiología'
    },
    {
      id: 2,
      action: 'Cita cancelada',
      patient: 'Roberto S.', 
      time: '14:00',
      doctor: 'Dr. Martínez',
      specialty: 'Neurología'
    },
    {
      id: 3,
      action: 'Reagendada', // Luis agregó este estado
      patient: 'Carmen L.',
      time: '11:15',
      doctor: 'Dr. Rodríguez',
      specialty: 'Pediatría'
    },
    {
      id: 4,
      action: 'Franja bloqueada',
      patient: 'Capacitación', // no es paciente pero bueno
      time: '08:00-10:00',
      doctor: 'Dr. Santos',
      specialty: 'Medicina General'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1>Bienvenido, {user?.name}</h1>
        <p className="text-muted-foreground">
          MediCal Pro - Panel de control • Última actualización: {new Date().toLocaleString('es-ES')}
        </p>
      </div>

      {/* Permission Notice for Recepcionistas */}
      {(user as any)?.role === 'recepcionista' && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Su rol de recepcionista le permite ver la información en modo solo lectura. 
            Para realizar modificaciones, contacte a un coordinador o médico.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.action}</span>
                    {activity.patient !== 'Vacaciones' && (
                      <span className="text-muted-foreground">- {activity.patient}</span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.doctor} • {activity.specialty}
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {hasPermission('create') && (
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <h3 className="font-medium">Crear Franja Horaria</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Agregar nueva disponibilidad
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <h3 className="font-medium">Bloquear Fecha</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Marcar días no disponibles
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <h3 className="font-medium">Ver Reportes</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Análisis de ocupación
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
