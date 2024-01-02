import { Link, useLocation } from 'react-router-dom';
import home from '@/assets/app01.png';
import homeOn from '@/assets/app01_on.png';
import recommend from '@/assets/app02.png';
import recommendOn from '@/assets/app02_on.png';
import mypage from '@/assets/app03.png';
import mypageOn from '@/assets/app03_on.png';
import alerticon from '@/assets/app04.png';
import alerticonOn from '@/assets/app04_on.png';

export default function Menu() {
  const location = useLocation();

  const checkPath = (path) => location.pathname === path

  const menus = [
    {
      img: checkPath('/index') ? homeOn : home,
      label: '홈',
      to: '/index',
      alt: 'Home Icon'
    },
    {
      img: checkPath('/recommend') ? recommendOn : recommend,
      label: '추천',
      to: '/recommend',
      alt: 'Recommend Icon'
    },
    {
      img: checkPath('/mypage') ? mypageOn : mypage,
      label: '마이페이지',
      to: '/mypage',
      alt: 'My Page Icon'
    },
    {
      img: checkPath('/alarm') ? alerticonOn : alerticon,
      label: '알림',
      to: '/alarm',
      alt: 'Alert Icon'
    },
  ]

  return (
    <aside className='w-full lg:w-fit lg:h-80 bg-white p-2 lg:p-4 fixed lg:sticky bottom-0 left-0 lg:top-10 lg:-left-2.5 z-10 lg:z-auto flex flex-row lg:flex-col lg:items-start justify-around rounded-t-xl lg:rounded-xl border border-slate-300 shadow-md'>
      {menus.map(({ to, img, label }) => (
        <Link to={to} key={to}>
          <div className='flex flex-col items-center space-y-1 lg:w-16'>
            <img
              src={img}
              alt='Home Icon'
              className='w-6'
            />
            <p
              className={['text-sm font-medium', checkPath(to) ? 'text-primary' : 'text-gray-500'].join(' ')}
            >
              {label}
            </p>
          </div>
        </Link>
      ))}
    </aside>
  );
}
