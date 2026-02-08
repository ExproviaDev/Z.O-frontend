export default function Page() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-slate-900">Privacy Policy</h1>

      <div className="pb-6">
        <hr className="border-gray-300" />
      </div>

      <p className="mb-4 text-slate-700 leading-relaxed">
        This Privacy Policy ("Policy") describes how Zero Olympiad collects, uses, 
        and protects your personal information. This policy applies when you visit 
        the website and participate in the site's activities.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">
        1. Information We Collect
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-700">
        <li>Name, email, and phone number — through registration or contact forms.</li>
        <li>
          Payment-related data — if any fees apply (processed via third-party 
          payment gateways).
        </li>
        <li>
          Technical data — IP address, browser type, device information, log files, 
          and cookies.
        </li>
        <li>
          Content submitted by you — for example: assignments, videos, feedback, etc.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">
        2. Purpose of Using Data
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-700">
        <li>To provide services and verify participation.</li>
        <li>Communication — including emails, notifications, and event updates.</li>
        <li>To improve site functionality and ensure security.</li>
        <li>
          To share information upon request if required for legal or security 
          obligations.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">
        3. Cookies and Tracking Technologies
      </h2>
      <p className="mb-4 text-slate-700">
        We may use cookies to improve analytics, functionality, and user experience. 
        Disabling cookies in your browser may cause some features to not work properly.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">
        4. Data Sharing & Third-Party Disclosure
      </h2>
      <p className="mb-4 text-slate-700">
        Your information may be shared with third parties (e.g., payment gateways, 
        CRM, mail services) only for service provision or legal requirements. 
        We do not sell or distribute personal information to commercial third parties.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">5. Security</h2>
      <p className="mb-4 text-slate-700">
        We implement technical and administrative security measures (such as HTTPS, 
        database access control) to protect your information from unauthorized access. 
        However, online communication is never 100% secure — please remain cautious 
        when sharing sensitive information.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">6. Your Rights</h2>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-700">
        <li>Access: The right to request information about the data we hold.</li>
        <li>Correction: The right to request corrections to inaccurate or incomplete information.</li>
        <li>Deletion: The right to apply for the deletion of your data when necessary.</li>
        <li>Opt-out: The right to request to stop receiving notifications or emails.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">
        7. Policy Changes
      </h2>
      <p className="mb-4 text-slate-700">
        We may update this Privacy Policy from time to time. All updates will be 
        published on this page.
      </p>

      <p className="mt-8 text-gray-500 font-medium">
        Last Updated: {new Date().toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
    </div>
  );
}