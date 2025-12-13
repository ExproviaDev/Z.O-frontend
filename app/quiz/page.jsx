import { fetchQuizData } from "../../lib/quizData";
import QuizForm from "../Components/QuizePageComponents/QuizForm"
export default async function QuizPage() {
  const questions = await fetchQuizData();

  return (
      <div className="space-y-16 overflow-hidden content-center ">
        {/* Quiz Form Section */}
        <section className=" w-full content-center  mx-5">
          <div className="bg-white p-10">
            <QuizForm questions={questions} />
          </div>
        </section>
      </div>
  );
}
