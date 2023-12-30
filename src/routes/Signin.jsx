import { useState } from "react";
import { api, needHeaderApi } from '@/api/axios';
import Cookies from 'js-cookie';
import logo from "@/assets/logo_w.png";
import bg from "@/assets/basic_bg_pc.png";
import bgMobile from "@/assets/basic_bg.png";
import Input from '@/ui/Input';
import Select from '@/ui/Select';
import replaceBirthDay from '@/utils/replaceBirthDay';
import { useNavigate } from "react-router";


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [job, setJob] = useState('');
  const [code, setCode] = useState('');
  const [checkCode, setCheckCode] = useState('');
  const [authKey, setAuthKey] = useState('');
  const initValidate = { email: { msg: '', status: null }, code: { msg: '', status: null }, nickname: { msg: '', status: null } }
  const [validate, setValidate] = useState({ ...initValidate })

  const navigate = useNavigate()
  /**
   * @param {HTMLFormElement} event
   * @description 이메일 회원가입
   */
  async function handleSubmit(event) {
    event.preventDefault();

    const failToPass = Object.values(validate).find(val => !val.status)
    if (failToPass) {
      throw new Error()
    }

    try {
      const res = await needHeaderApi({ authKey: Cookies.get('token') }).post('signup', {
        email,
        password,
        nickname,
        gender,
        yearOfBirth,
        job,
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
      setValidate((prev) => ({ ...prev, email: { msg: '', status: null } }))
      Cookies.set('token', authKey, { expires: new Date(res.data.data.expiration), secure: true })
    } catch (error) {
      setValidate((prev) => ({ ...prev, code: { msg: '인증이 실패했습니다.', status: false } }))
      console.error(error)
    }
  }

  /**
   * @param {'email' | 'birth' | 'nickname'} type 
   * @param {string | undefined} value 
   * @returns {boolean} 유효성 검사 체크 통과 X -> true
   */
  function checkTypoValidation(type, value) {
    if (type === 'email') {
      const emailRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)

      return !emailRegex.test(email)
    }

    if (type === 'nickname') {
      return value.length > 6
    }

    if (type === 'birth') {
      const dateRegex = new RegExp(/^\d{4}-\d{2}-\d{2}$/)
      const dateNumberRegex = new RegExp(/^(19|20)\d{2}-(0[1-9]|1[0-2])-([0-2][1-9]|3[01])$/)

      return (!dateRegex.test(value) || !dateNumberRegex.test(value))
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
    if (checkTypoValidation('email')) {
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

  /**
   * @description 닉네임 중복체크
   */
  async function checkDuplicateNickname() {
    if (checkTypoValidation('nickname', nickname)) {
      setValidate((prev) => ({ ...prev, nickname: { msg: '올바른 닉네임을 입력해주세요.', status: false } }))
      return;
    }
    try {
      const res = await api.get(`signup/check/nickname?nickname=${nickname}`)

      if (res.data.message !== 'Success') {
        throw new Error(res.data.message)
      }

      setValidate((prev) => ({ ...prev, nickname: { msg: '사용할 수 있는 닉네임 입니다.', status: true } }))
    } catch (error) {
      console.error(error)
      setValidate((prev) => ({ ...prev, nickname: { msg: '닉네임 중복체크에 실패했습니다.', status: false } }))
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
      placeholder: '이메일을 입력하세요',
      name: 'email',
      display: true,
      buttonLabel: '인증코드 발송',
    },
    {
      type: 'text',
      value: code,
      onChange: (e) => setCode(e.target.value),
      onClick: () => checkEmailCode(),
      placeholder: '인증코드를 입력해주세요',
      name: 'code',
      display: checkCode,
      buttonLabel: '인증코드 확인'
    },
    {
      type: 'text',
      value: nickname,
      onChange: (e) => setNickname(e.target.value),
      onClick: () => checkDuplicateNickname(),
      placeholder: '닉네임을 입력하세요',
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
      placeholder: '비밀번호를 입력하세요',
      required: true,
      name: 'password',
    },
    {
      type: 'text',
      value: yearOfBirth,
      onChange: (e) => setYearOfBirth(() => replaceBirthDay(e.target.value)),
      placeholder: '생년월일을 입력하세요 (YYYY-MM-DD)',
      required: true,
      name: 'yearOfBirth',
    },
    {
      type: 'text',
      value: job,
      onChange: (e) => setJob(e.target.value),
      placeholder: '직업을 입력하세요',
      required: true,
      name: 'job',
    }
  ]

  return (
    <div className="flex flex-col lg:flex-row bg-primary min-h-screen">
      <div className="flex-1 px-10 flex flex-col text-center justify-between items-center">
        <img src={logo} alt="Home Icon" className="mt-40 mb-8" />
        <form onSubmit={handleSubmit} className='w-96 flex flex-col gap-3'>
          {validateInputs.map(({ type, value, onChange, onClick, placeholder, name, display, buttonLabel }, idx) => (
            display && <div className='flex items-start' key={`${name}_${idx}`}>
              <Input
                type={type}
                value={value}
                className='flex-1'
                onChange={onChange}
                placeholder={placeholder}
                required
                name={name}
                validate={validate[name]}
              />
              {buttonLabel && <button type='button' className='w-[7.5rem] h-14 ml-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg rounded-lg p-2.5 border' onClick={onClick}>
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
            />
          ))}
          <Select
            options={['여자', '남자']}
            value={gender}
            name='gender'
            placeholder='성별을 입력하세요'
            required
            onChange={(e) => setGender(e.target.value)}
          />
          <button
            type='submit'
            className='w-full me-2 button'
          >
            회원가입
          </button>
        </form>
        <img
          src={bg}
          alt="Desktop Background"
          className="w-auto hidden lg:block"
        />
      </div>
      <img
        src={bgMobile}
        alt="Mobile Background"
        className="w-full block lg:hidden"
      />
    </div>
  );
}
export default Signin