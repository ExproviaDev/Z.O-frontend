// // import { Calendar, Trophy, CheckCircle2 } from "lucide-react";

// export function RoundStatusCard({ title, date, score, maxScore, status }) {
//   return (
//     <main className="relative overflow-hidden border-l-4 border-l-blue-600 bg-white p-6 shadow-md">
//       <div className="flex items-start justify-between">
//         <div className="space-y-3">
//           <h3 className="text-xl font-semibold text-black">{title}</h3>

//           <div className="flex items-center gap-6 text-sm text-gray-500">
//             <div className="flex items-center gap-2">
//               {/* <Calendar className="h-4 w-4 text-blue-600" /> */}
//               <span>{date}</span>
//             </div>

//             <div className="flex items-center gap-2">
//               {/* <Trophy className="h-4 w-4 text-blue-600" /> */}
//               <span>
//                 Score: {score}/{maxScore}
//               </span>
//             </div>
//           </div>
//         </div>

//         {status === "completed" && (
//           <div className="flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
//             {/* <CheckCircle2 className="h-3.5 w-3.5" /> */}
//             <span>Completed</span>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }
