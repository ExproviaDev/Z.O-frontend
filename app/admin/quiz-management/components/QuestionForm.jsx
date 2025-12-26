


"use client"

import { useState } from "react"

export default function QuestionForm({ onAddQuestion }) {
  const [question, setQuestion] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddQuestion(question)
    setQuestion({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "A",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Add Question</h3>

      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2">Qus:</label>
        <textarea
          required
          rows={3}
          value={question.question}
          onChange={(e) => setQuestion({ ...question, question: e.target.value })}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground resize-none"
          placeholder="Enter your question here"
        />
      </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
  <div className="w-full">
    <label className="block text-sm font-medium text-card-foreground mb-2">
      Option A
    </label>
    <input
      type="text"
      required
      value={question.optionA}
      onChange={(e) =>
        setQuestion({ ...question, optionA: e.target.value })
      }
      className="w-full max-w-full px-3 py-2 border border-border rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-ring 
                 bg-background text-foreground break-all"
    />
  </div>

  <div className="w-full">
    <label className="block text-sm font-medium text-card-foreground mb-2">
      Option B
    </label>
    <input
      type="text"
      required
      value={question.optionB}
      onChange={(e) =>
        setQuestion({ ...question, optionB: e.target.value })
      }
      className="w-full max-w-full px-3 py-2 border border-border rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-ring 
                 bg-background text-foreground break-all"
    />
  </div>

  <div className="w-full">
    <label className="block text-sm font-medium text-card-foreground mb-2">
      Option C
    </label>
    <input
      type="text"
      required
      value={question.optionC}
      onChange={(e) =>
        setQuestion({ ...question, optionC: e.target.value })
      }
      className="w-full max-w-full px-3 py-2 border border-border rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-ring 
                 bg-background text-foreground break-all"
    />
  </div>

  <div className="w-full">
    <label className="block text-sm font-medium text-card-foreground mb-2">
      Option D
    </label>
    <input
      type="text"
      required
      value={question.optionD}
      onChange={(e) =>
        setQuestion({ ...question, optionD: e.target.value })
      }
      className="w-full max-w-full px-3 py-2 border border-border rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-ring 
                 bg-background text-foreground break-all"
    />
  </div>
</div>


      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2">Correct Answer</label>
        <select
          value={question.correctAnswer}
          onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
      >
        Add Question
      </button>
    </form>
  )
}
