"use client"

import { useState, useEffect } from "react"
import { FiSearch } from "react-icons/fi"
import Table from "./components/Table"
import RoleEditModal from "./RoleEditModal"

export default function RoleManagement() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [editingUser, setEditingUser] = useState(null)

  useEffect(() => {
    fetch("/roles.json")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        setFilteredUsers(data)
      })
      .catch((err) => console.error("Error loading roles:", err))
  }, [])

  useEffect(() => {
    let filtered = users

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by role
    if (roleFilter !== "All") {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

    setFilteredUsers(filtered)
  }, [searchTerm, roleFilter, users])

  const handleEdit = (user) => {
    setEditingUser(user)
  }

  const handleSave = (updatedData) => {
    const updatedUsers = users.map((user) => (user.id === editingUser.id ? { ...user, ...updatedData } : user))
    setUsers(updatedUsers)
    setEditingUser(null)
  }

  const handleBlock = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" } : user,
    )
    setUsers(updatedUsers)
  }

  const handleDelete = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId))
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Role Management</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="All">All Roles</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <Table data={filteredUsers} onEdit={handleEdit} onBlock={handleBlock} onDelete={handleDelete} />

      {/* Edit Modal */}
      {editingUser && <RoleEditModal user={editingUser} onClose={() => setEditingUser(null)} onSave={handleSave} />}
    </div>
  )
}
