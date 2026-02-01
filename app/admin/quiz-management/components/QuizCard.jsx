"use client"

import { useState } from "react"
import { FiEye, FiEdit, FiTrash2, FiChevronDown, FiChevronUp, FiRefreshCw } from "react-icons/fi"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2" // SweetAlert2 ইমপোর্ট করুন
import { updateQuizStatusAction } from "../../../store/slices/quizSlice"

export default function QuizCard({ quiz, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const status = quiz.status?.toLowerCase() || "draft"
  const isPublished = status === "published"

  // --- SweetAlert Status Toggle Handler ---
  const handleToggleStatus = async () => {
    const nextStatus = isPublished ? "draft" : "published"

    // কনফার্মেশন অ্যালার্ট
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${isPublished ? 'unpublish' : 'publish'} this quiz?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: isPublished ? '#f59e0b' : '#1d4ed8', // Draft হলে Amber, Publish হলে Blue
      cancelButtonColor: '#64748b',
      confirmButtonText: `Yes, ${nextStatus} it!`,
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      borderRadius: '15px'
    })

    if (result.isConfirmed) {
      setIsUpdating(true)
      try {
        await dispatch(updateQuizStatusAction({ id: quiz.id, status: nextStatus })).unwrap()

        // সাকসেস অ্যালার্ট
        Swal.fire({
          title: 'Updated!',
          text: `Quiz is now ${nextStatus}.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          borderRadius: '15px'
        })
      } catch (err) {
        // এরর অ্যালার্ট
        Swal.fire({
          title: 'Error!',
          text: err.message || 'Something went wrong',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        })
      } finally {
        setIsUpdating(false)
      }
    }
  }

  // ডিলিট করার জন্যও SweetAlert ব্যবহার করা ভালো
  const handleDeleteClick = async () => {
    const result = await Swal.fire({
      title: 'Delete Quiz?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      onDelete(quiz.id)
    }
  }

  const questionList = quiz.questions || []
  const questionCount = questionList[0]?.count || questionList.length

  return (
    <div className="w-full col-span-full bg-card border border-border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-card-foreground mb-1 uppercase tracking-tight">
            {quiz.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {quiz.category} - Exam Set
          </p>
        </div>

        {/* --- Modern Toggle Switcher --- */}
        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-100 shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Quiz Status
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleStatus}
              disabled={isUpdating}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none disabled:opacity-50 hover:opacity-80 ${isPublished ? "bg-blue-600" : "bg-slate-300"
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${isPublished ? "translate-x-6" : "translate-x-1"
                  }`}
              />
            </button>

            <span className={`text-[11px] font-bold w-16 transition-colors ${isPublished ? "text-blue-600" : "text-amber-500"}`}>
              {isUpdating ? (
                <FiRefreshCw className="animate-spin" />
              ) : (
                status.toUpperCase()
              )}
            </span>
          </div>
        </div>
      </div>

      {/* --- Rest of the Card Info --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
        <div>
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Category</p>
          <p className="text-sm font-semibold text-card-foreground">{quiz.category}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Time Limit</p>
          <p className="text-sm font-semibold text-card-foreground">{quiz.time_limit} Min</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Start Date</p>
          <p className="text-sm font-semibold text-card-foreground">
            {new Date(quiz.start_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="border-t border-border pt-4 mb-5 -mx-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-left mb-3 px-6 hover:bg-muted/30 py-2 transition-colors"
        >
          <span className="font-bold text-sm text-card-foreground">
            Questions ({questionCount})
          </span>
        </button>

      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => router.push(`/admin/quiz-management/view/${quiz.id}`)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-all text-sm w-full font-bold shadow-sm"
        >
          <FiEye /> View
        </button>
        <button
          onClick={() => router.push(`/admin/quiz-management/edit/${quiz.id}`)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all text-sm w-full font-bold shadow-sm"
        >
          <FiEdit /> Edit
        </button>
        <button
          onClick={handleDeleteClick}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm w-full font-bold shadow-sm"
        >
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  )
}