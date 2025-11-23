import { TrendingUp, DollarSign, ShoppingCart, Package, Wallet } from "lucide-react";

interface DashboardSummaryProps {
  translations: {
    totalSales: string;
    totalPurchase: string;
    monthlyPaymentAmount: string;
    monthlyOrderCount: string;
    pendingDeliveries: string;
  };
  monthlyPurchase: {
    total: number;
    orderCount: number;
    pendingCount: number;
  };
  monthlyPayments: {
    total: number;
    paymentCount: number;
    paidCount: number;
  };
}

export const DashboardSummary = ({ translations, monthlyPurchase, monthlyPayments }: DashboardSummaryProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6">
      <div className="bg-blue-50 p-4 md:p-6 rounded-lg border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{translations.totalSales}</p>
            <p className="text-xl md:text-2xl font-bold text-gray-800">$125,000</p>
            <p className="text-xs text-green-600 mt-1">+4.2% vs 先月</p>
          </div>
          <TrendingUp className="text-blue-500 hidden md:block" size={32} />
          <TrendingUp className="text-blue-500 md:hidden" size={24} />
        </div>
      </div>

      <div className="bg-green-50 p-4 md:p-6 rounded-lg border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{translations.totalPurchase}</p>
            <p className="text-xl md:text-2xl font-bold text-gray-800">
              ${monthlyPurchase.total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-gray-600 mt-1">{monthlyPurchase.orderCount}件の発注</p>
          </div>
          <DollarSign className="text-green-500 hidden md:block" size={32} />
          <DollarSign className="text-green-500 md:hidden" size={24} />
        </div>
      </div>

      <div className="bg-purple-50 p-4 md:p-6 rounded-lg border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{translations.monthlyOrderCount}</p>
            <p className="text-xl md:text-2xl font-bold text-gray-800">{monthlyPurchase.orderCount}件</p>
            <p className="text-xs text-gray-600 mt-1">今月の発注</p>
          </div>
          <ShoppingCart className="text-purple-500 hidden md:block" size={32} />
          <ShoppingCart className="text-purple-500 md:hidden" size={24} />
        </div>
      </div>

      <div className="bg-orange-50 p-4 md:p-6 rounded-lg border-l-4 border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{translations.pendingDeliveries}</p>
            <p className="text-xl md:text-2xl font-bold text-gray-800">{monthlyPurchase.pendingCount}件</p>
            <p className="text-xs text-orange-600 mt-1">未納入</p>
          </div>
          <Package className="text-orange-500 hidden md:block" size={32} />
          <Package className="text-orange-500 md:hidden" size={24} />
        </div>
      </div>

      <div className="bg-red-50 p-4 md:p-6 rounded-lg border-l-4 border-red-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{translations.monthlyPaymentAmount}</p>
            <p className="text-xl md:text-2xl font-bold text-gray-800">
              ${monthlyPayments.total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-gray-600 mt-1">{monthlyPayments.paidCount}/{monthlyPayments.paymentCount}件 支払済み</p>
          </div>
          <Wallet className="text-red-500 hidden md:block" size={32} />
          <Wallet className="text-red-500 md:hidden" size={24} />
        </div>
      </div>
    </div>
  );
};
