import { CheckSquare, AlertCircle } from "lucide-react";

interface WorkflowTask {
  id: string;
  saleId: string;
  poNumber: string;
  customerName: string;
  stepName: string;
  stepNumber: number;
  totalSteps: number;
  priority: "high" | "medium" | "low";
}

interface TodayTasksProps {
  tasks: WorkflowTask[];
  title: string;
  onTaskClick: (task: WorkflowTask) => void;
}

export const TodayTasks = ({ tasks, title, onTaskClick }: TodayTasksProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span className="text-sm text-gray-500">{tasks.length}件のタスク</span>
      </div>
      <div className="divide-y divide-gray-200">
        {tasks.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p className="text-sm">完了していないワークフローはありません</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onTaskClick(task)}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${task.priority === "high" ? "bg-red-50" : "bg-orange-50"}`}>
                  {task.priority === "high" ? (
                    <AlertCircle className="text-red-500" size={20} />
                  ) : (
                    <CheckSquare className="text-orange-500" size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-800">{task.stepName}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      進捗: ステップ {task.stepNumber}/{task.totalSteps}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {task.poNumber} - {task.customerName}
                  </p>
                  <div className="text-sm text-blue-600 hover:text-blue-700 font-medium">詳細を確認 →</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
