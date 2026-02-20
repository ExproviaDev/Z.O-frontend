"use client";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../store/slices/userSlice";
import axios from "axios";
import Swal from "sweetalert2"; 
import {
  FaTrashAlt, FaUserShield, FaSearch, FaChevronLeft,
  FaChevronRight, FaEye, FaUserPlus, FaTimes, FaMapMarkerAlt, FaUniversity
} from "react-icons/fa";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export default function RoleManagement() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const { user: currentUser } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // ডিটেইল মডালের জন্য
  const [selectedUser, setSelectedUser] = useState(null); // সিলেক্টেড ইউজার
  const [newMember, setNewMember] = useState({ email: '', role: 'Participant', name: '', phone: '' });

  const usersPerPage = 10;
  const isAdmin = currentUser?.role === 'admin' || (typeof window !== "undefined" && JSON.parse(localStorage.getItem("user_data"))?.role === 'admin');

  useEffect(() => {
    if (isAdmin) dispatch(fetchAllUsers());
  }, [dispatch, isAdmin]);

  // ফিল্টার বা সার্চ করলে কারেন্ট পেজ ১ এ রিসেট করা
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter]);

  const sortedUsers = useMemo(() => {
    if (!users) return [];
    let filtered = users.filter((u) => {
      const matchesSearch = u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || u.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });

    const roleOrder = { admin: 1, manager: 2, user: 3, ambassador: 4 };
    return filtered.sort((a, b) => (roleOrder[a.role] || 5) - (roleOrder[b.role] || 5));
  }, [users, searchQuery, roleFilter]);

  // প্যাজিনেশন লজিক
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const currentUsers = sortedUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  // --- View Details Function ---
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
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
        setNewMember({ email: '', role: 'Participant', name: '', phone: '' });
        dispatch(fetchAllUsers());
        Swal.fire({ icon: 'success', title: 'Access Granted!', text: `Email sent to ${newMember.email}` });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Failed!', text: error.response?.data?.message || "Error" });
    }
  };

  const handleRoleUpdate = async (id, newRole) => {
    Swal.fire({
      title: "Change Role?",
      text: `Are you sure you want to change role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("access_token");
          await axios.put(`${API_URL}/api/admin/update-user/${id}`, { role: newRole }, {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(fetchAllUsers());
          Swal.fire("Updated!", "User role changed.", "success");
        } catch (error) {
          Swal.fire("Failed!", "Something went wrong.", "error");
        }
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("access_token");
          await axios.delete(`${API_URL}/api/admin/delete-user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(fetchAllUsers());
          Swal.fire("Deleted!", "User removed.", "success");
        } catch (error) {
          Swal.fire("Error!", "Deletion failed.", "error");
        }
      }
    });
  };

  if (!isAdmin) return <div className="p-20 text-center font-bold text-red-500">403 | Access Denied</div>;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden flex flex-col h-[80vh]">

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
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2"
            >
              <FaUserPlus /> Add Member
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm relative">
            <thead className="sticky top-0 bg-white z-10 border-b shadow-sm">
              <tr className="text-gray-600 font-semibold uppercase text-[10px] tracking-wider">
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
                      <div className="w-9 h-9 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
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
                      <option value="ambassador">AMBASSADOR</option>
                      <option value="admin">ADMIN</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold uppercase">
                    <span className={user.is_blocked ? 'text-red-500' : 'text-green-600'}>
                      {user.is_blocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                    <button onClick={() => handleViewDetails(user)} className="text-gray-400 hover:text-blue-600 transition-colors"><FaEye /></button>
                    <button onClick={() => handleDelete(user.user_id)} className="text-gray-400 hover:text-red-600 transition-colors"><FaTrashAlt /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {sortedUsers.length === 0 && <div className="p-20 text-center text-gray-400">No users found.</div>}
        </div>

        {/* --- Pagination Footer --- */}
        <div className="p-4 border-t flex justify-between items-center bg-gray-50">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            Page {currentPage} of {totalPages || 1}
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
            >
              <FaChevronLeft className="size-3" />
            </button>
            <div className="flex gap-1">
               {/* এখানে পেইজ নাম্বার ডিসপ্লে করা যায় */}
               {[...Array(totalPages)].map((_, i) => (
                 <button 
                  key={i} 
                  onClick={() => setCurrentPage(i+1)}
                  className={`size-7 text-[10px] font-bold rounded-md transition-all ${currentPage === i+1 ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50'}`}
                 >
                   {i+1}
                 </button>
               )).slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))}
            </div>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
            >
              <FaChevronRight className="size-3" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Detail Modal --- */}
      {isDetailModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold uppercase tracking-tight">User Detailed Profile</h2>
              <button onClick={() => setIsDetailModalOpen(false)} className="hover:bg-blue-700 p-2 rounded-full transition-colors"><FaTimes /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-6">
                <div className="size-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl font-black shadow-inner border-2 border-blue-100">
                  {selectedUser.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">{selectedUser.name}</h3>
                  <p className="text-blue-600 font-bold uppercase text-xs tracking-widest">{selectedUser.role}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                   <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Email Address</p>
                   <p className="text-sm font-bold text-gray-800">{selectedUser.email}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                   <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Phone Number</p>
                   <p className="text-sm font-bold text-gray-800">{selectedUser.phone || "N/A"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                   <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1"><FaMapMarkerAlt /> District</p>
                   <p className="text-sm font-bold text-gray-800">{selectedUser.district || "N/A"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                   <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1"><FaUniversity /> Institution</p>
                   <p className="text-sm font-bold text-gray-800 truncate">{selectedUser.institution || "N/A"}</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                 <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Academic Status</p>
                 <p className="text-sm font-bold text-gray-800">{selectedUser.education_type} - {selectedUser.grade_level}</p>
              </div>
              
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all active:scale-[0.98]"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Add Member Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
            <div className="p-5 border-b flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-gray-800 tracking-tight">Assign New Access</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>
            <form onSubmit={handleAddMember} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Full Name</label>
                <input
                  type="text" required
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-all"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Email Address</label>
                <input
                  type="email" required
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-all"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Phone Number</label>
                <input
                  type="text" required
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-all"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">System Role</label>
                <select
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 font-bold"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                >
                  <option value="manager">Jury (Manager)</option>
                  <option value="user">Participant (User)</option>
                  <option value="ambassador">AMBASSADOR</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]">Grant Access</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}