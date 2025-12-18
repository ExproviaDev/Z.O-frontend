// components/CountdownTimer.js
import { useEffect } from "react";
import { startCountdown } from "../CountdownTimer/startCountdown"; // এই ফাইলটি সঠিকভাবে পাথ দিন

const CountdownTimer = () => {
  useEffect(() => {
    startCountdown(); // কাউন্টডাউন স্টার্ট করতে ব্যবহার করুন
  }, []);

  return (
    <div className="bg-green-500 p-6 rounded-lg shadow-lg flex flex-col lg:flex-row items-center justify-between">
      <div className="text-center lg:text-left text-white font-bold text-2xl mb-4 lg:mb-0">
        East Dhaka
        <div className="text-xs mt-2">22 Street Dhaka</div>
        <div className="text-xs mt-2">23 October - 29 October 2020</div>
      </div>
      <div id="countdown" className="flex space-x-4">
        <div className="countdown-box bg-yellow">
          <div id="days" className="text-4xl font-semibold">
            0
          </div>
          <div>Days</div>
        </div>
        <div className="countdown-box bg-green">
          <div id="hours" className="text-4xl font-semibold">
            0
          </div>
          <div>Hours</div>
        </div>
        <div className="countdown-box bg-yellow">
          <div id="minutes" className="text-4xl font-semibold">
            0
          </div>
          <div>Minutes</div>
        </div>
        <div className="countdown-box bg-green">
          <div id="seconds" className="text-4xl font-semibold">
            0
          </div>
          <div>Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
