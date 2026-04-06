import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import Footer2 from "@/components/Footer2";

export const metadata = {
  title: 'Terms of Service | D-Blanks',
  description: 'D-Blanks Terms of Service - Terms and conditions governing the use of our vocational training services.',
};

export default function TermsOfServicePage() {
  const currentYear = new Date().getFullYear();
  
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-24 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="text-sm text-gray-500 hover:text-white mb-4 inline-flex items-center gap-1">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-black tracking-[-2px] mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-500">Last updated: March 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-charcoal border border-carbon rounded-2xl p-8 space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    By accessing and using the D-Blanks platform, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">2. Description of Service</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    D-Blanks provides an online platform for vocational training courses for BTech students. Our services include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Online course enrollment</li>
                    <li>Payment processing through PhonePe</li>
                    <li>Live classes via Google Meet</li>
                    <li>Course materials and resources</li>
                    <li>Certificates upon successful completion</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">3. Eligibility</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    To use our services, you must:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Be at least 18 years of age or have parental consent</li>
                    <li>Be a student enrolled in a BTech/engineering program</li>
                    <li>Provide accurate and complete information during registration</li>
                    <li>Comply with these Terms of Service</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">4. Course Enrollment and Payment</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    By enrolling in a course, you agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Pay the specified course fee in full before enrollment is confirmed</li>
                    <li>Complete payment within the specified timeframe</li>
                    <li>Understand that prices are subject to change</li>
                    <li>Accept that successful payment does not guarantee course completion</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">5. Course Delivery</h2>
                <div className="text-gray-400 space-y-4">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Courses are delivered live via Google Meet at scheduled times</li>
                    <li>Session recordings may be provided at our discretion</li>
                    <li>Course schedules are subject to change with prior notice</li>
                    <li>Minimum attendance requirements may apply for certification</li>
                    <li>Instructors and course content are subject to change</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">6. Certificates</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    Certificates are issued upon successful completion of a course, which typically requires:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Completion of minimum required attendance</li>
                    <li>Satisfactory performance in any assessments</li>
                    <li>Settlement of all payment dues</li>
                  </ul>
                  <p className="mt-4">
                    D-Blanks reserves the right to withhold certificates if any of these conditions are not met.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">7. User Responsibilities</h2>
                <div className="text-gray-400 space-y-4">
                  <p>You agree to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Maintain the security of your account credentials</li>
                    <li>Not share course access with others</li>
                    <li>Not record or redistribute course content without permission</li>
                    <li>Maintain professional conduct during live sessions</li>
                    <li>Submit accurate information during enrollment</li>
                    <li>Attend scheduled sessions punctually</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">8. Intellectual Property</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    All course materials, content, and resources provided through D-Blanks are the intellectual property of D-Blanks or its instructors. You may not reproduce, distribute, or create derivative works without explicit permission.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">9. Limitation of Liability</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    D-Blanks shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">10. Changes to Terms</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the service constitutes acceptance of the modified terms.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">11. Governing Law</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">12. Contact Information</h2>
                <div className="text-gray-400 space-y-4">
                  <p>For questions regarding these Terms of Service, please contact:</p>
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
