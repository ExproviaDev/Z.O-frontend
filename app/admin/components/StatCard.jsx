export default function StatCard({ title, value, icon: Icon, bgColor, iconColor }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-14 h-14 ${bgColor} rounded-lg flex items-center justify-center`}>
          <Icon size={28} className={iconColor} />
        </div>
      </div>
    </div>
  )
}
