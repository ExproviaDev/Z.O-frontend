import { CiCalendar } from "react-icons/ci";
import { FaTrophy } from "react-icons/fa6";
export default function RoundStatusCard({
  title,
  date,
  score,
  maxScore,
  status,
}) {
  return (
    <div className="relative overflow-hidden border-l-2 lg:border-l-[6px] border border-blue-200 border-l-blue-600 bg-white py-8 px-6 shadow-md rounded-xl">
      <div className="md:flex items-center justify-between">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-black">{title}</h3>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2 text-xl">
              <CiCalendar className="text-blue-600" />
              <span>{date}</span>
            </div>

            {score !== 0 ? (
              <div className="flex items-center gap-2 text-xl">
                <FaTrophy className=" text-blue-600" />
                <span>
                  Score: {score}/{maxScore}
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {status === "completed" && (
          <div className="flex items-center gap-1.5 rounded-full bg-green-600 px-3  text-lg font-medium text-white">
            {/* <CheckCircle2 className="h-3.5 w-3.5" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-check-big w-3 h-3 mr-1"
            >
              <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
              <path d="m9 11 3 3L22 4"></path>
            </svg>
            <span>Completed</span>
          </div>
        )}
        {status === "Start Quiz" && (
          <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 cursor-pointer">
            Start Quiz
          </button>
        )}
        {status === "Locked" && (
          <button className="cursor-pointer flex items-center gap-1.5 rounded-full bg-[#094f95] px-3  text-lg font-medium text-white">
            {/* <CheckCircle2 className="h-3.5 w-3.5" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-lock w-3 h-3 mr-1"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Locked</span>
          </button>
        )}
      </div>
    </div>
  );
}
