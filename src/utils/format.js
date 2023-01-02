export const format = (date) => {
  let day;
  let month;
  if (date.getDate().toString().length === 1) {
    day = '0' + date.getDate();
    console.log(day);
  } else {
    day = date.getDate();
  }

  if (date.getMonth().toString().length === 1) {
    month = '0' + (date.getMonth() + 1);
    console.log(month);
  } else {
    month = date.getMonth() + 1;
  }

  // month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
