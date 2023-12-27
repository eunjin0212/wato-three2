import React, { useState } from "react";

import Menu from "../components/Menu";
import Topbar from "../components/Topbar";
import Dropdown from "../components/Dropdown";
import Toggle from "../components/Toggle";

const documents = [
  {
    title: "푸시 알림받기",
  },
  {
    title: "WATO 공지사항/새소식",
  },
  {
    title: "새 댓글",
  },
  {
    title: "새 추천",
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

      <div className="absolute bottom-0 left-0 right-0 border-b border-gray-300 mt-4"></div>
    </div>
  );
}

export default function Push() {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      <div className="flex-1">
        <Topbar title={"공지사항"} />
        <div className="max-w-3xl mx-auto py-10 flex">
          <Menu />
          <div className="flex-1 ml-5 mr-5 lg:ml-8 lg:mr-8">
            {documents.map((doc, index) => (
              <Item key={index} {...doc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
