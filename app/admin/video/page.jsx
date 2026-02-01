"use client"

import { useState, useRef } from "react"
import {
  FiVideo,
  FiUpload,
  FiYoutube,
  FiHardDrive,
  FiPlay,
  FiDownload,
  FiEdit2,
  FiTrash2,
  FiX,
  FiCheck,
  FiPlus,
  FiLink,
  FiFileText,
} from "react-icons/fi"

export default function VideoManagementPage() {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Product Launch Keynote 2024",
      type: "local",
      event: "Annual Conference",
      fileSize: "245 MB",
      uploadDate: "2024-01-15",
      thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
      videoUrl: "#",
    },
    {
      id: 2,
      title: "Team Building Workshop",
      type: "youtube",
      event: "Team Events",
      fileSize: "N/A",
      uploadDate: "2024-01-12",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
    },
  ])

  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showPlayerModal, setShowPlayerModal] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const [uploadForm, setUploadForm] = useState({
    title: "",
    type: "local",
    file: null,
    youtubeUrl: "",
    thumbnail: "",
    event: "Annual Conference",
  })

  // Stats
  const uploadedVideos = videos.filter((v) => v.type === "local").length
  const youtubeVideos = videos.filter((v) => v.type === "youtube").length

  const handleUploadSubmit = (e) => {
    e.preventDefault()
    setIsUploading(true)
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          const newVideo = {
            id: Date.now(),
            title: uploadForm.title,
            type: uploadForm.type,
            event: uploadForm.event,
            uploadDate: new Date().toISOString().split("T")[0],
            thumbnail: uploadForm.type === 'youtube' 
              ? `https://img.youtube.com/vi/${extractYoutubeId(uploadForm.youtubeUrl)}/mqdefault.jpg`
              : "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
          }
          if (uploadForm.type === "local" && uploadForm.file) {
            newVideo.fileSize = `${(uploadForm.file.size / (1024 * 1024)).toFixed(2)} MB`
            newVideo.videoUrl = URL.createObjectURL(uploadForm.file)
          } else {
            const yId = extractYoutubeId(uploadForm.youtubeUrl)
            newVideo.videoUrl = `https://www.youtube.com/embed/${yId}`
            newVideo.fileSize = "N/A"
          }
          setVideos([newVideo, ...videos])
          resetAndClose()
        }, 500)
      }
    }, 150)
  }

  const resetAndClose = () => {
    setShowUploadModal(false)
    setIsUploading(false)
    setUploadProgress(0)
    setUploadForm({ title: "", type: "local", file: null, youtubeUrl: "", thumbnail: "", event: "Annual Conference" })
  }

  const extractYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : "dQw4w9WgXcQ"
  }

  const handleDelete = (id) => {
    if (confirm("ভিডিওটি ডিলিট করতে চান?")) {
      setVideos(videos.filter((v) => v.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Media Library</h1>
            <p className="text-slate-500 mt-1">আপনার সব ভিডিও কন্টেন্ট এখান থেকে ম্যানেজ করুন</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <FiPlus size={20} /> Upload New Video
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Media", value: videos.length, icon: <FiVideo />, color: "bg-indigo-600" },
            { label: "Local Files", value: uploadedVideos, icon: <FiHardDrive />, color: "bg-emerald-500" },
            { label: "YouTube Clips", value: youtubeVideos, icon: <FiYoutube />, color: "bg-red-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
              <div className={`${stat.color} text-white p-4 rounded-2xl shadow-lg`}>{stat.icon}</div>
              <div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Video Table */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider">Video Info</th>
                  <th className="px-6 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {videos.map((video) => (
                  <tr key={video.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-24 h-14 flex-shrink-0">
                          <img src={video.thumbnail} className="w-full h-full object-cover rounded-xl shadow-sm" alt="" />
                          <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <FiPlay className="text-white" />
                          </div>
                        </div>
                        <span className="font-bold text-slate-700 line-clamp-1">{video.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                        video.type === "local" ? "bg-indigo-50 text-indigo-600" : "bg-red-50 text-red-600"
                      }`}>
                        {video.type === "local" ? <FiHardDrive /> : <FiYoutube />} {video.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{video.event}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{video.fileSize}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => { setCurrentVideo(video); setShowPlayerModal(true); }} className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                          <FiPlay size={18} fill="currentColor" />
                        </button>
                        <button onClick={() => handleDelete(video.id)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {videos.length === 0 && (
              <div className="py-20 text-center">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <FiVideo size={40} />
                </div>
                <h3 className="text-lg font-bold text-slate-400">No Videos Found</h3>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-xl w-full p-8 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Add New Video</h2>
              <button onClick={resetAndClose} className="p-2 bg-slate-100 hover:bg-red-50 hover:text-red-500 rounded-full transition-all">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-bold text-slate-500 mb-2 block uppercase tracking-widest">Video Title</label>
                <input
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                  placeholder="e.g. Workshop Highlights 2024"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUploadForm({ ...uploadForm, type: "local" })}
                  className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all font-bold ${
                    uploadForm.type === "local" ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-slate-100 text-slate-400 hover:border-slate-200"
                  }`}
                >
                  <FiHardDrive /> Local File
                </button>
                <button
                  type="button"
                  onClick={() => setUploadForm({ ...uploadForm, type: "youtube" })}
                  className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all font-bold ${
                    uploadForm.type === "youtube" ? "border-red-600 bg-red-50 text-red-600" : "border-slate-100 text-slate-400 hover:border-slate-200"
                  }`}
                >
                  <FiYoutube /> YouTube
                </button>
              </div>

              <div className="p-6 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50">
                {uploadForm.type === "local" ? (
                  <div className="text-center">
                    <input type="file" ref={fileInputRef} className="hidden" accept="video/*" onChange={(e) => setUploadForm({...uploadForm, file: e.target.files[0]})} />
                    <button type="button" onClick={() => fileInputRef.current.click()} className="flex flex-col items-center gap-2 mx-auto">
                      <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 mb-2">
                        <FiUpload size={24} />
                      </div>
                      <span className="font-bold text-slate-600">{uploadForm.file ? uploadForm.file.name : "Select Video From Laptop"}</span>
                      <span className="text-xs text-slate-400 font-medium">MP4, MOV up to 500MB</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest"><FiLink /> Paste Link Below</div>
                    <input
                      required
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-5 py-4 bg-white border border-slate-100 rounded-xl outline-none"
                      value={uploadForm.youtubeUrl}
                      onChange={(e) => setUploadForm({ ...uploadForm, youtubeUrl: e.target.value })}
                    />
                  </div>
                )}
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-black text-indigo-600 uppercase tracking-widest">
                    <span>Uploading Data</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={resetAndClose} className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors">Discard</button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-2 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-black transition-all disabled:opacity-50"
                >
                  {isUploading ? "Processing..." : "Confirm & Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modern Player Modal */}
      {showPlayerModal && currentVideo && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 z-[200]">
          <div className="bg-black rounded-[2.5rem] shadow-2xl max-w-5xl w-full overflow-hidden relative">
            <button onClick={() => setShowPlayerModal(false)} className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all">
              <FiX size={24} />
            </button>
            <div className="aspect-video">
              {currentVideo.type === "youtube" ? (
                <iframe src={currentVideo.videoUrl} className="w-full h-full" allowFullScreen />
              ) : (
                <video src={currentVideo.videoUrl} controls className="w-full h-full" autoPlay />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}