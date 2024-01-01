import { api } from '@/api/axios';

/**
 * @description 국가
 */
function getContries() {
  return new Promise((resolve, reject) => {
    api.get('country').then((res) => {
      resolve(res.data.data);
    }).catch((error) => {
      reject(error)
    })
  })

}

export default getContries