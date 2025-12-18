

"use client"

import { useState } from "react"
import { FiEye, FiEdit, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi"
import { useRouter } from "next/navigation"

export default function QuizCard({ quiz, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()

  const statusColors = {
    Draft: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Published: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  }

  return (
    <div className="w-full col-span-full bg-card border border-border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
    <div className="flex-1">
      <h3 className="text-xl font-semibold text-card-foreground mb-2">
        {quiz.quizName}
      </h3>
      <p className="text-sm text-muted-foreground">
        {quiz.description}
      </p>
    </div>

    <span
      className={`self-start px-3 py-1 rounded-full text-xs font-medium ${statusColors[quiz.status]}`}
    >
      {quiz.status}
    </span>
  </div>

  {/* Info Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
    <div>
      <p className="text-xs text-muted-foreground">Category</p>
      <p className="text-sm font-medium text-card-foreground">
        {quiz.category}
      </p>
    </div>

    <div>
      <p className="text-xs text-muted-foreground">Grade</p>
      <p className="text-sm font-medium text-card-foreground">
        {quiz.grade}
      </p>
    </div>

    <div className="sm:col-span-2">
      <p className="text-xs text-muted-foreground">Date</p>
      <p className="text-sm font-medium text-card-foreground">
        {quiz.date}
      </p>
    </div>
  </div>

  {/* Questions Section */}
 <div className="border-t border-border pt-4 mb-5 -mx-6">
  {/* Toggle Button */}
  <button
    onClick={() => setExpanded(!expanded)}
    className="flex items-center justify-between w-full text-left mb-3 px-6"
  >
    <span className="font-semibold text-card-foreground">
      Questions ({quiz.questions.length})
    </span>
    {expanded ? <FiChevronUp /> : <FiChevronDown />}
  </button>

  {expanded && (
    <div className="space-y-4 px-6">
      {quiz.questions.length > 0 ? (
        quiz.questions.map((q, index) => (
          <div
            key={index}
            className="w-full bg-muted/50 rounded-lg p-4"
          >
            <p className="font-medium text-sm text-card-foreground mb-2">
              <span className="text-muted-foreground">Q{index + 1}:</span>{" "}
              {q.question}
            </p>

            <div className="space-y-1 mb-2 md:flex justify-between">
              <p className="text-sm text-muted-foreground font-medium">
                Options:
              </p>
              <p className="text-sm text-muted-foreground ml-4">
                A. {q.optionA}
              </p>
              <p className="text-sm text-muted-foreground ml-4">
                B. {q.optionB}
              </p>
              <p className="text-sm text-muted-foreground ml-4">
                C. {q.optionC}
              </p>
              <p className="text-sm text-muted-foreground ml-4">
                D. {q.optionD}
              </p>
            </div>

            <p className="text-sm">
              <span className="text-muted-foreground">Ans:</span>{" "}
              <span className="text-green-600 dark:text-green-400 font-semibold">
                {q.correctAnswer}
              </span>
            </p>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground italic">
          No questions added yet
        </p>
      )}
    </div>
  )}
</div>

  {/* Action Buttons */}
  <div className="flex flex-col sm:flex-row gap-3">
    <button
      onClick={() => router.push(`/admin/quiz-management/${quiz.id}`)}
      className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm w-full"
    >
      <FiEye />
      View
    </button>

    <button
      onClick={() => router.push(`/admin/quiz-management/edit/${quiz.id}`)}
      className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm w-full"
    >
      <FiEdit />
      Edit
    </button>

    <button
      onClick={() => onDelete(quiz.id)}
      className="flex items-center justify-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors text-sm w-full"
    >
      <FiTrash2 />
      Delete
    </button>
  </div>
</div>

  )
}
