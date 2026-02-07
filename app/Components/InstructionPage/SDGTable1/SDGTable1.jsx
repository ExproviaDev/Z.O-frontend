"use client";
import React from 'react';

const SDGTable1 = () => {
  return (
    <section id='sdg' className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Which SDG Will You Present?
          </h2>
          <p className="text-gray-600 max-w-5xl mx-auto text-sm md:text-base leading-relaxed">
            Students all over the world – <span className="font-bold">inside and outside Bangladesh</span> – from <span className="font-bold">class 5 to masters</span> from <span className="font-bold">any medium or version</span> studying in a <span className="font-bold">school, college, university, or madrasha</span> are all eligible to apply for the Zero Olympiad. Students from <span className="font-bold">Qawmi and Alia Madrasas</span> are also encouraged to join. Participants who successfully pass the <span className="font-bold">first two rounds</span> will get the opportunity to present their selected <span className="font-bold">Sustainable Development Goal (SDG)</span> in the Grand Finale. Please also mention the <span className="font-bold">class you will be studying in January 2026</span> while applying.
          </p>
          <div className="w-24 h-1 bg-Primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
          <table className="w-full text-center border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#1a4b69] text-white text-xs md:text-sm uppercase tracking-wider">
                <th className="py-4 border-r border-white/10">Category</th>
                <th className="py-4 border-r border-white/10">SDG</th>
                <th className="py-4 border-r border-white/10">Bengali Medium</th>
                <th className="py-4 border-r border-white/10">English Medium</th>
                <th className="py-4 border-r border-white/10">Alia Madrasa</th>
                <th className="py-4">Qawmi Madrasa</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700">
              
              <tr className="bg-[#f0fff4]">
                <td rowSpan="4" className="border-r border-b font-bold p-4">
                  <span className="text-green-600 text-lg block">SDG Defender</span>
                  <span className="text-[10px] text-gray-400 font-normal uppercase">Winners: Defender<br/>Others: Activist</span>
                </td>
                <td className="border-r border-b p-3 font-bold">SDG 1</td>
                <td className="border-r border-b p-3">Class 5</td>
                <td className="border-r border-b p-3">Grade 5 / PYP 5</td>
                <td className="border-r border-b p-3">Class 5</td>
                <td className="border-b p-3">Taisir</td>
              </tr>
              <tr className="bg-[#f0fff4]">
                <td className="border-r border-b p-3 font-bold">SDG 2</td>
                <td className="border-r border-b p-3">Class 6</td>
                <td className="border-r border-b p-3">Grade 6 / MYP 1</td>
                <td className="border-r border-b p-3">Class 6</td>
                <td className="border-b p-3">Mizan</td>
              </tr>
              <tr className="bg-[#f0fff4]">
                <td className="border-r border-b p-3 font-bold">SDG 3</td>
                <td className="border-r border-b p-3">Class 7</td>
                <td className="border-r border-b p-3">Grade 7 / MYP 2</td>
                <td className="border-r border-b p-3">Class 7</td>
                <td className="border-b p-3">Nahbemir</td>
              </tr>
              <tr className="bg-[#f0fff4]">
                <td className="border-r border-b p-3 font-bold">SDG 4</td>
                <td className="border-r border-b p-3">Class 8</td>
                <td className="border-r border-b p-3">Grade 8 / MYP 3</td>
                <td className="border-r border-b p-3">Class 8</td>
                <td className="border-b p-3">Hidayatunnah</td>
              </tr>

              <tr className="bg-[#f0f7ff]">
                <td rowSpan="7" className="border-r border-b font-bold p-4">
                  <span className="text-blue-600 text-lg block">SDG Leader</span>
                  <span className="text-[10px] text-gray-400 font-normal uppercase">Winners: Leader<br/>Others: Ambassador</span>
                </td>
                <td className="border-r border-b p-3 font-bold">SDG 5</td>
                <td className="border-r border-b p-3">Class 9</td>
                <td className="border-r border-b p-3">Grade 9 / MYP 4</td>
                <td className="border-r border-b p-3">Class 9</td>
                <td rowSpan="2" className="border-b p-3 bg-white">Kafiya & Bekaya</td>
              </tr>
              <tr className="bg-[#f0f7ff]">
                <td className="border-r border-b p-3 font-bold">SDG 6</td>
                <td className="border-r border-b p-3">Class 10</td>
                <td className="border-r border-b p-3">Grade 10 / MYP 5</td>
                <td className="border-r border-b p-3">Class 10</td>
              </tr>
              <tr className="bg-[#f0f7ff]">
                <td className="border-r border-b p-3 font-bold">SDG 7</td>
                <td className="border-r border-b p-3 font-semibold text-gray-600">SSC Candidate</td>
                <td className="border-r border-b p-3 font-semibold text-gray-600">O Level Candidate</td>
                <td className="border-r border-b p-3 font-semibold text-gray-600">Dakhil Candidate</td>
                <td rowSpan="4" className="border-b p-3 bg-white">Jalalayn</td>
              </tr>
              <tr className="bg-[#f0f7ff]">
                <td className="border-r border-b p-3 font-bold">SDG 8</td>
                <td className="border-r border-b p-3">Class 11</td>
                <td className="border-r border-b p-3">Grade 11 / DP 1</td>
                <td className="border-r border-b p-3">Class 11</td>
              </tr>
              <tr className="bg-[#f0f7ff]">
                <td className="border-r border-b p-3 font-bold">SDG 9</td>
                <td className="border-r border-b p-3">Class 12</td>
                <td className="border-r border-b p-3">Grade 12 / DP 2</td>
                <td className="border-r border-b p-3">Class 12</td>
              </tr>
              <tr className="bg-[#f0f7ff]">
                <td className="border-r border-b p-3 font-bold">SDG 10</td>
                <td className="border-r border-b p-3 font-semibold text-gray-600">HSC Candidate</td>
                <td className="border-r border-b p-3 font-semibold text-gray-600">A Level Candidate</td>
                <td className="border-r border-b p-3 font-semibold text-gray-600 ">Alim Candidate</td>
              </tr>
              <tr className="bg-[#f0f7ff]">
                <td className="border-r border-b p-3 font-bold">SDG 11</td>
                <td className="border-b p-3 font-semibold text-gray-600"></td>
                <td className="border-b p-3 font-semibold text-gray-600">University Admission Candidate</td>
                <td className="border-r border-b p-3 font-semibold text-gray-600"></td>
                <td className=" border-b p-3 font-semibold text-gray-600 bg-gray-100">Musannif</td>
              </tr>
              

              <tr className="bg-gray-50 text-[10px] font-bold uppercase text-gray-500">
                <td colSpan="6" className="py-2 border-b">Honors, Medical, Engineering, Marine, Fisheries, Diploma, Madrasa</td>
              </tr>

              <tr className="bg-[#f5f3ff]">
                <td rowSpan="7" className="border-r border-b font-bold p-4">
                  <span className="text-purple-600 text-lg block">SDG Pioneer</span>
                  <span className="text-[10px] text-gray-400 font-normal uppercase">Winners: Pioneer<br/>Others: Achiever</span>
                </td>
                <td className="border-r border-b p-3 font-bold">SDG 12</td>
                <td colSpan="2" className="border-r border-b p-3">1st Year</td>
                <td rowSpan="3" className="border-r border-b p-3 bg-white">Fazil</td>
                <td rowSpan="3" className="border-b p-3 bg-white">Mishkat</td>
              </tr>
              <tr className="bg-[#f5f3ff]">
                <td className="border-r border-b p-3 font-bold">SDG 13</td>
                <td colSpan="2" className="border-r border-b p-3">2nd Year</td>
              </tr>
              <tr className="bg-[#f5f3ff]">
                <td className="border-r border-b p-3 font-bold">SDG 14</td>
                <td colSpan="2" className="border-r border-b p-3">3rd Year</td>
              </tr>
              <tr className="bg-[#f5f3ff]">
                <td className="border-r border-b p-3 font-bold">SDG 15</td>
                <td colSpan="2" className="border-r border-b p-3">4th Year </td>
                <td rowSpan="4" className="border-r border-b p-3 bg-white">Kamil</td>
                <td rowSpan="4" className="border-b p-3 bg-white">Dawra</td>
              </tr>
              <tr className="bg-[#f5f3ff]">
                <td className="border-r border-b p-3 font-bold">SDG 16</td>
                <td colSpan="2" className="border-r border-b p-3 font-semibold">5th Year & Intern </td>
              </tr>
              <tr className="bg-[#f5f3ff]">
                <td className="border-r border-b p-3 font-bold">SDG 17</td>
                <td colSpan="2" className="border-r border-b p-3 font-semibold"> Postgraduate (Masters)</td>
              </tr>
              

            </tbody>
          </table>
        </div>

        
      </div>
    </section>
  );
};

export default SDGTable1;