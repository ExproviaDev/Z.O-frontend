
const PrizeSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-[#f9fbff]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-Secondary mb-4">
            What prizes will you receive at Zero Olympiad 2026?
          </h2>
          <p className="text-gray-500 font-medium italic">
            A total of 51 participants will receive cash prizes worth BDT
            227,500. The detailed breakdown is provided below.
          </p>
          <div className="w-24 h-1 bg-[#f16522] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* --- TABLE 1: SDG 1 - 4 (SDG Defender) --- */}

        <div className="mb-16 overflow-hidden rounded-2xl border border-gray-300 shadow-xl bg-white max-w-7xl mx-auto my-10">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[1000px] table-fixed">
              <thead>
                <tr className="bg-Secondary text-white text-[13px] uppercase tracking-wider font-bold">
                  <th className="py-5 border-r border-white/20 w-[8%]">SDG</th>
                  <th className="py-5 border-r border-white/20 w-[15%]">
                    Finalists coming to <br /> Dhaka
                  </th>
                  <th className="py-5 border-r border-white/20 w-[15%]">
                    Stage Presenter <br /> (Winner)
                  </th>
                  <th className="py-5 border-r border-white/20 w-[20%]">
                    Prize for Stage Presenter
                  </th>
                  <th className="py-5 border-r border-white/20 w-[22%]">
                    2nd & 3rd Prize <br /> (Non-Presenters)
                  </th>
                  <th className="py-5 w-[20%]">
                    Ultimate Grand Winner (Among <br /> 4 SDGs)
                  </th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-gray-800">
                {[1, 2, 3, 4].map((num) => (
                  <tr key={num} className="border-b border-gray-300">
                    <td className="py-6 font-bold bg-gray-50 border-r border-gray-300">
                      SDG {num}
                    </td>
                    <td className="py-6 border-r border-gray-300">3 Persons</td>
                    <td className="py-6 border-r border-gray-300">1 Person</td>
                    <td className="py-6 border-r border-gray-300 font-medium">
                      5,000 BDT
                    </td>
                    <td className="py-6 border-r border-gray-300">
                      <span className="block">5,000 + 2,500 =</span>
                      <span className="font-bold">7,500 BDT</span>
                    </td>
                    {num === 1 && (
                      <td
                        rowSpan="4"
                        className="p-8 font-bold text-center border-l border-gray-300 bg-white"
                      >
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          <p className="text-3xl font-black text-[#0c4a6e]">
                            10,000 BDT
                          </p>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>

        {/* --- TABLE 2: SDG 5 - 10 (SDG Leader) --- */}

        <div className="mb-16 overflow-hidden rounded-2xl border border-gray-300 shadow-xl bg-white max-w-7xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[1000px] table-fixed">
              <thead>
                <tr className="bg-[#0c4a6e] text-white text-[13px] uppercase tracking-wider font-bold">
                  <th className="py-5 border-r border-white/20 w-[8%]">SDG</th>
                  <th className="py-5 border-r border-white/20 w-[15%]">
                    Coming to Dhaka as <br /> Finalist
                  </th>
                  <th className="py-5 border-r border-white/20 w-[15%]">
                    Stage Presenter <br /> (Winner)
                  </th>
                  <th className="py-5 border-r border-white/20 w-[20%]">
                    Prize for Stage Presenter
                  </th>
                  <th className="py-5 border-r border-white/20 w-[22%]">
                    2nd & 3rd Prizes <br /> (Non-Presenters)
                  </th>
                  <th className="py-5 w-[20%]">
                    Grand Winner Prize (Highest <br /> Scorer)
                  </th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-gray-800">
                {[5, 6, 7, 8, 9, 10].map((num) => (
                  <tr key={num} className="border-b border-gray-300">
                    <td className="py-5 font-bold bg-gray-50 border-r border-gray-300">
                      SDG {num}
                    </td>
                    <td className="py-5 border-r border-gray-300">3 Persons</td>
                    <td className="py-5 border-r border-gray-300">1 Person</td>
                    <td className="py-5 border-r border-gray-300 font-medium">
                      5,000 BDT
                    </td>
                    <td className="py-5 border-r border-gray-300">
                      <span className="block italic text-gray-500 text-xs">
                        5,000 + 2,500 =
                      </span>
                      <span className="font-bold">7,500 BDT</span>
                    </td>
                    {num === 5 && (
                      <td
                        rowSpan="6"
                        className="p-8 font-bold text-center border-l border-gray-300 bg-white"
                      >
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          <p className="text-3xl font-black text-[#0c4a6e]">
                            10,000 BDT
                          </p>
                          
                        </div>
                      </td>
                    )}
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>

        {/* --- TABLE 3: SDG 11 - 17 (SDG Pioneer) --- */}

        <div className="mb-10 overflow-hidden rounded-2xl border border-gray-300 shadow-xl bg-white max-w-7xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[1000px] table-fixed">
              <thead>
                <tr className="bg-[#0c4a6e] text-white text-[13px] uppercase tracking-wider font-bold">
                  <th className="py-5 border-r border-white/20 w-[8%]">SDG</th>
                  <th className="py-5 border-r border-white/20 w-[15%]">
                    Coming to Dhaka as <br /> Finalist
                  </th>
                  <th className="py-5 border-r border-white/20 w-[15%]">
                    Winner (On-Stage <br /> Presentation)
                  </th>
                  <th className="py-5 border-r border-white/20 w-[20%]">
                    Prize for Stage Presenter
                  </th>
                  <th className="py-5 border-r border-white/20 w-[22%]">
                    2nd & 3rd Prizes <br /> (Non-Presenters)
                  </th>
                  <th className="py-5 w-[20%]">
                    Grand Winner Prize (Highest <br /> Scorer)
                  </th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-gray-800">
                {[11, 12, 13, 14, 15, 16, 17].map((num) => (
                  <tr key={num} className="border-b border-gray-300">
                    <td className="py-4 font-bold bg-gray-50 border-r border-gray-300">
                      SDG {num}
                    </td>
                    <td className="py-4 border-r border-gray-300">3 Persons</td>
                    <td className="py-4 border-r border-gray-300">1 Person</td>
                    <td className="py-4 border-r border-gray-300 font-medium">
                      5,000 BDT
                    </td>
                    <td className="py-4 border-r border-gray-300">
                      <span className="block italic text-gray-500 text-xs">
                        5,000 + 2,500 =
                      </span>
                      <span className="font-bold">7,500 BDT</span>
                    </td>
                    {num === 11 && (
                      <td
                        rowSpan="7"
                        className="p-8 font-bold text-center border-l border-gray-300 bg-white"
                      >
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          <p className="text-3xl font-black text-[#0c4a6e]">
                            10,000 BDT
                          </p>
                          
                        </div>
                      </td>
                    )}
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Footer Note */}
        <div>
          <p className="text-red-500 font-black italic text-xl md:text-2xl">
            N.B. "As the event gets closer, more exciting prizes will be added!"
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrizeSection;
