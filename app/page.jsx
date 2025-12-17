// "use client";
// import React, { useState, useEffect } from "react";

// export default function Page() {
//   const targetDate = new Date();
//   targetDate.setMonth(targetDate.getMonth() + 1);

//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       const difference = targetDate - now;

//       if (difference <= 0) {
//         clearInterval(interval);
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//         return;
//       }

//       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//       const hours = Math.floor(
//         (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//       setTimeLeft({ days, hours, minutes, seconds });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex items-center justify-center h-screen bg-black">
//       <div className="text-center text-white">
//         <h1 className="text-4xl font-bold text-blue-600">Zero Olympiad</h1>
//         <p className="mt-4 text-xl">Coming Soon!</p>
//         <p className="mt-2 text-lg">Get ready for something amazing!</p>

//         <div className="mt-8 text-3xl font-mono">
//           <p>
//             {String(timeLeft.days).padStart(2, "0")} days{" "}
//             {String(timeLeft.hours).padStart(2, "0")} hours{" "}
//             {String(timeLeft.minutes).padStart(2, "0")} minutes{" "}
//             {String(timeLeft.seconds).padStart(2, "0")} seconds{" "}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react'
import Home2 from './Components/Home2/Home2'

export default function page() {
  return (
    <div className=''>
      <Home2></Home2>
    </div>
  )
}



