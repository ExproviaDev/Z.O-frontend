"use client";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../store/slices/userSlice";
import axios from "axios";
import {
  FaUserCircle, FaTrashAlt, FaBan, FaCheckCircle,
  FaUserShield, FaSearch, FaFilter, FaChevronLeft, FaChevronRight, FaEye
} from "react-icons/fa";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const InfoCard = ({ label, value }) => (
  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-slate-800 font-bold text-sm">{value || "N/A"}</p>
  </div>
);

export default function RoleManagement() {
  const dispatch = useDispatch();

  // ১. স্লাইস থেকে ইউজার এবং লগইন করা অ্যাডমিন ইনফো নিন (পাথ ঠিক করা হয়েছে)
  const { users, loading } = useSelector((state) => state.users);
  const { user: currentUser } = useSelector((state) => state.auth); // state.user থেকে state.auth করা হয়েছে

  const [updatingId, setUpdatingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const usersPerPage = 8;

  // ২. রিফ্রেশ প্রোটেকশন: লোকাল স্টোরেজ থেকে রোল চেক করা
  const getAdminStatus = () => {
    if (currentUser?.role === 'admin') return true;
    if (typeof window !== "undefined") {
      const savedUser = JSON.parse(localStorage.getItem("user_data"));
      return savedUser?.role === 'admin';
    }
    return false;
  };

  const isAdmin = getAdminStatus();

  // ৩. শুধুমাত্র অ্যাডমিন হলে ডাটা ফেচ হবে
  useEffect(() => {
    if (isAdmin && users.length === 0) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, isAdmin, users.length]);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((u) => {
      const name = u.name?.toLowerCase() || "";
      const email = u.email?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();
      const matchesSearch = name.includes(query) || email.includes(query);
      const userRole = u.role?.toLowerCase() || "user";
      const filterRole = roleFilter.toLowerCase();
      const matchesRole = filterRole === "all" || userRole === filterRole;
      const matchesStatus = statusFilter === "all" ||
        (statusFilter === "blocked" ? u.is_blocked === true : u.is_blocked === false);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleUpdate = async (id, updatedData) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem("access_token");
      await axios.put(`${API_URL}/api/admin/update-user/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(fetchAllUsers());
    } catch (error) {
      alert("Update failed!");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`${API_URL}/api/admin/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(fetchAllUsers());
    } catch (error) {
      alert("Delete failed!");
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // ৪. লোডিং এবং অ্যাক্সেস চেক লজিক ফিক্স
  if (loading && users.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center font-bold text-blue-600 gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="animate-pulse tracking-widest uppercase text-xs">Loading Security Protocol...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-red-500 font-black uppercase tracking-tighter gap-4">
        <p className="text-2xl font-black">403 | Access Denied</p>
        <p className="text-xs text-slate-500 normal-case font-medium">You do not have permission to view this command center.</p>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="bg-slate-900 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-slate-800 transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] p-2 md:p-6 relative">
      <div className="w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">

        {/* Header Section */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <FaUserShield className="text-blue-400" /> Role Control Center
              </h1>
              <p className="text-slate-400 text-sm">Managing {filteredUsers.length} total users</p>
            </div>

            <div className="relative w-full md:w-96">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Find user by name or email..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-wrap gap-4">
          <select
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none hover:border-blue-500 transition-colors"
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="manager">Managers</option>
            <option value="user">Users</option>
          </select>

          <select
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none hover:border-blue-500 transition-colors"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="blocked">Suspended Only</option>
          </select>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[11px] font-black uppercase tracking-widest">
                <th className="p-5">User Profile</th>
                <th className="p-5">System Role</th>
                <th className="p-5">Account Status</th>
                <th className="p-5 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentUsers.map((user) => (
                <tr key={user.user_id} className={`group hover:bg-blue-50/40 transition-all ${user.is_blocked ? 'bg-red-50/30' : ''}`}>
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {user.profile_image_url ? (
                          <img src={user.profile_image_url} className="w-12 h-12 rounded-full object-cover shadow-md" alt="" />
                        ) : (
                          <FaUserCircle className="w-12 h-12 text-slate-200" />
                        )}
                        <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.is_blocked ? 'bg-red-500' : 'bg-green-500'}`}></span>
                      </div>
                      <div>
                        <p className={`font-black text-slate-800 ${user.is_blocked ? 'line-through opacity-40' : ''}`}>{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <select
                      value={user.role}
                      onChange={(e) => handleUpdate(user.user_id, { role: e.target.value })}
                      disabled={updatingId === user.user_id}
                      className="p-2 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="user">USER</option>
                      <option value="manager">MANAGER</option>
                      <option value="admin">ADMIN</option>
                    </select>
                  </td>
                  <td className="p-5">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${user.is_blocked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {user.is_blocked ? "Suspended" : "Access Active"}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="p-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        title="View Full Profile"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => handleUpdate(user.user_id, { is_blocked: !user.is_blocked })}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl font-black text-[10px] uppercase tracking-tighter transition-all ${user.is_blocked ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-orange-600 border border-orange-100 hover:bg-orange-50'}`}
                      >
                        {user.is_blocked ? "Reactivate" : "Suspend"}
                      </button>

                      <button
                        onClick={() => handleDelete(user.user_id)}
                        className="p-2 bg-white text-red-600 border border-red-100 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{indexOfFirstUser + 1}</span> to <span className="font-bold text-slate-800">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of <span className="font-bold text-slate-800">{filteredUsers.length}</span> Users
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              <FaChevronLeft />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-600'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Detail Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <h2 className="text-xl font-black flex items-center gap-2 uppercase tracking-tighter">
                <FaUserShield className="text-blue-400" /> Member Identity Card
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500 transition-all font-bold text-2xl">×</button>
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8 pb-8 border-b border-slate-100">
                <div className="relative">
                  {selectedUser.profile_image_url ? (
                    <img src={selectedUser.profile_image_url} className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-50 shadow-xl" alt="" />
                  ) : (
                    <FaUserCircle className="w-32 h-32 text-slate-200" />
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{selectedUser.name}</h3>
                  <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mt-1">{selectedUser.role} Account Status</p>
                  <p className="text-slate-400 text-sm mt-1">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard label="Full Name" value={selectedUser.name} />
                <InfoCard label="Email Address" value={selectedUser.email} />
                <InfoCard label="Phone Number" value={selectedUser.phone} />
                <InfoCard label="District" value={selectedUser.district} />
                <InfoCard label="Assigned Course" value={selectedUser.assigned_course} />
                <InfoCard label="Activity Role" value={selectedUser.activities_role} />
                <InfoCard label="Status" value={selectedUser.is_blocked ? "Blocked" : "Active"} />
                <InfoCard label="Registered On" value={new Date(selectedUser.created_at).toLocaleDateString()} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}