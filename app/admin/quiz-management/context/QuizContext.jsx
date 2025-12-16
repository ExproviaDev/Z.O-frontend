


"use client"

import { createContext, useContext, useState, useEffect } from "react"

const QuizContext = createContext()

export function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load quizzes from JSON file
    fetch("/quizzes.json")
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error loading quizzes:", err)
        setLoading(false)
      })
  }, [])

  const addQuiz = (quiz) => {
    const newQuiz = {
      ...quiz,
      id: Math.max(0, ...quizzes.map((q) => q.id)) + 1,
      questions: [],
    }
    setQuizzes([...quizzes, newQuiz])
    return newQuiz.id
  }

  const updateQuiz = (id, updatedQuiz) => {
    setQuizzes(quizzes.map((quiz) => (quiz.id === id ? { ...quiz, ...updatedQuiz } : quiz)))
  }

  const deleteQuiz = (id) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id))
  }

  const addQuestion = (quizId, question) => {
    setQuizzes(
      quizzes.map((quiz) => {
        if (quiz.id === quizId) {
          const newQuestion = {
            ...question,
            id: Math.max(0, ...quiz.questions.map((q) => q.id || 0)) + 1,
          }
          return {
            ...quiz,
            questions: [...quiz.questions, newQuestion],
          }
        }
        return quiz
      }),
    )
  }

  const getQuizById = (id) => {
    return quizzes.find((quiz) => quiz.id === Number.parseInt(id))
  }

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        loading,
        addQuiz,
        updateQuiz,
        deleteQuiz,
        addQuestion,
        getQuizById,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error("useQuiz must be used within QuizProvider")
  }
  return context
}
