import profilePicture from "@/images/profile-picture.png";
import bell from "@/images/bell.svg";
import { Link } from "react-router-dom";

export const Header = ({ userInfo, links }) => {
  const user = { ...userInfo, name: "Emre", avatar: profilePicture };
  return (
    <header
      className={`flex justify-between items-center pb-7 pt-6 pr-[71px] ${
        !links
          ? "bg-white shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)] pl-[58px]"
          : "pl-[154px]"
      }`}
    >
      <Link to="/">
        <p className="text-4xl/7 font-semibold text-life">
          Life<span className="text-plusplus">++</span>
        </p>
      </Link>
      {links && (
        <div className="flex text-link text-xl font-medium gap-x-14">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="#">Skills</Link>
          <Link to="#">Patients</Link>
          <Link to="#">Settings</Link>
          <Link to="#">Profile</Link>
        </div>
      )}
      <div className="flex items-center gap-x-3.5">
        <img className="rounded-full h-[40px]" src={user.avatar} />
        <p className="font-medium font-xl pr-3.5 text-lg">{user.name}</p>
        <img src={bell} />
      </div>
    </header>
  );
};
