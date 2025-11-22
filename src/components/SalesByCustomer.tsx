import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface SalesData {
  name: string;
  value: number;
  currency: string;
  [key: string]: string | number;
}

interface SalesByCustomerProps {
  data: SalesData[];
  title: string;
  colors: string[];
}

export const SalesByCustomer = ({ data, title, colors }: SalesByCustomerProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
