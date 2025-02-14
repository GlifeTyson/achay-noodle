import Label from "@/components/module/Label";
import { classNames } from "@/utils/common";
import { subDays } from "date-fns/subDays";
import { Calendar } from "lucide-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TDatePicker = {
  className?: string;
  name?: string;
  onSelect: (date: Date) => void;
  title?: string;
  dateFormat?: string | string[];
  isClearable?: boolean;
  placeHolderText?: string;
  showIcon?: boolean;
  label?: string;
  required?: boolean;
  labelClassName?: string;
  wrapperClassname?: string;
};
const CustomDatePicker = (props: TDatePicker) => {
  const {
    className = "",
    name = "",
    onSelect,
    title,
    dateFormat,
    isClearable,
    placeHolderText,
    showIcon = true,
    required = false,
    label,
    labelClassName = "",
    wrapperClassname = "",
  } = props;
  // const [startDate, setStartDate] = useState(new Date());
  return (
    <div
      className={classNames({
        [wrapperClassname]: true,
      })}
    >
      {label && (
        <Label
          label={label}
          required={required}
          className={classNames({ [labelClassName]: true })}
        />
      )}
      <DatePicker
        title={title}
        name={name}
        isClearable={isClearable}
        dateFormat={dateFormat}
        showIcon={showIcon}
        icon={<Calendar className="size-6 top-0" />}
        placeholderText={placeHolderText}
        calendarIconClassName="!p-0 top-2.5 left-1.5"
        className={classNames({
          "w-full rounded-lg": true,
          [className]: true,
        })}
        minDate={subDays(new Date(), 0)}
        // selected={startDate}
        // onChange={(date) => {
        //   if (date) setStartDate(date);
        // }}
        onSelect={(date: Date | null) => {
          if (date) onSelect(date);
        }}
      />
    </div>
  );
};

export default CustomDatePicker;
