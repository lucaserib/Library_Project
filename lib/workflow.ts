import emailjs from "@emailjs/browser";
import config from "@/lib/config";

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    await emailjs.send(
      config.env.emailJs.emailjsServiceId,
      config.env.emailJs.emailjsTemplateId,
      {
        to_email: email,
        subject,
        message,
      },
      config.env.emailJs.emailjsPublicKey
    );
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("EmailJS error: Unable to send email.");
  }
};
