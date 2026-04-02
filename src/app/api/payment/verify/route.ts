import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';
import { Course } from '@/models/Course';
import { sendEnrollmentConfirmation } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { response } = body;

    // BYPASS MODE: For local development (TEST_TXN_ prefix)
    const bypassPayment = process.env.NEXT_PUBLIC_BYPASS_PAYMENT === 'true';

    if (bypassPayment) {
      // In bypass mode, payment was already processed in initiate
      return NextResponse.json({
        success: true,
        bypass: true,
        message: 'Payment verification bypassed for local development',
      });
    }

    if (!response) {
      return NextResponse.json(
        { error: 'Missing response payload' },
        { status: 400 }
      );
    }

    const saltKey = process.env.PHONEPE_SALT_KEY!;
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';

    if (!saltKey) {
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      );
    }

    // Decode and verify checksum
    const decodedResponse = JSON.parse(Buffer.from(response, 'base64').toString('utf-8'));
    const { merchantTransactionId, state, code } = decodedResponse;

    // Verify checksum from PhonePe response header
    const receivedChecksum = request.headers.get('X-VERIFY');
    const expectedChecksum = CryptoJS.SHA256(response + '/pg/v1/status/' + merchantTransactionId + '/' + saltKey) + '###' + saltIndex;
    
    if (receivedChecksum !== expectedChecksum) {
      console.error('Checksum verification failed', { received: receivedChecksum, expected: expectedChecksum });
      return NextResponse.json(
        { error: 'Invalid payment response - checksum mismatch' },
        { status: 400 }
      );
    }

    // Find enrollment by paymentId
    const enrollment = await Enrollment.findOne({ paymentId: merchantTransactionId });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    // Check payment status
    if (code === 'PAYMENT_SUCCESS' && state === 'COMPLETED') {
      enrollment.paymentStatus = 'paid';
      enrollment.enrollmentStatus = 'confirmed';
      enrollment.paymentDate = new Date();
      await enrollment.save();

      // Increment course enrollment count
      const course = await Course.findByIdAndUpdate(enrollment.courseId, {
        $inc: { enrolledCount: 1 },
      });

      // Send confirmation email
      try {
        await sendEnrollmentConfirmation({
          studentName: enrollment.studentName,
          email: enrollment.email,
          courseName: enrollment.courseName,
          enrollmentId: enrollment.enrollmentId,
          duration: course?.duration || 'TBA',
          schedule: course?.schedule || 'TBA',
          meetLink: course?.meetLink || 'https://meet.google.com',
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the payment if email fails
      }

      return NextResponse.json({ success: true });
    } else {
      enrollment.paymentStatus = 'failed';
      await enrollment.save();

      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}

// Handle GET for status check
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transactionId');

    if (!transactionId) {
      return NextResponse.json(
        { error: 'Missing transaction ID' },
        { status: 400 }
      );
    }

    const enrollment = await Enrollment.findOne({ paymentId: transactionId });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      paymentStatus: enrollment.paymentStatus,
      enrollmentStatus: enrollment.enrollmentStatus,
    });
  } catch (error) {
    console.error('Error checking payment status:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}
