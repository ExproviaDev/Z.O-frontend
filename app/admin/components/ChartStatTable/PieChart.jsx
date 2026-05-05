import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function DistributionPieChart({ pieData }) {
  const [isMounted, setIsMounted] = useState(false);
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="h-[300px] w-full min-w-0">
      {!isMounted ? (
        <div className="h-full w-full animate-pulse rounded-xl bg-slate-100" />
      ) : (
        <ResponsiveContainer width="100%" height={300} minWidth={260} minHeight={260}>
          <PieChart>
            <Pie
              data={pieData || []}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {(pieData || []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}