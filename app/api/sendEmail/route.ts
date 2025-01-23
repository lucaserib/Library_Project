import type { NextApiRequest, NextApiResponse } from "next";
import emailjs from "@emailjs/browser";

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { to_name, from_name, to_email, subject, message } = req.body;

  try {
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!, // Substitua pela sua Service ID
      process.env.EMAILJS_TEMPLATE_ID!, // Substitua pelo seu Template ID
      {
        to_name,
        from_name,
        message,
        subject,
        to_email,
      },
      process.env.EMAILJS_PUBLIC_KEY! // Substitua pela sua Public Key
    );

    return res
      .status(200)
      .json({ message: "Email sent successfully", response });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Error sending email", error });
  }
};

export default sendEmail;
