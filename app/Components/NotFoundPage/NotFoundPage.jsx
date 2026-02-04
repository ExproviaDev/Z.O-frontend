import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden relative">
      
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col items-center justify-center relative z-10">
        
        <h1 className="text-[12rem] md:text-[18rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-[#1a1a1a] select-none">
          404
        </h1>

        <div className="text-center -mt-8 md:-mt-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            LOST IN SPACE?
          </h2>
          
          <p className="text-gray-500 text-lg md:text-xl max-w-lg mx-auto mb-10">
            The page you are looking for doesn't exist or has been moved to another coordinate.
          </p>

          <Link 
            href="/" 
            className="inline-block bg-white text-black hover:bg-Primary hover:text-white px-10 py-4 font-bold rounded-full transition-all duration-300 transform hover:scale-110 uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Back to home
          </Link>
        </div>
      </div>

      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none"></div>
    </div>
  );
}