import React, { useState } from 'react';

import Calendar from './index';

export default {
  title: 'components/Calendar',
  component: Calendar,
};

export const Default: React.FC = () => {
  const [date, setDate] = useState(new Date());
  return (
    <Calendar
      name="start date"
      placeholder="Enter Date"
      date={date}
      minDate={new Date()}
      label="Start Date"
      handleChange={setDate}
    />
  );
};
