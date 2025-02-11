import type { Config } from "tailwindcss";
const generateSpacing = ({
  from = 0,
  to = 150,
  step = 1,
  unit = "rem",
  denominator = 4.0,
}: {
  from?: number;
  to?: number;
  step?: number;
  unit?: string;
  denominator?: number;
}): Record<string, string> => {
  let values: Record<string, string> = {};
  for (let i = from; i <= to; i = i + step) {
    values[`${i}`] = `${i / denominator}${unit}`;
  }
  return values;
};

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFC700",
        dough: "#efebda",
        flour: "#fffceb",
        darkFlour: "#f5f0d7",
        darkerFlour: "#b5a67a",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      spacing: {
        ...generateSpacing({ step: 0.25, to: 400 }),
      },
    },
  },
  plugins: [],
} satisfies Config;
