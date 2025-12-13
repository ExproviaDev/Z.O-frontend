
"use client";
import React from 'react'
import { useState } from "react";
export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const backendUrl = 'http://localhost:4000/api/auth/register'; 

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    
    if (res.ok && data.user) { 
      console.log("Registration successful! Please check your email for verification.");
    } else {
      
      setError(data.message || "Registration failed due to an unknown error.");
    }

    setLoading(false);
  };

  return (
    <div className='hero bg-base-200 min-h-screen'>
    <div className="container card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h2 className="text-center">Sign Up</h2>
      <form className='card-body' onSubmit={handleSignup}>
        <div>
          <label className='label'>Email</label>
          <input
            type="email"
            className='input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className='label'>Password</label>
          <input
          className='input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button className='btn btn-neutral mt-4' type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
    </div>
  );
}
