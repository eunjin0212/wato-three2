import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { api, needHeaderApi } from '@/api/axios';
import noImage from '@/assets/no_image.svg';
import InfoItem from '@/components/InfoItem';
import Topbar from '@/ui/Topbar';
import replaceBirthDay from '@/utils/replaceBirthDay';
import getContries from '@/modules/getContries';
import checkDuplicateNickname from '@/modules/checkDuplocateNickname';
import Cookies from 'js-cookie';

const Myinfo = () => {
  const [img, setImg] = useState('')
  const [nickname, setNickname] = useState('')
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([]);
  const [gender, setGender] = useState('')
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [job, setJob] = useState('');
  const initValidate = { nickname: { msg: '', status: null } }
  const [validate, setValidate] = useState({ ...initValidate })
  const [preImg, setPreImg] = useState('')

  const info = [
    {
      type: 'input',
      title: '닉네임',
      value: nickname,
      onChange: (e) => {
        setNickname(e.target.value)
        setValidate({ ...initValidate })
      },
      onBlur: () => checkDuplicateNickname(nickname).then((nickname) => {
        setValidate((prev) => ({ ...prev, nickname }))
      }),
      placeholder: '닉네임을 입력해주세요.',
      name: 'nickname',
      buttonLabel: '중복 확인'
    },
    {
      type: 'select',
      title: '성별',
      value: gender,
      name: 'gender',
      options: ['여자', '남자'],
      onChange: (e) => setGender(e.target.value),
      placeholder: '성별을 선택해주세요.'
    },
    {
      type: 'input',
      title: '생년월일',
      value: yearOfBirth,
      name: 'yearOfBirth',
      onChange: (e) => setYearOfBirth(() => replaceBirthDay(e.target.value)),
      placeholder: '생년월일을 입력해주세요. (YYYY-MM-DD)',
    },
    {
      type: 'select',
      title: '국가',
      value: country,
      name: 'country',
      options: countries,
      onChange: (e) => setCountry(e.target.value),
      placeholder: '국가를 선택해주세요.'
    },
    {
      type: 'input',
      title: '직업',
      value: job,
      name: 'job',
      onChange: (e) => setJob(e.target.value),
      placeholder: '직업을 입력해주세요.'
    },
  ];

  /**
   * @param {string | File} file 
   * @returns string | string | ArrayBuffer | null
   * @description 업로드 파일 미리보기 변환
   */
  const convertFileReader = (file) => {
    const reader = new FileReader();

    if (!(file instanceof File)) {
      setPreImg(file)
      return
    }

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreImg(reader.result)
    };
  }

  /**
   * @description 유저 정보 불러오기
   */
  async function getUserInfo() {
    try {
      const res = await api.get('user/profile')
      setImg(res.data.data.profileImageUrl)
      convertFileReader(res.data.data.profileImageUrl ?? noImage)
      setCountry(res.data.data.country.id)
      setGender(res.data.data.gender)
      setJob(res.data.data.job)
      setNickname(res.data.data.nickname)
      setYearOfBirth(res.data.data.yearOfBirth)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUserInfo()
    getContries().then((res) => {
      setCountries(res)
    })
    return () => { }
  }, [])


  const navigate = useNavigate();

  /**
   * @param {React.FormEvent<HTMLFormElement>} event 
   */
  async function handleSubmit(event) {
    event.preventDefault()
    const failToPass = Object.values(validate).find(val => val.status === false)

    if (failToPass) {
      throw new Error('유효성 검사 실패')
    }

    try {
      const requestData = {
        nickname,
        gender,
        yearOfBirth,
        country,
        job,
      };

      const formData = new FormData()
      const blob = new Blob([JSON.stringify(requestData)], { type: 'application/json' })
      formData.append('file', img);
      formData.append('request', blob);

      const res = await needHeaderApi({ 'Content-Type': 'multipart/form-data' }).put('user/profile', formData)
      if (!res.data.data) {
        throw new Error('저장 실패')
      }

      navigate(-1)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event 
   * @description 프로필 사진 미리보기
   */
  function handleImage(event) {
    const file = event.target.files[0]
    convertFileReader(file)
    setImg(file)
  }

  /**
   * @description 로그아웃
   */
  function handleLogout() {
    Cookies.remove('token')
    navigate('/')
  }

  /**
   * @description 회원 탈퇴
   */
  async function handleUnsubscribe() {
    try {
      const res = await api.get()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className='flex flex-col bg-gray-100 min-h-screen'>
      <Topbar title='내 정보' />
      <section className='flex flex-col gap-3 w-full items-center max-w-2xl mx-auto pt-10 px-5 lg:px-8'>
        <form className='flex flex-col gap-3 w-full items-center' method='PUT' onSubmit={handleSubmit}>
          <label htmlFor='img' className='relative block w-28 h-28 p-2 rounded-full border border-gray-300 overflow-hidden'>
            <img src={preImg} alt='' />
            <input
              id='img'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImage}
            />
          </label>
          {info.map(({ title, type, value, onChange, placeholder, options, name, buttonLabel, onBlur }, idx) => (
            <InfoItem
              title={title}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              buttonLabel={buttonLabel}
              key={idx}
              options={options}
              name={name}
              validate={validate}
              onBlur={onBlur}
            />
          ))}
          <button type='submit'>내 정보 수정</button>
        </form>
        <div className='flex flex-row text-center items-center justify-center'>
          <button
            type='button'
            className='text-md font-regular py-4 text-center text-gray-500'
            onClick={handleLogout}
          >
            로그아웃
          </button>
          <div className='border-l border-gray-400 h-2 mx-4'></div>
          <button
            type='button'
            className='text-md font-regular py-4 text-center text-gray-500'
            onClick={handleUnsubscribe}
          >
            회원탈퇴
          </button>
        </div>
      </section>
    </main>
  );
}
export default Myinfo
