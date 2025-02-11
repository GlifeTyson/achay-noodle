import { classNames } from "@/utils/common";
import Link, { LinkProps } from "next/link";
import React from "react";
import { UrlObject } from "url";
import Spinner from "./Spinner";

export interface ButtonProps extends Omit<LinkProps, "href"> {
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  useDefaultLoading?: boolean;
  variant?:
    | "primary"
    | "outline-secondary"
    | "outline"
    | "outline-primary"
    | "secondary"
    | "primary-light"
    | "outline-light"
    | "action";
  bgClassName?: string;
  spinClass?: string;
  size?: "md" | "sm";
  href?: string | UrlObject;
  target?: React.HTMLAttributeAnchorTarget;
}

function getVariantClasses(
  variant: string,
  disabled: boolean
): {
  bgClassName: string;
  spinClass: string;
} {
  let bgClassName = "",
    spinClass = "";

  switch (variant) {
    case "primary":
      bgClassName = !disabled
        ? "bg-primary-600 text-white"
        : "bg-gray-100 text-gray-400" + " font-medium hover:bg-primary-700";
      spinClass = "ml-3 border-white";
      break;

    case "outline":
      bgClassName =
        "bg-white border border-darkerFlour hover:bg-darkerFlour hover:border-darkerFlour text-darkerFlour hover:text-white font-medium";
      spinClass = "ml-3 border-primary-500";
      break;

    default:
      break;
  }

  return {
    bgClassName,
    spinClass,
  };
}

function Button({
  className = "",
  containerClassName,
  onClick,
  children,
  loading,
  disabled,
  useDefaultLoading = true,
  variant = "primary",
  bgClassName = "",
  spinClass,
  href = "",
  size = "sm",
  ...linkProps
}: ButtonProps) {
  function handleClick() {
    if (loading || disabled || !!href) return;
    if (typeof onClick === "function") {
      onClick();
    }
  }

  const styles = getVariantClasses(variant, disabled || false);
  bgClassName = bgClassName || styles.bgClassName;
  spinClass = spinClass || styles.spinClass;
  const component = (
    <div
      onClick={handleClick}
      className={classNames({
        "inline-flex justify-center items-center relative overflow-hidden transition duration-300 px-3 font-bold":
          true,
        "h-12": size === "md",
        "h-9": size === "sm",
        "cursor-pointer": !loading && !disabled,
        "pointer-events-none opacity-60": !!disabled || !!loading,
        "rounded-full": !className.match(/\b(rounded-)/),
        "px-5": !className.includes("px-"),
        [className]: true,
        [bgClassName]: true,
      })}
    >
      {typeof children === "string" ? (
        <>
          {children}
          {!!loading && <Spinner className={spinClass} />}
        </>
      ) : (
        <>
          {children}
          {!!loading && useDefaultLoading && <Spinner className={"ml-3"} />}
        </>
      )}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/60 cursor-auto ring-2 ring-white/60"></div>
      )}
    </div>
  );
  return href ? (
    <Link href={href} {...linkProps} className={containerClassName}>
      {component}
    </Link>
  ) : (
    component
  );
}

export default Button;
