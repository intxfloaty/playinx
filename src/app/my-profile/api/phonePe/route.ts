import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  // Define API endpoint URL
  const apiUrl = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

  // Define payload as a JavaScript object
  const payload = {
    "merchantId": "MERCHANTUAT",
    "merchantTransactionId": "MT7850590068188104",
    "merchantUserId": "MUID123",
    "amount": 10000,
    "redirectUrl": "https://webhook.site/redirect-url",
    "redirectMode": "REDIRECT",
    "callbackUrl": "https://webhook.site/callback-url",
    "mobileNumber": "9999999999",
    "paymentInstrument": {
      "type": "PAY_PAGE"
    }
  };

  // Convert the payload to a JSON string
  const payloadString = JSON.stringify(payload);

  // Define salt key and salt index
  const saltKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
  const saltIndex = "1";

  // Calculate the X-VERIFY header value
  const base64EncodedPayload = Buffer.from(payloadString).toString("base64");
  const xVerifyHeaderValue = `SHA256(${base64EncodedPayload}/pg/v1/pay${saltKey}) ### ${saltIndex}`;

  // Define the headers for POST request
  const headers = {
    "Content-Type": "application/json",
    "X-VERIFY": xVerifyHeaderValue,
  };

  try {
    // Make the POST request to the PhonePe API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: payloadString,
    });

    // Check the response status and handle it accordingly
    if (response.ok) {
      // Successful response
      return NextResponse.json(await response.json());
    } else {
      // Error response
      return NextResponse.json(`Error: ${response.statusText}`);
    }
  } catch (error) {
    // Handle any network or request errors
    return NextResponse.json("An error occurred while making the request.");
  }

}
