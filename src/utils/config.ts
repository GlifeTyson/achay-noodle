export type Config = {
  publicKey: string;
  serviceId: string;
  templateId: string;
};

const defaultConfigs: Config = {
  publicKey: "NvKLvCcdDqqVH3Pl9",
  serviceId: "service_254vlcd",
  templateId: "template_f7sk8e8",
};

export function getConfigs(): Config {
  const {
    NEXT_PUBLIC_EMAILJS_KEY = defaultConfigs.publicKey,
    NEXT_PUBLIC_SERVICE_ID = defaultConfigs.serviceId,
    NEXT_PUBLIC_TEMPLATE_ID = defaultConfigs.templateId,
  } = process.env || {};

  const configs: Config = {
    publicKey: NEXT_PUBLIC_EMAILJS_KEY,
    serviceId: NEXT_PUBLIC_SERVICE_ID,
    templateId: NEXT_PUBLIC_TEMPLATE_ID,
  };

  return configs;
}
