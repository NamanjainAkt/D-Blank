import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { enrollmentId, amount } = body;

    if (!enrollmentId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate MongoDB ObjectId format
    if (!enrollmentId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: 'Invalid enrollment ID format' },
        { status: 400 }
      );
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    const bypassPayment = process.env.NEXT_PUBLIC_BYPASS_PAYMENT === 'true';

    // BYPASS MODE: Skip actual PhonePe payment for local development
    if (bypassPayment) {
      const merchantTransactionId = `TEST_TXN_${Date.now()}_${enrollmentId}`;

      // Save payment details as if payment was made
      enrollment.paymentId = merchantTransactionId;
      enrollment.paymentAmount = amount;
      enrollment.paymentStatus = 'paid';
      enrollment.enrollmentStatus = 'confirmed';
      enrollment.paymentDate = new Date();
      await enrollment.save();

      return NextResponse.json({
        success: true,
        bypass: true,
        paymentUrl: null,
        transactionId: merchantTransactionId,
        message: 'Payment bypassed for local development',
      });
    }

    // PRODUCTION MODE: Real PhonePe payment
    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';
    const callbackUrl = `${process.env.NEXTAUTH_URL}/api/payment/verify`;

    if (!merchantId || !saltKey) {
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      );
    }

    const merchantTransactionId = `TXN_${Date.now()}_${enrollmentId}`;

    const payload = {
      merchantId,
      merchantTransactionId,
      merchantUserId: `MUID_${enrollmentId}`,
      amount: amount * 100, // PhonePe expects amount in paise
      callbackUrl,
      mobileNumber: enrollment.phone,
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

    const payloadString = JSON.stringify(payload);
    const base64Payload = Buffer.from(payloadString).toString('base64');
    const checksum = CryptoJS.SHA256(base64Payload + '/pg/v1/pay' + saltKey) + '###' + saltIndex;

    const response = await fetch('https://api.phonepe.com/apis/pgm/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
      },
      body: JSON.stringify({
        request: base64Payload,
      }),
    });

    const responseData = await response.json();

    // Save payment details
    enrollment.paymentId = merchantTransactionId;
    enrollment.paymentAmount = amount;
    await enrollment.save();

    if (responseData.success && responseData.data?.instrumentResponse?.redirectInfo?.url) {
      return NextResponse.json({
        success: true,
        paymentUrl: responseData.data.instrumentResponse.redirectInfo.url,
        transactionId: merchantTransactionId,
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to initiate payment' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error initiating payment:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}
