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
  placeholderText?: string;
  showIcon?: boolean;
  label?: string;
  required?: boolean;
  labelClassName?: string;
  wrapperClassname?: string;
  value: string;
};
const CustomDatePicker = (props: TDatePicker) => {
  const {
    className = "",
    name = "",
    onSelect,
    title,
    dateFormat,
    isClearable,
    placeholderText,
    showIcon = true,
    required = false,
    label,
    labelClassName = "",
    wrapperClassname = "",
    value,
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
        value={value}
        isClearable={isClearable}
        dateFormat={dateFormat}
        showIcon={showIcon}
        icon={
          <div className="calendar icon h-full my-auto">
            <Calendar className="size-5" />
          </div>
        }
        placeholderText={placeholderText}
        calendarIconClassName={classNames({
          "bottom-0.5 md:-top-0.5": true,
        })}
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
