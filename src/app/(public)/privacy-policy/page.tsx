import Link from 'next/link';
import { Footer } from '@/components/Footer';
import Footer2 from "@/components/Footer2";

export const metadata = {
  title: 'Privacy Policy | D-Blanks',
  description: 'D-Blanks Privacy Policy - How we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-gray-500">Last updated: March 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-charcoal border border-carbon rounded-2xl p-8 space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">1. Information We Collect</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    We collect information you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Name, email address, and phone number</li>
                    <li>College/university name, branch, semester, and roll number</li>
                    <li>City and other demographic information</li>
                    <li>Payment information (processed securely through PhonePe)</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">2. How We Use Your Information</h2>
                <div className="text-gray-400 space-y-4">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Process course enrollments and payments</li>
                    <li>Send confirmation emails and course-related communications</li>
                    <li>Add you to WhatsApp groups for course coordination</li>
                    <li>Generate certificates upon course completion</li>
                    <li>Improve our services and student experience</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">3. Information Sharing</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties, except:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>With your explicit consent</li>
                    <li>To comply with legal requirements</li>
                    <li>To process payments through PhonePe payment gateway</li>
                    <li>To facilitate course delivery (Google Meet, WhatsApp)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">4. Data Security</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Encrypted data transmission (HTTPS)</li>
                    <li>Secure password hashing with bcrypt</li>
                    <li>Regular security assessments</li>
                    <li>Access controls and authentication</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">5. Payment Processing</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    Payments are processed securely through PhonePe payment gateway. We do not store your payment card details. All payment transactions are subject to PhonePe&apos;s privacy policy and terms of service.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">6. Cookies and Tracking</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    We use cookies and similar tracking technologies to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Maintain your admin session</li>
                    <li>Remember your preferences</li>
                    <li>Analyze site traffic and usage</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">7. Your Rights</h2>
                <div className="text-gray-400 space-y-4">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Export your data in a portable format</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">8. Data Retention</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">9. Contact Us</h2>
                <div className="text-gray-400 space-y-4">
                  <p>
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
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
