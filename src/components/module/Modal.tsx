import clsx from "@/utils/common";
import { classNameObject } from "@/utils/format";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
} from "@headlessui/react";

interface IProps {
  children: React.ReactNode;
  open: boolean;
  size?: "small" | "medium" | "large" | "full";
  title?: string;
  description?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
  wrapperClassName?: string;
  transparent?: boolean;
  childrenClassName?: string;
  onExit?: () => void;
  allowClickOutside?: boolean;
  isFullBleed?: boolean;
  showCloseButton?: boolean;
  modifierClassName?: string;
}

const Modal: React.FC<IProps> = ({
  children,
  open,
  size,
  title,
  description,
  header,
  footer,
  onClose,
  wrapperClassName,
  transparent,
  childrenClassName,
  onExit,
  allowClickOutside = true,
  isFullBleed = false,
  showCloseButton = true,
  modifierClassName = "",
}) => {
  return (
    <Transition
      show={open}
      afterLeave={() => {
        onExit && onExit();
      }}
    >
      <Dialog
        open={open}
        static
        onClose={() => {
          if (allowClickOutside) {
            onClose();
          }
        }}
        className={clsx({
          "relative z-50 transition duration-300 ease-out data-[closed]:opacity-0":
            true,
        })}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            className={clsx({
              "flex flex-col max-w-xl bg-white sm:w-full max-h-full": true,
              "sm:max-w-2xl": !size,
              "sm:max-w-md": size === "small",
              "sm:max-w-3xl": size === "medium",
              "sm:max-w-5xl": size === "large",
              "sm:max-w-full": size === "full",
              "shadow-xl": !transparent,
              "bg-white": !transparent && !wrapperClassName,
              "bg-transparent": !!transparent && !wrapperClassName,
              "p-5 space-y-4 rounded-2xl": !isFullBleed,
              "py-0 rounded-xl": isFullBleed,
              ...classNameObject(wrapperClassName as string),
              [modifierClassName]: true,
            })}
          >
            {!header && (
              <div className="flex items-center gap-0">
                <div className="flex-1 text-center">
                  <div className="my-0 text-lg font-bold leading-tight text-gray-700 ">
                    {title}
                  </div>
                  {!!description && description.length > 0 && (
                    <p className="text-sm text-primary-700">{description}</p>
                  )}
                </div>
                {showCloseButton ? (
                  <button
                    onClick={onClose}
                    type="button"
                    className="text-gray-800 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none focus:text-gray-700 "
                    aria-label="Close"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                ) : null}
              </div>
            )}
            {!!header && header}
            <div
              className={clsx(
                { "flex-1 overflow-y-auto no-scrollbar": true },
                childrenClassName
              )}
            >
              {children}
            </div>
            {!!footer && footer}
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
