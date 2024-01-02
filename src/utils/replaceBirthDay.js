/**
 * 
 * @param {number} num 
 * @returns {string}
 */
const replaceBirthDay = (num) => {
  if (!num) {
    return '';
  }
  
  let value = num.replace(/\D/g, "");
  const leng = value.length;

  if (leng < 6) {
    return value;
  }

  if (leng < 8) {
    return `${value.substring(0, 4)}-${value.substring(4)}`;
  } 

  return `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(6, 8)}`;
}

export default replaceBirthDay