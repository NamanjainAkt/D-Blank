import Link from 'next/link';
import { Footer } from '@/components/Footer';
import Footer2 from "@/components/Footer2";

export const metadata = {
  title: 'Refund Policy | D-Blanks',
  description: 'D-Blanks Refund Policy - Our terms for refunds and cancellations.',
};

export default function RefundPolicyPage() {
  const currentYear = new Date().getFullYear();
  
  return (
    <main className="min-h-screen bg-black">
      
      <div className="pt-24 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="text-sm text-gray-500 hover:text-white mb-4 inline-flex items-center gap-1">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-black tracking-[-2px] mb-4">
              Refund Policy
            </h1>
            <p className="text-gray-500">Last updated: March 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-charcoal border border-carbon rounded-2xl p-8 space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">1. Overview</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    At D-Blanks, we want you to be completely satisfied with your learning experience. This refund policy outlines the conditions under which refunds may be requested.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">2. Refund Eligibility</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    Refund requests may be considered under the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Course cancellation by D-Blanks</li>
                    <li>Technical issues preventing access to course content</li>
                    <li>Duplicate charges or billing errors</li>
                    <li>Course significantly different from description</li>
                    <li>Course not delivered as promised</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">3. Refund Timeframes</h2>
                <div className="text-gray-400 space-y-4">
                  <div className="bg-graphite border border-carbon rounded-lg p-4">
                    <div className="font-medium text-white mb-2">Before Course Commencement</div>
                    <p>
                      Full refund if requested before the first scheduled session. Refund will be processed within 5-7 business days.
                    </p>
                  </div>
                  <div className="bg-graphite border border-carbon rounded-lg p-4">
                    <div className="font-medium text-white mb-2">Within First Week</div>
                    <p>
                      50% refund if requested within the first week of course commencement, provided you have attended less than 2 sessions.
                    </p>
                  </div>
                  <div className="bg-graphite border border-carbon rounded-lg p-4">
                    <div className="font-medium text-white mb-2">After First Week</div>
                    <p>
                      No refund will be processed after the first week of course commencement.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">4. Non-Refundable Scenarios</h2>
                <div className="text-gray-400 space-y-4">
                  <p>Refunds will not be provided in the following cases:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Change of mind after enrollment</li>
                    <li>Failure to attend scheduled sessions</li>
                    <li>Inability to complete the course due to personal reasons</li>
                    <li>Dissatisfaction with course content after more than 2 sessions attended</li>
                    <li>Violation of terms of service</li>
                    <li>Sharing account credentials or course access</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">5. How to Request a Refund</h2>
                <div className="text-gray-400 space-y-4">
                  <p>To request a refund, please:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Contact us via email at arshgupta723@gmail.com</li>
                    <li>Include your enrollment ID and reason for refund</li>
                    <li>Provide supporting documentation if applicable</li>
                    <li>Allow 5-7 business days for processing</li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">6. Partial Scholarships and Discounts</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    If you enrolled using a scholarship, discount code, or promotional offer, the refund amount will be calculated based on the actual amount paid, not the original course price.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">7. Payment Gateway Refunds</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    Refunds will be processed through the original payment method (PhonePe/UPI). The refund will reflect in your account within 5-7 business days, depending on your bank&apos;s processing time.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">8. Course Transfer</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    Instead of a refund, you may request to transfer your enrollment to a future batch of the same course, subject to availability. Course transfers are at the sole discretion of D-Blanks.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">9. Contact Us</h2>
                <div className="text-gray-400 space-y-4">
                  <p>For refund requests or questions about this policy:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Email: arshgupta723@gmail.com</li>
                    <li>WhatsApp: +91 9340576811</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Footer2 />
    </main>
  );
}
