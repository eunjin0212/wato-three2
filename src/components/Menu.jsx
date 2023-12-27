import React from "react";
import { Link, useLocation } from "react-router-dom";

import home from "../assets/app01.png";
import homeOn from "../assets/app01_on.png";

import recommend from "../assets/app02.png";
import recommendOn from "../assets/app02_on.png";
import mypage from "../assets/app03.png";
import mypageOn from "../assets/app03_on.png";
import alerticon from "../assets/app04.png";
import alerticonOn from "../assets/app04_on.png";

export default function Menu() {
  const location = useLocation();
  const isIndex = location.pathname === "/index";
  const isRecommend = location.pathname === "/recommend";
  const isMypage = location.pathname === "/mypage";
  const isAlarm = location.pathname === "/alarm";

  return (
    <div className="w-10 bg-white p-2 lg:p-4 lg:static fixed bottom-0 left-0 w-full z-10 lg:z-auto lg:w-auto lg:flex lg:flex-col lg:items-start rounded-xl border-slate-300 border shadow-md lg:h-80">
      <div className="flex justify-between lg:flex-col lg:space-y-8 px-4 lg:px-0">
        <Link to="/index">
          <div className="flex flex-col items-center space-y-1">
            <img
              src={isIndex ? homeOn : home}
              alt="Home Icon"
              className="w-6"
            />
            <p
              className={`text-sm font-medium ${
                isIndex ? "text-primary" : "text-gray-500"
              }`}
            >
              홈
            </p>
          </div>
        </Link>
        <Link to="/recommend">
          <div className="flex flex-col items-center space-y-1">
            <img
              src={isRecommend ? recommendOn : recommend}
              alt="Recommend Icon"
              className="w-6"
            />
            <p
              className={`text-sm font-medium ${
                isRecommend ? "text-primary" : "text-gray-500"
              }`}
            >
              추천
            </p>
          </div>
        </Link>
        <Link to="/mypage">
          <div className="flex flex-col items-center space-y-1">
            <img
              src={isMypage ? mypageOn : mypage}
              alt="My Page Icon"
              className="w-6"
            />
            <p
              className={`text-sm font-medium ${
                isMypage ? "text-primary" : "text-gray-500"
              }`}
            >
              마이페이지
            </p>
          </div>
        </Link>
        <Link to="/alarm">
          <div className="flex flex-col items-center space-y-1">
            <img
              src={isAlarm ? alerticonOn : alerticon}
              alt="Alert Icon"
              className="w-6"
            />
            <p
              className={`text-sm font-medium ${
                isAlarm ? "text-primary" : "text-gray-500"
              }`}
            >
              알림
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
