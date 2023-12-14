import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'


export async function POST(request: NextRequest) {
  // Define API endpoint URL
  const apiUrl = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

  // Define payload as a JavaScript object
  const payload = {
    merchantId: "M1JTWW4MP7KN",
    merchantTransactionId: "MT7850590068188104",
    merchantUserId: "MUID123",
    amount: 10000,
    redirectUrl: "http://localhost:3000/my-profile",
    redirectMode: "REDIRECT",
    callbackUrl: "https://webhook.site/callback-url",
    mobileNumber: "9999999999",
    paymentInstrument: {
      "type": "PAY_PAGE"
    }
  };

  // Convert the payload to a JSON string
  const payloadString = JSON.stringify(payload);

  // Define salt key and salt index
  const saltKey = "b4fe2d4e-3ad6-4420-aad3-623676848d84";
  const saltIndex = "1";

  // Calculate the X-VERIFY header value
  const base64EncodedPayload = Buffer.from(payloadString).toString("base64");
  const string = base64EncodedPayload + '/pg/v1/pay' + saltKey;
  // const xVerifyHeaderValue = `SHA256(${base64EncodedPayload}/pg/v1/pay${saltKey}) + ### + ${saltIndex}`;
  const sha256 = crypto.createHash('sha256').update(string).digest("hex");
  const checksum = sha256 + '###' + saltIndex;



  // Define the headers for POST request
  const headers = {
    'Access-Control-Allow-Origin': 'https://playinx.vercel.app',
    accept: 'application/json',
    "Content-Type": "application/json",
    "X-VERIFY": checksum,
  };

  try {
    // Make the POST request to the PhonePe API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: string,
    });


    // Log the entire response object for debugging
    console.log(response);
    console.log(payloadString, "payloadString")
    console.log("base64EncodedPayload:", base64EncodedPayload);
    console.log("saltKey:", saltKey);
    console.log("saltIndex:", saltIndex);
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
