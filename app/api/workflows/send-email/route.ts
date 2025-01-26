import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/workflow";

export const POST = async (request: Request) => {
  try {
    const { email, subject, message } = await request.json();

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await sendEmail({ email, subject, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to process email workflow:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
};
