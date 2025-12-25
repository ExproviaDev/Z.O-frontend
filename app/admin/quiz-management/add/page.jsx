"use client";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createQuizAction, resetQuizStatus } from "../../../store/slices/quizSlice";
import { FaTrash, FaPlus, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const categories = ["SDG Activist", "SDG Ambassador", "SDG Achiever"];

export default function AddQuiz() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading: isSaving, error: reduxError } = useSelector((state) => state.quiz);
  const [errorMessage, setErrorMessage] = useState("");

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      category: "",
      start_at: "",
      ends_at: "", // নতুন এন্ড টাইম ফিল্ড
      time_limit: 30,
      questions: [{ question_text: "", optionA: "", optionB: "", optionC: "", optionD: "", correct_answer: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "questions" });

  const onSubmit = async (data) => {
    setErrorMessage("");
    
    // ডুপ্লিকেট প্রশ্ন চেক
    const questionTexts = data.questions.map(q => q.question_text.trim().toLowerCase());
    if (new Set(questionTexts).size !== questionTexts.length) {
      setErrorMessage("Duplicate questions detected! Please ensure all questions are unique.");
      return;
    }

    // টাইম ভ্যালিডেশন (Start Time অবশ্যই End Time এর আগে হতে হবে)
    if (new Date(data.start_at) >= new Date(data.ends_at)) {
      setErrorMessage("End time must be after the start time!");
      return;
    }

    // টাইম ফরম্যাট কনভার্ট (Local to ISO/UTC)
    const formattedData = {
      ...data,
      start_at: new Date(data.start_at).toISOString(),
      ends_at: new Date(data.ends_at).toISOString(), // এন্ড টাইম কনভার্ট
    };

    try {
      const resultAction = await dispatch(createQuizAction(formattedData)).unwrap();

      if (resultAction.success) {
        alert("Quiz set published successfully!");
        reset();
        dispatch(resetQuizStatus());
        router.push("/admin/quiz-management");
      }
    } catch (err) {
      setErrorMessage(err || "Failed to publish quiz. Please try again.");
    }
  };

  const labelStyle = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1";
  const inputStyle = "w-full p-3.5 bg-[#F9FAFB] border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-700 font-medium";

  return (
    <main className="p-4 md:p-12 max-w-7xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create New Quiz Set</h1>
          <p className="text-slate-500 font-medium mt-1">Setup your Olympiad questions and schedule.</p>
        </div>
        <button onClick={() => router.back()} className="px-6 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm shadow-sm">
          ← Back
        </button>
      </div>

      {/* Error Message Display */}
      {(errorMessage || reduxError) && (
        <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <FaExclamationCircle className="shrink-0" />
          <p className="font-bold text-sm">{errorMessage || reduxError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {/* Section 1: Quiz Configuration */}
        <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Quiz Set Configuration</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1 md:col-span-2">
              <label className={labelStyle}>Quiz Title*</label>
              <input {...register("title", { required: true })} placeholder="e.g. SDG Global Challenge" className={inputStyle} />
            </div>
            
            <div className="space-y-1">
              <label className={labelStyle}>Category</label>
              <select {...register("category", { required: true })} className={inputStyle}>
                <option value="">Select one</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className={labelStyle}>Time Limit (Min)</label>
              <input {...register("time_limit", { required: true })} type="number" className={inputStyle} />
            </div>

            <div className="space-y-1">
              <label className={labelStyle}>Start Date & Time (Local Time)*</label>
              <input {...register("start_at", { required: true })} type="datetime-local" className={inputStyle} />
            </div>

            <div className="space-y-1">
              <label className={labelStyle}>End Date & Time (Local Time)*</label>
              <input {...register("ends_at", { required: true })} type="datetime-local" className={inputStyle} />
            </div>
          </div>
        </section>

        {/* Section 2: Questions (বাকি অংশ আগের মতোই থাকবে) */}
        <section className="space-y-8">
          <div className="flex items-center justify-between sticky top-4 z-10 bg-white/80 backdrop-blur-md py-2 px-4 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Questions & Answers</h2>
            </div>
            <div className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
              Count: {fields.length}
            </div>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="group bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 relative transition-all hover:border-blue-200">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-blue-600/20 group-hover:text-blue-600 transition-colors">#{String(index + 1).padStart(2, '0')}</span>
                  <div className="h-px w-12 bg-slate-100"></div>
                </div>
                <button type="button" onClick={() => remove(index)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                  <FaTrash size={18} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <label className={labelStyle}>Question Description</label>
                  <textarea {...register(`questions.${index}.question_text`, { required: true })} placeholder="Question text..." className={`${inputStyle} min-h-[100px] resize-none py-4`} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['A', 'B', 'C', 'D'].map((opt) => (
                    <div key={opt} className="relative group/opt">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-300 group-focus-within/opt:text-blue-500 transition-colors">{opt}</span>
                      <input {...register(`questions.${index}.option${opt}`, { required: true })} placeholder={`Option ${opt}`} className={`${inputStyle} pl-12`} />
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">Select Correct Answer</label>
                  <div className="flex flex-wrap gap-8">
                    {['A', 'B', 'C', 'D'].map((opt) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group/radio">
                        <input type="radio" value={opt} {...register(`questions.${index}.correct_answer`, { required: true })} className="peer hidden" />
                        <div className="w-6 h-6 border-2 border-slate-300 rounded-full flex items-center justify-center peer-checked:border-blue-600 transition-all">
                          <div className="w-3 h-3 bg-blue-600 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                        </div>
                        <span className="font-bold text-slate-600 peer-checked:text-blue-600 transition-colors">Option {opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Footer Actions */}
        <div className="flex flex-col md:flex-row items-center gap-6 pt-10 border-t border-slate-100">
          <button
            type="button"
            onClick={() => append({ question_text: "", optionA: "", optionB: "", optionC: "", optionD: "", correct_answer: "" })}
            className="w-full md:w-auto px-10 py-4 bg-slate-50 text-slate-900 border-2 border-dashed border-slate-200 rounded-2xl font-black hover:border-blue-500 hover:text-blue-600 transition-all flex items-center justify-center gap-3 group"
          >
            <FaPlus className="group-hover:rotate-90 transition-transform" />
            Add More Question
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className={`w-full md:flex-1 py-4 rounded-2xl font-black text-lg transition-all shadow-2xl flex items-center justify-center gap-4 ${isSaving ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"}`}
          >
            {isSaving ? "Publishing..." : <><FaCheckCircle /> Confirm & Publish Quiz Set</>}
          </button>
        </div>
      </form>
    </main>
  );
}