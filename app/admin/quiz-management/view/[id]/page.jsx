"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleQuiz } from "../../../../store/slices/quizSlice";
import { FaArrowLeft, FaRegClock, FaRegCalendarAlt, FaCheckCircle, FaEdit } from "react-icons/fa";
import Link from "next/link";

export default function ViewQuizPage() {
    const { id } = useParams(); // URL theke ID neya
    const dispatch = useDispatch();
    const router = useRouter();

    const { currentQuiz, loading, error } = useSelector((state) => state.quiz);

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleQuiz(id)); // Data fetch kora
        }
    }, [id, dispatch]);

    if (loading) return <div className="p-20 text-center font-bold text-blue-600 animate-pulse">Loading Quiz Details...</div>;
    if (error) return <div className="p-20 text-center text-red-500 font-bold">Error: {error}</div>;
    if (!currentQuiz) return <div className="p-20 text-center text-slate-500">No Quiz Found!</div>;

    return (
        <main className="p-6 md:p-12 max-w-4xl mx-auto bg-white min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b pb-6">
                <div>
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-2 transition-colors">
                        <FaArrowLeft /> Back to Management
                    </button>
                    <h1 className="text-3xl font-black text-slate-900">{currentQuiz.title}</h1>
                    <p className="text-blue-600 font-semibold mt-1">{currentQuiz.category}</p>
                </div>

                <Link prefetch={false} href={`/admin/quiz-management/edit/${id}`}>
                    <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-orange-600 transition-all">
                        <FaEdit /> Edit Quiz
                    </button>
                </Link>
            </div>

            {/* Quiz Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><FaRegClock size={20} /></div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Time Limit</p>
                        <p className="text-lg font-bold text-slate-800">{currentQuiz.time_limit} Minutes</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><FaRegCalendarAlt size={20} /></div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Start Date</p>
                        <p className="text-lg font-bold text-slate-800">
                            {new Date(currentQuiz.start_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 border-l-4 border-blue-600 pl-4">Questions ({currentQuiz.questions?.length || 0})</h2>

                {currentQuiz.questions?.map((q, index) => (
                    <div key={index} className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-lg font-bold text-slate-800 mb-4">
                            <span className="text-blue-600 mr-2">Q{index + 1}.</span> {q.question_text}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.entries(q.options).map(([key, value]) => (
                                <div
                                    key={key}
                                    className={`flex items-center gap-3 p-3 rounded-xl border ${q.correct_answer === key
                                            ? "bg-green-50 border-green-200 ring-1 ring-green-500"
                                            : "bg-slate-50 border-slate-100"
                                        }`}
                                >
                                    <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${q.correct_answer === key ? "bg-green-500 text-white" : "bg-slate-200 text-slate-600"
                                        }`}>
                                        {key}
                                    </span>
                                    <span className={`flex-1 ${q.correct_answer === key ? "font-bold text-green-700" : "text-slate-700"}`}>
                                        {value}
                                    </span>
                                    {q.correct_answer === key && <FaCheckCircle className="text-green-500" />}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}