import Image from "next/image";
import React from "react";

import SiteLogo from "../../../public/src/SiteLogo.png";
import faatiHaaayat from "../../../public/src/faatihaaayat.jpg";

const Dashboard = () => {
  return (
    <section>
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-cover bg-center p-28 lg:p-48"></div>
      <div className="-mt-56 flex justify-center items-center ">
        <div className="max-w-7xl w-full px-5 border-red-300 p-2">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-5 lg:p-16 rounded-lg space-y-8">
            <div className="flex justify-between lg:items-center  border-red-600">
              <div className="text-white">
                <h2 className="uppercase text-sm md:text-base lg:text-xl">
                  Looking Forward to learning.
                </h2>
                <h2 className="text-2xl md:text-4xl lg:text-7xl font-bold lg:my-3">
                  Zero Olympiad
                </h2>
                <p className="text-sm lg:text-xl italic">
                  Reducing To Zero, Rising As Hero
                </p>

                <div className="md:flex justify-start items-center gap-5 mt-8">
                  <Image
                    src={faatiHaaayat}
                    width={150}
                    height={150}
                    alt="SiteLogo"
                    className="rounded-full border-4 border-red-500 "
                  />
                  <div className="mt-2">
                    <h2 className="text-2xl lg:text-3xl font-semibold">
                      Faati Haaayat
                    </h2>

                    <div className="flex items-center">
                      {/* <span className="mr-1 text-xl">🎓</span> */}
                      <span className="text-base md:text-lg mr-2 font-semibold">
                        Student ID :
                      </span>
                      ZO2025-12345
                    </div>
                    <div className="flex items-center">
                      {/* <span className="mr-1 text-xl">🎓</span> */}
                      <span className="text-base md:text-lg mr-2 font-semibold">
                        Current Rank :
                      </span>
                      0
                    </div>
                    <div className="flex items-center border-red-500">
                      {/* <span className="mr-1 text-xl">🎓</span> */}
                      <span className="md:text-lg font-semibold border border-gray-500  py-1 px-5 bg-amber-300 rounded-xl ">
                        Junior Category
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div>
                <Image src={SiteLogo} width={280} height={280} alt="SiteLogo" />
              </div> */}
              <div>
                <Image
                  src={SiteLogo}
                  width={280}
                  height={280}
                  alt="SiteLogo"
                  className="w-28 h-28  md:w-56 md:h-56 lg:w-64 lg:h-64                     "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
