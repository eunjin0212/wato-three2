import logo from "@/assets/logo_w.png";
import bg from "@/assets/basic_bg_pc.png";
import bgMobile from "@/assets/basic_bg.png";
import LinkButton from '@/ui/LinkButton';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Started() {
  const links = [
    {
      label: '로그인',
      to: '/login'
    },
    {
      label: '회원가입',
      to: '/signin'
    },
  ]
  useEffect(() => {
    Cookies.remove('token')
  }, [])
  return (
    <main className='relative flex flex-col lg:flex-row bg-primary min-h-screen before:absolute before:-z-10 before:content-[""] before:top-0 before:left-0 before:w-full before:h-full before:bg-[url("/img")]'>
      <section className="flex-1 px-10 flex flex-col text-center justify-between items-center">
        <img src={logo} alt="Home Icon" className="mt-40 mb-4 h-30" />

        <div className="mb-40 lg:mb-0 flex flex-col px-2 w-full lg:items-center">
          <h1 className="font-medium text-white text-xl  mt-10 mb-2">
            &quot;우리는 하나&quot;
          </h1>
          {links.map(({ label, to }) => (
            <LinkButton key={label} to={to} label={label} />
          ))}
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
