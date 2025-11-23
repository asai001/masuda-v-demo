import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface CashFlowData {
  month: string;
  sales: number;
  purchase: number;
  balance: number;
}

interface CashFlowProps {
  data: CashFlowData[];
  title: string;
}

export const CashFlow = ({ data, title }: CashFlowProps) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      <h3 className="text-base md:text-lg font-bold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#0088FE" name="売上" strokeWidth={2} />
          <Line type="monotone" dataKey="purchase" stroke="#FF8042" name="仕入" strokeWidth={2} />
          <Line type="monotone" dataKey="balance" stroke="#00C49F" name="残高" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
