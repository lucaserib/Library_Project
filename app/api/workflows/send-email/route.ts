import { NextResponse } from "next/server";
import { sendEmailJS } from "@/lib/workflow";

export const POST = async (request: Request) => {
  try {
    const { email, subject, message } = await request.json();

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await sendEmailJS({ email, subject, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email processing error:", error);
    return NextResponse.json(
      { error: "Failed to process email" },
      { status: 500 }
    );
  }
};
