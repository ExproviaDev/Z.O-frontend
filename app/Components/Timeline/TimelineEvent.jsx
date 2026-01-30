import React from "react";
import { 
  FaUserEdit, FaFileAlt, FaRegEdit, 
  FaRegCheckCircle, FaVideo, FaAward, FaTrophy 
} from "react-icons/fa";

const timelineData = [
  {
    title: "Registration Opens",
    date: "18 February 2026",
    desc: "Start your journey today! Register online to participate in the most awaited Olympiad of the year.",
    icon: <FaUserEdit />,
    align: "left",
  },
  {
    title: "Registration Closes",
    date: "6 May 2026",
    desc: "Final call for entries! Complete your registration by today to secure your spot in the 1st Round Exam.",
    icon: <FaFileAlt />,
    align: "right",
  },
  {
    title: "1st Round Exam",
    date: "8 May 2026",
    desc: "MCQ Contest Register in your class category (as of 8 may 2026). Complete 20 MCQ questions from UN-recognized courses. Winners advance to the second round.",
    icon: <FaRegEdit />,
    align: "left",
  },
  {
    title: "1st Round Result",
    date: "9 May 2026",
    desc: "Results will be published!! Participants will be selected for the second round of their MCQ scores. Please check your dashboard or email for more information.",
    icon: <FaRegCheckCircle />,
    align: "right",
  },
  {
    title: "2nd Round Exam",
    date: "16 May 2026",
    desc: "Three Minute Thrill: Create a compelling 3-minute video on your assigned SDG topic. Post on social media with #ZeroOlympiad. Submit your video link by 20 may 2026.",
    icon: <FaVideo />,
    align: "left",
  },
  {
    title: "2nd Round Result",
    date: "25 May 2026",
    desc: "Results are live! The top performers advancing to the Grand Finale have been announced. Check the official website or your dashboard for the list of finalists and travel/accommodation details for the Dhaka event.",
    icon: <FaAward />,
    align: "right",
  },
  {
    title: "Grand Finale",
    date: "6 June 2026",
    desc: "51 Participants in Grand Finale A total of 51 finalists (3 for each of the 17 SDGs) will be invited to Dhaka, along with 2 accompanying guests each. 17 winners will be called on stage to present their plans for achieving their assigned SDG.",
    icon: <FaTrophy />,
    align: "left",
  },
];

const Timeline = () => {
  return (
    <section 
      className="relative py-24 px-4 min-h-screen overflow-hidden"
      style={{ 
        backgroundImage: `url('https://i.ibb.co/99HFrKfK/speaker-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' 
      }}
    >
      <div className="max-w-7xl mx-auto relative">

 <div className="text-center space-y-4 pb-4">
                <h1 className="md:text-5xl text-4xl font-medium">Time Line</h1>
                <p className="pb-10">Follow the path from registration to the grand finale. Each milestone brings you closer to <br /> achieving excellence.</p>
              </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 w-[1px] h-full bg-gray-200 hidden md:block"></div>



        <div className="space-y-8 md:space-y-24">
          {timelineData.map((item, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col md:flex-row items-center justify-between w-full ${
                item.align === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
             
              <div className="w-full md:w-[46%] z-10">
                <div className="group relative bg-Primary p-8 lg:p-10 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-500 hover:bg-Secondary  overflow-visible">
                  
                  <div className="absolute bottom-6 left-6 text-white/5 text-8xl lg:text-[140px] pointer-events-none transition-transform duration-700 group-hover:scale-110">
                    {item.icon}
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-white text-xl lg:text-3xl font-bold tracking-tight pr-12 leading-tight">
                        {item.title}
                      </h3>
                      <div className="bg-[#78E08F] p-3 lg:p-4 rounded-full text-[#003D5B] text-xl lg:text-2xl shadow-xl shrink-0 absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 group-hover:rotate-12 transition-transform">
                        {item.icon}
                      </div>
                    </div>
                    <p className="text-white/80 text-sm lg:text-lg leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                  
                  <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-inherit transform rotate-45 hidden md:block ${
                    item.align === "left" ? "-right-4" : "-left-4"
                  }`}></div>
                </div>
              </div>

              <div className="relative flex items-center justify-center w-full md:w-[8%] my-10 md:my-0">
                <div className="z-20 w-5 h-5 bg-white border-[3px] border-[#2563EB] rounded-full shadow-md"></div>
                
                <span className={`md:absolute whitespace-nowrap font-bold text-gray-800 text-sm lg:text-lg ${
                  item.align === "left" ? "md:left-14 lg:left-16" : "md:right-14 lg:right-16"
                }`}>
                  {item.date}
                </span>
              </div>

              <div className="hidden md:block md:w-[46%]"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;