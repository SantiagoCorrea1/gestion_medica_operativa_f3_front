'use client';

import { CalendarEvent, getEventsForDate, isCurrentMonth, isToday } from './data';

interface CalendarGridProps {
  days: Date[];
  currentDate: Date;
  allEvents: CalendarEvent[];
  filterSpecialty: string;
  filterOffice: string;
  hasMounted: boolean;
}

const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export function CalendarGrid({ days, currentDate, allEvents, filterSpecialty, filterOffice, hasMounted }: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Week day headers */}
      {weekDays.map(day => (
        <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground border-b">
          {day}
        </div>
      ))}

      {/* Calendar days */}
      {days.map((day, index) => {
        const dayEvents = getEventsForDate(day, allEvents, filterSpecialty, filterOffice);
        const isCurrentMonthDay = hasMounted && isCurrentMonth(day, currentDate);
        const isTodayDay = hasMounted && isToday(day);

        return (
          <div
            key={index}
            className={`min-h-[120px] p-2 border border-border ${
              isCurrentMonthDay ? 'bg-background' : 'bg-muted/30'
            } ${isTodayDay ? 'ring-2 ring-primary' : ''}`}
          >
            <div className={`text-sm mb-2 ${
              isCurrentMonthDay ? 'text-foreground' : 'text-muted-foreground'
            } ${isTodayDay ? 'font-bold' : ''}`}>
              {day.getDate()}
            </div>

            <div className="space-y-1">
              {dayEvents.slice(0, 3).map(event => (
                <div
                  key={event.id}
                  className="text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: `var(--color-${event.status === 'available' ? 'green' : event.status === 'booked' ? 'blue' : 'red'}-500)`, color: 'white' }}
                  title={`${event.doctor} - ${event.specialty} - ${event.time}`}
                >
                  <div className="font-medium truncate">{event.doctor}</div>
                  <div className="truncate">{event.time}</div>
                </div>
              ))}
              {dayEvents.length > 3 && (<div className="text-xs text-muted-foreground text-center py-1">+{dayEvents.length - 3} más</div>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}