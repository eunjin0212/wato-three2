import { useState } from "react";
import { api, needHeaderApi } from '@/api/axios';
import Cookies from 'js-cookie';
import logo from "@/assets/logo_w.png";
import bg from "@/assets/basic_bg_pc.png";
import bgMobile from "@/assets/basic_bg.png";
import Input from '@/ui/Input';
import replaceBirthDay from '../utils/replaceBirthDay';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [job, setJob] = useState('');

  /**
   * 
   * @param {HTMLFormElement} event
   * @description 이메일 회원가입
   */
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await needHeaderApi({ authKey: Cookies.get('token') }).post('signup', {
        email,
        password,
        nickname,
        gender,
        yearOfBirth,
        job,
      })

      if (res.data.message !== 'Success') {
        throw new Error(res.data.message)
      }

    } catch (error) {
      console.error(error)
    }
  }

  /**
   * @description 이메일 회원가입 인증 코드 발송
   */
  async function sendEmailAuthCode() {
    try {
      const res = await api.get(`auth/signup/email?email=${email}`)

      if (res.data.message !== 'Success') {
        throw new Error(res.data.message)
      }

      Cookies.set('token', res.data.data.token, { expires: new Date(res.data.data.expiration), secure: true })
    } catch (error) {
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
      return !(value.length > 6)
    }

    if (type === 'birth') {
      const dateRegex = new RegExp(/^\d{4}-\d{2}-\d{2}$/)
      const dateNumberRegex = new RegExp(/^(19|20)\d{2}-(0[1-9]|1[0-2])-([0-2][1-9]|3[01])$/)

      return (!dateRegex.test(value) || !dateNumberRegex.test(value))
    }
  }

  async function checkDuplicateEmail() {
    if (checkTypoValidation('email')) {
      throw new Error('올바른 이메일을 입력해주세요.')
    }

    try {
      const res = await api.get(`signup/check/email?email=${email}`)

      if (res.data.message !== 'Success') {
        throw new Error(res.data.message)
      }
      sendEmailAuthCode()
    } catch (error) {
      console.error(error)
    }
  }

  async function checkDuplicateNickname() {
    if (checkTypoValidation('nickname', nickname)) {
      throw new Error('올바른 닉네임을 입력해주세요.')
    }
    try {
      const res = await api.get(`signup/check/email?nickname=${nickname}`)

      if (res.data.message !== 'Success') {
        throw new Error(res.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const inputs = [
    {
      type: 'text',
      value: email,
      onChange: (e) => setEmail(e.target.value),
      onBlur: () => checkDuplicateEmail(),
      placeholder: '이메일을 입력하세요',
      required: true,
      name: 'email'
    },
    {
      type: 'password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
      placeholder: '비밀번호를 입력하세요',
      required: true,
      name: 'password'
    },
    {
      type: 'text',
      value: nickname,
      onChange: (e) => setNickname(e.target.value),
      onBlur: () => checkDuplicateNickname(),
      placeholder: '닉네임을 입력하세요',
      required: true,
      name: 'nickname',
    },
    {
      type:'text',
      value: yearOfBirth,
      onChange: (e) => setYearOfBirth(() => replaceBirthDay(e.target.value)),
      placeholder: '생년월일을 입력하세요 (YYYY-MM-DD)',
      required: true,
      name: 'yearOfBirth',
    },
    {
      type:'text',
      value: job,
      onChange: (e) => setJob(e.target.value),
      placeholder:'직업을 입력하세요',
      required: true,
      name:'job',
    }
  ]

  return (
    <div className="flex flex-col lg:flex-row bg-primary min-h-screen">
      <div className="flex-1 px-10 flex flex-col text-center justify-between items-center">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Home Icon" className="mt-40 mb-8" />
          <div>
            <form onSubmit={handleSubmit}>
              {/* TODO: input component 만들기 */}
              {inputs.map(({ type, value, onChange, onBlur, placeholder, name }, idx) => (
                <Input
                  key={`${name}_${idx}`}
                  type={type}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder={placeholder}
                  name={name}
                  required
                />
              ))}
              {/* NOTE: select 로 되어야 하는 것 아닌지? */}
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mb-3 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-14"
                placeholder="성별을 입력하세요"
                required
                name="gender"
              />
              <button
                type='submit'
                className='w-96 me-2 button'
              >
                {Cookies.get('token') ? '회원가입' : '이메일 인증'}
              </button>
            </form>
          </div>
        </div>

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