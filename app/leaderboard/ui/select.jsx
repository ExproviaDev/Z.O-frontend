import React, { useState } from "react"

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          value,
          onValueChange,
          open,
          setOpen,
        })
      )}
    </div>
  )
}

export function SelectTrigger({ children, setOpen }) {
  return (
    <div
      onClick={() => setOpen((o) => !o)}
      className="border rounded-lg px-3 py-2 cursor-pointer bg-white"
    >
      {children}
    </div>
  )
}

export function SelectValue({ placeholder, value }) {
  return <span>{value || placeholder}</span>
}

export function SelectContent({ children, open }) {
  if (!open) return null
  return (
    <div className="absolute z-10 mt-2 w-full rounded-lg border bg-white shadow">
      {children}
    </div>
  )
}

export function SelectItem({ value, children, onValueChange, setOpen }) {
  return (
    <div
      onClick={() => {
        onValueChange(value)
        setOpen(false)
      }}
      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
    >
      {children}
    </div>
  )
}
