
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
    <div className='bg-black min-h-lvh text-white flex items-center justify-center text-7xl'>
      
    </div>
  )
}
