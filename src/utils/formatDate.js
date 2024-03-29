/**
 * @param {string} inputDate 
 * @returns {string | undefined}
 * @description 날짜 포맷팅
 */
const formatDate = (inputDate) => {
  if (typeof inputDate !== 'string') {
    return inputDate
  }
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

export default formatDate
