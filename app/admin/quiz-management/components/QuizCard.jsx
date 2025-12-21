"use client"

import { useState } from "react"
import { FiEye, FiEdit, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi"
import { useRouter } from "next/navigation"

export default function QuizCard({ quiz, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
  const status = quiz.status || "Published"

  const statusColors = {
    Draft: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Published: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  }
  const questionList = quiz.questions || []
  const questionCount = questionList[0]?.count || questionList.length

  return (
    <div className="w-full col-span-full bg-card border border-border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-card-foreground mb-1">
            {quiz.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {quiz.category} - Exam Set
          </p>
        </div>

        <span className={`self-start px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div>
          <p className="text-xs text-muted-foreground">Category</p>
          <p className="text-sm font-medium text-card-foreground">{quiz.category}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Time Limit</p>
          <p className="text-sm font-medium text-card-foreground">{quiz.time_limit} Minutes</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Start Date</p>
          <p className="text-sm font-medium text-card-foreground">
            {new Date(quiz.start_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="border-t border-border pt-4 mb-5 -mx-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-left mb-3 px-6 hover:bg-muted/30 py-1 transition-colors"
        >
          <span className="font-semibold text-card-foreground">
            Questions ({questionCount})
          </span>
          {expanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {expanded && (
          <div className="space-y-4 px-6 max-h-60 overflow-y-auto">
            {questionList.length > 0 && typeof questionList[0] === 'object' ? (
              questionList.map((q, index) => (
                <div key={index} className="w-full bg-muted/50 rounded-lg p-4 text-sm">
                  <p className="font-medium mb-2">Q{index + 1}: {q.question_text}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <span>A: {q.options?.A}</span>
                    <span>B: {q.options?.B}</span>
                    <span>C: {q.options?.C}</span>
                    <span>D: {q.options?.D}</span>
                  </div>
                  <p className="mt-2 text-green-600 font-bold">Ans: {q.correct_answer}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic px-2">
                Click "View" to see full question details.
              </p>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => router.push(`/admin/quiz-management/view/${quiz.id}`)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm w-full"
        >
          <FiEye /> View
        </button>
        <button
          onClick={() => router.push(`/admin/quiz-management/edit/${quiz.id}`)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm w-full"
        >
          <FiEdit /> Edit
        </button>
        <button
          onClick={() => onDelete(quiz.id)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm w-full"
        >
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  )
}