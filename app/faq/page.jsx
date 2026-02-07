import FaqContent from "./Components/FaqComponent";

// ১ দিনের জন্য ISR সেটআপ (২৪ ঘণ্টা = ৮৬৪০০ সেকেন্ড)
export const revalidate = 86400;

export default function FAQPage() {
  // এই ডাটাটি আপনি চাইলে fetch ব্যবহার করে API থেকেও আনতে পারেন
  const faqData = [
    {
      q: "What is the primary objective of Zero Olympiad?",
      a: "The core mission is 'Reducing to Zero, Rising as Hero' – inspiring children to take initiative in solving social challenges.",
    },
    {
      q: "Who is the organizer of Zero Olympiad?",
      a: "Zero Olympiad is organized by Faatiha Aayat.",
    },
    {
      q: "In which section can I find the introductory video?",
      a: "The video is available in the 'Zero Olympiad Guidelines' section.",
    },
    {
      q: "What type of competition is Zero Olympiad?",
      a: "It is a child-centric global education and awareness-based competition.",
    },
    {
      q: "What is the central theme of Zero Olympiad?",
      a: "The theme is 'Reducing To Zero' — aimed at bringing social issues down to zero through youth engagement.",
    },
  ];

  return <FaqContent faqs={faqData} />;
}