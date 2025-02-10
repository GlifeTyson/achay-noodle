import { getConfigs } from "@/utils/config";
import emailjs from "@emailjs/browser";

const config = getConfigs();

const initEmailJS = () => {
  if (!config.publicKey) {
    console.error("EmailJS public key is missing!");
    return;
  }
  emailjs.init({
    publicKey: config.publicKey,
  });
  console.log("EmailJS initialized successfully");
};

const sendEmail = async (templateParams: string | HTMLFormElement) => {
  try {
    const response = await emailjs.sendForm(
      config.serviceId, // SERVICE_ID từ EmailJS
      config.templateId, // TEMPLATE_ID từ EmailJS
      templateParams,
      config.publicKey // PUBLIC_KEY từ EmailJS
    );
    console.log("Email sent successfully!", response);
    return response;
  } catch (error) {
    console.error("Failed to send email", error);
    throw error;
  }
};

export { emailjs, initEmailJS, sendEmail };
