import React, { useState } from "react";

import Menu from "../components/Menu";
import Topbar from "../components/Topbar";
import Dropdown from "../components/Dropdown";
import Toggle from "../components/Toggle";

import lockIcon from "../assets/ico-lock.png";
import profile from "../assets/profile.png";

const documents = [
  {
    title: "닉네임",
    subtitle: "닉네임여섯자",
  },
  {
    title: "국가",
    subtitle: "대한민국",
  },
];

function Item({ title, subtitle }) {
  return (
    <div className="px-4 rounded-lg relative flex justify-start items-center">
      <h2 className="text-md font-regular py-4  text-gray-500 w-20">{title}</h2>
      <h2 className="text-lg font-bold">{subtitle}</h2>

      <div className="absolute bottom-0 left-0 right-0 border-b border-gray-300"></div>
    </div>
  );
}

export default function Myinfo() {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      <div className="flex-1">
        <Topbar title={"내 정보"} />
        <div className="max-w-3xl mx-auto py-10 flex">
          <Menu />
          <div className="flex-1 ml-5 mr-5 lg:ml-8 lg:mr-8">
            <div className="flex flex-col pb-6 items-center lg:px-20 text-center">
              <img src={profile} alt="Alert Icon" />
            </div>
            {documents.map((doc, index) => (
              <Item key={index} {...doc} />
            ))}
            <div className="flex flex-row text-center items-center justify-center">
              <h2 className="text-md font-regular py-4 text-center text-gray-500">
                로그아웃
              </h2>
              <div className="border-l border-gray-400 h-2 mx-4"></div>
              <h2 className="text-md font-regular py-4 text-center text-gray-500">
                회원탈퇴
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
