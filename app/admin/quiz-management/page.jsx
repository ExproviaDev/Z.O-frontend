

"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { FiPlus } from "react-icons/fi"
import { useQuiz } from "./context/QuizContext.jsx"
import SearchBar from "./components/SearchBar.jsx"
import QuizGrid from "./components/QuizGrid.jsx"

export default function QuizManagementPage() {
  const router = useRouter()
  const { quizzes, loading, deleteQuiz } = useQuiz()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => quiz.quizName.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [quizzes, searchTerm])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      deleteQuiz(id)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quizzes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Event Management</h1>
          <p className="text-muted-foreground">Manage all quizzes from here</p>
        </div>

        {/* Control Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <button
            onClick={() => router.push("/admin/quiz-management/add")}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-primary/90 transition-colors font-medium whitespace-nowrap"
          >
            <FiPlus />
            Add Quiz
          </button>
        </div>

        {/* Quiz Grid */}
        {filteredQuizzes.length > 0 ? (
          <QuizGrid quizzes={filteredQuizzes} onDelete={handleDelete} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {searchTerm ? "No quizzes found matching your search" : "No quizzes available"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
