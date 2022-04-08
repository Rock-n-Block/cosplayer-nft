import { FC } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import s from './Calendar.module.scss';

export interface CalendarProps {
  date: Date;
  handleChange: (date: Date) => void;
  label: string;
  placeholder: string;
  minDate: Date;
  name: string;
  disabled?: boolean;
  allowSameDay?: boolean;
}

const Calendar: FC<CalendarProps> = ({
  label,
  date,
  placeholder,
  handleChange,
  minDate,
  name,
  disabled = false,
  allowSameDay = true,
}) => {
  return (
    <div className={s.calendar}>
      <span className={s.label}>{label}</span>
      <DatePicker
        name={name}
        selected={date}
        onChange={handleChange}
        minDate={minDate}
        disabled={disabled}
        placeholderText={placeholder}
        allowSameDay={allowSameDay}
        showPopperArrow={false}
      />
    </div>
  );
};

export default Calendar;
