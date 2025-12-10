// app/quiz/page.jsx
import { fetchQuizData } from "../../lib/quizData";
import QuizForm from "../Components/QuizePageComponents/QuizForm";

export default async function QuizPage() {
  const questions = await fetchQuizData(); 

  return (
    <div className="max-w-4xl mx-auto p-6">
      <QuizForm questions={questions} />
    </div>
  );
}
