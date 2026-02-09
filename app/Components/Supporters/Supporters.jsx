const Supporters = () => {
  return (
    <section className="relative w-full py-10 md:py-20 px-4 flex flex-col items-center justify-center bg-gray-50">
      <div className="relative z-10 max-w-7xl w-full mx-auto text-center">
        <div className="inline-block bg-gray-200 text-gray-800 text-xs font-bold px-4 py-1 rounded-full mb-4">
          Trusted By
        </div>

        <div className="mb-10">
          <h2 className="text-2xl md:text-5xl font-extrabold text-gray-900 mb-4 px-5">
            Our Valued Partners & Supporters{" "}
            <span className="text-[#f16522]">(Season One)</span>
          </h2>
          <p className="text-gray-600 font-medium text-sm md:text-lg max-w-3xl mx-auto">
            Proudly supported by leading organizations who believe in youth
            leadership, innovation, and global impact.
          </p>
        </div>

        <div className="bg-white p-2 rounded-3xl shadow-xl overflow-hidden transition-all duration-500  border border-gray-100">
          <img
            src="https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/sponsors-1024x489.png"
            alt="Our Valued Partners & Supporters"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Supporters;
