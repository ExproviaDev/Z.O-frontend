import React from "react";

const JurySection = () => {
  return (
    <section
      className="relative min-h-screen w-full py-20 px-4 flex flex-col items-center justify-center bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: `url('https://zeroolympiad.pronizam.com/wp-content/uploads/2025/12/IMG_8285-scaled.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-Secondary/60 backdrop-brightness-[0.4]"></div>

      <div className="relative z-10 max-w-5xl w-full mx-auto text-center">
        <div className="mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Confirmed Guest Jury{" "}
            <span className="text-Primary">(Season One)</span>
          </h2>
          <p className="text-white font-medium text-sm md:text-lg max-w-2xl mx-auto opacity-90">
            Distinguished academics and professionals who guide and evaluate our
            participants
          </p>
        </div>

        <div className="bg-white p-1 md:p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden transform  transition-all duration-500">
          <img
            src="https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/juri_board-1024x618.png"
            alt="Confirmed Guest Jury Board"
            className="w-full h-auto rounded-xl"
          />
        </div>

        <div className="mt-12">
          <div className="h-1 w-20 bg-white mx-auto rounded-full opacity-50"></div>
        </div>
      </div>
    </section>
  );
};

export default JurySection;
