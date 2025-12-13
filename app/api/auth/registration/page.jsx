"use client";
import React from 'react'
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
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
    "ডিগ্রি পাস, ব্যাচেলর/অনার্স/সমমান, পোস্টগ্র্যাজুয়েট, মেডিকেল, ইঞ্জিনিয়ারিং, মেরিন",
    "১ম বর্ষ / 1st Year / সেমিস্টার / ক্লাস",
    "২য় বর্ষ / 2nd Year / সেমিস্টার / ক্লাস",
    "৩য় বর্ষ / 3rd Year / সেমিস্টার / ক্লাস",
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
      
      setError(data.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে।");
    }

  };

  return (
    <div className='hero bg-base-200 min-h-screen py-10'>
      <div className="container card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
        <h2 className="text-center text-2xl font-bold pt-6">Sign Up</h2>
        <form className='card-body' onSubmit={handleSignup}>
          <div className='form-control'>
            <label className='label'><span className='label-text'>Email *</span></label>
            <input
              type="email"
              className='input input-bordered'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'><span className='label-text'>Name (নাম) *</span></label>
            <input
              type="text"
              className='input input-bordered'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your answer"
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'><span className='label-text'>Phone (ফোন) *</span></label>
            <input
              type="text"
              className='input input-bordered'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your answer"
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'><span className='label-text'>District (জেলা) *</span></label>
            <input
              type="text"
              className='input input-bordered'
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Your answer"
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'><span className='label-text'>Educational Institution *</span></label>
            <input
              type="text"
              className='input input-bordered'
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Your answer"
              required
            />
          </div>
          <div className='form-control mt-4'>
            <label className='label'><span className='label-text font-bold'>Education Type *</span></label>
            <div className='space-y-2'>
              {educationTypes.map((type, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="educationType"
                    className="radio radio-primary"
                    value={type}
                    checked={educationType === type}
                    onChange={(e) => setEducationType(e.target.value)}
                    required
                  />
                  <span className='ml-3 label-text'>{type}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='form-control mt-4'>
            <label className='label'><span className='label-text font-bold'>From 5th to 12th Grade - Choose Your Class *</span></label>
            <div className='space-y-2'>
              {gradeLevels.map((level, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="gradeLevel"
                    className="radio radio-primary"
                    value={level}
                    checked={gradeLevel === level}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    required
                  />
                  <span className='ml-3 label-text'>{level}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='form-control mt-4'>
            <label className='label'><span className='label-text font-bold'>In January 2026, what class are you a student of? *</span></label>
            <div className='space-y-2'>
              {currentLevels.map((level, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="currentLevel"
                    className="radio radio-primary"
                    value={level}
                    checked={currentLevel === level}
                    onChange={(e) => setCurrentLevel(e.target.value)}
                    required
                  />
                  <span className='ml-3 label-text'>{level}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='form-control'>
            <label className='label'><span className='label-text'>Password *</span></label>
            <input
              className='input input-bordered'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password (6 characters minimum)"
              required
            />
          </div>
          {error && <div className="text-red-500 mt-4 text-center font-bold">{error}</div>}

          <button className='btn btn-neutral mt-4' type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}