'use client';

import { PermissionNotice } from '@/app/modules/dashboard/components/PermissionNotice';
// import { useSession } from 'next-auth/react';
import { User, getStats, recentActivity } from '../../modules/dashboard/components/data';
import { StatsGrid } from '@/app/modules/dashboard/components/StatsGrid';
import { RecentActivityList } from '@/app/modules/dashboard/components/RecentActivityList';
import { QuickActions } from '@/app/modules/dashboard/components/QuickActions';

export default function DashboardPage() {
  // const { data: session } = useSession();
  // const user = session?.user;
  // Mock user para pruebas sin sesión
  const user: User = { name: 'Usuario de Prueba', role: 'coordinador' };

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

  const stats = getStats(user.role);

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
      {user.role === 'recepcionista' && <PermissionNotice />}

      {/* Stats Cards */}
      <StatsGrid stats={stats} />

      {/* Recent Activity */}
      <RecentActivityList activities={recentActivity} />

      {/* Quick Actions */}
      {hasPermission('create') && <QuickActions />}
    </div>
  );
}
