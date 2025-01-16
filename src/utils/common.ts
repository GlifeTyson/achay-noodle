import { twMerge } from "tailwind-merge";

export function classNames(classNameHash: Record<string, unknown>) {
  return twMerge(
    Object.entries(classNameHash)
      .map((pair) => (pair[1] ? pair[0] : null))
      .filter((x) => x)
      .join(" ")
  );
}
