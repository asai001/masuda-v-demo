import { type LucideIcon } from "lucide-react";

interface Task {
  id: number;
  type: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  icon: LucideIcon;
  color: string;
}

interface TodayTasksProps {
  tasks: Task[];
  title: string;
  approveText: string;
}

export const TodayTasks = ({ tasks, title, approveText }: TodayTasksProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${task.priority === "high" ? "bg-red-50" : "bg-orange-50"}`}>
                <task.icon className={task.color} size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{task.title}</h4>
                  <span className="text-xs text-gray-500 ml-4">{task.dueDate}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">{approveText} →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
