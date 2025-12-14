"use client"

export default function AnalyticsReports() {
  const metrics = [
    { label: "Total Page Views", value: "45,231", change: "+15.3%" },
    { label: "Unique Visitors", value: "12,847", change: "+8.7%" },
    { label: "Avg. Session Duration", value: "4m 32s", change: "+2.1%" },
    { label: "Bounce Rate", value: "34.2%", change: "-3.5%" },
  ]

  const participationData = [
    { month: "Jan", registrations: 420, completions: 385 },
    { month: "Feb", registrations: 542, completions: 498 },
    { month: "Mar", registrations: 387, completions: 356 },
    { month: "Apr", registrations: 294, completions: 271 },
  ]

  const topEvents = [
    { name: "Mathematics Olympiad", participants: 542, completionRate: "92%" },
    { name: "Physics Challenge", participants: 387, completionRate: "88%" },
    { name: "Chemistry Quiz", participants: 294, completionRate: "85%" },
    { name: "Biology Competition", participants: 189, completionRate: "91%" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
            📊 Download CSV
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            📈 Download Excel
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
              <span
                className={`text-sm font-medium ${
                  metric.change.startsWith("+") && !metric.label.includes("Bounce")
                    ? "text-green-600"
                    : metric.change.startsWith("-") && metric.label.includes("Bounce")
                      ? "text-green-600"
                      : "text-red-600"
                }`}
              >
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Website Traffic Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Website Traffic Overview</h2>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-sm text-gray-600">Traffic Chart Visualization</p>
              <p className="text-xs text-gray-500 mt-1">(Placeholder for chart integration)</p>
            </div>
          </div>
        </div>

        {/* Participation Rate Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Participation Rate</h2>
          <div className="h-64 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg flex items-center justify-center border-2 border-dashed border-green-200">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-sm text-gray-600">Participation Chart Visualization</p>
              <p className="text-xs text-gray-500 mt-1">(Placeholder for chart integration)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Participation Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Registration vs Completion</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registrations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {participationData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{data.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{data.registrations}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{data.completions}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-green-600 font-semibold">
                      {((data.completions / data.registrations) * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performing Events */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Events</h2>
        <div className="space-y-4">
          {topEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{event.name}</h3>
                  <p className="text-sm text-gray-600">{event.participants} participants</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-lg font-bold text-green-600">{event.completionRate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
