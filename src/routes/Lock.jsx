import React, { useState } from "react";

import Menu from "../components/Menu";
import Topbar from "../components/Topbar";
import Dropdown from "../components/Dropdown";
import Toggle from "../components/Toggle";

import lockIcon from "../assets/ico-lock.png";

const documents = [
  {
    title: "화면 잠그기",
  },
];

function Item({ title }) {
  return (
    <div className="p-4 rounded-lg relative flex justify-between items-center">
      <h2 className="text-xl font-medium">{title}</h2>
      <div className="flex items-center">
        <label className="flex cursor-pointer select-none items-center">
          <Toggle />
        </label>
      </div>
      <div className="absolute top-0 left-0 right-0 border-t border-gray-300"></div>
      <div className="absolute bottom-0 left-0 right-0 border-b border-gray-300 mt-4"></div>
    </div>
  );
}

export default function Lock() {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      <div className="flex-1">
        <Topbar title={"화면 잠금 설정"} />
        <div className="max-w-3xl mx-auto py-10 flex">
          <Menu />
          <div className="flex-1 ml-5 mr-5 lg:ml-8 lg:mr-8">
            <div className="flex flex-col  items-center lg:px-20 text-center">
              <img src={lockIcon} alt="Alert Icon" />
              <h2 className="text-xl font-regular py-4">
                화면 잠금시 앱을 실행할 때마다 비밀번호를 <br />
                확인하며 보다 안전하게 서비스를 이용할 수 있습니다.
              </h2>
            </div>
            {documents.map((doc, index) => (
              <Item key={index} {...doc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
