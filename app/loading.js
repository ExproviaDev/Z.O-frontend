export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-white animate-pulse">
      
      {/* 1. Navbar Skeleton (Optional - যদি আপনার Navbar সব সময় ফিক্সড থাকে তবে এটা বাদ দিতে পারেন) */}
      <div className="w-full h-16 bg-gray-200 border-b border-gray-300 mb-8"></div>

      {/* 2. Page Content Container */}
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Banner / Header Title Skeleton */}
        <div className="w-full max-w-4xl mx-auto mb-12 text-center space-y-4">
           <div className="h-10 bg-gray-300 rounded-lg w-3/4 mx-auto"></div>
           <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>

        {/* Hero Image / Main Section Skeleton */}
        <div className="w-full h-64 md:h-96 bg-gray-200 rounded-xl mb-12"></div>

        {/* 3 Column Grid Skeleton (Perfect for Services, Gallery, Pricing, or Blogs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {/* Card 1 */}
           <div className="space-y-3">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
           </div>
           {/* Card 2 */}
           <div className="space-y-3">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
           </div>
           {/* Card 3 */}
           <div className="space-y-3">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
           </div>
        </div>

        {/* Content Paragraphs Skeleton */}
        <div className="space-y-4 max-w-3xl mx-auto mb-20">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        
      </div>
    </div>
  );
}