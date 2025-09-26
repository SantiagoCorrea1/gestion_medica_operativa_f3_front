'use client';

import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
// import { useSession } from 'next-auth/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PermissionNotice } from '@/app/modules/dashboard/components/PermissionNotice';
import { Skeleton } from '@/components/ui/skeleton';
import { StatsGrid } from '@/app/modules/dashboard/components/StatsGrid';
import { RecentActivityList } from '@/app/modules/dashboard/components/RecentActivityList';
import { QuickActions } from '@/app/modules/dashboard/components/QuickActions';
import { getStats, recentActivity, RecentActivityItem, StatCard, User } from '@/app/modules/dashboard/components/data';

export default function DashboardPage() {
  // const { data: session } = useSession();
  // const user = session?.user;
  // Mock user para pruebas sin sesión
  const user: User = { name: 'Usuario de Prueba', role: 'coordinador' };

  const [stats, setStats] = useState<StatCard[]>([]);
  const [activities, setActivities] = useState<RecentActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoData, setIsDemoData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsDemoData(false);
      try {
        // --- SIMULACIÓN DE FETCH ---
        // Aquí iría la llamada real al backend, por ejemplo:
        // const statsResponse = await fetch('/api/dashboard/stats');
        // const activityResponse = await fetch('/api/dashboard/activity');
        // if (!statsResponse.ok || !activityResponse.ok) throw new Error('Fallo al cargar los datos');
        // const statsData = await statsResponse.json();
        // const activityData = await activityResponse.json();
        // setStats(statsData);
        // setActivities(activityData);

        // Por ahora, simulamos un fallo para mostrar los datos de prueba.
        throw new Error("Backend no disponible, usando datos de prueba.");

      } catch (error) {
        console.warn(error);
        // Si falla la carga, usamos los datos "postizos"
        setStats(getStats(user.role));
        setActivities(recentActivity);
        setIsDemoData(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.role]);

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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1>Bienvenido, {user?.name}</h1>
        <p className="text-muted-foreground">
          MediCal Pro - Panel de control • Última actualización: {new Date().toLocaleString('es-ES')}
        </p>
      </div>

      {/* Demo Data Notice */}
      {isDemoData && (
        <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800">
          <Info className="h-4 w-4 !text-blue-800" />
          <AlertDescription>
            Estás viendo datos de prueba. La información real se mostrará cuando el backend esté conectado.
          </AlertDescription>
        </Alert>
      )}

      {/* Permission Notice for Recepcionistas */}
      {user.role === 'recepcionista' && <PermissionNotice />}

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
          <Skeleton className="h-64" />
        </div>
      ) : (
        <>
          <StatsGrid stats={stats} />
          <RecentActivityList activities={activities} />
          {hasPermission('create') && <QuickActions />}
        </>
      )}

    </div>
  );
}
