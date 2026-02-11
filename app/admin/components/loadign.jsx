// app/loading.jsx

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-white animate-pulse">
      <div className="w-full h-20 bg-gray-100 border-b border-gray-200 mb-8"></div>
      <div className="w-full h-[50vh] md:h-[60vh] bg-gray-200 mb-12 flex flex-col items-center justify-center rounded-b-3xl">
         <div className="w-full max-w-3xl px-4 space-y-6 text-center">
            {/* Title Line */}
            <div className="h-8 md:h-14 bg-gray-300 rounded-lg w-3/4 mx-auto"></div>
            {/* Subtitle Line */}
            <div className="h-4 md:h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
            {/* Button Placeholder */}
            <div className="h-12 w-40 bg-gray-300 rounded-full mx-auto mt-8"></div>
         </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 space-y-16 pb-20">

        <div className="max-w-4xl mx-auto space-y-4">
           <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
           <div className="space-y-3">
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
           </div>
        </div>
        <div>
           <div className="h-8 bg-gray-200 rounded w-48 mb-8 mx-auto"></div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-72 bg-gray-100 rounded-2xl p-4 flex flex-col space-y-4">
               
                   <div className="h-40 bg-gray-200 rounded-xl w-full"></div>
         
                   <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}