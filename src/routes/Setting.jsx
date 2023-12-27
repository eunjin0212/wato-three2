import React, { useState } from "react";
import { Link } from "react-router-dom";

import Menu from "../components/Menu";
import Topbar from "../components/Topbar";

import chevronRight from "../assets/ico-arrow-right.png";

const documents1 = [
  {
    title: "화면 잠금 설정",
    link: "lock",
  },
  {
    title: "알림 설정",
    link: "push",
  },
];
const documents2 = [
  {
    title: "도움말",
    link: "help",
  },
  {
    title: "이용약관",
    link: "terms",
  },
];

function Item({ title, link }) {
  return (
    <Link
      to={`/${link}`}
      className="p-4 rounded-lg relative cursor-pointer flex justify-between items-center"
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex items-center">
        <label className="flex cursor-pointer select-none items-center">
          <img src={chevronRight} alt="Dropdown Icon" />
        </label>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-b border-gray-300 mt-4"></div>
    </Link>
  );
}

export default function Setting() {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      <div className="flex-1">
        <Topbar title={"설정"} />
        <div className="max-w-3xl mx-auto py-10 flex">
          <Menu />
          <div className="flex-1 ml-5 mr-5 lg:ml-8 lg:mr-8">
            <h2 className="text-sm font-medium text-gray-500 pl-2">앱설정</h2>
            {documents1.map((doc, index) => (
              <Item key={index} {...doc} />
            ))}

            <h2 className="text-sm font-medium text-gray-500 pt-10 pl-2">
              정보
            </h2>
            {documents2.map((doc, index) => (
              <Item key={index} {...doc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
