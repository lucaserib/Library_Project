import type { NextApiRequest, NextApiResponse } from "next";
import emailjs from "@emailjs/browser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, subject, message } = req.body;

  try {
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!, // ID do Serviço (do painel EmailJS)
      process.env.EMAILJS_TEMPLATE_ID!, // ID do Template (do painel EmailJS)
      {
        to_email: email,
        subject,
        message,
      },
      process.env.EMAILJS_PUBLIC_KEY! // Chave Pública (do painel EmailJS)
    );

    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("EmailJS Error:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
}
