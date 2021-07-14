function WeekDay(dateFormat) {
  const inputDate = new Date(dateFormat);

  let num = inputDate.getDay();
  let lastNum = 0;
  let firstDay = new Date(dateFormat);
  let lastDay = new Date(dateFormat);

  if (num === 0) {
    lastNum = 6;
  } else if (num === 1) {
    lastNum = 5;
  } else if (num === 2) {
    lastNum = 4;
  } else if (num === 3) {
    lastNum = 3;
  } else if (num === 4) {
    lastNum = 2;
  } else if (num === 5) {
    lastNum = 1;
  } else if (num === 6) {
    lastNum = 0;
  }

  firstDay = new Date(firstDay.setDate(firstDay.getDate() - num));
  lastDay = new Date(lastDay.setDate(lastDay.getDate() + lastNum));
  return {firstDay, lastDay};
}

export default WeekDay;
