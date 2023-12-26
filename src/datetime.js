
export const getTimeFromIsoString = (datetimeString) => {
  const datetime = new Date(Date.parse(datetimeString));
  const hours = datetime.getHours();
  const minutes = datetime.getMinutes();
  return `${hours}:${minutes}`;
};

export const getDayStartFromOffset = (offset) => {
  const today = getTodayMidnight();
  const result = new Date(today);
  return addDays(result, offset);
};

export const getTodayMidnight = () => {
  today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  return today;
};

export const addDays = (date, days) => {
  console.log(`Received date: ${date}`);
  result = new Date(date);
  console.log(`Reconstructed date as: ${result.toString()}`);
  result.setDate(result.getDate() + days);
  return result
}
