// public/countdown.js (আপনার প্রোজেক্টে উপযুক্ত জায়গায় রাখতে পারেন)
export function startCountdown() {
  // লক্ষ্য তারিখ (আপনার পছন্দ অনুযায়ী পরিবর্তন করুন)
  const targetDate = new Date(60).getTime(); // এখানে আপনার লক্ষ্য তারিখ

  // কাউন্টডাউন আপডেট হবে প্রতি এক সেকেন্ডে
  const countdownInterval = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").innerHTML = "Countdown Finished!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  }, 1000);
}
