import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaGlobeAmericas,
  FaHome,
  FaHourglassHalf,
} from "react-icons/fa";

export const metadata = {
  title: "Registration Closed | Zero Olympiad",
  description:
    "Zero Olympiad Season 2 registration is closed. Season 3 is coming soon. Register for Global Leadership Training Summit (GLTS).",
};

const GLTS_URL = "https://glts.faatihaaayat.com/";

export default function RegistrationClosedPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#083E5F] via-[#0a4d73] to-[#083E5F] font-sans">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#E3621C]/20 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:px-6">
        <div className="w-full max-w-2xl">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/95 shadow-2xl shadow-black/25 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-[#E3621C] to-[#f07a35] px-6 py-5 text-center sm:px-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                <FaHourglassHalf className="text-sm" />
                Registration Closed
              </span>
            </div>

            <div className="px-6 py-10 text-center sm:px-10 sm:py-12">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#083E5F]/10">
                <FaCalendarCheck className="text-4xl text-[#083E5F]" />
              </div>

              <h1 className="text-3xl font-black leading-tight text-[#083E5F] sm:text-4xl">
                Zero Olympiad Season is Closed
              </h1>

              <p className="mt-4 text-lg font-semibold text-[#E3621C]">
                Season 3 is coming soon
              </p>

              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-600">
                Thank you for your interest in Zero Olympiad. Registration for
                the current season has ended. Stay tuned — we will announce
                Season 3 soon.
              </p>

              <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <div className="rounded-2xl border border-[#E3621C]/25 bg-gradient-to-br from-orange-50 to-amber-50 p-6 text-left sm:p-7">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#083E5F] text-white">
                    <FaGlobeAmericas className="text-xl" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-lg font-bold text-[#083E5F]">
                      Global Leadership Training Summit (GLTS)
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      You can still register for our Global Leadership Training
                      Summit (GLTS) while you wait for Season 3.
                    </p>
                    <a
                      href={GLTS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E3621C] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#c95418] active:scale-[0.98] sm:w-auto"
                    >
                      Register for GLTS
                      <FaArrowRight />
                    </a>
                  </div>
                </div>
              </div>

              <Link
                href="/"
                className="mt-8 inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#083E5F] underline-offset-4 transition hover:text-[#E3621C] hover:underline"
              >
                <FaHome />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#E3621C]/15 blur-3xl"
        aria-hidden
      />
    </div>
  );
}
