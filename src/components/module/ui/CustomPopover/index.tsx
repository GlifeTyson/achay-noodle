import React, { useEffect, useRef, useState } from "react";

import Popover from "@/components/module/ui/Popover";
import clsx from "@/utils/common";
import { PopoverAlign } from "react-tiny-popover";

type PopoverPosition = "left" | "right" | "top" | "bottom";

export default function CustomPopover({
  label,
  children,
  wrapperClassName,
  childrenClassName,
  align = "end",
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  wrapperClassName?: string;
  childrenClassName?: string;
  align?: PopoverAlign;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [position, setPosition] = useState<Array<PopoverPosition>>(["bottom"]);

  const parentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!!isPopoverOpen && parentRef.current && containerRef.current) {
      const { y: buttonY } = parentRef.current.getBoundingClientRect();
      const { height: containerHeight } =
        containerRef.current.getBoundingClientRect();
      const scrollHeight = document.body.scrollHeight;
      if (scrollHeight - buttonY <= containerHeight + 50) {
        setPosition(["top"]);
      } else {
        setPosition(["bottom"]);
      }
    }
  }, [isPopoverOpen]);

  return (
    <div ref={parentRef} className="w-fit">
      <Popover
        isOpen={isPopoverOpen}
        positions={position}
        onClickOutside={() => setIsPopoverOpen(false)}
        align={align}
        boundaryElement={parentRef?.current || undefined}
        content={() => {
          return (
            <div
              className={clsx(
                {
                  "w-64 border rounded-2xl shadow-lg py-2 bg-white mt-0 relative":
                    true,
                  //before mt-4
                },
                wrapperClassName
              )}
              ref={containerRef}
            >
              {/* <div className="h-5 w-5 border-r absolute right-0 bottom-full translate-x-0.25 overflow-hidden">
                <div className="bg-white w-10 h-13.5 rotate-45">
                  <div className="w-full h-full border-l"></div>
                </div>
              </div> */}

              <div
                className={clsx(
                  {
                    "px-4 py-2": true,
                  },
                  childrenClassName
                )}
                onClick={() => setIsPopoverOpen(false)}
              >
                {children}
              </div>
            </div>
          );
        }}
      >
        <div
          className="cursor-pointer w-fit"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          {label}
        </div>
      </Popover>
    </div>
  );
}
