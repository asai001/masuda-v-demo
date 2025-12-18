import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

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
  // カスタムラベルレンダリング関数
  const renderCustomLabel = (props: {
    cx?: number;
    cy?: number;
    midAngle?: number;
    innerRadius?: number;
    outerRadius?: number;
    percent?: number;
    name?: string;
  }) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;

    if (!cx || !cy || midAngle === undefined || !innerRadius || !outerRadius || percent === undefined) {
      return null;
    }

    // 5%未満のセグメントにはラベルを表示しない
    if (percent < 0.05) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="14"
        fontWeight="bold"
      >
        {`${name}`}
        <tspan x={x} dy="1.2em" fontSize="12">
          {`${(percent * 100).toFixed(0)}%`}
        </tspan>
      </text>
    );
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      <h3 className="text-base md:text-lg font-bold mb-2 md:mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
          <Legend
            verticalAlign="bottom"
            height={80}
            formatter={(value: string) => {
              const item = data.find(d => d.name === value);
              return `${value}: $${item?.value.toLocaleString() || 0}`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
