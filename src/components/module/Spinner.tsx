import clsx from "@/utils/common";

function Spinner({ className = "" }: { className: string }) {
  return (
    <div>
      <div
        className={clsx(
          {
            "w-5 h-5 border-2 border-t-transparent border-solid rounded-full animate-spin animate-infinite":
              true,
            "border-primary-500 ": !className || !className.includes("border"),
          },
          className
        )}
      ></div>
    </div>
  );
}

export default Spinner;
