'use client';

import { Download, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { specialties } from './data';

interface ReportsHeaderProps {
  selectedSpecialty: string;
  onSpecialtyChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
}

export function ReportsHeader({ selectedSpecialty, onSpecialtyChange, dateRange, onDateRangeChange }: ReportsHeaderProps) {
  const handleExportCSV = () => {
    toast.success('Reporte exportado exitosamente', {
      description: `Archivo: reporte_ocupacion_${new Date().toISOString().split('T')[0]}.csv`
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1>Dashboard de Reportes</h1>
        <p className="text-muted-foreground">Análisis de tasas de ocupación e inasistencia por especialidad</p>
      </div>

      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filtros</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div>
                <Label htmlFor="specialty-filter">Especialidad</Label>
                <Select value={selectedSpecialty} onValueChange={onSpecialtyChange}>
                  <SelectTrigger id="specialty-filter" className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las especialidades</SelectItem>
                    {specialties.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date-range">Período</Label>
                <Select value={dateRange} onValueChange={onDateRangeChange}>
                  <SelectTrigger id="date-range" className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Últimos 7 días</SelectItem>
                    <SelectItem value="last30days">Últimos 30 días</SelectItem>
                    <SelectItem value="last3months">Últimos 3 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button onClick={handleExportCSV}><Download className="h-4 w-4 mr-2" />Exportar CSV</Button>
      </div>
    </div>
  );
}