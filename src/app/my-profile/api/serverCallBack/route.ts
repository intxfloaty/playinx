import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // Extract the payload from the request body
    const data = await request.json();

    // Validate the checksum received in the response
    const receivedChecksum = request.headers.get('X-VERIFY');
    const saltKey = process.env.NEXT_PUBLIC_SALT_KEY;
    const calculatedChecksum = crypto.createHash('sha256').update(`${data.response}${saltKey}`).digest("hex") + '###1';

    if (receivedChecksum !== calculatedChecksum) {
      // Checksum validation failed
      console.error('Checksum validation failed');
      console.log(data, "data")
      console.log(receivedChecksum, "receivedChecksum")
      console.log(calculatedChecksum, "calculatedChecksum")
      // console.log(decodedPayload, "decodedPayload")
      // console.log(payload, "payload")
      return NextResponse.json({ error: 'Checksum validation failed' }, { status: 400 });
    }

    // Decode the base64-encoded JSON payload
    const decodedPayload = Buffer.from(data?.response, "base64").toString('utf-8');

    // Parse the JSON payload
    const payload = JSON.parse(decodedPayload);

    console.error(decodedPayload, payload, "payloerrrr")

    console.log(data, "data")
    console.log(receivedChecksum, "receivedChecksum")
    console.log(calculatedChecksum, "calculatedChecksum")
    console.log(decodedPayload, "decodedPayload")
    console.log(payload, "payload")


    // Validate the amount against the original payment request
    const originalAmount = 100; // Replace with the actual amount from the payment request
    if (payload.data.amount !== originalAmount) {
      console.error('Amount validation failed');
      console.log(data, "data")
      console.log(receivedChecksum, "receivedChecksum")
      console.log(calculatedChecksum, "calculatedChecksum")
      console.log(decodedPayload, "decodedPayload")
      console.log(payload, "payload")
      return NextResponse.json({ error: 'Amount validation failed' }, { status: 400 });
    }

    console.log("PAYMENT_COMPLETED", payload)
    // Process the callback and update your system accordingly
    // ...

    // Respond with a success message
    return NextResponse.json({ success: true });
  } catch (error) {
    // Handle errors
    console.log(error, "catchblockerr")
    return NextResponse.json({ error: 'Invalid request or internal server error' }, { status: 500 });
  }
}
