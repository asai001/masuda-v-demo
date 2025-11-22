import { TrendingUp, DollarSign, FileText, Users } from "lucide-react";

interface DashboardSummaryProps {
  translations: {
    totalSales: string;
    totalPurchase: string;
    pendingInvoices: string;
    activeSuppliers: string;
  };
  monthlyPurchase: {
    total: number;
    byOrder: number;
  };
}

export const DashboardSummary = ({ translations, monthlyPurchase }: DashboardSummaryProps) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{translations.totalSales}</p>
            <p className="text-2xl font-bold text-gray-800">$125,000</p>
            <p className="text-xs text-green-600 mt-1">+4.2% vs 先月</p>
          </div>
          <TrendingUp className="text-blue-500" size={32} />
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{translations.totalPurchase}</p>
            <p className="text-2xl font-bold text-gray-800">
              ${monthlyPurchase.total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-gray-600 mt-1">{monthlyPurchase.byOrder}件の発注</p>
          </div>
          <DollarSign className="text-green-500" size={32} />
        </div>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{translations.pendingInvoices}</p>
            <p className="text-2xl font-bold text-gray-800">8件</p>
            <p className="text-xs text-gray-600 mt-1">当月累計</p>
          </div>
          <FileText className="text-purple-500" size={32} />
        </div>
      </div>

      <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{translations.activeSuppliers}</p>
            <p className="text-2xl font-bold text-gray-800">24社</p>
            <p className="text-xs text-orange-600 mt-1">+3社</p>
          </div>
          <Users className="text-orange-500" size={32} />
        </div>
      </div>
    </div>
  );
};
