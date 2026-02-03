"use client"

import { useState, useEffect } from "react"
import { FaPlus, FaEdit, FaTrash, FaTimes, FaBullhorn, FaSpinner } from "react-icons/fa"
import axios from "axios"
import Swal from "sweetalert2"

export default function Announcement() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(false) // For fetching data
  const [saving, setSaving] = useState(false)   // For save button loader
  const [showModal, setShowModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  // Form State
  const [form, setForm] = useState({
    title: "",
    fullDescription: "",
    date: "",
  })

  // --- Fetch Data from Backend (With Token) ---
  const fetchAnnouncements = async () => {
    setLoading(true)
    try {
      // ১. টোকেন লোকাল স্টোরেজ থেকে নেওয়া হচ্ছে
      const token = localStorage.getItem('access_token');

      // ২. হেডারে টোকেন পাঠানো হচ্ছে
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/announcement/all`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAnnouncements(res.data)
    } catch (error) {
      console.error("Error fetching announcements:", error)
      // যদি টোকেন এক্সপায়ার হয়ে যায় (401), ইউজারকে জানানো
      if (error.response && error.response.status === 401) {
        Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'Your session has expired. Please login again.',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  // Open Modal for Create
  const openCreateModal = () => {
    setCurrentItem(null)
    setForm({
      title: "",
      fullDescription: "",
      date: "",
    })
    setShowModal(true)
  }

  // Open Modal for Edit
  const openEditModal = (item) => {
    setCurrentItem(item)
    setForm({
      title: item.title,
      fullDescription: item.fullDescription,
      date: item.date,
    })
    setShowModal(true)
  }

  // Save (Create or Update) via API (With Token)
  const saveAnnouncement = async () => {
    // Validation
    if (!form.title || !form.date || !form.fullDescription) {
        Swal.fire({
            icon: 'warning',
            title: 'Incomplete Data',
            text: 'Please fill in all fields!',
        })
        return
    }

    setSaving(true) // Start Button Loader

    try {
      // ১. টোকেন নেওয়া এবং কনফিগ তৈরি করা
      const token = localStorage.getItem('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (currentItem) {
        // Update API Call
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/announcement/update/${currentItem.id}`, form, config)
        
        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Announcement has been updated successfully.',
            timer: 2000,
            showConfirmButton: false
        })
      } else {
        // Create API Call
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/announcement/create`, form, config)

        Swal.fire({
            icon: 'success',
            title: 'Published!',
            text: 'New announcement created successfully.',
            timer: 2000,
            showConfirmButton: false
        })
      }
      setShowModal(false)
      fetchAnnouncements() // Refresh list
    } catch (error) {
      console.error("Error saving announcement:", error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
      })
    } finally {
        setSaving(false) // Stop Button Loader
    }
  }

  // Delete via API (With Token)
  const deleteAnnouncement = async (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                // ১. টোকেন নেওয়া
                const token = localStorage.getItem('access_token');

                Swal.fire({
                    title: 'Deleting...',
                    didOpen: () => {
                        Swal.showLoading()
                    }
                })

                // ২. ডিলিট রিকোয়েস্টে হেডার পাঠানো
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/announcement/delete/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                
                setAnnouncements(announcements.filter((a) => a.id !== id))
                
                Swal.fire(
                    'Deleted!',
                    'Your announcement has been deleted.',
                    'success'
                )
            } catch (error) {
                console.error("Error deleting announcement:", error)
                Swal.fire(
                    'Error!',
                    'Failed to delete announcement.',
                    'error'
                )
            }
        }
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Announcement Management
              </h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Manage all your system announcements here</p>
            </div>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-md transition-all duration-200 hover:scale-105"
            >
              <FaPlus className="text-sm" />
              <span>Add Announcement</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Announcement List */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <FaBullhorn className="text-indigo-600 text-xl" />
            <h2 className="text-2xl font-bold text-gray-900">All Announcements</h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Title & Details</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Date</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                    <tr><td colSpan="3" className="text-center py-8 text-gray-500">Loading announcements...</td></tr>
                ) : announcements.length > 0 ? (
                  announcements.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <FaBullhorn />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-lg">{item.title}</p>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.fullDescription}</p>
                            </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <p className="text-sm text-gray-700 font-medium whitespace-nowrap">{item.date}</p>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600 transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteAnnouncement(item.id)}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                    <tr>
                        <td colSpan="3" className="text-center py-8 text-gray-500">No announcements found.</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {loading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : announcements.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">{item.date}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3">{item.fullDescription}</p>
                  <div className="flex items-center gap-2 mt-4 border-t pt-3">
                    <button onClick={() => openEditModal(item)} className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-xs font-bold text-indigo-700 flex items-center justify-center gap-2">
                        <FaEdit /> Edit
                    </button>
                    <button onClick={() => deleteAnnouncement(item.id)} className="flex-1 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-bold text-red-600 flex items-center justify-center gap-2">
                        <FaTrash /> Delete
                    </button>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">{currentItem ? "Edit Announcement" : "Create New Announcement"}</h2>
              <button 
                onClick={() => !saving && setShowModal(false)} // Prevent close while saving
                className="text-gray-400 hover:text-black"
                disabled={saving}
              >
                  <FaTimes size={20}/>
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 gap-4 text-sm">
                <div className="space-y-3">
                    <label className="block font-semibold">Title</label>
                    <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-2 border rounded-lg focus:ring-2 ring-indigo-100 outline-none" placeholder="Announcement Title" />
                </div>
                
                <div className="space-y-3">
                    <label className="block font-semibold">Date</label>
                    <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>

                <div className="space-y-3">
                    <label className="block font-semibold">Full Details</label>
                    <textarea rows="6" value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} className="w-full p-2 border rounded-lg" placeholder="Write full announcement details here..."></textarea>
                </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
                <button 
                    onClick={() => setShowModal(false)} 
                    className="px-4 py-2 text-gray-600 font-medium"
                    disabled={saving}
                >
                    Cancel
                </button>
                
                {/* Save Button with Loader */}
                <button 
                    onClick={saveAnnouncement} 
                    disabled={saving}
                    className={`px-6 py-2 rounded-lg font-bold text-white flex items-center gap-2 ${
                        saving ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                >
                    {saving ? (
                        <>
                            <FaSpinner className="animate-spin" /> Processing...
                        </>
                    ) : (
                        currentItem ? "Update" : "Publish"
                    )}
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}