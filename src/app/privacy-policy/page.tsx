export default function Page() {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-md flex items-center justify-center text-white font-bold">
              BP
            </div>
            <div>
              <h1 className="text-lg font-semibold">BarPrime Prep Center</h1>
              <p className="text-sm text-gray-500">Privacy Policy</p>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-10">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Commitment:</strong> We are committed to respecting the
              privacy of our users and protecting the personal information you
              share with us.
            </p>
            <p>
              <strong>Scope:</strong> This policy applies to information
              collected from you when you use the <em>BarPrime Prep Center</em>{" "}
              website, mobile application, and/or services (collectively, the
              &quot;Services&quot;).
            </p>
            <p>
              <strong>Reference to Terms:</strong> This Privacy Policy is
              incorporated by reference into our{" "}
              <a href="/terms-of-use" className="text-indigo-600 hover:underline">
                Terms of Use
              </a>
              .
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>

          <p className="mb-4 text-gray-700">
            We separate collected data into categories for clarity. The examples
            are illustrative and not exhaustive.
          </p>

          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full text-left divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">
                    Category
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">
                    Examples of Data Collected
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">
                    Purpose / Usage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                <tr>
                  <td className="px-6 py-4 font-semibold">
                    A. Personal Identification Data
                  </td>
                  <td className="px-6 py-4">
                    Full name, email address, phone number, date of birth,
                    location
                  </td>
                  <td className="px-6 py-4">
                    Account creation, billing, communication, and customer
                    support.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">
                    B. Educational / Professional Data
                  </td>
                  <td className="px-6 py-4">
                    Intended bar exam jurisdiction, anticipated exam date,
                    performance data (quiz scores, mock exam essays, study
                    hours)
                  </td>
                  <td className="px-6 py-4">
                    Personalizing the curriculum, providing performance
                    feedback, and improving course content.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">
                    C. Technical / Usage Data
                  </td>
                  <td className="px-6 py-4">
                    IP address, browser type, operating system, pages viewed,
                    time spent on lectures/quizzes, referral source
                  </td>
                  <td className="px-6 py-4">
                    Site functionality, security, diagnostics, and internal
                    analytics.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">
                    D. Cookies &amp; Tracking Data
                  </td>
                  <td className="px-6 py-4">
                    Information collected via cookies, web beacons, and similar
                    technologies
                  </td>
                  <td className="px-6 py-4">
                    Personalizing content, remembering user preferences, and
                    marketing/advertising.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            3. How We Use Your Information (Purposes of Processing)
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>
              <strong>To Provide and Manage the Services:</strong> Create your
              account, grant access to Content, and provide customer support.
            </li>
            <li>
              <strong>To Personalize the Experience:</strong> Track progress,
              identify weak areas, and suggest customized study schedules or
              materials.
            </li>
            <li>
              <strong>For Communication:</strong> Send transactional emails
              (receipts, account status) and — with your consent — marketing or
              promotional materials.
            </li>
            <li>
              <strong>For Analytics and Improvement:</strong> Analyze usage
              patterns, measure Content effectiveness, and develop new features.
            </li>
            <li>
              <strong>For Legal Compliance and Security:</strong> Comply with
              legal obligations, enforce the Terms of Use, and prevent fraud or
              unauthorized access (e.g., account sharing).
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            4. How We Share Your Information
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Service Providers:</strong> We may share data with trusted
              third parties who perform functions on our behalf (payment
              processors, hosting providers, email services). These parties are
              typically bound by confidentiality agreements.
            </p>
            <p>
              <strong>Aggregate / Anonymized Data:</strong> We may share
              non-personally identifiable data (e.g., general pass rates,
              average time spent on a subject) with the public, partners, or
              researchers.
            </p>
            <p>
              <strong>Legal Requirements:</strong> We will disclose information
              if required by law, subpoena, or court order.
            </p>
            <p>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or asset sale, user data may be transferred to the
              new owner.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
          <p className="text-gray-700">
            We implement reasonable technical and organizational measures to
            protect your information, such as encryption in transit, firewalls,
            and secure server hosting. However, no method of transmission over
            the Internet or electronic storage is 100% secure. While we strive
            to protect your information, we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">6. Data Retention</h2>
          <p className="text-gray-700">
            We retain personal data as long as your account is active or as
            necessary to fulfill the purposes described in this policy, and to
            comply with legal and regulatory obligations. When data is no longer
            required, we will securely delete or anonymize it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            7. Your Privacy Rights
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>
              <strong>Access / Correction:</strong> You have the right to access
              and update personal information we hold about you.
            </li>
            <li>
              <strong>Deletion / Erasure:</strong> You may request deletion of
              your personal data (&quot;Right to be Forgotten&quot;), subject to legal
              exceptions (for example, data required for billing or legal
              compliance).
            </li>
            <li>
              <strong>Opt-Out of Marketing:</strong> To stop receiving marketing
              communications, follow the unsubscribe link in marketing emails or
              contact us (see Contact section).
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            8. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy periodically. If we make
            significant changes, we will notify users by email or by posting a
            prominent notice on the site. We recommend checking this page
            regularly for updates.
          </p>
        </section>

        <section id="contact" className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
          <p className="text-gray-700">
            If you have questions about this policy or want to exercise your
            privacy rights, contact us at:
          </p>

          <div className="mt-4">
            <p className="text-sm">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@barprime.io"
                className="text-indigo-600 hover:underline"
              >
                support@barprime.io
              </a>
            </p>
          </div>
        </section>
        <footer className="text-center text-sm text-gray-500 py-8">
          <p>
            &copy; <span id="year"></span> BarPrime Prep Center. All rights
            reserved.
          </p>
        </footer>
      </main>
    </>
  );
}
