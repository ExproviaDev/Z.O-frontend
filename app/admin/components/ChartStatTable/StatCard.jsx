import { FiUsers, FiUserCheck, FiLayers, FiAward } from "react-icons/fi";

export default function StatsSection({ stats }) {
  const cards = [
    { label: "Total Enrolment", value: stats.totalEnrolment, icon: FiUsers, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Participant", value: stats.totalParticipant, icon: FiUserCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "2nd Round Students", value: stats.secondRound, icon: FiLayers, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Total Finalist", value: stats.totalFinalist, icon: FiAward, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
              <card.icon size={24} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{card.label}</p>
            <h3 className="text-2xl font-black text-gray-800 mt-1">{card.value.toLocaleString()}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}