import FaqContent from "./Components/FaqComponent";

export const revalidate = 86400;

export default function FAQPage() {
  const faqData = [
    {
      q: "What is Zero Olympiad?",
      a: "Zero Olympiad is an educational and competitive platform where students have the opportunity to learn and compete on global issues, innovation, leadership, and sustainable development. Through various rounds, training, mentorship, and challenges, participants can enhance their skills and are inspired to contribute to positive social change. I can provide further details about registration, categories, or competition stages if you're interested.",
    },
    {
      q: "How to register?",
      a: "You can find the registration link and all other relevant information by visiting the Zero Olympiad website at zeroolympiad.com. If you'd like, I can also WhatsApp the website link to your number.",
    },
    {
      q: "What is the next step after registration?",
      a: "Immediately after registration, you will receive an automatic email containing a link to the UN course and other detailed information.",
    },
    {
      q: "What is the registration fee?",
      a: "The regular registration fee is 400 BDT. However, as a 'Ramadan Reward' for the holy month of Ramadan, you can register for only 300 BDT. After Ramadan, the fee will revert to the standard 400 BDT.",
    },
    {
      q: "Since the UN Course is free, why is there a registration fee?",
      a: "The fee is used to cover the costs of numerous rewards provided by Zero Olympiad, such as international boot camps, cash prizes, crests, trophies, and certificates. Additionally, it contributes to the logistics, hospitality, and travel and accommodation expenses for international guests attending the Grand Final on June 6th.",
    },
    {
      q: "What will I learn from these courses?",
      a: `You will be assigned different courses from the UN based on your category:
         Class 5 – Class 8 (SDG 1 – SDG 4): Sport For Climate Action
         Class 9 – University Admission Candidates (SDG 5 – SDG 10): Becoming A Climate Champion
         Bachelor – Masters and above (SDG 11 – SDG 17): Scaling Climate Finance`,
    },
    {
      q: "I am a Bangla Medium student; is it possible for me to complete the course?",
      a: "Although the UN courses are conducted in English, we provide the opportunity to participate in our exams in both Bengali and English. If you face any difficulty with the English course materials, our support team is available to assist you.",
    },
    {
      q: "What will be the question pattern?",
      a: "The 1st round will consist of 30 MCQ questions based on the UN course you have completed. In the 2nd round, participants will create a 3-minute video on an assigned SDG based on their respective class or grade.",
    },
    {
      q: "I have finished my Master's degree; can I join?",
      a: "Yes, you can participate. Your assigned category will focus on SDG 17.",
    },
    {
      q: "I live outside Bangladesh. Can I participate?",
      a: "Yes, participants from any country in the world can join. In our previous Grand Final, we had participants from China, Malaysia, Qatar, England, and Australia.",
    },
  ];

  return <FaqContent faqs={faqData} />;
}