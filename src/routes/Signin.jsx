import { useEffect, useState } from 'react';
import { api, needHeaderApi } from '@/api/axios';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import logo from '@/assets/logo_w.png';
import Input from '@/ui/Input';
import Select from '@/ui/Select';
import BackButton from '@/ui/BackButton';
import replaceBirthDay from '@/utils/replaceBirthDay';
import checkTypoValidation from '@/utils/checkValidation';
import getContries from '@/modules/getContries';
import checkDuplicateNickname from '@/modules/checkDuplocateNickname';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [job, setJob] = useState('');
  const [code, setCode] = useState('');
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([]);
  const [checkCode, setCheckCode] = useState('');
  const [authKey, setAuthKey] = useState('');
  const initValidate = { email: { msg: '', status: null }, code: { msg: '', status: null }, nickname: { msg: '', status: null } }
  const [validate, setValidate] = useState({ ...initValidate })

  const navigate = useNavigate()
  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   * @description 이메일 회원가입
   */
  async function handleSubmit(event) {
    event.preventDefault();

    const failToPass = Object.values(validate).find(val => !val.status)
    if (failToPass) {
      throw new Error(`유효성 검사 실패 ${validate}`)
    }

    try {
      const res = await needHeaderApi({ authKey: Cookies.get('token') }).post('signup', {
        email,
        password,
        nickname,
        gender,
        yearOfBirth,
        job,
        country,
      })

      if (!res.data.data) {
        throw new Error()
      }

      navigate('/index')

    } catch (error) {
      console.error(error)
    }
  }

  /**
   * @description 이메일 회원가입 인증 코드 확인
   */
  async function checkEmailCode() {
    try {
      const res = await needHeaderApi({ authKey }).post('auth/signup/email', { code })

      if (!res.data.data) {
        throw new Error(res.data.message)
      }

      setValidate((prev) => ({ ...prev, code: { msg: '인증에 성공했습니다.', status: true } }))
      Cookies.set('token', authKey, { expires: new Date(res.data.data.expiration), secure: true })
    } catch (error) {
      setValidate((prev) => ({ ...prev, code: { msg: '인증이 실패했습니다.', status: false } }))
      console.error(error)
    }
  }

  /**
   * @description 이메일 인증 코드 발송
   */
  async function sendEmailAuthCode() {
    try {
      const res = await api.get(`auth/signup/email?email=${email}`)

      if (res.data.message !== 'Success') {
        throw new Error(res.data.message)
      }

      setCheckCode(true)
      setAuthKey(res.data.data.token)
      setValidate((prev) => ({ ...prev, email: { msg: '인증코드가 발송되었습니다.', status: true } }))
    } catch (error) {
      setValidate((prev) => ({ ...prev, email: { msg: '인증코드 발송에 실패했습니다.', status: false } }))
      console.error(error)
    }
  }

  /**
   * @description 이메일 중복체크
   */
  async function checkDuplicateEmail() {
    if (checkTypoValidation('email', email)) {
      setValidate((prev) => ({ ...prev, email: { msg: '올바른 이메일을 입력해주세요.', status: false } }))
      return
    }

    try {
      const res = await api.get(`signup/check/email?email=${email}`)

      if (!res.data.data) {
        throw new Error(res.data.message)
      }
      sendEmailAuthCode()

    } catch (error) {
      setValidate((prev) => ({ ...prev, email: { msg: '중복된 이메일 입니다.', status: false } }))
      console.error(error)
    }
  }

  const validateInputs = [
    {
      type: 'text',
      value: email,
      onChange: (e) => {
        setValidate((prev) => ({ ...prev, email: { msg: '', status: null }, code: { msg: '', status: null } }));
        setCode('')
        setEmail(e.target.value)
      },
      onClick: () => checkDuplicateEmail(),
      placeholder: '이메일을 입력해주세요.',
      name: 'email',
      display: true,
      buttonLabel: '인증코드 발송',
    },
    {
      type: 'text',
      value: code,
      onChange: (e) => {
        setValidate((prev) => ({ ...prev, code: { msg: '', status: null } }));
        setCode(e.target.value)
      },
      onClick: () => checkEmailCode(),
      placeholder: '인증코드를 입력해주세요.',
      name: 'code',
      display: checkCode,
      buttonLabel: '인증코드 확인'
    },
    {
      type: 'text',
      value: nickname,
      onChange: (e) => {
        setValidate((prev) => ({ ...prev, nickname: initValidate.nickname }))
        setNickname(e.target.value)
      },
      onClick: () => checkDuplicateNickname(nickname).then((nicknameValidate) => {
        setValidate((prev) => ({ ...prev, nickname: nicknameValidate }))
      }),
      placeholder: '닉네임을 입력해주세요.',
      name: 'nickname',
      display: true,
      buttonLabel: '중복 확인'
    },
  ]

  const inputs = [
    {
      type: 'password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
      placeholder: '비밀번호를 입력해주세요.',
      required: true,
      name: 'password',
    },
    {
      type: 'text',
      value: yearOfBirth,
      onChange: (e) => setYearOfBirth(() => replaceBirthDay(e.target.value)),
      placeholder: '생년월일을 입력해주세요. (YYYY-MM-DD)',
      required: true,
      name: 'yearOfBirth',
    },
    {
      type: 'text',
      value: job,
      onChange: (e) => setJob(e.target.value),
      placeholder: '직업을 입력해주세요.',
      required: true,
      name: 'job',
    }
  ]

  const selects = [
    {
      options: ['여자', '남자'],
      value: gender,
      name: 'gender',
      placeholder: '성별을 선택해주세요.',
      onChange: (e) => setGender(e.target.value)
    },
    {
      options: countries,
      value: country,
      name: 'country',
      placeholder: '국가를 선택해주세요.',
      optionValue: 'id',
      optionLabel: 'name',
      onChange: (e) => setCountry(e.target.value)
    },
  ]

  useEffect(() => {
    getContries().then((res) => {
      setCountries(res)
    })
    return () => { };
  }, []);
  return (
    <main className='flex flex-col lg:flex-row bg-primary min-h-screen'>
      <BackButton link='/' />
      <section className='enter-section enter-bg-img'>
        <img src={logo} alt='Home Icon' className='enter-logo' />
        <form onSubmit={handleSubmit} className='enter-item-wrapper'>
          {validateInputs.map(({ type, value, onChange, onClick, placeholder, name, display, buttonLabel }, idx) => (
            display && <div className='flex w-full md:flex-row flex-col gap-2 items-start' key={`${name}_${idx}`}>
              <Input
                type={type}
                value={value}
                className='md:flex-1 w-full'
                onChange={onChange}
                placeholder={placeholder}
                required
                name={name}
                validate={validate[name]}
                inputClass='h-14'
              />
              {buttonLabel
                && <button
                  type='button'
                  className='w-full md:w-[7.5rem] h-14 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg rounded-lg p-2.5 border border-gray-600'
                  onClick={onClick}
                >
                  {buttonLabel}
                </button>}
            </div>
          ))}
          {inputs.map(({ type, value, onChange, placeholder, name }, idx) => (
            <Input
              key={`${name}_${idx}`}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              name={name}
              required
              className='md:flex-1 w-full'
              inputClass='h-14'
            />
          ))}
          {selects.map(({ options, value, name, onChange, placeholder, optionValue, optionLabel }) => (
            <Select
              key={name}
              options={options}
              value={value}
              name={name}
              placeholder={placeholder}
              required
              className='h-14'
              onChange={onChange}
              optionValue={optionValue}
              optionLabel={optionLabel}
            />
          ))}
          <button
            type='submit'
            className='w-full me-2 button'
          >
            회원가입
          </button>
        </form>
        {/* <img
          src={bg}
          alt='Desktop Background'
          className='w-auto hidden lg:block'
        /> */}
      </section>
      {/* <img
        src={bgMobile}
        alt='Mobile Background'
        className='w-full block lg:hidden'
      /> */}
    </main>
  );
}
export default Signin