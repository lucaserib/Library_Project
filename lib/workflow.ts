import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "@/lib/config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

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
    await qstashClient.publishJSON({
      url: `${config.env.prodApiEndpoint}/api/workflows/send-email`,
      body: { email, subject, message },
    });
    console.log("QStash: Email task enqueued successfully.");
  } catch (error) {
    console.error("QStash Error:", error);
    throw new Error("Failed to enqueue email task.");
  }
};

export const sendEmailJS = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: config.env.emailJs.emailjsServiceId,
          template_id: config.env.emailJs.emailjsTemplateId,
          user_id: config.env.emailJs.emailjsPublicKey,
          template_params: {
            to_email: email,
            subject,
            message,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("EmailJS API Error:", error);
      throw new Error("Failed to send email via EmailJS.");
    }

    console.log("EmailJS: Email sent successfully.");
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw error;
  }
};
