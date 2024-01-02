import checkEmailType from '@/utils/checkEmailType';

/**
   * @param {'email' | 'birth' | 'nickname'} type 
   * @param {string | undefined} value 
   * @returns {boolean} 유효성 검사 체크 통과 X -> true
   */
  function checkTypoValidation(type, value) {
    if (type === 'email') {
      return checkEmailType(value)
    }

    if (type === 'nickname') {
      return value.length > 6
    }

    // if (type === 'birth') {
    //   const dateRegex = new RegExp(/^\d{4}-\d{2}-\d{2}$/)
    //   const dateNumberRegex = new RegExp(/^(19|20)\d{2}-(0[1-9]|1[0-2])-([0-2][1-9]|3[01])$/)

    //   return (!dateRegex.test(value) || !dateNumberRegex.test(value))
    // }
  }

export default checkTypoValidation
