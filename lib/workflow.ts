import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";
import { Client as QStashClient } from "@upstash/qstash";

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
    const response = await qstashClient.publishJSON({
      // URL do endpoint para processar o envio do email
      url: `${config.env.prodApiEndpoint}/api/email/send`,
      body: {
        email,
        subject,
        message,
      },
    });

    console.log("Email enviado para fila QStash com sucesso:", response);
  } catch (error) {
    console.error("Erro ao publicar o email na fila QStash:", error);
    throw new Error("Erro ao disparar o email via QStash.");
  }
};
