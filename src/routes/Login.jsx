import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router';
import logo from "@/assets/logo_w.png";
import kakao from "@/assets/kakao.png";
import emailIcon from "@/assets/email.png";
import facebook from "@/assets/facebook.png";
import naver from "@/assets/naver.png";
import google from "@/assets/google.png";
import bg from "@/assets/basic_bg_pc.png";
import bgMobile from "@/assets/basic_bg.png";
import { api } from '@/api/axios';
import SnsButton from '@/ui/SnsButton';
import Input from '@/ui/Input';
import checkEmailType from '@/utils/checkEmailType';
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [useEmail, setUseEmail] = useState(false)
  const initValidate = { email: { msg: '', status: null } }
  const [validate, setValidate] = useState({ ...initValidate })
  /**
   * @param {'facebook' | 'kakao' | 'naver' | 'google'} type 
   */
  async function snsLogin(type) {
    try {
      const res = await api.get(`oauth2/authorization/${type}`)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate()

  /**
   * @description 이메일 로그인
   */
  async function emailLogin() {
    if (!useEmail) {
      setUseEmail(true)
      return;
    }

    if (checkEmailType(email)) {
      setValidate({ email: { msg: '올바른 이메일을 입력해주세요.', status: false } })
      return;
    }

    try {
      const res = await api.post('auth/login', {
        email,
        password,
      })

      if (!res.data.data) {
        setValidate({ email: { msg: res.data.message, status: false } })
        throw new Error(res.data.message)
      }

      setValidate({ ...initValidate })
      // Cookies.remove('token')
      // Cookies.set('token', res.data.data.token, { expires: new Date(res.data.data.expiration), secure: true })
      navigate('/index')
    } catch (error) {
      console.error(error)
    }
  }

  const snsButtons = [
    {
      label: '페이스북 로그인',
      className: 'bg-positive text-white',
      onClick: () => snsLogin('facebook'),
      src: facebook,
    },
    {
      label: '구글 로그인',
      className: 'bg-white text-gray-900',
      onClick: () => snsLogin('google'),
      src: google,
    },
    {
      label: '카카오 로그인',
      className: 'bg-kakao text-gray-900',
      onClick: () => snsLogin('kakao'),
      src: kakao,
    },
    {
      label: '네이버 로그인',
      className: 'bg-naver text-white',
      onClick: () => snsLogin('naver'),
      src: naver,
    },
  ]

  const emailInput = [
    {
      type: 'text',
      value: email,
      onChange: (e) => {
        setValidate({ ...initValidate })
        setEmail(e.target.value)
      },
      placeholder: '이메일을 입력하세요',
      name: 'email',
      validate: validate.email
    },
    {
      type: 'password',
      value: password,
      onChange: (e) => {
        setValidate({ ...initValidate })
        setPassword(e.target.value)
      },
      placeholder: '비밀번호를 입력하세요',
      required: true,
      name: 'password',
    },
  ]
  return (
    <main className="flex flex-col lg:flex-row bg-primary min-h-screen">
      <section className="flex-1 px-10 flex flex-col text-center justify-between items-center">
        <div className="flex flex-col gap-3 items-center lg:w-96 w-80">
          <img src={logo} alt="Home Icon" className="mt-40 mb-4 " />
          {snsButtons.map(({ label, src, className, onClick }) => (
            <SnsButton
              key={label}
              src={src}
              className={className}
              label={label}
              onClick={onClick}
            />
          ))}
          <form className='w-full flex flex-col gap-3 items-center'>
            {useEmail && <Fragment>
              {emailInput.map(({ type, value, onChange, placeholder, name, validate }, idx) =>
                <Input
                  key={`${name}_${idx}`}
                  type={type}
                  value={value}
                  onChange={onChange}
                  className='w-full'
                  placeholder={placeholder}
                  required
                  validate={validate}
                  name={name}
                />
              )}
            </Fragment>}
            <SnsButton
              src={emailIcon}
              className='bg-plusplus text-white'
              label='이메일 로그인'
              onClick={emailLogin}
            />
          </form>
        </div>
        <img
          src={bg}
          alt="Desktop Background"
          className="w-auto hidden lg:block"
        />
      </section>
      <img
        src={bgMobile}
        alt="Mobile Background"
        className="w-full block lg:hidden"
      />
    </main>
  );
}
