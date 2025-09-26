'use client';

import { Calendar, ClipboardList, Clock, Shield, Bell, BarChart3, LogOut, User } from 'lucide-react';
// import { useSession, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();
  // const { data: session } = useSession();
  // El objeto `user` ahora viene de la sesión de next-auth
  // const user = session?.user;
  // Mock user y signOut para pruebas sin sesión
  const user = { name: 'Usuario de Prueba', role: 'coordinador' };
  const signOut = () => {};
  // Menú principal - algunos elementos solo para ciertos roles
  const menuItems = [
    { id: 'dashboard', href: '/dashboard', label: 'Panel Principal', icon: ClipboardList },
    { id: 'horario', href: '/horario', label: 'Gestión de Horarios', icon: Clock },
    { id: 'calendar', href: '/calendario', label: 'Calendario', icon: Calendar },
    { id: 'bloqueos', href: '/bloqueos', label: 'Bloqueos Operativos', icon: Shield },
    { id: 'notificaciones', href: '/notificaciones', label: 'Centro de Notificaciones', icon: Bell },
    { id: 'reports', href: '/reportes', label: 'Reportes y Estadísticas', icon: BarChart3},
    // TODO: agregar módulo de pacientes - ticket #HU-201
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'coordinador': return 'bg-blue-500';
      case 'medico': return 'bg-green-500';
      case 'recepcionista': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="mb-4 text-lg">MediCal Pro</h1>
        {/* TODO: agregar logo cuando lo tengamos */}
        
        {user && (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="truncate">{user.name}</p>
              {/* Asegúrate de que tu sesión de next-auth incluya el 'role'.
                  Puede que necesites aumentar el tipo `Session` de next-auth. */}
              <Badge className={`${getRoleBadgeColor((user as any).role)} text-white mt-1`}>
                {(user as any).role}
              </Badge>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4" role="navigation" aria-label="Navegación principal">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.id}>
                <Link href={item.href} passHref>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className="w-full justify-start gap-3"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}