"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // 🔥 SweetAlert2 Import
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiPieChart, FiLink, FiCpu } from "react-icons/fi"; // 아이콘 업데이트

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ffc658'];

export default function MarketingAnalytics() {
  const [stats, setStats] = useState([]);
  const [users, setUsers] = useState([]);
  
  // Pagination & Search States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);

  // UTM Generator States
  const [sourceInput, setSourceInput] = useState("");
  const baseUrl = "https://zeroolympiad.com";

  // 1. Fetch Aggregated Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/marketing-stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) setStats(res.data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // 2. Debounce Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // 3. Fetch Paginated Users
  useEffect(() => {
    const fetchUsers = async () => {
      setTableLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/marketing-users?page=${currentPage}&limit=20&search=${debouncedSearch}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setUsers(res.data.data);
          setTotalPages(res.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setTableLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage, debouncedSearch]);


  // 🔥 Smart URL Extractor
  const extractSource = (input) => {
    let source = input.trim();
    if (source.includes('.com') || source.includes('http')) {
      try {
        let urlString = source.startsWith('http') ? source : `https://${source}`;
        let url = new URL(urlString);
        let hostname = url.hostname.replace('www.', '');
        let parts = hostname.split('.');
        source = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
      } catch (error) {
        source = source.replace(/\s+/g, "_");
      }
    } else {
      source = source.replace(/\s+/g, "_");
    }
    return source.toLowerCase();
  };

  // 🔥 Generate & SweetAlert Popup
  const handleGenerateLink = () => {
    if (!sourceInput.trim()) return;

    const finalSource = extractSource(sourceInput);
    const generatedLink = `${baseUrl}?utm_source=${finalSource}`;

    // পপআপ দেখানো এবং সেখান থেকেই কপি করানো
    Swal.fire({
      title: 'Source Created Successfully!',
      html: `
        <p class="text-slate-600 mb-4 text-sm">Your tracking link is ready. Share this link to track users coming from <b>${finalSource.toUpperCase()}</b>.</p>
        <div class="bg-indigo-50 p-3 rounded-lg border border-indigo-100 break-all text-indigo-700 font-mono text-sm">
          ${generatedLink}
        </div>
      `,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Copy Link',
      cancelButtonText: 'Close',
      confirmButtonColor: '#4F46E5', // Indigo-600
      cancelButtonColor: '#64748b', // Slate-500
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // "Copy Link" বাটনে ক্লিক করলে
        navigator.clipboard.writeText(generatedLink);
        setSourceInput(""); // ইনপুট ক্লিয়ার করা
        Swal.fire({
          title: 'Copied!',
          text: 'The link has been copied to your clipboard.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  if (loading) return <div className="p-10 text-center animate-pulse">Loading Dashboard...</div>;

  return (
    <div className="p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <FiPieChart className="text-blue-600" /> Traffic Sources
          </h1>
          <p className="text-slate-500 mt-2">Track where your registered users are coming from.</p>
        </div>
      </div>

      {/* 🔥 Advanced UTM Link Generator Tool */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-indigo-100 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
        
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <FiCpu className="text-indigo-600" /> Smart Link Generator
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Paste a URL (e.g. facebook.com/page) or type a name (e.g. Rakib 10). We will auto-format it into a tracking link.
          </p>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full flex items-center bg-white border-2 border-slate-200 hover:border-indigo-300 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
              <span className="bg-slate-50 text-slate-500 px-4 py-3 border-r border-slate-200">
                <FiLink size={20} />
              </span>
              <input
                type="text"
                placeholder="Enter source name or paste URL..."
                value={sourceInput}
                onChange={(e) => setSourceInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateLink()}
                className="flex-1 w-full px-4 py-3 focus:outline-none text-slate-800 font-medium placeholder:font-normal"
              />
            </div>
            <button
              onClick={handleGenerateLink}
              disabled={!sourceInput.trim()}
              className={`px-8 py-3 rounded-xl font-bold text-white shadow-md transition-all whitespace-nowrap ${
                !sourceInput.trim() 
                  ? "bg-slate-300 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              Generate Link
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      {/* ... (বাকি কোড আগের মতোই থাকবে, বার চার্ট, পাই চার্ট এবং টেবিল) ... */}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-700 mb-6">Source Overview</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="source" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-700 mb-6">Traffic Share</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="count" nameKey="source">
                  {stats.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-slate-700">User Tracking Data</h2>
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by UTM Source (e.g. face)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto relative min-h-[300px]">
          {tableLoading ? (
            <div className="absolute inset-0 flex justify-center items-center bg-white/60 z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : null}
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest">
                <th className="p-4 font-bold">Name</th>
                <th className="p-4 font-bold">Phone</th>
                <th className="p-4 font-bold">Signup Source</th>
                <th className="p-4 font-bold">Join Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.length > 0 ? users.map((user, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-700">{user.name}</td>
                  <td className="p-4 text-slate-500 text-sm">{user.phone || 'N/A'}</td>
                  <td className="p-4 font-bold text-slate-700 uppercase">
                    {user.signup_source === 'organic' ? (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">Organic</span>
                    ) : (
                      <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs">{user.signup_source}</span>
                    )}
                  </td>
                  <td className="p-4 text-slate-500 text-sm">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-400">No users found for this source.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-50 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Page <span className="font-bold text-slate-800">{currentPage}</span> of <span className="font-bold text-slate-800">{totalPages || 1}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1 || tableLoading}
              className="p-2 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0 || tableLoading}
              className="p-2 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}