

"use client"

import { FiSearch } from "react-icons/fi"

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search quiz by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 py-2 border border-border rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
      />
    </div>
  )
}
