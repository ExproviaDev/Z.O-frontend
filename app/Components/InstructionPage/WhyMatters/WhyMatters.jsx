import { Globe, Users, CheckCircle } from "lucide-react";

const WhyMatters = () => {
  const topCards = [
    {
      icon: <Globe className="w-10 h-10 text-Primary" />,
      title: "Global Reach",
      desc: "A global competition aiming to eliminate negative issues like zero poverty, hunger, inequality, and carbon emissions from our world.",
    },
    {
      icon: <Users className="w-10 h-10 font-black text-Primary" />,
      title: "Youth Empowerment",
      desc: "Helping youth develop teamwork skills, problem-solving abilities, and leadership qualities through innovative activities.",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-Primary" />,
      title: "Solution Oriented",
      desc: "Participants present their own thinking and solutions to various social, economic, and environmental problems.",
    },
  ];

  const bottomGrid = [
    {
      title: "Promote SDGs",
      desc: "Awareness of UN goals and self-initiative work.",
    },
    {
      title: "Leadership",
      desc: "Develop qualities to solve future problems.",
    },
    {
      title: "Social Responsibility",
      desc: "Desire to build a better world for all.",
    },
    {
      title: "Problem Solving",
      desc: "Learn through interactive group activities.",
    },
  ];

  return (
    <section className="py-10 md:py-20 px-5 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-[#333]">
            Why Zero Olympiad Matters
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium">
            Empowering youth with global awareness, SDG-focused thinking, and
            real-world problem-solving skills.
          </p>
          <div className="w-24 h-1 bg-Primary mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"> 
          {topCards.map((card, index) => (
            <div
              key={index}
              className="p-5 bg-[#f8fafc] rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="mb-6">{card.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#0a3d5a] rounded-[30px] p-5 md:p-12 text-white flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Need for Zero Olympiad
            </h2>
            <div className="space-y-4 opacity-90 font-light text-sm md:text-base">
              <p>
                Traditional education often fails to provide youth with
                real-world skills to address poverty, hunger, and environmental
                pollution.
              </p>
              <p>
                If the youth grow up with solution-oriented thinking, they
                become an important part of changing the world.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-5">
            {bottomGrid.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/5 p-4 rounded-xl"
              >
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-xs opacity-80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMatters;
