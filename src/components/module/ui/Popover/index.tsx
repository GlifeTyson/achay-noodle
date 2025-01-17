import React from "react";
import { PopoverProps, Popover as ReactPopover } from "react-tiny-popover";

function Popover({ children, ...bindProps }: PopoverProps) {
  return (
    <ReactPopover containerStyle={{ zIndex: "100" }} {...bindProps}>
      {children}
    </ReactPopover>
  );
}

export default Popover;
