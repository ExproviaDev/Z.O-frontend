import Image from "next/image";
import React from "react";

import SiteLogo from "@/public/src/SiteLogo.png";
import faatiHaaayat from "@/public/src/faatihaaayat.jpg";

const Dashboard = () => {
  return (
    <section>
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-cover bg-center p-28 lg:p-48"></div>
      <div className="-mt-56 flex justify-center items-center ">
        <div className="max-w-7xl w-full px-5 border-red-300 p-2 ">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-16 rounded-lg space-y-8">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h2 className="uppercase text-sm md:text-base lg:text-xl">
                  Looking Forward to learning.
                </h2>
                <h2 className="text-7xl font-bold my-3">Zero Olympiad</h2>
                <p className="text-lg italic">
                  A Conviction To Give Something Good To This World.
                </p>

                <div className="flex justify-start items-center gap-5 mt-8">
                  <Image
                    src={faatiHaaayat}
                    width={150}
                    height={150}
                    alt="SiteLogo"
                    className="rounded-full border-4 border-red-500 "
                  />
                  <div className="mt-2">
                    <h2 className="text-3xl font-semibold">Faati Haaayat</h2>
                    <div className="flex items-center mt-2">
                      <span className="mr-1 text-xl">📚</span>
                      <span className="text-xl">Version: English</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1 text-xl">🎓</span>
                      <span className="text-xl">Class: O Level Candidate </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Image src={SiteLogo} width={280} height={280} alt="SiteLogo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
