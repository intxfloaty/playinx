import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

// Variable to track whether the callback has been received
let callbackReceived = false;

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
      console.error('Checksum validation failed', receivedChecksum, "<<<<------->>>>", calculatedChecksum);
      return NextResponse.json({ error: 'Checksum validation failed' }, { status: 400 });
    }

    // Decode the base64-encoded JSON payload
    const decodedPayload = Buffer.from(data?.response, "base64").toString('utf-8');

    // Parse the JSON payload
    const payload = JSON.parse(decodedPayload);

    // Validate the amount against the original payment request
    const originalAmount = 100; // Replace with the actual amount from the payment request
    if (payload.data.amount !== originalAmount) {
      console.error('Amount validation failed', payload?.data?.amount);
      return NextResponse.json({ error: 'Amount validation failed' }, { status: 400 });
    }

    console.log("PAYMENT_COMPLETED", payload)
    // Process the callback and update your system accordingly
    console.log('Server-to-Server Callback received')
    callbackReceived = true;

    // Respond with a success message
    return NextResponse.json({ success: true });
  } catch (error) {
    // Handle errors
    console.log(error, "catchblockErr")
    return NextResponse.json({ error: 'Invalid request or internal server error' }, { status: 500 });
  }
}


// Endpoint to manually check the status if the callback is not received
export async function GET(request: NextRequest) {
  try {
    if (!callbackReceived) {
      // Callback not received, initiate Transaction Status API check
      const statusApiResponse = await performTransactionStatusCheck("123dddf");

      // Process the statusApiResponse and update your system accordingly
      // ...

      return NextResponse.json({ success: true, statusApiResponse });
    } else {
      return NextResponse.json({ message: 'Callback already received' });
    }
  } catch (error) {
    // Handle errors
    console.log(error, "checkStatusAPIError");
    return NextResponse.json({ error: 'Error while checking status API' }, { status: 500 });
  }
}

async function performTransactionStatusCheck(merchantTransactionId) {
  const saltKey = process.env.NEXT_PUBLIC_SALT_KEY
  const saltIndex = process.env.NEXT_PUBLIC_SALT_INDEX
  const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID
  
  const url = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`;
  const xVerify = generateXVerifyHeader(`/pg/v1/status/${merchantId}/${merchantTransactionId}`, saltKey, saltIndex);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-MERCHANT-ID': merchantId,
      'X-VERIFY': xVerify,
    },
  };

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    // Process the responseData and update your system accordingly
    console.log('Check Status API Response:', responseData);

    return responseData;
  } catch (error) {
    // Handle errors
    console.error('Error in Check Status API:', error);
    throw error;
  }
}

function generateXVerifyHeader(path, saltKey, saltIndex) {
  const checksumData = `${path} + ${saltKey}`;
  const checksum = crypto.createHash('sha256').update(checksumData).digest('hex');
  return `${checksum}###${saltIndex}`;
}
