export default function Page() {
  const SITE_NAME = "Zero Olympiad";
  const CONTACT_EMAIL = "faatiha.aayat@gmail.com";
  const CONTACT_PHONE = "01973570203";
  const ADDRESS = "Dhaka, Bangladesh";

  return (
    <div className="max-w-4xl mx-auto  py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
      
      <div className="pb-6">
        <hr className="text-gray-400" />
      </div>

      <p className="mb-4">
        এই শর্তাবলী (“Terms”) {SITE_NAME} প্লাটফর্ম ব্যবহারের সকল নিয়ম এবং
        বাধ্যবাধকতা নির্ধারণ করে। সাইট ব্যবহার করলে আপনি এই শর্তাবলীতে সম্মতি
        দিচ্ছেন।
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">১. সাইট ব্যবহারের অধিকার</h2>
      <p className="mb-4">
        প্লাটফর্মটি শিক্ষামূলক উদ্দেশ্যে তৈরি। আপনি কোনো অবৈধ, ক্ষতিকর বা
        বিভ্রান্তিকর কার্যকলাপের জন্য সাইট ব্যবহার করতে পারবেন না।
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">২. অ্যাকাউন্ট দায়িত্ব</h2>
      <p className="mb-4">
        আপনার অ্যাকাউন্টের তথ্য, পাসওয়ার্ড এবং নিরাপত্তা রক্ষা করা সম্পূর্ণ আপনার
        দায়িত্ব। কোনো অননুমোদিত অ্যাক্সেস হলে অবিলম্বে আমাদের জানাতে হবে।
      </p>

      {/* ------------ Your requested content starts from here ----------- */}

      <h2 className="text-2xl font-semibold mt-6 mb-3">৩. রেজিস্ট্রেশন ও ফি</h2>
      <p className="mb-4">
        কোনো রেজিস্ট্রেশন ফি থাকলে তার পরিশোধ প্রক্রিয়া তৃতীয় পক্ষের পেমেন্ট
        গেটওয়ে মাধ্যমে অনুষ্ঠিত হবে। সকল ফি রিফান্ড পলিসি আলাদা শর্তের অধীনে
        নির্ধারিত হবে — রিফান্ড সম্পর্কিত নির্দিষ্ট নিয়ম রেজিস্ট্রেশন পেজে উল্লেখ
        থাকবে।
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">৪. অংশগ্রহণকারীর দায়িত্ব</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>রেজিস্ট্রেশনকালে সঠিক ও আপ-টু-ডেট তথ্য প্রদান করা।</li>
        <li>
          প্রতিযোগিতার নিয়মাবলী মেনে চলা; কোনো তৃতীয় পক্ষের কপিরাইট লঙ্ঘন করা
          অথবা অনুজ্ঞাবিহীন কন্টেন্ট জমা দেওয়া যাবে না।
        </li>
        <li>প্রতারণামূলক আচরণ বা অসদাচরণ করা থেকে বিরত থাকা।</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">৫. কপিরাইট ও কন্টেন্ট</h2>
      <p className="mb-4">
        সাইটে প্রদর্শিত সমস্ত কন্টেন্ট (লেখা, লোগো, ছবি, ভিডিও) স্বত্বাধিকারী বা
        লাইসেন্সপ্রাপ্ত। আপনি কোনো কন্টেন্ট জমা দিলে, আপনি সাইটকে বিশ্বব্যাপী,
        রায়হীন, অ-একচেটিয়া লাইসেন্স প্রদান করেন যাতে সাইট সেই কন্টেন্ট ব্যবহার,
        প্রদর্শন ও প্রচার করতে পারে (কন্টেন্ট ব্যবহারের বিস্তারিত আলাদা নীতিতে
        উল্লেখ আছে)।
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">৬. দায়-শূন্যতা (Disclaimer)</h2>
      <p className="mb-4">
        আমাদের সেবা ‘যেমন আছে’ ভিত্তিতে প্রদান করা হয়। আমরা সুনির্দিষ্ট ফলাফল,
        সামঞ্জস্যতা বা নিরবিচ্ছিন্ন সেবা সম্পর্কে কোনো নিশ্চয়তা দিই না। আইনি
        সীমাবদ্ধতা ছাড়া আমরা কোনো সরাসরি বা পরোক্ষ ক্ষতির জন্য দায়ী থাকব না।
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">৭. আইনি বিষয়</h2>
      <p className="mb-4">
        এই শর্তাবলী বাংলাদেশ-এর আইন দ্বারা নিয়ন্ত্রিত হবে এবং যেকোনো বিরোধের
        ক্ষেত্রে ঢাকার আদালত আইনাঞ্চল হিসেবে বিবেচিত হবে (subject to consumer
        protection laws).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">৮. যোগাযোগ</h2>
      <p className="mb-4">
        শর্তাবলী বা রেজিস্ট্রেশন সংক্রান্ত কোনো প্রশ্ন থাকলে যোগাযোগ করুন:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline">
          {CONTACT_EMAIL}
        </a>
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">৯. পরিবর্তন</h2>
      <p className="mb-4">
        আমরা এই শর্তাবলী সময় সময় আপডেট করতে পারি। বড় কোনো পরিবর্তন হলে সাইটে
        নোটিশ দেওয়া হবে। সর্বশেষ আপডেট: {new Date().toLocaleDateString("bn-BD")}.
      </p>

      {/* Footer */}
      <footer className="mt-10 text-sm text-gray-600">
        <p>
          {SITE_NAME} • {ADDRESS} • {CONTACT_PHONE}
        </p>
      </footer>
    </div>
  );
}
