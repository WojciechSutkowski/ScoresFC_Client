export const format = (date) => {
  let day;
  let month;

  if (date.getDate().toString().length === 1) {
    day = '0' + date.getDate();
  } else {
    day = date.getDate();
  }

  if ((date.getMonth() + 1).toString().length === 1) {
    month = '0' + (date.getMonth() + 1);
  } else {
    month = date.getMonth() + 1;
  }

  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
