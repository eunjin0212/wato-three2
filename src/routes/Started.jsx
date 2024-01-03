import logo from '@/assets/logo_w.png';
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
    <main className='flex flex-col lg:flex-row bg-primary min-h-screen'>
      <section className='enter-section enter-bg-img'>
        <img src={logo} alt='Home Icon' className='enter-logo' />
        <div className='enter-item-wrapper mt-12'>
          <h1 className='font-medium text-white text-xl mt-10 mb-2'>
            &quot;우리는 하나&quot;
          </h1>
          {links.map(({ label, to }) => (
            <LinkButton key={label} to={to} label={label} />
          ))}
        </div>

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
