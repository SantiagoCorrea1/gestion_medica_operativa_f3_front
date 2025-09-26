'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export function PermissionNotice() {
  return (
    <Alert>
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>Su rol de recepcionista le permite ver la información en modo solo lectura. Para realizar modificaciones, contacte a un coordinador o médico.</AlertDescription>
    </Alert>
  );
}