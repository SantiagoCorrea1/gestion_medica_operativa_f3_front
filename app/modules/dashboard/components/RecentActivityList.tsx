'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecentActivityItem } from './data';

interface RecentActivityListProps {
  activities: RecentActivityItem[];
}

export function RecentActivityList({ activities }: RecentActivityListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2"><span className="font-medium">{activity.action}</span>{activity.patient !== 'Vacaciones' && (<span className="text-muted-foreground">- {activity.patient}</span>)}</div>
                <div className="text-sm text-muted-foreground">{activity.doctor} • {activity.specialty}</div>
              </div>
              <div className="text-sm font-medium">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}