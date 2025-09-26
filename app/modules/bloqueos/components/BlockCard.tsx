'use client';

import { Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { OperationalBlock, formatDateRange } from './data';

const getStatusBadge = (status: OperationalBlock['status']) => {
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

interface BlockCardProps {
  block: OperationalBlock;
}

export function BlockCard({ block }: BlockCardProps) {
  return (
    <Card>
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
                <span className="font-medium text-sm">Franjas afectadas: {block.affectedSlots}</span>
              </div>
            </div>
          </div>

          {block.status === 'active' && (
            <div className="flex flex-col items-end gap-2">
              <Badge className="bg-red-100 text-red-800 border-red-200">No disponible</Badge>
              <p className="text-xs text-muted-foreground text-right">Las citas están canceladas automáticamente</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}