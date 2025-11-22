import { AlertCircle } from "lucide-react";

interface Alert {
  id: number;
  type: string;
  message: string;
  severity: "high" | "medium" | "low";
}

interface AlertsProps {
  alerts: Alert[];
  title: string;
}

export const Alerts = ({ alerts, title }: AlertsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <AlertCircle className="mr-2 text-orange-500" />
        {title}
      </h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border-l-4 ${
              alert.severity === "high" ? "bg-red-50 border-red-500" : "bg-yellow-50 border-yellow-500"
            }`}
          >
            <p className="text-sm">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
