

"use client"

import { useState } from "react"

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  const users = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      role: "User",
      status: "Active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@email.com",
      role: "User",
      status: "Active",
      joinDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Arjun Kumar",
      email: "arjun.kumar@email.com",
      role: "Manager",
      status: "Active",
      joinDate: "2023-11-10",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      role: "User",
      status: "Blocked",
      joinDate: "2024-03-05",
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      role: "Admin",
      status: "Active",
      joinDate: "2023-08-12",
    },
    {
      id: 6,
      name: "Ananya Iyer",
      email: "ananya.iyer@email.com",
      role: "User",
      status: "Active",
      joinDate: "2024-04-18",
    },
  ]

  const roleColors = {
    Admin: "bg-purple-100 text-purple-800",
    Manager: "bg-blue-100 text-blue-800",
    User: "bg-gray-100 text-gray-800",
  }

  const statusColors = {
    Active: "bg-green-100 text-green-800",
    Blocked: "bg-red-100 text-red-800",
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium w-full sm:w-auto">
          + Add New User
        </button>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:col-span-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
          </select>
        </div>
      </div>

      {/* ================= MOBILE VIEW (CARDS) ================= */}
      <div className="space-y-4 md:hidden">
        {users.map((user) => (
          <div key={user.id} className="bg-white border rounded-lg p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className={`px-2 py-1 rounded-full ${roleColors[user.role]}`}>{user.role}</span>
              <span className={`px-2 py-1 rounded-full ${statusColors[user.status]}`}>{user.status}</span>
            </div>

            <p className="text-sm text-gray-600">Joined: {user.joinDate}</p>

            <div className="flex gap-3 text-sm font-medium">
              <button className="text-blue-600">Edit</button>
              <button className="text-orange-600">Block</button>
              <button className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP / TABLET VIEW ================= */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${roleColors[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${statusColors[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.joinDate}</td>
                  <td className="px-6 py-4 space-x-2 text-sm">
                    <button className="text-blue-600">Edit</button>
                    <button className="text-orange-600">Block</button>
                    <button className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
