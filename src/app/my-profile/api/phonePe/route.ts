import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'

export async function POST(request: NextRequest) {

  const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID
  // Define salt key and salt index
  const saltKey = process.env.NEXT_PUBLIC_SALT_KEY;
  const saltIndex = 1;

  // Define payload as a JavaScript object
  const payload = {
    merchantId: merchantId,
    merchantTransactionId: "MT785059111123",
    merchantUserId: "MUID123",
    amount: 100,
    redirectUrl: "https://playinx.vercel.app/my-profile/",
    redirectMode: "REDIRECT",
    callbackUrl: "https://playinx.vercel.app/my-profile/api/serverCallBack",
    mobileNumber: "9540281134",
    paymentInstrument: {
      type: "PAY_PAGE"
    }
  };

  // Convert the payload to a JSON string
  const payloadString = JSON.stringify(payload);

  // Calculate the X-VERIFY header value
  const base64EncodedPayload = Buffer.from(payloadString).toString("base64url");
  const string = base64EncodedPayload + `/pg/v1/pay${saltKey}`;
  const sha256 = crypto.createHash('sha256').update(string).digest("hex");
  const checksum = sha256 + '###' + `${saltIndex}`;

  try {
    // Make the POST request to the PhonePe API
    const response = await fetch('https://api-preprod.phonepe.com/apis/merchant-simulator/pg/v1/pay', {
      method: "POST",
      headers: {
        accept: 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "x-verify": `${checksum}`,
      },
      body: JSON.stringify({
        request: base64EncodedPayload
      }),
    });


    // Log the entire response object for debugging
    console.log(response);
    console.log(payloadString, "payloadString")
    console.log("base64EncodedPayload:", base64EncodedPayload);
    console.log(string, "string")
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
        headers: Object.fromEntries(response.headers),
        // You can include more details from the response if needed
      };
      return NextResponse.json(errorResponse);
    }
  } catch (error) {
    // Handle any network or request errors
    return NextResponse.json("An error occurred while making the request.");
  }
}
