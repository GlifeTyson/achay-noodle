import React, {
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import clsx from "@/utils/common";
import Label from "./Label";

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  containerClassName?: string;
  error?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  showPasswordMask?: boolean;
  onChange?: (value: any) => void;
  StartComponent?: React.ElementType;
  EndComponent?: React.ElementType;
  defaultValue?: any;
  currency?: string;
  label?: string | ReactNode;
  required?: boolean;
  min?: number | string;
  max?: number;
  labelClassName?: string;
  icon?: ReactNode;
  onSearchIconClick?: () => void;
  onClearInput?: () => void;
}

const Input = React.forwardRef(
  (
    {
      id,
      className = "",
      containerClassName = "",
      placeholder,
      prefix,
      type,
      defaultValue,
      error,
      errorMessage,
      readOnly,
      fullWidth,
      name,
      autoComplete,
      autoFocus,
      spellCheck,
      onChange,
      disabled,
      StartComponent,
      EndComponent,
      currency,
      label,
      required,
      min,
      max,
      labelClassName,
      icon,
      onSearchIconClick,
      onClearInput,
      ...rest
    }: InputProps,
    ref
  ) => {
    const [passwordMask, setPasswordMask] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const hasPrefix = !!prefix && prefix.length > 0;

    useEffect(() => {
      if (!!inputRef && !!inputRef.current) {
        const hasDefaultValue =
          defaultValue !== undefined && defaultValue !== null;
        if (!!hasPrefix && hasDefaultValue) {
          inputRef.current.value = prefix + defaultValue;
        } else {
          if (type === "checkbox") {
            inputRef.current.checked = hasDefaultValue ? defaultValue : "";
          } else {
            inputRef.current.value = hasDefaultValue
              ? (defaultValue as string)
              : "";
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue]);

    function handleChange(e: { target: { value: any; checked: boolean } }) {
      let value = e.target.value;
      if (type == "number") {
        if (typeof min == "number") {
          value = value < min ? min : value;
        }
        if (typeof max == "number") {
          value = value > max ? max : value;
        }
        if (inputRef.current) {
          inputRef.current.value = value;
        }
      }

      if (hasPrefix && !!inputRef && !!inputRef.current) {
        const plainValue = hasPrefix
          ? value.length < prefix.length
            ? value.length == 1
              ? value
              : ""
            : value.replace(prefix, "")
          : value;
        inputRef.current.value = prefix + plainValue;
        if (typeof onChange === "function") {
          if (type === "checkbox") {
            onChange(e.target.checked);
          } else onChange(plainValue);
        }
      } else {
        if (typeof onChange === "function") {
          if (type === "checkbox" || type === "radio") {
            onChange(e.target.checked);
          } else {
            onChange(value);
          }
        }
      }
    }

    return (
      <div
        className={clsx({
          "flex flex-col": type !== "checkbox" && type !== "radio",
          "flex items-center justify-start gap-x-3 flex-row-reverse cursor-pointer group":
            type === "checkbox",
          "inline-flex items-center justify-start gap-x-3 flex-row-reverse group":
            type === "radio",
        })}
      >
        {label && (
          <Label
            htmlFor={id}
            label={label}
            required={required}
            className={clsx(
              {
                "cursor-pointer flex items-center justify-start":
                  type === "radio" || type === "checkbox",
              },
              labelClassName
            )}
          />
        )}
        <div
          className={clsx(
            {
              "relative rounded-md": true,
              "w-full": !!fullWidth,
              "cursor-pointer": type === "checkbox",
              "p-1": type === "radio",
            },
            containerClassName
          )}
        >
          {type === "number" && currency && (
            <div
              className={clsx({
                "absolute left-6 h-full flex items-center text-sm": true,
                "text-red-500": !!error,
              })}
            >
              {currency || "$"}
            </div>
          )}
          {icon && (
            <div
              className={clsx({
                "absolute left-4 h-full flex items-center text-sm": true,
                "text-red-500": !!error,
              })}
            >
              {icon}
            </div>
          )}
          {type === "search" && (
            <div
              className={clsx({
                "absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold":
                  true,
                "text-gray-400": !defaultValue && !error,
                "text-red-500": !!error,
              })}
              onClick={onSearchIconClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          )}
          {type === "password" && (
            <div
              onClick={() => setPasswordMask(!passwordMask)}
              className={clsx({
                "absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold cursor-pointer":
                  true,
                "text-gray-400": !defaultValue && !error,
                "text-red-500": !!error,
              })}
            >
              {passwordMask ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          )}
          <input
            id={id}
            className={clsx(
              {
                "group form-input block transition ease-in-out duration-150 outline-none placeholder:text-gray-400 placeholder:text-3.5 px-3 h-12 w-full rounded-lg":
                  true,
                "border-red-300 focus:border-red-500 focus:ring-red-300":
                  !!errorMessage,
                "focus:ring-primary-500": !errorMessage,
                "bg-gray-100 text-gray-800": !!disabled,
                "text-gray-800 ": !disabled,
                "sm:leading-normal":
                  !className || !className.includes("leading-"),
                "border-gray-200 focus:border-primary-500 focus:ring-primary-500 border":
                  !className || !className.includes("border-"),
                "pr-6 pl-12": !!currency || type == "search",
                "pl-11": !!icon,
                "checked:accent-yellow-400 checked:hover:accent-yellow-400 focus:accent-yellow-400 focus:outline-none checked:focus:accent-yellow-400 checked:active:accent-yellow-400":
                  true,
                "transform transition-transform duration-250 ease-in-out":
                  type === "checkbox" || type === "radio",
                "cursor-pointer": type === "radio" || type === "checkbox",
                "scale-125 transition-transform duration-150 ease-in-out transform active:scale-125":
                  type === "checkbox" || type === "radio",
              },
              className
            )}
            name={name}
            ref={inputRef}
            type={passwordMask ? "text" : type}
            defaultValue={hasPrefix ? `${prefix}${defaultValue}` : defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            spellCheck={spellCheck}
            onChange={(e) => {
              handleChange(e);
            }}
            min={min}
            max={max}
            onWheel={() => inputRef.current?.blur()}
            {...rest}
          />

          {!!EndComponent && <EndComponent />}
        </div>
        {!!errorMessage && (
          <p className="mt-0.5 text-red-400 text-sm font-light">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
