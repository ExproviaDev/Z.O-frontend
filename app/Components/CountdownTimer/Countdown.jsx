import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({});
  const targetDate = new Date("2020-10-29T00:00:00");

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    setTimeLeft(timeLeft);
  };

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-green-500 p-6 rounded-lg shadow-lg flex flex-col lg:flex-row items-center justify-between">
      <div className="text-center lg:text-left text-white font-bold text-2xl mb-4 lg:mb-0">
        East Dhaka
        <div className="text-xs mt-2">22 Street Dhaka</div>
        <div className="text-xs mt-2">23 October - 29 October 2020</div>
      </div>
      <div className="flex space-x-4 mt-4 lg:mt-0">
        <div className="countdown-box bg-yellow-500 p-4 rounded-lg flex flex-col items-center justify-center text-white">
          <div className="text-4xl font-semibold">{timeLeft.days || 0}</div>
          <div>Days</div>
        </div>
        <div className="countdown-box bg-green-500 p-4 rounded-lg flex flex-col items-center justify-center text-white">
          <div className="text-4xl font-semibold">{timeLeft.hours || 0}</div>
          <div>Hours</div>
        </div>
        <div className="countdown-box bg-yellow-500 p-4 rounded-lg flex flex-col items-center justify-center text-white">
          <div className="text-4xl font-semibold">{timeLeft.minutes || 0}</div>
          <div>Minutes</div>
        </div>
        <div className="countdown-box bg-green-500 p-4 rounded-lg flex flex-col items-center justify-center text-white">
          <div className="text-4xl font-semibold">{timeLeft.seconds || 0}</div>
          <div>Seconds</div>
        </div>
      </div>
    </div>
  );
}
