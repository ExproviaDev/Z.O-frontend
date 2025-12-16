


"use client"

import QuizCard from "./QuizCard.jsx"

export default function QuizGrid({ quizzes, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} onDelete={onDelete} />
      ))}
    </div>
  )
}
