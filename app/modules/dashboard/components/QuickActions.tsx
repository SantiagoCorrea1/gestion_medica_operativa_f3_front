'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
            <h3 className="font-medium">Crear Franja Horaria</h3>
            <p className="text-sm text-muted-foreground mt-1">Agregar nueva disponibilidad</p>
          </div>
          <div className="p-4 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
            <h3 className="font-medium">Bloquear Fecha</h3>
            <p className="text-sm text-muted-foreground mt-1">Marcar días no disponibles</p>
          </div>
          <div className="p-4 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
            <h3 className="font-medium">Ver Reportes</h3>
            <p className="text-sm text-muted-foreground mt-1">Análisis de ocupación</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}