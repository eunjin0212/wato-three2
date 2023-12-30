/**
 * 
 * @param {string} value 
 * @returns {boolean} 유효성 검사 체크 통과 X -> true
 */
const checkEmailType = (value) => {
  const emailRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)

  return !emailRegex.test(value)
}

export default checkEmailType