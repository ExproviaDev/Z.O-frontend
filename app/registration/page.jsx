"use client";
import React from 'react'
import { useState } from "react";
import { useRouter } from 'next/navigation';

// Import icons (assuming you have a basic icon library or use text, I'll use simple text/icons for demonstration, but you should use a library like react-icons for production.)
// For this example, I'll use simple text icons (👁️ and 🙈), but you should use proper SVG icons.

export default function page() {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // New state to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [institution, setInstitution] = useState("");
  const [educationType, setEducationType] = useState(""); 
  const [gradeLevel, setGradeLevel] = useState(""); 
  const [currentLevel, setCurrentLevel] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const educationTypes = [
    "সাধারণ শিক্ষা (বাংলা মাধ্যম)", 
    "সাধারণ শিক্ষা (ইংরেজি ভার্সন)",
    "মাদ্রাসার শিক্ষা",
    "কারিগরি/ভোকেশনাল শিক্ষা",
    "অন্যান্য",
  ];
  const gradeLevels = [
    "পঞ্চম শ্রেণি, Grade 5, পিএসসি, প্রাথমিক, অন্যান্য",
    "ষষ্ঠ শ্রেণি, Grade 6, জেএসসি/জেডিসি, মাধ্যমিক",
    "সপ্তম শ্রেণি, Grade 7, জেএসসি/জেডিসি, মাধ্যমিক",
    "অষ্টম শ্রেণি, Grade 8, জেএসসি/জেডিসি, মাধ্যমিক",
    "নবম শ্রেণি, Grade 9, এসএসসি, দাখিল, ভোকেশনাল",
    "দশম শ্রেণি, Grade 10, এসএসসি, দাখিল, ভোকেশনাল",
    "একাদশ/দ্বাদশ শ্রেণি, O Level Candidate, আলিম ও সমমান",
    "ডিপ্লোমা, ডিইবি, ডিইপি, ডিইপি-২, ভোকেশনাল সমমান",
    "অন্যান্য (নাম উল্লেখ করুন)",
  ];
  const currentLevels = [
    "ডিগ্রি পাস, ব্যাচেলর/অনার্স/সমমান, পোস্টগ্র্যাজুয়েট, মেডিকেল, ইঞ্জিনিয়ারিং, মেরিন",
    "১ম বর্ষ / 1st Year / সেমিস্টার / ক্লাস",
    "২য় বর্ষ / 2nd Year / সেমিস্টার / ক্লাস",
    "৩য় বর্ষ / 3rd Year / সেমিস্টার / ক্লাস",
    "৪র্থ বর্ষ / 4th Year / সেমিস্টার / ক্লাস",
    "অন্যান্য / Masters / মাস্টার্স / সেমিস্টার",
    "ডাক্তার / শিক্ষক / অন্য কেউ",
  ];


  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const backendUrl = 'http://localhost:4000/api/auth/register'; 

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email, 
        password,
        name,
        phone,
        district,
        institution,
        educationType,
        gradeLevel,
        currentLevel
      }),
    });

    const data = await res.json();
    setLoading(false);

    
    if (res.ok && data.user) { 
      const successMessage = "রেজিস্ট্রেশন সফল! আপনার ইমেল যাচাইকরণের জন্য একটি মেইল পাঠানো হয়েছে।";
      alert(successMessage);
      router.push('/api/auth/login');

    } else {
      
      setError(data.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে।");
    }

  };

  return (
    <div className='hero bg-base-200 min-h-screen py-10'>
      <div className="container card bg-base-100 w-full max-w-2xl shrink-0 shadow-2xl">
        <h2 className="text-center text-3xl font-extrabold pt-6 text-primary">📚 Student Registration</h2>
        <p className="text-center text-sm mb-4 text-gray-500">Please provide accurate information for registration.</p>
        <form className='card-body space-y-6' onSubmit={handleSignup}>
          
          {/* --- Email and Password Row --- */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Email Field */}
            <div className='form-control'>
              <label className='label'><span className='label-text font-semibold'>Email *</span></label>
              <input
                type="email"
                className='input input-bordered input-sm sm:input-md'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            
            {/* Password Field with Show/Hide Toggle */}
            <div className='form-control'>
              <label className='label'><span className='label-text font-semibold'>Password *</span></label>
              {/* Added a container for the input and button */}
              <div className='relative'> 
                <input
                  // Dynamically set type based on showPassword state
                  type={showPassword ? "text" : "password"} 
                  className='input input-bordered input-sm sm:input-md w-full pr-10' // Added pr-10 for button spacing
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6 characters minimum"
                  required
                />
                <button
                  type="button" // Important: use type="button" to prevent form submission
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 px-3 flex items-center text-gray-600 hover:text-primary transition-colors'
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {/* Icon or text for toggle */}
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.988 5.5A7.962 7.962 0 0 1 12 4.5c4.755 0 8.875 2.08 10.012 5.5 1.137 3.42-2.147 6.474-5.012 8.5C14.777 18.995 13.414 19.5 12 19.5c-4.755 0-8.875-2.08-10.012-5.5-1.137-3.42 2.147-6.474 5.012-8.5Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.988 5.5A7.962 7.962 0 0 1 12 4.5c4.755 0 8.875 2.08 10.012 5.5-1.137 3.42-5.257 5.5-10.012 5.5-4.755 0-8.875-2.08-10.012-5.5Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6M9 12h6" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="divider text-lg font-bold text-secondary">Personal Details</div>
          
          {/* --- Name and Phone Row --- */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Name Field */}
            <div className='form-control'>
              <label className='label'><span className='label-text font-semibold'>Name (নাম) *</span></label>
              <input
                type="text"
                className='input input-bordered input-sm sm:input-md'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
              />
            </div>
            
            {/* Phone Field */}
            <div className='form-control'>
              <label className='label'><span className='label-text font-semibold'>Phone (ফোন) *</span></label>
              <input
                type="text"
                className='input input-bordered input-sm sm:input-md'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 017xxxxxxxx"
                required
              />
            </div>
          </div>

          {/* --- District and Institution Row --- */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* District Field */}
            <div className='form-control'>
              <label className='label'><span className='label-text font-semibold'>District (জেলা) *</span></label>
              <input
                type="text"
                className='input input-bordered input-sm sm:input-md'
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Dhaka"
                required
              />
            </div>
            
            {/* Educational Institution Field */}
            <div className='form-control'>
              <label className='label'><span className='label-text font-semibold'>Educational Institution *</span></label>
              <input
                type="text"
                className='input input-bordered input-sm sm:input-md'
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Name of your School/College/Madrasa"
                required
              />
            </div>
          </div>
          
          <div className="divider text-lg font-bold text-secondary">Academic Details</div>

          {/* --- Education Type Radio Group --- */}
          <div className='form-control'>
            <label className='label'><span className='label-text font-bold text-lg'>1. Education Type *</span></label>
            <div className='grid grid-cols-2  gap-3 mt-2'>
              {educationTypes.map((type, index) => (
                <div key={index} className="flex flex-col">
                  <input
                    type="radio"
                    name="educationType"
                    id={`edu-type-${index}`}
                    value={type}
                    checked={educationType === type}
                    onChange={(e) => setEducationType(e.target.value)}
                    required
                    className="hidden" 
                  />
                  <label 
                    htmlFor={`edu-type-${index}`} 
                    className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 text-center ${
                      educationType === type 
                        ? 'bg-primary text-primary-content border-primary shadow-md' 
                        : 'bg-base-100 hover:bg-base-200'
                    }`}
                  >
                    <span className='font-medium text-sm'>{type}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* --- Grade Level Radio Group --- */}
          <div className='form-control'>
            <label className='label'><span className='label-text font-bold text-lg'>2. From 5th to 12th Grade - Choose Your Class *</span></label>
            <div className='grid grid-cols-1 gap-3 mt-2'> 
              {gradeLevels.map((level, index) => (
                <div key={index} className="flex flex-col">
                  <input
                    type="radio"
                    name="gradeLevel"
                    id={`grade-level-${index}`}
                    value={level}
                    checked={gradeLevel === level}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    required
                    className="hidden"
                  />
                  <label 
                    htmlFor={`grade-level-${index}`} 
                    className={`p-3 border rounded-sm cursor-pointer transition-all border-gray-200 duration-200 text-center ${
                      gradeLevel === level 
                        ? 'bg-primary text-primary-content border-primary shadow-md' 
                        : 'bg-base-100 hover:bg-green-50'
                    }`}
                  >
                    <span className='font-medium text-sm'>{level}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* --- Current Level Radio Group --- */}
          <div className='form-control'>
            <label className='label'><span className='label-text font-bold text-lg'>3. In January 2026, what class are you a student of? *</span></label>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2'>
              {currentLevels.map((level, index) => (
                <div key={index} className="flex flex-col">
                  <input
                    type="radio"
                    name="currentLevel"
                    id={`current-level-${index}`}
                    value={level}
                    checked={currentLevel === level}
                    onChange={(e) => setCurrentLevel(e.target.value)}
                    required
                    className="hidden"
                  />
                  <label 
                    htmlFor={`current-level-${index}`} 
                    className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 text-center ${
                      currentLevel === level 
                        ? 'bg-primary text-primary-content border-primary shadow-md' 
                        : 'bg-base-100 hover:bg-base-200'
                    }`}
                  >
                    <span className='font-medium text-sm'>{level}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {error && <div className="text-error mt-6 text-center font-bold p-3 bg-error bg-opacity-10 border border-error rounded-lg">{error}</div>}

          <button className='btn btn-primary btn-block mt-8 text-lg' type="submit" disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
          </button>
          
          <p className="text-center text-sm mt-4">
            Already have an account? <a className="link link-hover link-primary" onClick={() => router.push('/api/auth/login')}>Log In here</a>
          </p>

        </form>
      </div>
    </div>
  );
}