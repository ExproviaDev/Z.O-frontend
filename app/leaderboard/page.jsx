

"use client"

import { useState, useEffect, useMemo } from "react"

import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
// import { FaCrown, FaMedal } from "react-icons/fa"
// import { FaCrown, FaMedal, FaLeaf } from "react-icons/fa"
import { FaCrown, FaMedal } from "react-icons/fa"



import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export default function LiveLeaderboard() {
  // State management
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const studentsPerPage = 12

  // Load students data
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await fetch("/students.json")
        const data = await response.json()
        setStudents(data)
      } catch (error) {
        console.error("Error loading students:", error)
      } finally {
        setLoading(false)
      }
    }
    loadStudents()
  }, [])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setCurrentPage(1)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Reset page on district change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedDistrict])

  // District list
  const districts = useMemo(() => {
    return Array.from(
      new Set(students.map((student) => student.district))
    ).sort()
  }, [students])

  // Sort students
  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => b.score - a.score)
  }, [students])

  // Filter students
  const filteredStudents = useMemo(() => {
    let filtered = sortedStudents

    if (selectedDistrict !== "all") {
      filtered = filtered.filter(
        (student) => student.district === selectedDistrict
      )
    }

    if (debouncedSearchTerm.trim()) {
      const q = debouncedSearchTerm.toLowerCase()
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(q) ||
          student.id.toString().includes(q)
      )
    }

    return filtered
  }, [sortedStudents, selectedDistrict, debouncedSearchTerm])

  // Top 3
  const top3Students = useMemo(() => {
    return sortedStudents.slice(0, 3)
  }, [sortedStudents])

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)
  const startIndex = (currentPage - 1) * studentsPerPage
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  )

  // Rank
  const getStudentRank = (id) => {
    return sortedStudents.findIndex((s) => s.id === id) + 1
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-xl font-semibold text-gray-700">
          Loading leaderboard...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🏆 Live Leaderboard
          </h1>
          <p className="text-gray-600 text-lg">
            Top performers across all districts
          </p>
        </div>
{/* ================= TOP 3 CHAMPIONS ================= */}
<div className="mb-20 px-4">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-12 text-green-700 tracking-tight">
    🏆 Top 3 Champions
  </h2>

  <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
    {top3Students.map((student, index) => {
      const styles = [
        {
          badge: "1st",
          icon: <FaCrown className="text-yellow-500 text-4xl drop-shadow" />,
          ring: "ring-4 ring-yellow-400",
          bg: "bg-gradient-to-br from-green-50 via-white to-green-100",
          scale: "md:scale-105",
        },
        {
          badge: "2nd",
          icon: <FaMedal className="text-gray-400 text-3xl" />,
          ring: "ring-2 ring-green-300",
          bg: "bg-white",
          scale: "",
        },
        {
          badge: "3rd",
          icon: <FaMedal className="text-amber-600 text-3xl" />,
          ring: "ring-2 ring-green-300",
          bg: "bg-white",
          scale: "",
        },
      ][index]

      return (
        <Card
          key={student.id}
          className={`
            relative p-6 sm:p-7 text-center rounded-2xl
            ${styles.bg} ${styles.scale}
            shadow-md hover:shadow-2xl
            transition-all duration-300 hover:-translate-y-2
          `}
        >
          {/* Rank Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 
            bg-green-700 text-white px-5 py-1 rounded-full 
            text-xs sm:text-sm font-bold shadow-md">
            {styles.badge}
          </div>

          {/* Icon */}
          <div className="flex justify-center mt-6 mb-4">
            {styles.icon}
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <img
              src={student.photo_url || "/placeholder.svg"}
              alt={student.name}
              className={`
                w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover
                border-4 border-white shadow-md ${styles.ring}
              `}
            />
          </div>

          {/* Info */}
          <h3 className="font-bold text-lg sm:text-xl text-gray-800">
            {student.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {student.school_name}
          </p>
          <p className="text-xs text-gray-500 mb-4">
            {student.district}
          </p>

          {/* Score */}
          <div className="inline-flex items-center justify-center px-5 py-2 rounded-full 
            bg-green-600 text-white font-semibold text-base sm:text-lg shadow">
            {student.score} pts
          </div>
        </Card>
      )
    })}
  </div>
</div>



<Card className="p-4 md:p-6 shadow-lg bg-white">

  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-2xl font-bold text-gray-800">All Students</h3>
      <p className="text-sm text-gray-500">
        Showing {filteredStudents.length} students
      </p>
    </div>

    {/* Search (right & small) */}
    <div className="w-56">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search name / roll"
        className="h-9 text-sm"
      />
    </div>
  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full min-w-[700px] border-collapse">
      <thead>
        <tr className="border-b text-sm text-gray-600">
          <th className="px-4 py-3 text-left">Rank</th>
          <th className="px-4 py-3 text-left">Roll</th>
          <th className="px-4 py-3 text-left">Name</th>
          <th className="px-4 py-3 text-left">School</th>
          <th className="px-4 py-3 text-left">District</th>
          <th className="px-4 py-3 text-left">Score</th>
        </tr>
      </thead>

      <tbody>
        {paginatedStudents.map((s) => {
          const rank = getStudentRank(s.id)

          return (
            <tr
              key={s.id}
              className="border-b hover:bg-gray-50 transition"
            >
              {/* Rank */}
              <td className="px-4 py-4">
                <span className="inline-flex items-center justify-center 
                  w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                  {rank}
                </span>
              </td>

              {/* Roll */}
              <td className="px-4 py-4 text-gray-700">
                {s.id}
              </td>

              {/* Name + Avatar */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={s.photo_url || "/placeholder.svg"}
                    alt={s.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span className="font-medium text-gray-800">
                    {s.name}
                  </span>
                </div>
              </td>

              {/* School */}
              <td className="px-4 py-4 text-gray-600">
                {s.school_name}
              </td>

              {/* District */}
              <td className="px-4 py-4 text-gray-600">
                {s.district}
              </td>

              {/* Score */}
              <td className="px-4 py-4">
                <span className="inline-block px-3 py-1 rounded-full 
                  bg-green-100 text-green-700 font-semibold text-sm">
                  {s.score}
                </span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  <div className="flex justify-between items-center mt-6">
    <Button
      variant="outline"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
    >
      Previous
    </Button>

    <Button
      variant="outline"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => p + 1)}
    >
      Next
    </Button>
  </div>

</Card>

      </div>
    </div>
  )
}
