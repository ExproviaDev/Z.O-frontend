export const revalidate = 604800;
export default function Page() {
  const SITE_NAME = "Zero Olympiad";
  const CONTACT_EMAIL = "admin@zeroolympiad.com";
  const CONTACT_PHONE = "01973570203";
  const ADDRESS = "Dhaka, Bangladesh";

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-slate-900">Terms & Conditions</h1>
      
      <div className="pb-6">
        <hr className="border-gray-300" />
      </div>

      <p className="mb-4 text-slate-700 leading-relaxed">
        These Terms and Conditions ("Terms") govern the use of the {SITE_NAME} platform. 
        By accessing or using this site, you agree to comply with and be bound by these Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">1. Right to Use Site</h2>
      <p className="mb-4 text-slate-700">
        This platform is created for educational purposes. You may not use the site for any 
        illegal, harmful, or misleading activities.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">2. Account Responsibility</h2>
      <p className="mb-4 text-slate-700">
        Maintaining the confidentiality of your account information, password, and overall 
        security is entirely your responsibility. You must notify us immediately in the 
        event of any unauthorized access.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">3. Registration & Fees</h2>
      <p className="mb-4 text-slate-700">
        Payment processes for any registration fees will be conducted through third-party 
        payment gateways. All fee refund policies are determined under separate terms—specific 
        rules regarding refunds will be mentioned on the registration page.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">4. Participant Responsibilities</h2>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-700">
        <li>Provide accurate and up-to-date information during registration.</li>
        <li>
          Adhere to competition rules; submission of content that violates third-party 
          copyrights or is unauthorized is strictly prohibited.
        </li>
        <li>Refrain from any fraudulent behavior or misconduct.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">5. Copyright & Content</h2>
      <p className="mb-4 text-slate-700">
        All content displayed on the site (text, logos, images, videos) is owned or licensed 
        by us. By submitting any content, you grant the site a worldwide, royalty-free, 
        non-exclusive license to use, display, and promote that content (detailed usage 
        terms are specified in a separate policy).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">6. Disclaimer</h2>
      <p className="mb-4 text-slate-700">
        Our services are provided on an "as is" basis. We do not guarantee specific results, 
        compatibility, or uninterrupted service. To the extent permitted by law, we shall not 
        be liable for any direct or indirect damages.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">7. Legal Matters</h2>
      <p className="mb-4 text-slate-700">
        These terms shall be governed by the laws of Bangladesh, and any disputes shall be 
        subject to the jurisdiction of the courts in Dhaka (subject to consumer protection laws).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">8. Contact Information</h2>
      <p className="mb-4 text-slate-700">
        If you have any questions regarding these terms or registration, please contact us at:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline hover:text-blue-800 transition-colors">
          {CONTACT_EMAIL}
        </a>
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-900">9. Amendments</h2>
      <p className="mb-4 text-slate-700">
        We may update these terms from time to time. Significant changes will be notified on 
        the site. Last Updated: {new Date().toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}.
      </p>

      {/* Footer */}
      <footer className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-600">
        <p className="font-medium">
          {SITE_NAME} • {ADDRESS} • {CONTACT_PHONE}
        </p>
      </footer>
    </div>
  );
}