export const format = (date) => {
  let day;
  if (date.getDate().toString().length === 1) {
    day = '0' + date.getDate();
    console.log(day);
  } else {
    day = date.getDate();
  }

  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
