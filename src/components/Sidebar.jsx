import airplay from '@/images/airplay.svg';
import clipboard from '@/images/clipboard.svg';
import settings from '@/images/settings.svg';
import smile from '@/images/smile.svg';
import user from '@/images/user.svg';
import MenuItem from '@/ui/MenuItem';

export const Sidebar = () => {
  const menus = [
    {
      label: 'Dashboard',
      src: airplay,
      href: '/dashboard'
    },
    {
      label: 'Upcoming visits',
      src: clipboard,
      href: '#'
    },
    {
      label: 'Patients',
      src: smile,
      href: '#'
    },
    {
      label: 'Patients',
      src: smile,
      href: '#'
    },
    {
      label: 'Settings',
      src: settings,
      href: '#'
    },
  ]
  return (
    <aside className=" px-[27px] flex flex-col justify-between bg-sidebar text-white text-xl max-w-[239px] pt-[84px] ">
      <div className="gap-y-7 flex flex-col">
        {menus.map(({src, label, href}) => {
          <MenuItem src={src} label={label} href={href} />
        })}
      </div>
      <div>
        <a href="#" className="flex gap-x-2 pb-9">
          <img src={user} />
          Profile
        </a>
      </div>
    </aside>
  );
};
