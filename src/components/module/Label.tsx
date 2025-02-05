import clsx from "@/utils/common";
import React from "react";

interface LabelProps {
  label?: string | React.ReactNode;
  required?: boolean;
  className?: string;
  htmlFor?: string;
}

export default function Label({
  label,
  required,
  className = "",
  htmlFor,
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        {
          "text-base font-medium text-gray-700 mb-2 md:mb-2.5": true,
        },
        className
      )}
    >
      {label}
      {required && <sup className="text-red-400">*</sup>}
    </label>
  );
}
