import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "@/lib/config";
import emailjs from "@emailjs/browser";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const triggerEmailWorkflow = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    // Publica a tarefa no QStash
    await qstashClient.publishJSON({
      url: `${config.env.prodApiEndpoint}/api/workflows/send-email`,
      body: { email, subject, message },
      retries: 3, // Tentativas automáticas em caso de erro
    });
    console.log("Email workflow triggered successfully");
  } catch (error) {
    console.error("Failed to trigger email workflow:", error);
    throw new Error("Error triggering email workflow.");
  }
};
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
