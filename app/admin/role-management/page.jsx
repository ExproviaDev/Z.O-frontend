"use client";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../store/slices/userSlice";
import axios from "axios";
import Swal from "sweetalert2"; // SweetAlert2 Import
import {
  FaUserCircle, FaTrashAlt, FaUserShield, FaSearch, FaChevronLeft,
  FaChevronRight, FaEye, FaUserPlus, FaTimes
} from "react-icons/fa";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export default function RoleManagement() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const { user: currentUser } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add Member Modal
  const [newMember, setNewMember] = useState({ email: '', role: 'manager', name: '', phone: '' });

  const usersPerPage = 10;
  const isAdmin = currentUser?.role === 'admin' || (typeof window !== "undefined" && JSON.parse(localStorage.getItem("user_data"))?.role === 'admin');

  useEffect(() => {
    if (isAdmin) dispatch(fetchAllUsers());
  }, [dispatch, isAdmin]);

  // Admin > Manager > User Sorting logic
  const sortedUsers = useMemo(() => {
    if (!users) return [];
    let filtered = users.filter((u) => {
      const matchesSearch = u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || u.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });

    const roleOrder = { admin: 1, manager: 2, user: 3 };
    return filtered.sort((a, b) => (roleOrder[a.role] || 4) - (roleOrder[b.role] || 4));
  }, [users, searchQuery, roleFilter]);

  const currentUsers = sortedUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  // --- Actions with SweetAlert ---

  // roleManagement.jsx er vitore updated handleAddMember
  const handleAddMember = async (e) => {
    e.preventDefault();

    // Loading state start
    Swal.fire({
      title: 'Processing...',
      text: 'Sending invitation and creating access...',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(`${API_URL}/api/admin/add-member`, newMember, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setIsModalOpen(false);
        setNewMember({ email: '', role: 'manager', name: '' });
        dispatch(fetchAllUsers()); // List update kora

        Swal.fire({
          icon: 'success',
          title: 'Access Granted!',
          text: `Jury account created and email sent to ${newMember.email}`,
          confirmButtonColor: '#2563eb'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: error.response?.data?.message || "Something went wrong",
        confirmButtonColor: '#d33'
      });
    }
  };

  const handleRoleUpdate = async (id, newRole) => {
    Swal.fire({
      title: "Change Role?",
      text: `Are you sure you want to change role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("access_token");
          await axios.put(`${API_URL}/api/admin/update-user/${id}`, { role: newRole }, {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(fetchAllUsers());
          Swal.fire("Updated!", "User role has been changed.", "success");
        } catch (error) {
          Swal.fire("Failed!", "Something went wrong.", "error");
        }
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("access_token");
          await axios.delete(`${API_URL}/api/admin/delete-user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(fetchAllUsers());
          Swal.fire("Deleted!", "User has been removed.", "success");
        } catch (error) {
          Swal.fire("Error!", "Deletion failed.", "error");
        }
      }
    });
  };

  if (!isAdmin) return <div className="p-20 text-center font-bold text-red-500">403 | Access Denied</div>;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">

        {/* Header Section */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaUserShield className="text-blue-600" /> User Management
            </h1>
            <p className="text-gray-500 text-xs">Total {sortedUsers.length} members found</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-3" />
              <input
                type="text"
                placeholder="Search user..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
              <FaUserPlus /> Add Member
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 font-semibold uppercase text-[10px] tracking-wider">
                <th className="px-6 py-4">Profile</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentUsers.map((user) => (
                <tr key={user.user_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {user.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleUpdate(user.user_id, e.target.value)}
                      className="bg-transparent border-none font-bold text-xs text-blue-600 cursor-pointer focus:ring-0"
                    >
                      <option value="user">USER</option>
                      <option value="manager">JURY</option>
                      <option value="admin">ADMIN</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${user.is_blocked ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                      {user.is_blocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                    <button className="text-gray-400 hover:text-blue-600"><FaEye /></button>
                    <button onClick={() => handleDelete(user.user_id)} className="text-gray-400 hover:text-red-600"><FaTrashAlt /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD MEMBER MODAL (Popup) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-gray-800">Assign New Access</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>
            <form onSubmit={handleAddMember} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                <input
                  type="text" required
                  className="w-full p-2.5 border border-gray-200 rounded-md text-sm outline-none focus:border-blue-500"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                <input
                  type="email" required
                  className="w-full p-2.5 border border-gray-200 rounded-md text-sm outline-none focus:border-blue-500"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                <input
                  type="text" required
                  placeholder="e.g. +88017..."
                  className="w-full p-2.5 border border-gray-200 rounded-md text-sm outline-none focus:border-blue-500"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">System Role</label>
                <select
                  className="w-full p-2.5 border border-gray-200 rounded-md text-sm outline-none focus:border-blue-500 font-semibold"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                >
                  <option value="manager">Jury (Manager)</option>
                  <option value="admin">Admin</option>
                  <option value="user">General User</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-md text-sm font-semibold hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 shadow-md">Grant Access</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}