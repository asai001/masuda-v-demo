import { type LucideIcon, ArrowUpRight } from "lucide-react";

interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  page: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
  translations: {
    createNew: string;
  };
  onActionClick: (page: string) => void;
}

export const QuickActions = ({ actions, translations, onActionClick }: QuickActionsProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => onActionClick(action.page)}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:-translate-y-1 group text-left"
        >
          <div
            className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
          >
            <action.icon className="text-white" size={24} />
          </div>
          <h4 className="font-semibold text-gray-800 mb-1">{action.title}</h4>
          <p className="text-sm text-gray-500">{action.description}</p>
          <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
            <span>{translations.createNew}</span>
            <ArrowUpRight size={16} className="ml-1" />
          </div>
        </button>
      ))}
    </div>
  );
};
