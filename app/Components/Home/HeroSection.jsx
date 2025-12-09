import React from 'react'

export default function HeroSection() {

    const stats = [
        { icon: "👥", value: "10,000+", label: "Participants" },
        { icon: "🎓", value: "Certificate", label: "Reward" },
        { icon: "📅", value: "3rd", label: "Edition" },
        { icon: "✨", value: "64", label: "Districts" },
    ];

    return (
        <section className="relative min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div
                className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "2s" }}
            ></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"></div>

            {/* Floating shapes */}
            <div className="absolute top-32 right-20 animate-bounce">
                <div className="w-16 h-16 border-2 border-purple-300 rotate-45"></div>
            </div>
            <div
                className="absolute bottom-40 left-20 animate-bounce"
                style={{ animationDelay: "3s" }}
            >
                <div className="w-12 h-12 bg-teal-300 rounded-full"></div>
            </div>
            <div
                className="absolute top-1/3 right-1/4 animate-bounce"
                style={{ animationDelay: "1.5s" }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2l2 7h7l-5.5 4 2 7-5.5-4-5.5 4 2-7-5.5-4h7z" />
                </svg>
            </div>

            <div className="container relative z-10 px-4 mx-auto min-h-screen flex flex-col justify-center items-center text-center py-20">
                {/* Badge */}
                <div className="mb-6 animate-fade-up">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2l2 7h7l-5.5 4 2 7-5.5-4-5.5 4 2-7-5.5-4h7z" />
                        </svg>
                        Registration Now Open
                    </span>
                </div>

                {/* Main heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
                    Zero{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
                        Olympiad
                    </span>
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-4 font-bengali">
                    জ্ঞানের প্রতিযোগিতায় অংশ নিন, আপনার সেরাটা প্রমাণ করুন
                </p>
                <p className="text-base md:text-lg text-white/70 max-w-xl mb-10">
                    Join Bangladesh's premier academic olympiad and showcase your brilliance among the nation's brightest minds
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                    <button className="flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition">
                        Register Now <span>&rarr;</span>
                    </button>
                    <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/20 transition">
                        Learn More
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                            <span className="text-sm text-white/60">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                    <div className="w-1.5 h-2.5 bg-white/50 rounded-full animate-pulse"></div>
                </div>
            </div>
        </section>
    )
}
