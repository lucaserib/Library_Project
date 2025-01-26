import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import emailjs from "@emailjs/browser";
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
    console.log("EmailJS: Email sent successfully.");
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw new Error("Failed to send email via EmailJS.");
  }
};
