import { type LucideIcon } from "lucide-react";

interface Activity {
  id: number;
  action: string;
  details: string;
  user: string;
  time: string;
  icon: LucideIcon;
  color: string;
}

interface RecentActivityProps {
  activities: Activity[];
  title: string;
}

export const RecentActivity = ({ activities, title }: RecentActivityProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <div className="shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <activity.icon className={activity.color} size={16} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800">{activity.action}</p>
              <p className="text-xs text-gray-600 mt-1">{activity.details}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-500">{activity.user}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
