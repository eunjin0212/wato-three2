import airplay from '../images/airplay.svg';
import clipboard from '../images/clipboard.svg';
import settings from '../images/settings.svg';
import smile from '../images/smile.svg';
import user from '../images/user.svg';

export const Sidebar = () => {
  return (
    <aside className=" px-[27px] flex flex-col justify-between bg-sidebar text-white text-xl max-w-[239px] pt-[84px] ">
      <div className="gap-y-7 flex flex-col">
        <a href="/dashboard" className="flex gap-x-2">
          <img src={airplay} />
          Dashboard
        </a>
        <a href="#" className="flex gap-x-2">
          <img src={clipboard} />
          Upcoming visits
        </a>
        <a href="#" className="flex gap-x-2">
          <img src={smile} />
          Patients
        </a>
        <a href="#" className="flex gap-x-2">
          <img src={settings} />
          Settings
        </a>
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
