import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, helpWith, aboutBusiness } = data || {};

    if (!name || !email || !helpWith || !aboutBusiness) {
      return NextResponse.json(
        { error: "Please complete this field." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const endpoint = process.env.CONTACT_EMAIL_WEBHOOK;
    if (!endpoint) {
      return NextResponse.json(
        {
          error:
            "Your enquiry couldn't be sent. Please try again or email vivienne@leemonarc.com.au.",
        },
        { status: 503 }
      );
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "Your enquiry couldn't be sent. Please try again or email vivienne@leemonarc.com.au.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "Your enquiry couldn't be sent. Please try again or email vivienne@leemonarc.com.au.",
      },
      { status: 500 }
    );
  }
}
