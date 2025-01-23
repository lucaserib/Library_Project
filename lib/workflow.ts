import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";
import { Client as QStashClient, resend } from "@upstash/qstash";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.redisToken,
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
  await qstashClient.publishJSON({
    url: `${config.env.apiEndpoint}/api/sendEmail`,
    body: {
      to_name: "Recipient Name",
      from_name: "Pstock",
      to: email,
      subject: message,
    },
  });
};