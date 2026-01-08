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
              <p className="text-sm text-gray-500">Terms of Use</p>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-10">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            1. Introduction and Acceptance of Terms
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Acceptance:</strong> By accessing or using the BarPrime
              Prep Center website, mobile applications, or services
              (collectively, the &quot;Services&quot;), you agree to these Terms of Use
              and the referenced{" "}
              <a
                href="/privacy-policy"
                className="text-indigo-600 hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
            <p>
              <strong>Modification:</strong> We reserve the right to modify
              these Terms at any time. Material changes will be communicated by
              posting on the site or by email when practical. Your continued use
              after such changes constitutes acceptance of the updated Terms.
            </p>
            <p>
              <strong>Governing Law:</strong> These Terms are governed by the
              laws of [State/Jurisdiction].
            </p>
            <p>
              <strong>Eligibility:</strong> You must be at least 18 years old or
              the age of legal majority in your jurisdiction to use the
              Services.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            2. User Accounts and Registration
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Registration Data:</strong> You agree to provide true,
              accurate, current, and complete information when creating an
              account and to keep that information up to date.
            </p>
            <p>
              <strong>Account Security:</strong> You are solely responsible for
              maintaining the confidentiality of your password and account, and
              for all activities that occur under your account.
            </p>
            <p className="text-red-600">
              <strong>No Sharing:</strong> Sharing accounts, login credentials,
              or course materials is strictly prohibited. Such sharing is a
              material breach of these Terms and may result in immediate
              termination of access without refund.
            </p>
            <p>
              <strong>Termination/Suspension:</strong> We may suspend or
              terminate accounts immediately for inaccurate registration data,
              security breaches, or violation of these Terms.
            </p>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            3. Intellectual Property Rights
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Ownership:</strong> All Content — including videos,
              outlines, practice questions, mock exams, lecture notes, software,
              and designs — is the exclusive property of BarPrime Prep Center or
              its licensors and is protected by copyright and other intellectual
              property laws.
            </p>
            <p>
              <strong>Limited License:</strong> Subject to these Terms, you are
              granted a non-exclusive, non-transferable, limited license to
              access and use the Content solely for your personal bar
              examination preparation.
            </p>
            <p>
              <strong>Restrictions on Use:</strong> You may not copy, reproduce,
              distribute, modify, sell, create derivative works from, or share
              the Content with any third party. Recording, screen-capturing, or
              downloading videos or materials is prohibited except as explicitly
              permitted. Using the Content for commercial purposes or for the
              benefit of competitors is also prohibited.
            </p>
            <p>
              <strong>User-Generated Content:</strong> If you post comments,
              forum posts, or other submissions, you retain ownership of your
              contributions but grant BarPrime a perpetual, worldwide,
              royalty-free, sublicensable license to use, reproduce, modify,
              publish, and display them. You agree not to post content that is
              unlawful, defamatory, infringing, or otherwise objectionable.
            </p>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            4. Payment Terms, Fees, and Refunds
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Pricing:</strong> Course prices and fees are listed on the
              checkout page. Prices may change but changes do not affect
              purchases already completed.
            </p>
            <p>
              <strong>Billing/Payment:</strong> We accept the payment methods
              listed at checkout. If you enroll in a subscription or recurring
              plan, you authorize recurring charges until cancellation. Failed
              payments may result in immediate loss of access.
            </p>
            <p>
              <strong>Refund Policy:</strong> Refund eligibility is outlined at
              purchase. Common approaches include refunds within{" "}
              <em>[X] days</em> of purchase or before accessing a set portion of
              content. To request a refund, contact support at{" "}
              <a
                href="mailto:support@barprime.io"
                className="text-indigo-600 hover:underline"
              >
                support@barprime.io
              </a>
              . Cancellation fees may apply.
            </p>
            <p>
              <strong>Pass Guarantee (if applicable):</strong> Any pass
              guarantee will be described in detail on the product page,
              including eligibility requirements, documentation required, and
              procedures to claim a free repeat or refund.
            </p>
            <p>
              <strong>Taxes:</strong> You are responsible for any applicable
              taxes related to the purchase.
            </p>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            5. Educational Use Disclaimer and Limitation of Liability
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>No Guarantee of Success:</strong> The Content is for
              educational purposes only. BarPrime makes NO WARRANTY OR GUARANTEE
              that you will pass the bar examination. Results depend on
              individual effort and circumstances.
            </p>
            <p>
              <strong>Not Legal Advice:</strong> The Content is not legal advice
              and does not create an attorney-client relationship.
            </p>
            <p>
              <strong>As-Is Service:</strong> Services and Content are provided
              &quot;as-i&quot; without warranties of any kind, express or implied.
            </p>
            <p>
              <strong>Limitation of Liability:</strong> To the maximum extent
              permitted by law, BarPrime&apos;s liability is limited to the amount
              paid by you for the Services in the twelve (12) months preceding
              the claim. We exclude liability for indirect, incidental,
              punitive, and consequential damages.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            6. User Conduct and Prohibited Activities
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>No harassment, hate speech, or abuse of users or staff.</li>
            <li>No uploading of viruses, malware, or engaging in hacking.</li>
            <li>No interference with site operations or security.</li>
            <li>No activity that violates applicable laws or regulations.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            7. Dispute Resolution and Arbitration
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Disputes:</strong> Disputes arising from these Terms will
              be resolved as described here. You agree that, to the fullest
              extent permitted by law, all disputes will be resolved through
              binding arbitration rather than in court, and you waive any right
              to a jury trial or to participate in a class action unless
              otherwise required by law.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            8. Miscellaneous Provisions
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Privacy Policy Reference:</strong> Our collection and use
              of personal information is governed by our{" "}
              <a
                id="privacy"
                href="/privacy-policy"
                className="text-indigo-600 hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
            <p>
              <strong>Contact Information:</strong> For legal notices or
              support, contact us at{" "}
              <a
                href="mailto:support@barprime.io"
                className="text-indigo-600 hover:underline"
              >
                support@barprime.io
              </a>
              .
            </p>
            <p>
              <strong>Severability:</strong> If any provision of these Terms is
              found unenforceable, the remaining provisions remain in full force
              and effect.
            </p>
          </div>
        </section>
        <section id="contact" className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <div className="mt-4 ">
            <p className="text-sm">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@barprime.io"
                className="text-indigo-600 hover:underline"
              >
                support@barprime.io
              </a>
            </p>
            {/* <p className="text-sm mt-2">
            <strong>Address:</strong> [Optional physical address here]
          </p> */}
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
