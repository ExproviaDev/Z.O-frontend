


"use client"

import { useState } from "react"
import { FiX } from "react-icons/fi"

const CATEGORIES = [
  "Bangla Medium (Bangla & English Version)",
  "English Medium",
  "Arabic Medium",
  "O Level",
  "A Level",
]

const GRADES = [
  "grade1","grade2","grade3","grade4","grade5","grade6",
  "grade7","grade8","grade9","grade10","grade11","grade12",
]

export default function QuizModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    quizName: "",
    description: "",
    date: "",
    category: CATEGORIES[0],
    grade: GRADES[0],
    status: "Draft",
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({
      quizName: "",
      description: "",
      date: "",
      category: CATEGORIES[0],
      grade: GRADES[0],
      status: "Draft",
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Add New Quiz
            </h2>
            <p className="text-sm text-gray-500">
              Create and configure a new quiz
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 max-h-[75vh] overflow-y-auto"
        >
          {/* Quiz Name */}
          <Input
            label="Quiz Name"
            required
            value={formData.quizName}
            onChange={(e) =>
              setFormData({ ...formData, quizName: e.target.value })
            }
          />

          {/* Description */}
          <Textarea
            label="Description"
            rows={3}
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* Date */}
          <Input
            label="Date"
            type="date"
            required
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
          />

          {/* Category */}
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            options={CATEGORIES}
          />

          {/* Grade */}
          <Select
            label="Grade"
            value={formData.grade}
            onChange={(e) =>
              setFormData({ ...formData, grade: e.target.value })
            }
            options={GRADES}
          />

          {/* Footer Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-1/2 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-1/2 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
            >
              Add Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ================= Reusable UI Fields ================= */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block mb-1.5 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block mb-1.5 text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm resize-none
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block mb-1.5 text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        {...props}
        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
