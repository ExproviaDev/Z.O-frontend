import Image from "next/image";

import SiteLogo from "@/public/src/SiteLogo.png";
export default function NotFoundPage() {
  return (
    <section className="dark:bg-gray-900  border-red-500">
      <div className=" container min-h-screen px-6 py-12 mx-auto md:flex flex-row-reverse justify-center items-center lg:gap-12">
        <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0  border-green-500 flex justify-center items-center">
          <Image
            className="rounded-lg object-cover w-56 lg:w-96 "
            src={SiteLogo}
            alt="SiteLogo"
            width={150}
            height={100}
          />
        </div>
        <div className=" border-red-500 w-full lg:w-1/2 flex justify-end ">
          <div className="p-4">
            <h1 className="mt-3 text-xl md:text-3xl lg:text-5xl font-bold dark:text-white text-red-500">
              Page not found
            </h1>
            <p className="mt-4 text-base md:text-base lg:text-xl text-gray-500 dark:text-gray-400">
              {`Oops! The page you're looking for seems to have drifted off into space. Let's get you back on track.`}
            </p>

            <div className="flex items-center justify-center mt-6 gap-x-3 ">
              <button className="cursor-pointer px-5 py-1 lg:py-3 text-lg font-semibold  flex items-center justify-center w-1/2 text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
                <span>Go back</span>
              </button>

              <button className=" w-1/2 px-5 py-2 lg:py-3 text-lg font-semibold cursor-pointer tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                Take me home
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
