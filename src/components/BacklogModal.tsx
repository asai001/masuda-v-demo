import { X, AlertTriangle } from "lucide-react";

interface BacklogSummary {
  customerId: string;
  customerName: string;
  totalOrdered: number;
  totalShipped: number;
  backlog: number;
}

interface BacklogModalProps {
  isOpen: boolean;
  onClose: () => void;
  backlogData: BacklogSummary[];
  title: string;
  translations: {
    customerName: string;
    totalOrdered: string;
    totalShipped: string;
    backlog: string;
    close: string;
    noBacklog: string;
    dateFrom: string;
    dateTo: string;
  };
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
}

export const BacklogModal = ({
  isOpen,
  onClose,
  backlogData,
  title,
  translations,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange
}: BacklogModalProps) => {
  if (!isOpen) return null;

  const sortedData = [...backlogData].sort((a, b) => b.backlog - a.backlog);
  const hasOverShipment = sortedData.some((item) => item.backlog < 0);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">{translations.dateFrom}</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => onDateFromChange(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <span className="text-gray-500">〜</span>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">{translations.dateTo}</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => onDateToChange(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {hasOverShipment && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4">
              <div className="flex items-center">
                <AlertTriangle className="text-yellow-500 mr-2" size={20} />
                <p className="text-sm text-yellow-700 font-medium">過出荷の顧客があります（残注数がマイナス）</p>
              </div>
            </div>
          )}

          {sortedData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">{translations.noBacklog}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {translations.customerName}
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {translations.totalOrdered}
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {translations.totalShipped}
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {translations.backlog}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedData.map((item) => (
                    <tr key={item.customerId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">{item.customerName}</td>
                      <td className="px-6 py-4 text-right text-sm text-gray-700">{item.totalOrdered.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right text-sm text-gray-700">{item.totalShipped.toLocaleString()}</td>
                      <td
                        className={`px-6 py-4 text-right text-sm font-medium ${
                          item.backlog < 0 ? "text-red-600" : item.backlog > 0 ? "text-orange-600" : "text-green-600"
                        }`}
                      >
                        {item.backlog.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 border-t border-gray-200 flex items-center justify-end bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 md:px-6 py-2 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg font-medium transition-colors text-sm md:text-base"
          >
            {translations.close}
          </button>
        </div>
      </div>
    </div>
  );
};
