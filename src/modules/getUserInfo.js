import { api } from '@/api/axios';

/**
 * @description 유저 정보 불러오기
 */
function getUserInfo() {
  return new Promise((resolve, reject) => {
    api.get('user/profile').then((res) => {
      resolve(res.data.data);
    }).catch((error) => {
      reject(error)
    })
  })

}

export default getUserInfo