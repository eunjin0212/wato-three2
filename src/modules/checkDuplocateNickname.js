import { api } from '@/api/axios';
import checkTypoValidation from '@/utils/checkValidation';

/**
 * @description 닉네임 중복체크
 */
async function checkDuplicateNickname(nickname) {
  let nicknameValidate = { msg: '', status: null }

  if (checkTypoValidation('nickname', nickname)) {
    nicknameValidate = { msg: '올바른 닉네임을 입력해주세요.', status: false }
    return;
  }

  return new Promise((resolve, reject) => {
    api.get(`signup/check/nickname?nickname=${nickname}`).then((res) => {
      if (res.data.message !== 'Success') {
        throw new Error(res.data.message)
      }
      nicknameValidate = { msg: '사용할 수 있는 닉네임 입니다.', status: true }
      resolve(nicknameValidate);
    }).catch((error) => {
      console.error(error)
      nicknameValidate = { msg: '닉네임 중복체크에 실패했습니다.', status: false }
      reject(nicknameValidate)
    })
  })
}

export default checkDuplicateNickname