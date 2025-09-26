'use client';

import { Filter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { specialties, offices } from './data';

interface CalendarFiltersProps {
  filterSpecialty: string;
  onSpecialtyChange: (value: string) => void;
  filterOffice: string;
  onOfficeChange: (value: string) => void;
}

export function CalendarFilters({ filterSpecialty, onSpecialtyChange, filterOffice, onOfficeChange }: CalendarFiltersProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
          Filtros
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div>
            <label htmlFor="specialty-filter" className="text-sm font-medium">Especialidad</label>
            <Select value={filterSpecialty} onValueChange={onSpecialtyChange}>
              <SelectTrigger id="specialty-filter" className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las especialidades</SelectItem>
                {specialties.map(specialty => (<SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="office-filter" className="text-sm font-medium">Consultorio</label>
            <Select value={filterOffice} onValueChange={onOfficeChange}>
              <SelectTrigger id="office-filter" className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los consultorios</SelectItem>
                {offices.map(office => (<SelectItem key={office} value={office}>{office}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}