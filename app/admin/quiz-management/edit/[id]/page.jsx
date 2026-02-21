"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { fetchSingleQuiz } from "../../../../store/slices/quizSlice";
import axios from "axios";
import { FaTrash, FaPlus, FaSave, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

const categories = ["SDG Activist", "SDG Ambassador", "SDG Achiever"];

export default function EditQuizPage() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const { currentQuiz, loading, error } = useSelector((state) => state.quiz);
    const [isUpdating, setIsUpdating] = useState(false);

    const { register, control, handleSubmit, setValue, reset } = useForm({
        defaultValues: {
            title: "",
            category: "",
            start_at: "",
            ends_at: "", // নতুন ফিল্ড
            time_limit: 30,
            questions: []
        }
    });

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "questions"
    });

    // টাইমজোন হ্যান্ডেলিং: UTC/ISO ডাটাকে datetime-local ইনপুটের উপযোগী করা
    const formatDateTimeLocal = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        // লোকাল টাইম অফসেট ক্যালকুলেশন করে YYYY-MM-DDTHH:mm ফরম্যাটে আনা
        const tzOffset = date.getTimezoneOffset() * 60000;
        const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
        return localISOTime;
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleQuiz(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (currentQuiz) {
            setValue("title", currentQuiz.title);
            setValue("category", currentQuiz.category);
            setValue("time_limit", currentQuiz.time_limit);

            // টাইম ফরম্যাট করে ইনপুটে সেট করা
            setValue("start_at", formatDateTimeLocal(currentQuiz.start_at));
            setValue("ends_at", formatDateTimeLocal(currentQuiz.ends_at));

            const formattedQuestions = currentQuiz.questions.map(q => ({
                question_text: q.question_text,
                optionA: q.options.A,
                optionB: q.options.B,
                optionC: q.options.C,
                optionD: q.options.D,
                correct_answer: q.correct_answer
            }));
            replace(formattedQuestions);
        }
    }, [currentQuiz, setValue, replace]);

    const onSubmit = async (data) => {
        setIsUpdating(true);

        // সাবমিট করার আগে টাইমকে পুনরায় ISO/UTC ফরম্যাটে রূপান্তর
        const formattedData = {
            ...data,
            start_at: new Date(data.start_at).toISOString(),
            ends_at: new Date(data.ends_at).toISOString(),
        };
        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-quiz/${id}`, formattedData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                // 🔥 সাকসেস মেসেজ
                Swal.fire({
                    title: "Success!",
                    text: "Quiz updated successfully!",
                    icon: "success",
                    confirmButtonColor: "#4F46E5",
                    confirmButtonText: "OK",
                    allowOutsideClick: false // বাইরে ক্লিক করলে যেন পপআপ বন্ধ না হয়
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/admin/quiz-management"); // ওকে ক্লিক করলে রিডাইরেক্ট হবে
                    }
                });
            }
        } catch (err) {
            // 🔥 এরর মেসেজ
            const errorMessage = err.response?.data?.error || "Update failed. Please try again.";
            Swal.fire({
                title: "Error!",
                text: errorMessage,
                icon: "error",
                confirmButtonColor: "#d33",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) return <div className="p-20 text-center font-bold">Loading Quiz Data...</div>;

    return (
        <main className="p-6 md:p-12 max-w-5xl mx-auto bg-white min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-2">
                        <FaArrowLeft /> Back to List
                    </button>
                    <h1 className="text-3xl font-black text-slate-900">Edit Quiz Set</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-slate-600">Quiz Title</label>
                        <input {...register("title", { required: true })} className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter quiz title" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600">Category</label>
                        <select {...register("category", { required: true })} className="w-full p-3 rounded-xl border outline-none">
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600">Time Limit (Minutes)</label>
                        <input {...register("time_limit", { required: true })} type="number" className="w-full p-3 rounded-xl border outline-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600">Start Date & Time (Local)</label>
                        <input {...register("start_at", { required: true })} type="datetime-local" className="w-full p-3 rounded-xl border outline-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600">End Date & Time (Local)</label>
                        <input {...register("ends_at", { required: true })} type="datetime-local" className="w-full p-3 rounded-xl border outline-none" />
                    </div>
                </div>

                {/* Questions Section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-800">Questions List ({fields.length})</h2>
                    {fields.map((field, index) => (
                        <div key={field.id} className="p-6 border border-slate-200 rounded-2xl relative bg-white shadow-sm">
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="absolute top-4 right-4 text-red-400 hover:text-red-600"
                            >
                                <FaTrash />
                            </button>

                            <div className="mb-4">
                                <label className="text-sm font-bold text-slate-500 mb-1 block">Question {index + 1}</label>
                                <textarea
                                    {...register(`questions.${index}.question_text`, { required: true })}
                                    className="w-full p-3 border rounded-xl outline-none focus:border-blue-500"
                                    placeholder="Type your question here..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['A', 'B', 'C', 'D'].map(opt => (
                                    <div key={opt} className="flex items-center gap-2 border p-2 rounded-xl">
                                        <span className="font-bold text-slate-400">{opt}:</span>
                                        <input
                                            {...register(`questions.${index}.option${opt}`, { required: true })}
                                            placeholder={`Option ${opt}`}
                                            className="w-full outline-none"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 p-3 bg-blue-50 rounded-xl flex items-center gap-4">
                                <span className="text-sm font-bold text-blue-700">Correct Answer:</span>
                                <div className="flex gap-4">
                                    {['A', 'B', 'C', 'D'].map(opt => (
                                        <label key={opt} className="flex items-center gap-1 cursor-pointer">
                                            <input
                                                type="radio"
                                                value={opt}
                                                {...register(`questions.${index}.correct_answer`, { required: true })}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <span className="font-bold">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 pt-6">
                    <button
                        type="button"
                        onClick={() => append({ question_text: "", optionA: "", optionB: "", optionC: "", optionD: "", correct_answer: "A" })}
                        className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-all"
                    >
                        <FaPlus /> Add New Question
                    </button>

                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-black shadow-lg hover:bg-blue-700 disabled:bg-blue-300 transition-all flex items-center justify-center gap-2"
                    >
                        <FaSave /> {isUpdating ? "Updating Quiz..." : "Update Quiz Set"}
                    </button>
                </div>
            </form>
        </main>
    );
}