import { fetchQuizData } from "../../lib/quizData";
import QuizForm from "../Components/QuizePageComponents/QuizForm";
import { AiOutlineCheckCircle, AiOutlineQuestionCircle, AiOutlineClockCircle } from "react-icons/ai";
import bannerImg from "../../public/src/QuizBanner.png"; 
export default async function QuizPage() {
  const questions = await fetchQuizData(); 

  return (
    <div className="space-y-16 overflow-hidden ">

      {/* Banner Section */}
      <section
        className="relative text-white py-28 px-5  shadow-lg overflow-hidden"
        style={{
          backgroundImage: `url(${bannerImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 rounded-b-3xl"></div>
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Zero Olympiad Quiz Challenge</h1>
          <p className="text-lg md:text-xl text-white/90">Test your knowledge and see where you stand!</p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <span className="bg-white/20 px-4 py-2 rounded-full text-white font-medium flex items-center gap-1">
              <AiOutlineClockCircle /> 10 Minutes
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-white font-medium flex items-center gap-1">
              <AiOutlineQuestionCircle /> Multiple Choice
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-white font-medium flex items-center gap-1">
              <AiOutlineCheckCircle /> Immediate Results
            </span>
          </div>
        </div>
      </section>

      {/* Quiz Form Section */}
      <section className=" w-full  mx-5">
        <div className="bg-white p-10">
          <QuizForm questions={questions} />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-5 py-16">
        <h2 className="text-3xl font-bold text-Primary mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center">
            <AiOutlineQuestionCircle className="w-12 h-12 text-Primary mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Read the Question</h3>
            <p className="text-gray-600">Carefully read each question and understand before answering.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center">
            <AiOutlineCheckCircle className="w-12 h-12 text-Primary mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Select an Answer</h3>
            <p className="text-gray-600">Choose the correct option. You can change your answer anytime before submitting.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center">
            <AiOutlineCheckCircle className="w-12 h-12 text-Primary mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Submit & See Results</h3>
            <p className="text-gray-600">Submit when done. Check your score and track your progress instantly.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 pt-16 pb-24 px-5">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-Primary">Why Take This Quiz?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">Boost your knowledge, practice problem-solving, and challenge yourself to improve every time.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md w-60 hover:shadow-xl transition flex flex-col items-center gap-3">
              <AiOutlineCheckCircle className="text-Primary w-10 h-10"/>
              <p className="font-semibold text-gray-700 text-center">Enhance Skills</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md w-60 hover:shadow-xl transition flex flex-col items-center gap-3">
              <AiOutlineCheckCircle className="text-Primary w-10 h-10"/>
              <p className="font-semibold text-gray-700 text-center">Track Progress</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md w-60 hover:shadow-xl transition flex flex-col items-center gap-3">
              <AiOutlineCheckCircle className="text-Primary w-10 h-10"/>
              <p className="font-semibold text-gray-700 text-center">Boost Confidence</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
