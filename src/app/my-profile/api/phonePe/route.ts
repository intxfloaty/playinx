import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'


export async function POST(request: NextRequest) {
  // Define API endpoint URL
  const apiUrl = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
  const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID

  // Define payload as a JavaScript object
  const payload = {
    merchantId: merchantId,
    merchantTransactionId: "MT7850590068188104",
    merchantUserId: "MUID123",
    amount: 100 * 100,
    redirectUrl: "http://localhost:3000/my-profile",
    redirectMode: "REDIRECT",
    callbackUrl: "https://webhook.site/callback-url",
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE"
    }
  };

  // Convert the payload to a JSON string
  const payloadString = JSON.stringify(payload);

  // Define salt key and salt index
  const saltKey = process.env.NEXT_PUBLIC_SALT_KEY;
  const saltIndex = process.env.NEXT_PUBLIC_SALT_INDEX;

  // Calculate the X-VERIFY header value
  const base64EncodedPayload = Buffer.from(payloadString).toString("base64");
  const string = base64EncodedPayload + '/pg/v1/pay' + saltKey;
  const sha256 = crypto.createHash('sha256').update(string).digest("hex");
  const checksum = sha256 + '###' + saltIndex;

  try {
    // Make the POST request to the PhonePe API
    const response = await fetch('https://api.phonepe.com/apis/hermes/pg/v1/pay', {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': 'https://playinx.vercel.app/',
        accept: 'application/json',
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      body: JSON.stringify({
        request: base64EncodedPayload
      }),
    });


    // Log the entire response object for debugging
    console.log(response);
    console.log(payloadString, "payloadString")
    console.log("base64EncodedPayload:", base64EncodedPayload);
    console.log("checksum:", checksum);


    // Check the response status and handle it accordingly
    if (response.ok) {
      // Successful response
      return NextResponse.json(await response.json());
    } else {
      // Error response
      const errorResponse = {
        status: response.status,
        statusText: response.statusText,
        response: Object.fromEntries(response.headers),
        // You can include more details from the response if needed
      };
      return NextResponse.json(errorResponse);
    }
  } catch (error) {
    // Handle any network or request errors
    return NextResponse.json("An error occurred while making the request.");
  }

}
