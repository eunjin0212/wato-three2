import React, { useState } from "react";

import Menu from "../components/Menu";
import Topbar from "../components/Topbar";

import info from "../assets/ico-myinfo.png";
import setting from "../assets/ico-setting.svg";

const Card = ({ title, date, active }) => {
  return (
    <div className={`w-full pb-3`}>
      <div className="flex rounded-lg shadow-sm bg-white px-4 py-4 justify-start flex-col">
        <div className="flex flex-row items-center">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              active ? "bg-purple" : "bg-graycircle"
            }`}
          ></div>
          <h1 className="text-sm font-semibold ml-2 body-font font-pretendard">
            {title}
          </h1>
        </div>
        <p className="text-sm text-gray-600 pl-4 pt-1">{date}</p>
      </div>
    </div>
  );
};

export default function Alarm() {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      <div className="flex-1">
        <Topbar title={"알림"} />
        <div className="max-w-3xl mx-auto pt-5 pb-16 flex">
          <Menu />
          <div className="flex-1 ml-5 mr-5 lg:ml-8 lg:mr-8">
            <Card
              title={"'제목' 게시글에 '댓글'이 달렸어요!"}
              date={"2023.10.07 14:33"}
              active
            />
            <Card
              title={"'제목' 게시글에 '댓글'이 달렸어요!"}
              date={"2023.10.07 14:33"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
