
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FiPlus, FiArrowLeft } from "react-icons/fi"
import { useQuiz } from "../context/QuizContext.jsx"
import QuizModal from "../components/QuizModal.jsx"
import QuestionForm from "../components/QuestionForm.jsx"

export default function AddQuizPage() {
  const router = useRouter()
  const { addQuiz, addQuestion } = useQuiz()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentQuizId, setCurrentQuizId] = useState(null)
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [questions, setQuestions] = useState([])

  const handleAddQuiz = (quizData) => {
    const newQuizId = addQuiz(quizData)
    setCurrentQuizId(newQuizId)
    setCurrentQuiz(quizData)
  }

  const handleAddQuestion = (questionData) => {
    if (currentQuizId) {
      addQuestion(currentQuizId, questionData)
      setQuestions([...questions, questionData])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/quiz-management")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <FiArrowLeft />
            Back to Event Management
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Add New Quiz</h1>
              <p className="text-muted-foreground">Create quiz and add questions</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <FiPlus />
              Add More
            </button>
          </div>
        </div>

        {/* Quiz Info Display */}
        {currentQuiz && (
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Current Quiz</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Quiz Name</p>
                <p className="font-medium text-card-foreground">{currentQuiz.quizName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium text-card-foreground">{currentQuiz.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Grade</p>
                <p className="font-medium text-card-foreground">{currentQuiz.grade}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium text-card-foreground">{currentQuiz.date}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium text-card-foreground">{currentQuiz.description}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-card-foreground">Questions Added: {questions.length}</p>
            </div>
          </div>
        )}

        {/* Instructions or Question Form */}
        {!currentQuiz ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Click "Add More" to create a new quiz and start adding questions
            </p>
          </div>
        ) : (
          <QuestionForm onAddQuestion={handleAddQuestion} />
        )}

        {/* Questions List */}
        {questions.length > 0 && (
          <div className="mt-6 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Added Questions ({questions.length})</h3>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-4">
                  <p className="font-medium text-sm text-card-foreground mb-2">
                    <span className="text-muted-foreground">Q{index + 1}:</span> {q.question}
                  </p>
                  <div className="space-y-1 mb-2 text-sm text-muted-foreground">
                    <p className="ml-4">A. {q.optionA}</p>
                    <p className="ml-4">B. {q.optionB}</p>
                    <p className="ml-4">C. {q.optionC}</p>
                    <p className="ml-4">D. {q.optionD}</p>
                  </div>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Correct Answer:</span>{" "}
                    <span className="text-green-600 dark:text-green-400 font-semibold">{q.correctAnswer}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <QuizModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddQuiz} />
    </div>
  )
}
