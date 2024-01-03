import korea from '@/assets/korea.png';
import usa from '@/assets/usa.png';
import china from '@/assets/china.png';
import japan from '@/assets/japan.png';
import canada from '@/assets/canada.png';
import philippines from '@/assets/philippines.png';
import uk from '@/assets/uk.png';
import german from '@/assets/german.png';
import france from '@/assets/france.png';

/**
 * @param {string} countName
 * @returns {string}
 * @description 나라별 국기 이미지
 */
const checkCountryImg = (countName) => {
  const countries = {
    "대한민국": korea,
    "미국": usa,
    "중국": china,
    "일본": japan,
    "캐나다": canada,
    "필리핀": philippines,
    "영국": uk,
    "독일": german,
    "프랑스": france,
  }
  return countries[countName]
}

export default checkCountryImg
