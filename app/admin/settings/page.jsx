"use client"

import { useState, useEffect } from "react"
import {
  FiSettings,
  FiHome,
  FiEye,
  FiShare2,
  FiSearch,
  FiShield,
  FiSave,
  FiUpload,
  FiCheck,
  FiMenu,
  FiX,
} from "react-icons/fi"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [saving, setSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Enterprise Dashboard",
    adminEmail: "admin@company.com",
    supportEmail: "support@company.com",
    contactPhone: "+1 (555) 123-4567",
    logoPreview: null,
    faviconPreview: null,
  })

  // Homepage Control
  const [homepageSettings, setHomepageSettings] = useState({
    heroTitle: "Welcome to the Future",
    heroSubtitle: "Transform your business with cutting-edge solutions",
    heroBgImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    ctaButtonText: "Get Started",
    ctaButtonLink: "/signup",
    showHero: true,
  })

  // Appearance
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    accentColor: "#6366f1",
    animationsEnabled: true,
  })

  // Social Media
  const [socialSettings, setSocialSettings] = useState({
    facebook: "https://facebook.com/company",
    youtube: "https://youtube.com/company",
    instagram: "https://instagram.com/company",
    linkedin: "https://linkedin.com/company",
  })

  // SEO & Meta
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "Enterprise Dashboard - Admin Panel",
    metaDescription: "Manage your enterprise dashboard with powerful admin tools and analytics.",
    keywords: "enterprise, dashboard, admin, management, analytics",
    ogImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  })

  // Security
  const [securitySettings, setSecuritySettings] = useState({
    maintenanceMode: false,
    registrationEnabled: true,
    sessionTimeout: "30",
  })

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("adminSettings")
    if (stored) {
      const data = JSON.parse(stored)
      if (data.general) setGeneralSettings(data.general)
      if (data.homepage) setHomepageSettings(data.homepage)
      if (data.appearance) setAppearanceSettings(data.appearance)
      if (data.social) setSocialSettings(data.social)
      if (data.seo) setSeoSettings(data.seo)
      if (data.security) setSecuritySettings(data.security)
    }
  }, [])

  // Mark as unsaved when any setting changes
  useEffect(() => {
    setHasUnsavedChanges(true)
  }, [generalSettings, homepageSettings, appearanceSettings, socialSettings, seoSettings, securitySettings])

  const handleSave = async () => {
    setSaving(true)

    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Save to localStorage
    const allSettings = {
      general: generalSettings,
      homepage: homepageSettings,
      appearance: appearanceSettings,
      social: socialSettings,
      seo: seoSettings,
      security: securitySettings,
    }
    localStorage.setItem("adminSettings", JSON.stringify(allSettings))

    setSaving(false)
    setHasUnsavedChanges(false)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === "logo") {
          setGeneralSettings((prev) => ({ ...prev, logoPreview: reader.result }))
        } else {
          setGeneralSettings((prev) => ({ ...prev, faviconPreview: reader.result }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const tabs = [
    { id: "general", name: "General", icon: FiSettings },
    { id: "homepage", name: "Homepage", icon: FiHome },
    { id: "appearance", name: "Appearance", icon: FiEye },
    { id: "social", name: "Social Media", icon: FiShare2 },
    { id: "seo", name: "SEO & Meta", icon: FiSearch },
    { id: "security", name: "Security", icon: FiShield },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-violet-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2">
            <FiCheck className="w-5 h-5" />
            <span className="font-medium">Settings saved successfully!</span>
          </div>
        </div>
      )}

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 animate-fade-in-up">
          <div className="bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-lg">
            <span className="font-medium">You have unsaved changes</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 text-balance">Settings</h1>
          <p className="text-slate-600">Manage your dashboard configuration and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>

          {/* Left Sidebar Navigation */}
          <aside
            className={`
            fixed lg:sticky top-4 left-0 lg:left-auto
            w-72 lg:w-64 h-[calc(100vh-2rem)] lg:h-auto
            bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg
            border border-white/50 p-4
            z-40 lg:z-0
            transition-transform duration-300
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
          >
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-300 font-medium
                      ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg"
                          : "text-slate-700 hover:bg-slate-100"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>

            {/* Save Button in Sidebar */}
            <button
              onClick={handleSave}
              disabled={saving || !hasUnsavedChanges}
              className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FiSave className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 lg:p-8">
              {/* GENERAL SETTINGS */}
              {activeTab === "general" && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">General Settings</h2>
                    <p className="text-slate-600">Configure basic site information</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Site Name</label>
                      <input
                        type="text"
                        value={generalSettings.siteName}
                        onChange={(e) => setGeneralSettings((prev) => ({ ...prev, siteName: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        placeholder="Enter site name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Admin Email</label>
                      <input
                        type="email"
                        value={generalSettings.adminEmail}
                        onChange={(e) => setGeneralSettings((prev) => ({ ...prev, adminEmail: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        placeholder="admin@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Support Email</label>
                      <input
                        type="email"
                        value={generalSettings.supportEmail}
                        onChange={(e) => setGeneralSettings((prev) => ({ ...prev, supportEmail: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        placeholder="support@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Contact Phone</label>
                      <input
                        type="tel"
                        value={generalSettings.contactPhone}
                        onChange={(e) => setGeneralSettings((prev) => ({ ...prev, contactPhone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Logo Upload</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-indigo-500 transition-all">
                        {generalSettings.logoPreview ? (
                          <img
                            src={generalSettings.logoPreview || "/placeholder.svg"}
                            alt="Logo preview"
                            className="max-h-20 mx-auto mb-3"
                          />
                        ) : (
                          <FiUpload className="w-10 h-10 mx-auto mb-3 text-slate-400" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "logo")}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="cursor-pointer text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Choose Logo File
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Favicon Upload</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-indigo-500 transition-all">
                        {generalSettings.faviconPreview ? (
                          <img
                            src={generalSettings.faviconPreview || "/placeholder.svg"}
                            alt="Favicon preview"
                            className="max-h-20 mx-auto mb-3"
                          />
                        ) : (
                          <FiUpload className="w-10 h-10 mx-auto mb-3 text-slate-400" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "favicon")}
                          className="hidden"
                          id="favicon-upload"
                        />
                        <label
                          htmlFor="favicon-upload"
                          className="cursor-pointer text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Choose Favicon File
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* HOMEPAGE CONTROL */}
              {activeTab === "homepage" && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Homepage Control</h2>
                    <p className="text-slate-600">Customize your homepage hero section</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Hero Title</label>
                      <input
                        type="text"
                        value={homepageSettings.heroTitle}
                        onChange={(e) => setHomepageSettings((prev) => ({ ...prev, heroTitle: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Hero Subtitle</label>
                      <textarea
                        value={homepageSettings.heroSubtitle}
                        onChange={(e) => setHomepageSettings((prev) => ({ ...prev, heroSubtitle: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Hero Background Image URL</label>
                      <input
                        type="url"
                        value={homepageSettings.heroBgImage}
                        onChange={(e) => setHomepageSettings((prev) => ({ ...prev, heroBgImage: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">CTA Button Text</label>
                        <input
                          type="text"
                          value={homepageSettings.ctaButtonText}
                          onChange={(e) => setHomepageSettings((prev) => ({ ...prev, ctaButtonText: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">CTA Button Link</label>
                        <input
                          type="text"
                          value={homepageSettings.ctaButtonLink}
                          onChange={(e) => setHomepageSettings((prev) => ({ ...prev, ctaButtonLink: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => setHomepageSettings((prev) => ({ ...prev, showHero: !prev.showHero }))}
                        className={`
                          relative w-14 h-7 rounded-full transition-all duration-300
                          ${homepageSettings.showHero ? "bg-indigo-500" : "bg-slate-300"}
                        `}
                      >
                        <span
                          className={`
                            absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full
                            transition-transform duration-300
                            ${homepageSettings.showHero ? "translate-x-7" : "translate-x-0"}
                          `}
                        />
                      </button>
                      <span className="text-sm font-medium text-slate-700">
                        {homepageSettings.showHero ? "Hero Section Visible" : "Hero Section Hidden"}
                      </span>
                    </div>
                  </div>

                  {/* Live Preview Card */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Live Preview</h3>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                      <div
                        className="h-64 bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${homepageSettings.heroBgImage})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-violet-900/80 flex items-center justify-center">
                          <div className="text-center text-white px-6">
                            <h2 className="text-3xl font-bold mb-3 text-balance">{homepageSettings.heroTitle}</h2>
                            <p className="text-lg mb-6 text-balance">{homepageSettings.heroSubtitle}</p>
                            <button className="px-6 py-3 bg-white text-indigo-900 rounded-xl font-medium hover:bg-slate-100 transition-all">
                              {homepageSettings.ctaButtonText}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* APPEARANCE */}
              {activeTab === "appearance" && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Appearance</h2>
                    <p className="text-slate-600">Customize the look and feel</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Theme</label>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setAppearanceSettings((prev) => ({ ...prev, theme: "light" }))}
                          className={`
                            flex-1 p-6 rounded-xl border-2 transition-all
                            ${
                              appearanceSettings.theme === "light"
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-slate-300 bg-white hover:border-slate-400"
                            }
                          `}
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 rounded-lg bg-white border-2 border-slate-300 mx-auto mb-2" />
                            <span className="font-medium">Light</span>
                          </div>
                        </button>

                        <button
                          onClick={() => setAppearanceSettings((prev) => ({ ...prev, theme: "dark" }))}
                          className={`
                            flex-1 p-6 rounded-xl border-2 transition-all
                            ${
                              appearanceSettings.theme === "dark"
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-slate-300 bg-white hover:border-slate-400"
                            }
                          `}
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 rounded-lg bg-slate-800 border-2 border-slate-600 mx-auto mb-2" />
                            <span className="font-medium">Dark</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Accent Color</label>
                      <div className="flex gap-3">
                        {["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b"].map((color) => (
                          <button
                            key={color}
                            onClick={() => setAppearanceSettings((prev) => ({ ...prev, accentColor: color }))}
                            className={`
                              w-12 h-12 rounded-xl transition-all
                              ${
                                appearanceSettings.accentColor === color
                                  ? "ring-4 ring-offset-2 ring-slate-400 scale-110"
                                  : "hover:scale-105"
                              }
                            `}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setAppearanceSettings((prev) => ({ ...prev, animationsEnabled: !prev.animationsEnabled }))
                        }
                        className={`
                          relative w-14 h-7 rounded-full transition-all duration-300
                          ${appearanceSettings.animationsEnabled ? "bg-indigo-500" : "bg-slate-300"}
                        `}
                      >
                        <span
                          className={`
                            absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full
                            transition-transform duration-300
                            ${appearanceSettings.animationsEnabled ? "translate-x-7" : "translate-x-0"}
                          `}
                        />
                      </button>
                      <span className="text-sm font-medium text-slate-700">
                        Animations {appearanceSettings.animationsEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </div>

                  {/* Theme Preview Card */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Preview</h3>
                    <div
                      className={`
                        p-6 rounded-2xl border-2 transition-all
                        ${
                          appearanceSettings.theme === "dark"
                            ? "bg-slate-800 border-slate-700"
                            : "bg-white border-slate-200"
                        }
                      `}
                    >
                      <h4
                        className={`text-xl font-bold mb-2 ${appearanceSettings.theme === "dark" ? "text-white" : "text-slate-900"}`}
                      >
                        Sample Card
                      </h4>
                      <p
                        className={`mb-4 ${appearanceSettings.theme === "dark" ? "text-slate-300" : "text-slate-600"}`}
                      >
                        This is how your content will look with the selected theme.
                      </p>
                      <button
                        className="px-4 py-2 rounded-lg text-white font-medium"
                        style={{ backgroundColor: appearanceSettings.accentColor }}
                      >
                        Accent Button
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SOCIAL MEDIA */}
              {activeTab === "social" && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Social Media</h2>
                    <p className="text-slate-600">Connect your social media profiles</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Facebook URL</label>
                      <input
                        type="url"
                        value={socialSettings.facebook}
                        onChange={(e) => setSocialSettings((prev) => ({ ...prev, facebook: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">YouTube URL</label>
                      <input
                        type="url"
                        value={socialSettings.youtube}
                        onChange={(e) => setSocialSettings((prev) => ({ ...prev, youtube: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        placeholder="https://youtube.com/yourchannel"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Instagram URL</label>
                      <input
                        type="url"
                        value={socialSettings.instagram}
                        onChange={(e) => setSocialSettings((prev) => ({ ...prev, instagram: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        placeholder="https://instagram.com/yourprofile"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn URL</label>
                      <input
                        type="url"
                        value={socialSettings.linkedin}
                        onChange={(e) => setSocialSettings((prev) => ({ ...prev, linkedin: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        placeholder="https://linkedin.com/company/yourcompany"
                      />
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-200">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-2">Social Links Preview</h3>
                    <p className="text-indigo-700 text-sm">
                      Your social media links are configured and ready to display.
                    </p>
                  </div>
                </div>
              )}

              {/* SEO & META */}
              {activeTab === "seo" && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">SEO & Meta</h2>
                    <p className="text-slate-600">Optimize for search engines</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Meta Title</label>
                      <input
                        type="text"
                        value={seoSettings.metaTitle}
                        onChange={(e) => setSeoSettings((prev) => ({ ...prev, metaTitle: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        maxLength={60}
                      />
                      <p className="text-xs text-slate-500 mt-1">{seoSettings.metaTitle.length}/60 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Meta Description</label>
                      <textarea
                        value={seoSettings.metaDescription}
                        onChange={(e) => setSeoSettings((prev) => ({ ...prev, metaDescription: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
                        maxLength={160}
                      />
                      <p className="text-xs text-slate-500 mt-1">{seoSettings.metaDescription.length}/160 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Keywords (comma separated)
                      </label>
                      <input
                        type="text"
                        value={seoSettings.keywords}
                        onChange={(e) => setSeoSettings((prev) => ({ ...prev, keywords: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">OG Image URL</label>
                      <input
                        type="url"
                        value={seoSettings.ogImage}
                        onChange={(e) => setSeoSettings((prev) => ({ ...prev, ogImage: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* SEO Preview (Google-style) */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Search Preview</h3>
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <div className="text-sm text-emerald-700 mb-1">www.yoursite.com</div>
                      <h4 className="text-xl text-indigo-600 hover:underline cursor-pointer mb-2">
                        {seoSettings.metaTitle}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{seoSettings.metaDescription}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SECURITY & ACCESS */}
              {activeTab === "security" && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Security & Access</h2>
                    <p className="text-slate-600">Manage security settings</p>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <FiShield className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-900 mb-1">Admin Access Warning</h4>
                          <p className="text-sm text-amber-700">
                            These settings affect site availability and user access. Use with caution.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
                      <div>
                        <h4 className="font-semibold text-slate-900">Maintenance Mode</h4>
                        <p className="text-sm text-slate-600">Temporarily disable public access</p>
                      </div>
                      <button
                        onClick={() =>
                          setSecuritySettings((prev) => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))
                        }
                        className={`
                          relative w-14 h-7 rounded-full transition-all duration-300
                          ${securitySettings.maintenanceMode ? "bg-amber-500" : "bg-slate-300"}
                        `}
                      >
                        <span
                          className={`
                            absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full
                            transition-transform duration-300
                            ${securitySettings.maintenanceMode ? "translate-x-7" : "translate-x-0"}
                          `}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
                      <div>
                        <h4 className="font-semibold text-slate-900">User Registration</h4>
                        <p className="text-sm text-slate-600">Allow new users to sign up</p>
                      </div>
                      <button
                        onClick={() =>
                          setSecuritySettings((prev) => ({ ...prev, registrationEnabled: !prev.registrationEnabled }))
                        }
                        className={`
                          relative w-14 h-7 rounded-full transition-all duration-300
                          ${securitySettings.registrationEnabled ? "bg-indigo-500" : "bg-slate-300"}
                        `}
                      >
                        <span
                          className={`
                            absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full
                            transition-transform duration-300
                            ${securitySettings.registrationEnabled ? "translate-x-7" : "translate-x-0"}
                          `}
                        />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Session Timeout (minutes)</label>
                      <select
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings((prev) => ({ ...prev, sessionTimeout: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="1440">24 hours</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
