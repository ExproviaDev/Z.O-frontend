"use client"

import { useState } from "react"
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaImage,
} from "react-icons/fa"

export default function EventManagement() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Summit 2025",
      description: "Annual technology conference",
      fullDescription:
        "Join us for the biggest tech event of the year featuring keynote speakers, workshops, and networking opportunities.",
      banner: "/tech-conference-banner.png",
      regDeadline: "2025-01-15",
      startDate: "2025-02-01",
      endDate: "2025-02-03",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Design Workshop",
      description: "Interactive design thinking workshop",
      fullDescription: "Learn the latest design trends and methodologies in this hands-on workshop.",
      banner: "/design-workshop-banner.jpg",
      regDeadline: "2024-12-20",
      startDate: "2024-12-15",
      endDate: "2024-12-15",
      status: "ongoing",
    },
    {
      id: 3,
      title: "Startup Pitch Day",
      description: "Pitch your startup to investors",
      fullDescription: "Connect with potential investors and showcase your innovative startup ideas.",
      banner: "/startup-pitch-event-banner.jpg",
      regDeadline: "2024-11-30",
      startDate: "2024-11-20",
      endDate: "2024-11-20",
      status: "completed",
    },
  ])

  const [timeline, setTimeline] = useState([
    { id: 1, date: "2025-01-15", title: "Registration Opens", description: "Early bird registration begins" },
    { id: 2, date: "2025-01-20", title: "Speaker Announcement", description: "Keynote speakers revealed" },
    { id: 3, date: "2025-01-25", title: "Registration Closes", description: "Final day to register" },
  ])

  const [jury, setJury] = useState([
    {
      id: 1,
      name: "Dr. Sarah Chen",
      designation: "Chief Technology Officer",
      image: "https://i.pravatar.cc/150?u=sarah",
      eventId: 1,
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      designation: "Design Director",
      image: "https://i.pravatar.cc/150?u=michael",
      eventId: 2,
    },
  ])

  const [showEventModal, setShowEventModal] = useState(false)
  const [showJuryModal, setShowJuryModal] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [newPhase, setNewPhase] = useState({ date: "", title: "", description: "" })

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    fullDescription: "",
    banner: "",
    regDeadline: "",
    startDate: "",
    endDate: "",
    status: "upcoming",
  })

  const [juryForm, setJuryForm] = useState({
    name: "",
    designation: "",
    image: "",
    eventId: "",
  })

  // Light theme status colors
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-600 border-blue-200",
    ongoing: "bg-green-100 text-green-600 border-green-200",
    completed: "bg-gray-100 text-gray-600 border-gray-200",
  }

  const stats = {
    total: events.length,
    upcoming: events.filter((e) => e.status === "upcoming").length,
    ongoing: events.filter((e) => e.status === "ongoing").length,
    completed: events.filter((e) => e.status === "completed").length,
  }

  const openCreateModal = () => {
    setCurrentEvent(null)
    setEventForm({
      title: "",
      description: "",
      fullDescription: "",
      banner: "",
      regDeadline: "",
      startDate: "",
      endDate: "",
      status: "upcoming",
    })
    setShowEventModal(true)
  }

  const openEditModal = (event) => {
    setCurrentEvent(event)
    setEventForm({
      title: event.title,
      description: event.description,
      fullDescription: event.fullDescription,
      banner: event.banner,
      regDeadline: event.regDeadline,
      startDate: event.startDate,
      endDate: event.endDate,
      status: event.status,
    })
    setShowEventModal(true)
  }

  const saveEvent = () => {
    if (currentEvent) {
      setEvents(events.map((e) => (e.id === currentEvent.id ? { ...currentEvent, ...eventForm } : e)))
    } else {
      setEvents([...events, { id: Date.now(), ...eventForm }])
    }
    setShowEventModal(false)
  }

  const deleteEvent = (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((e) => e.id !== id))
    }
  }

  const addPhase = () => {
    if (newPhase.date && newPhase.title) {
      setTimeline([...timeline, { id: Date.now(), ...newPhase }])
      setNewPhase({ date: "", title: "", description: "" })
    }
  }

  const removePhase = (id) => {
    setTimeline(timeline.filter((p) => p.id !== id))
  }

  const addJury = () => {
    if (juryForm.name && juryForm.designation && juryForm.eventId) {
      setJury([...jury, { id: Date.now(), ...juryForm }])
      setShowJuryModal(false)
      setJuryForm({ name: "", designation: "", image: "", eventId: "" })
    }
  }

  const removeJury = (id) => {
    if (confirm("Are you sure you want to remove this jury member?")) {
      setJury(jury.filter((j) => j.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Sticky Removed */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Event Management
              </h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Create, manage and monitor events</p>
            </div>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-md transition-all duration-200 hover:scale-105"
            >
              <FaPlus className="text-sm" />
              <span>Create Event</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <FaCalendarAlt className="text-2xl text-indigo-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Events</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FaClock className="text-2xl text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Upcoming</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.upcoming}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <FaCalendarCheck className="text-2xl text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Ongoing</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.ongoing}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <FaCheckCircle className="text-2xl text-gray-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.completed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Events</h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Event</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Date Range</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={event.banner || "https://via.placeholder.com/150"}
                          alt={event.title}
                          className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                        />
                        <div>
                          <p className="font-bold text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${statusColors[event.status]}`}
                      >
                        {event.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-700 font-medium">{event.startDate}</p>
                      <p className="text-xs text-gray-400">to {event.endDate}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                          <FaEye />
                        </button>
                        <button
                          onClick={() => openEditModal(event)}
                          className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600 transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <img src={event.banner || "https://via.placeholder.com/150"} alt={event.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{event.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${statusColors[event.status]}`}>
                      {event.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{event.description}</p>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-bold text-gray-700">View</button>
                    <button onClick={() => openEditModal(event)} className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-xs font-bold text-indigo-700">Edit</button>
                    <button onClick={() => deleteEvent(event.id)} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600"><FaTrash /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Manager */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Timeline</h2>
          <div className="space-y-4">
            {timeline.map((phase, index) => (
              <div key={phase.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                  {index < timeline.length - 1 && <div className="w-0.5 h-full bg-gray-100 my-1"></div>}
                </div>
                <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-4 flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-indigo-600 uppercase mb-1">{phase.date}</p>
                    <h3 className="font-bold text-gray-900">{phase.title}</h3>
                    <p className="text-sm text-gray-500">{phase.description}</p>
                  </div>
                  <button onClick={() => removePhase(phase.id)} className="text-gray-400 hover:text-red-500"><FaTimes /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 border border-dashed border-gray-200 rounded-xl">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input type="date" value={newPhase.date} onChange={(e) => setNewPhase({ ...newPhase, date: e.target.value })} className="p-2 border rounded-lg text-sm" />
                <input type="text" placeholder="Phase title" value={newPhase.title} onChange={(e) => setNewPhase({ ...newPhase, title: e.target.value })} className="p-2 border rounded-lg text-sm" />
             </div>
             <textarea placeholder="Description" value={newPhase.description} onChange={(e) => setNewPhase({ ...newPhase, description: e.target.value })} className="w-full p-2 border rounded-lg text-sm mb-3" rows="2"></textarea>
             <button onClick={addPhase} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">Add Phase</button>
          </div>
        </div>

        {/* Jury Management */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Jury & Guests</h2>
            <button onClick={() => setShowJuryModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm">
              <FaPlus /> Add Jury
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jury.map((member) => (
              <div key={member.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:border-indigo-200 transition-colors">
                <img src={member.image} alt={member.name} className="w-14 h-14 rounded-full object-cover bg-gray-50" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-xs text-gray-500">{member.designation}</p>
                </div>
                <button onClick={() => removeJury(member.id)} className="text-gray-300 hover:text-red-500"><FaTrash size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals are styled as Light Theme below */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">{currentEvent ? "Edit Event" : "Create New Event"}</h2>
              <button onClick={() => setShowEventModal(false)} className="text-gray-400 hover:text-black"><FaTimes size={20}/></button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                    <label className="block font-semibold">Event Title</label>
                    <input type="text" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} className="w-full p-2 border rounded-lg focus:ring-2 ring-indigo-100 outline-none" placeholder="Title" />
                    <label className="block font-semibold">Status</label>
                    <select value={eventForm.status} onChange={(e) => setEventForm({ ...eventForm, status: e.target.value })} className="w-full p-2 border rounded-lg">
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="space-y-3">
                    <label className="block font-semibold">Banner Image URL</label>
                    <input type="text" value={eventForm.banner} onChange={(e) => setEventForm({ ...eventForm, banner: e.target.value })} className="w-full p-2 border rounded-lg" placeholder="https://..." />
                    <label className="block font-semibold">Start Date</label>
                    <input type="date" value={eventForm.startDate} onChange={(e) => setEventForm({ ...eventForm, startDate: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
                <div className="md:col-span-2">
                    <label className="block font-semibold mb-2">Description</label>
                    <textarea rows="3" value={eventForm.fullDescription} onChange={(e) => setEventForm({ ...eventForm, fullDescription: e.target.value })} className="w-full p-2 border rounded-lg" placeholder="Full details..."></textarea>
                </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
                <button onClick={() => setShowEventModal(false)} className="px-4 py-2 text-gray-600 font-medium">Cancel</button>
                <button onClick={saveEvent} className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">Save Event</button>
            </div>
          </div>
        </div>
      )}

      {/* Jury Modal */}
      {showJuryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Add Jury Member</h2>
            <div className="space-y-3 text-sm">
                <input type="text" placeholder="Name" value={juryForm.name} onChange={(e) => setJuryForm({ ...juryForm, name: e.target.value })} className="w-full p-2 border rounded-lg" />
                <input type="text" placeholder="Designation" value={juryForm.designation} onChange={(e) => setJuryForm({ ...juryForm, designation: e.target.value })} className="w-full p-2 border rounded-lg" />
                <input type="text" placeholder="Image URL" value={juryForm.image} onChange={(e) => setJuryForm({ ...juryForm, image: e.target.value })} className="w-full p-2 border rounded-lg" />
                <select value={juryForm.eventId} onChange={(e) => setJuryForm({ ...juryForm, eventId: e.target.value })} className="w-full p-2 border rounded-lg">
                    <option value="">Link to Event</option>
                    {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
                </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowJuryModal(false)} className="px-4 py-2 text-gray-500">Cancel</button>
                <button onClick={addJury} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold">Add Member</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}