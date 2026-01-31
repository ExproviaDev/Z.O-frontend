


"use client"

import { useEffect, useMemo, useState } from "react"

export default function page() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const STUDENTS_PER_PAGE = 20

  // ===== MODAL STATE =====
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editStudent, setEditStudent] = useState(null)
  const [editForm, setEditForm] = useState({ id: "", score: "" })

  /* ===== LOAD DATA ===== */
  useEffect(() => {
    fetch("/students.json")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .finally(() => setLoading(false))
  }, [])

  /* ===== SEARCH DEBOUNCE ===== */
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1)
    }, 500)
    return () => clearTimeout(t)
  }, [search])

  /* ===== SORT ===== */
  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => b.score - a.score)
  }, [students])

  /* ===== FILTER ===== */
  const filteredStudents = useMemo(() => {
    if (!debouncedSearch.trim()) return sortedStudents
    const q = debouncedSearch.toLowerCase()
    return sortedStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.id.toString().includes(q)
    )
  }, [sortedStudents, debouncedSearch])

  /* ===== TOP 3 ===== */
  const top3 = filteredStudents.slice(0, 3)
  const tableStudents = filteredStudents.slice(3)

  /* ===== PAGINATION ===== */
  const totalPages = Math.ceil(
    tableStudents.length / STUDENTS_PER_PAGE
  )

  const startIndex = (currentPage - 1) * STUDENTS_PER_PAGE
  const paginatedStudents = tableStudents.slice(
    startIndex,
    startIndex + STUDENTS_PER_PAGE
  )

  /* ===== OPEN MODAL ===== */
  const openEditModal = (student) => {
    setEditStudent(student)
    setEditForm({
      id: student.id,
      score: student.score,
    })
    setIsModalOpen(true)
  }

  /* ===== SAVE ===== */
  const saveChanges = () => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === editStudent.id
          ? {
              ...s,
              id: Number(editForm.id),
              score: Number(editForm.score),
            }
          : s
      )
    )
    setIsModalOpen(false)
    setEditStudent(null)
  }

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🏆 Leaderboard</h1>

          
        </div>

        {/* TOP 3 */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {top3.map((s, i) => (
            <div key={s.id} className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-xl font-bold mb-2">#{i + 1}</div>
              <img
                src={s.photo_url}
                className="w-20 h-20 mx-auto rounded-full mb-3 border-4 border-green-400"
              />
              <h3 className="font-semibold">{s.name}</h3>
              <p className="text-sm text-gray-500">{s.school_name}</p>
              <div className="mt-3 font-bold text-green-600">
                {s.score} pts
              </div>
            </div>
          ))}
        </div>

<div className="pb-3">
  <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID or Name"
            className="border px-4 py-2 rounded-md w-64"
          />
</div>




        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Rank</th>
                <th className="p-3 text-left">Roll</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Score</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedStudents.map((s, index) => (
                <tr key={s.id} className="border-t">
                  {/* Rank */}
                  <td className="p-3">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-200 text-green-800 font-bold text-sm">
                      {startIndex + index + 4}
                    </span>
                  </td>

                  <td className="p-3">{s.id}</td>

                  {/* Name + Image */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.photo_url || "/placeholder.svg"}
                        className="w-10 h-10 rounded-full border-2 border-green-400 object-cover"
                      />
                      <span className="font-medium">{s.name}</span>
                    </div>
                  </td>

                  <td className="p-3 font-semibold text-green-700">
                    {s.score}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => openEditModal(s)}
                      className="text-blue-600 font-semibold"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-between items-center p-4 border-t">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Edit Student</h2>

              <label className="block text-sm font-medium mb-1">Roll</label>
              <input
                value={editForm.id}
                onChange={(e) =>
                  setEditForm({ ...editForm, id: e.target.value })
                }
                className="w-full border px-3 py-2 rounded mb-4"
              />

              <label className="block text-sm font-medium mb-1">Score</label>
              <input
                value={editForm.score}
                onChange={(e) =>
                  setEditForm({ ...editForm, score: e.target.value })
                }
                className="w-full border px-3 py-2 rounded mb-6"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={saveChanges}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
