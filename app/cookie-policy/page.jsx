export const revalidate = 604800;
const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-extrabold mb-6 text-Secondary">Cookie Policy</h1>
      <p className="mb-4 text-sm text-gray-500">Last Updated: February 7, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. What are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device to help websites work efficiently. At <strong>Zero Olympiad</strong>, we use cookies to provide a seamless registration and competition experience for our users.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. How We Use Cookies</h2>
        <p className="mb-2">We use cookies for the following purposes:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Authentication:</strong> To keep you logged in during your session and protect your account security.</li>
          <li><strong>Preferences:</strong> To remember your settings, such as language or dashboard views.</li>
          <li><strong>Analytics:</strong> To understand how users interact with our site, which helps us optimize performance for large-scale events (up to 20,000+ users).</li>
          <li><strong>Payment Processing:</strong> To facilitate secure transactions via <strong>bKash</strong> and other gateways.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">3. Third-Party Cookies</h2>
        <p>We use trusted third-party services that may set cookies on your device:</p>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li><strong>Vercel:</strong> For performance monitoring and speed insights.</li>
          <li><strong>SendGrid:</strong> To manage transactional emails and OTP delivery.</li>
          <li><strong>Supabase:</strong> To handle secure database connections and user sessions.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">4. Managing Your Cookies</h2>
        <p>
          Most browsers allow you to control cookies through their settings. You can block or delete cookies, but please note that doing so may prevent you from participating in the Olympiad or accessing your dashboard.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">5. Contact Us</h2>
        <p>
          If you have any questions about our Cookie Policy, please contact us at:
          <br />
          <strong>Email:</strong> info@zeroolympiad.com
          <br />
          <strong>Website:</strong> <a href="https://zeroolympiad.faatihaaayat.com/" className="text-orange-500 underline">zeroolympiad.faatihaaayat.com</a>
        </p>
      </section>
    </div>
  );
};

export default CookiePolicy;