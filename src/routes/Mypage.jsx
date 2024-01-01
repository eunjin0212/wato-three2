import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Menu from '@/components/Menu';
import Topbar from '@/ui/Topbar';

import info from '@/assets/ico-myinfo.png';
import setting from '@/assets/ico-setting.svg';
import notice from '@/assets/ico-notice.svg';
import customer from '@/assets/ico-customer.png';
import help from '@/assets/ico-help.svg';
import chevronRight from '@/assets/ico-arrow-right.png';

const documents1 = [
  {
    title: '내정보',
    icon: info,
    link: 'myinfo',
  },
  {
    title: '설정',
    icon: setting,
    link: 'setting',
  },
  {
    title: '공지사항',
    icon: notice,
    link: 'notice',
  },
  {
    title: '고객센터',
    icon: customer,
    link: 'customer',
  },
  {
    title: '도움말',
    icon: help,
    link: 'help',
  },
];

export default function Mypage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set your breakpoint as needed
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check for mobile view on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='flex flex-col lg:flex-row bg-gray-100 min-h-screen'>
      <div className='flex-1'>
        <Topbar title='마이페이지' />
        <div className='max-w-3xl mx-auto py-5 flex'>
          <Menu />
          {isMobile ? (
            <div className='flex-1 ml-5 mr-5 lg:ml-8 lg:mr-8'>
              {documents1.map((doc, index) => (
                <Item key={index} {...doc} />
              ))}
            </div>
          ) : (
            <div className='flex flex-1 ml-5 mr-5 lg:ml-8 lg:mr-8 flex-wrap'>
              <Card title='내정보' icon={info} link='myinfo' />
              <Card
                title='설정'
                icon={setting}
                padding={true}
                link='setting'
              />
              <Card title='공지사항' icon={notice} link='notice' />
              <Card
                title='고객센터'
                icon={customer}
                padding={true}
                link='customer'
              />
              <Card title='도움말' icon={help} link='help' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Item({ title, link, icon }) {
  return (
    <Link
      to={`/${link}`}
      className='p-4 rounded-lg relative cursor-pointer flex justify-between items-center'
    >
      <div className='flex flex-row space-x-2'>
        <img src={icon} alt='Recommend Icon' className='w-6 h-6 object-cover' />
        <h2 className='text-md font-bold'>{title}</h2>
      </div>
      <div className='flex items-center'>
        <label className='flex cursor-pointer select-none items-center'>
          <img src={chevronRight} alt='Dropdown Icon' />
        </label>
      </div>

      <div className='absolute bottom-0 left-0 right-0 border-b border-gray-300 mt-4'></div>
    </Link>
  );
}

const Card = ({ title, icon, padding, link }) => {
  return (
    <Link
      to={`/${link}`}
      className={`w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 pb-3 ${padding ? `lg:pl-3 xl:pl-3` : ''
        }`}
    >
      <div className='flex rounded-lg shadow-sm bg-white h-28 items-center justify-center'>
        <div className='flex flex-row items-center'>
          <img
            src={icon}
            alt='Recommend Icon'
            className='w-6 h-6 object-cover'
          />
          <h1 className='text-xl font-bold ml-2 body-font font-pretendard'>
            {title}
          </h1>
        </div>
      </div>
    </Link>
  );
};
