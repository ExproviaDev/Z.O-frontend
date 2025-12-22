"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux" 
import { FiPlus } from "react-icons/fi"
import { fetchQuizzes, deleteQuizAction } from "../../store/slices/quizSlice.js"
import SearchBar from "./components/SearchBar.jsx"
import QuizGrid from "./components/QuizGrid.jsx"

export default function QuizManagementPage() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { quizzes, loading } = useSelector((state) => state.quiz)
  const [searchTerm, setSearchTerm] = useState("")

  // মাউন্ট হওয়ার সময় ডাটা ফেচ করা
  useEffect(() => {
    dispatch(fetchQuizzes())
  }, [dispatch])

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) =>
      quiz.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [quizzes, searchTerm])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      dispatch(deleteQuizAction(id))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Management</h1>
          <p className="text-muted-foreground">Manage all your SDG Olympiad quizzes</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button
            onClick={() => router.push("/admin/quiz-management/add")}
            className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium shadow-sm"
          >
            <FiPlus /> Add New Quiz
          </button>
        </div>

        {filteredQuizzes.length > 0 ? (
          <QuizGrid quizzes={filteredQuizzes} onDelete={handleDelete} />
        ) : (
          <div className="text-center py-20 bg-card rounded-xl border border-dashed">
            <p className="text-muted-foreground text-lg">
              {searchTerm ? "No quizzes found matching your search" : "Your quiz database is empty"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}