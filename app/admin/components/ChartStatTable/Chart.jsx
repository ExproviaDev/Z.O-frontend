import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function SDGChart({ graphData }) {
  const normalizedData = (graphData || []).map((row) => {
    const sdgNumber = row?.sdg_number ?? row?.sdgNumber;
    return {
      label: row?.label || (sdgNumber ? `SDG ${sdgNumber}` : 'Unknown'),
      total: row?.total ?? row?.registration_count ?? row?.count ?? 0,
    };
  });

  return (
    <div className="h-[350px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={normalizedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
          <Tooltip 
            cursor={{fill: '#f8fafc'}} 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
          />
          <Bar dataKey="total" radius={[6, 6, 0, 0]} barSize={25}>
            {normalizedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#3b82f6" fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}