


// "use client"

// import { useEffect, useState } from "react"
// import { Bar } from "react-chartjs-2"
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// // Register chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// export default function Chart() {
//   const [userData, setUserData] = useState([])

//   useEffect(() => {
//     fetch("/users.json")
//       .then((res) => res.json())
//       .then((data) => setUserData(data))
//       .catch((err) => console.error("Error loading users:", err))
//   }, [])

//   // Calculate group distribution
//   const groupCounts = userData.reduce((acc, user) => {
//     acc[user.group] = (acc[user.group] || 0) + 1
//     return acc
//   }, {})

//   const chartData = Object.entries(groupCounts).map(([group, count]) => ({
//     group: group.split("(")[0].trim(),
//     count,
//   }))

//   const maxCount = Math.max(...chartData.map((d) => d.count), 1)

//   // Chart.js data format
//   const data = {
//     labels: chartData.map((item) => item.group),
//     datasets: [
//       {
//         label: "Users",
//         data: chartData.map((item) => item.count),
//         backgroundColor: chartData.map((_, index) => {
//           const colors = [
//             "#3b82f6", "#a225eb", "#eb25b3", "#0f172a", "#1e3a8a"
//           ]
//           return colors[index % colors.length]
//         }),
//         borderColor: chartData.map((_, index) => {
//           const colors = [
//             "#2563eb", "#a225eb", "#0f172a", "#1e3a8a", "#3b82f6"
//           ]
//           return colors[index % colors.length]
//         }),
//         borderWidth: 1,
//       },
//     ],
//   }

//   // Chart options
//   const options = {
//     responsive: true,
//     plugins: {
//       title: {
//         display: true,
//         text: "User Distribution by Group",
//         font: {
//           size: 20,
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: (tooltipItem) => `${tooltipItem.raw} users`,
//         },
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//         max: maxCount + 10,
//       },
//     },
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//       <h3 className="text-lg font-semibold text-gray-800 mb-6">User Distribution by Group</h3>

//       <div className="space-y-4 w-full max-w-3xl"> {/* Added width control */}
//         <Bar data={data} options={options} />
//       </div>

//       {chartData.length === 0 && <div className="text-center py-8 text-gray-500">No data available</div>}
//     </div>
//   )
// }



"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import TopCourses from "./TopCourses"

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Chart() {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error("Error loading users:", err))
  }, [])

  // Calculate group distribution
  const groupCounts = userData.reduce((acc, user) => {
    acc[user.group] = (acc[user.group] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(groupCounts).map(([group, count]) => ({
    group: group.split("(")[0].trim(),
    count,
  }))

  const maxCount = Math.max(...chartData.map((d) => d.count), 1)

  // Chart.js data format (🔽 WIDTH FIXED HERE)
  const data = {
    labels: chartData.map((item) => item.group),
    datasets: [
      {
        label: "Users",
        data: chartData.map((item) => item.count),

        // 🔥 BAR WIDTH CONTROL
        barThickness: 28,
        maxBarThickness: 36,
           categoryPercentage: 0.8, // ⬅️ আগে ছিল 0.6
    barPercentage: 0.9,  

        backgroundColor: chartData.map((_, index) => {
          const colors = [
            "#3b82f6",
            "#a225eb",
            "#eb25b3",
            "#0f172a",
            "#1e3a8a",
          ]
          return colors[index % colors.length]
        }),
        borderColor: chartData.map((_, index) => {
          const colors = [
            "#3b82f6",
            "#a225eb",
            "#eb25b3",
            "#0f172a",
            "#1e3a8a",
          ]
          return colors[index % colors.length]
        }),
        borderWidth: 1,
        borderRadius: 6, // ✨ smooth look
      },
    ],
  }

 const options = {
  responsive: true,
  maintainAspectRatio: false, // 🔥 content অনুযায়ী height নেবে

  layout: {
    padding: {
      top: 8,
      bottom: 4, // ⬅️ extra নিচের space বাদ
      left: 0,
      right: 0,
    },
  },

  plugins: {
    title: {
      display: true,
      text: "User Distribution by Group",
      font: {
        size: 18,
      },
      padding: {
        bottom: 10,
      },
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => `${tooltipItem.raw} users`,
      },
    },
    legend: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        padding: 2,
        font: {
          size: 12,
          lineHeight: 1,
        },
        maxRotation: 0,
        minRotation: 0,
      },
    },
    y: {
      beginAtZero: true,
      max: maxCount + 5,
      ticks: {
        stepSize: 1,
      },
    },
  },
}


  return (
   <div className="bg-white  shadow-sm p-4 sm:p-6 border border-gray-200">
  <div className="flex flex-col xl:flex-row gap-6">

    {/* LEFT: CHART */}
    <div className="w-full xl:w-2/4">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
        User Distribution by Group
      </h3>

      <div className="w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[380px] xl:h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>

    {/* RIGHT: TOP COURSES */}
    <div className="w-full xl:w-2/4">
      <TopCourses />
    </div>

  </div>
</div>

  )
}
