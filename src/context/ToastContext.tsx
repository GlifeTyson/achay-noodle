"use client";

import { EmailJSResponseStatus } from "@emailjs/browser";
import React, { createContext, useContext } from "react";
import { toast as sonnerToast, Toaster } from "sonner";

type ToastOptions = {
  duration?: number;
  description?: string;
};

type ApiResponse<T> = {
  [key: string | number]: T;
};

type PromiseData<T = unknown, E = { message: string; [key: string]: any }> = {
  /**
   * Content to display while the promise is loading. Is optional.
   * If not provided, a default message is displayed.
   */
  loadingContent?: string | React.ReactNode;
  /**
   * **If use graphql query, you must set this function to return for check success or fail**
   *
   * Function to extract the data object from the promise result.
   * This function should return an object (has name form response) with the following properties:
   * - success: A boolean indicating if the operation was successful.
   * - message: A string message to display if the operation was not successful.
   * - errors: An array of objects containing error information.
   */
  isSuccess?: (data: T) => boolean;
  /***
   * Callback function to handle a failed operation.
   * Return a message to display if the operation fails.
   * If a message is not returned, a default message is displayed
   */
  onSuccess?: (data: T) => string;
  /**
   * Callback function to handle a failed operation.
   * Return a message to display if the operation fails.
   * If a message is not returned, a default message is displayed
   */
  onFail?: (data: T) => string;
  /***
   * Callback function to handle an error and error have type form API response.
   * Return a message to display if an error occurs.
   * This function will callback if the promise is rejected.
   */
  onError?: (data: E) => string;
};

interface ToastContextType {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  show: (message: string, options?: ToastOptions) => void;
  /**
   * **If use graphql query, you must pass data for isSuccess to check success or fail**
   */
  promise: <
    T extends Record<string, any>,
    E extends { message: string; [key: string]: any }
  >(
    promise: Promise<any>,
    options: PromiseData<T, E>
  ) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const success = (message: string, options?: ToastOptions) => {
    sonnerToast.success(message, options);
  };

  const error = (message: string, options?: ToastOptions) => {
    sonnerToast.error(message, options);
  };

  const info = (message: string, options?: ToastOptions) => {
    sonnerToast.info(message, options);
  };

  const warning = (message: string, options?: ToastOptions) => {
    sonnerToast.warning(message, options);
  };

  const show = (message: string, options?: ToastOptions) => {
    sonnerToast(message, options);
  };

  const promise = <
    T extends Record<string, any>,
    E extends { message: string; [key: string]: any }
  >(
    promise: Promise<T>,
    {
      loadingContent,
      isSuccess = (_data) => true,
      onSuccess = (_data) => "Operation successful",
      onFail = (_data) => "Operation failed",
      onError = (_error) => "Unexpected error occurred",
    }: PromiseData<T, E>
  ): void => {
    sonnerToast.promise(
      promise
        .then((response: ApiResponse<T> | EmailJSResponseStatus) => {
          //EmailJSResponseStatus is for noodle project by using emailJS
          let result;

          if ("data" in response) {
            result = response.data; // response.data is the object returned by the API
          } else {
            result = response;
          }

          if (isSuccess(result as T)) {
            const successMessage = onSuccess(result as T);
            return successMessage;
          } else {
            const failMessage = onFail(result as T);
            return Promise.reject({
              message: failMessage,
              errors: result,
            });
          }
        })
        .catch((data: E) => {
          const messageFormData = data.message;
          if (messageFormData) {
            return Promise.reject(messageFormData);
          }
          const errorMessage = onError(data);
          return Promise.reject(errorMessage);
        }),
      {
        loading: loadingContent || "Loading...",
        success: (message) => message,
        error: (message) => message,
      }
    );
  };

  return (
    <ToastContext.Provider
      value={{
        success,
        error,
        info,
        warning,
        promise,
        show,
      }}
    >
      {children}
      <Toaster
        richColors
        closeButton
        toastOptions={{
          classNames: {
            closeButton: "bg-white",
          },
        }}
        position="top-right"
        duration={3000}
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useToast must be used within a ToastProvider. Did you forget to wrap your component in <ToastProvider>?"
    );
  }
  return context;
};
