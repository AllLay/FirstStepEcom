import React from "react";

const OurStory: React.FC = () => {
  return (
    <main className="min-h-screen my-10 px-6 max-w-4xl mx-auto">
      <div>
        <h2 className="mb-5 text-center mt-5 text-2xl">
          1. User Obligations (Dropshippers and Buyers)
        </h2>
        <p className="text-center border-gray-300 pb-5">
          All users of the platform, including both dropshippers and buyers,
          are required to comply with applicable laws, platform policies, and
          ethical standards of conduct. Dropshippers must ensure the accuracy
          of product listings, timely order fulfillment, and transparent
          communication regarding shipping and availability. They are also
          responsible for sourcing legal and safe products, providing accurate
          product descriptions, and resolving customer issues promptly.
        </p>
        <p className="text-center border-b mb-5 pb-5">
          Buyers agree to provide accurate personal and payment information and
          to use the platform solely for lawful purposes. Both parties must
          refrain from engaging in any fraudulent, abusive, or misleading
          activities that could harm the platform or other users. Violations of
          these obligations may result in account suspension or termination, as
          well as potential legal consequences.
        </p>
      </div>

      <div>
        <h2 className="mb-5 text-center text-2xl">
          2. Platform Responsibilities and Limitations
        </h2>
        <p className="text-center border-gray-300">
          The platform acts as an intermediary that facilitates transactions
          between buyers and dropshippers. While the platform strives to
          maintain a secure and efficient environment, it does not assume
          liability for the quality, legality, or delivery of products offered
          by dropshippers. The platform is not a party to the sales contract
          and does not guarantee the truthfulness or completeness of listings
          provided by third parties.
        </p>
        <p className="text-center border-b pb-5 mb-5">
          The platform reserves the right to monitor, suspend, or remove content
          or users that violate our policies. However, we are not responsible
          for the conduct of users outside the platform or for any offline
          transactions that may arise. The platform is provided{" "}
          <b>&quot;as is&quot;</b> and <b>&quot;as available&quot;</b>, and we do not warrant
          uninterrupted or error-free service.
        </p>
      </div>

      <div>
        <h2 className="mb-5 text-center text-2xl">
          3. Payments, Disputes, and Refunds
        </h2>
        <p className="text-center border-gray-300">
          All payment transactions conducted through the platform are subject to
          verification, processing, and settlement protocols as determined by
          our third-party payment processors. Users must comply with all
          requirements of the payment system, including providing accurate
          billing information.
        </p>
        <p className="text-center border-b pb-5 mb-5">
          In the event of disputes between buyers and dropshippers, the
          platform offers a limited resolution process to facilitate
          communication and attempt mediation. However, final resolution is the
          responsibility of the parties involved. Refund policies are subject
          to the specific terms of the dropshipper and must be clearly stated
          in their listing. The platform reserves the right to withhold funds,
          reverse transactions, or limit account access in cases of fraud,
          chargebacks, or policy violations.
        </p>
      </div>

      <div>
        <h2 className="mb-5 text-center text-2xl">
          4. Intellectual Property &amp; Content Ownership
        </h2>
        <p className="text-center border-gray-300">
          All content uploaded or posted by users, including product images,
          descriptions, brand names, and other media, must be original or
          properly licensed. By submitting content to the platform, users grant
          the platform a non-exclusive, worldwide, royalty-free license to use,
          reproduce, display, and distribute such content for operational and
          promotional purposes.
        </p>
        <p className="text-center border-b pb-5 mb-5">
          Users must not infringe on the intellectual property rights of others,
          and the platform reserves the right to remove or disable access to
          any content that is alleged to be infringing. Repeated violations may
          result in termination of access to the platform. All platform-generated
          content, code, and proprietary systems remain the intellectual
          property of the platform and may not be used, copied, or
          reverse-engineered without written consent.
        </p>
      </div>

      <div>
        <h2 className="mb-5 text-center text-2xl">
          5. Account Termination and Data Use
        </h2>
        <p className="text-center border-gray-300">
          The platform reserves the right to terminate or suspend user accounts
          at its sole discretion, particularly in cases of policy violations,
          illegal activity, or prolonged inactivity. Users may also request
          voluntary account deletion by contacting customer support, subject to
          the resolution of any outstanding transactions or disputes.
        </p>
        <p className="text-center">
          By using the platform, users consent to the collection, storage, and
          use of their data in accordance with our Privacy Policy. This
          includes, but is not limited to, usage data, transaction history, and
          communication records. We are committed to protecting user data and
          complying with applicable data protection regulations. However, we
          may retain anonymized or aggregated data for analytical and operational
          purposes even after account closure.
        </p>
      </div>

      <div className="mt-10 text-center">
        <p>John&apos;s product is &quot;amazing&quot;.</p>
      </div>
    </main>
  );
};

export default OurStory;