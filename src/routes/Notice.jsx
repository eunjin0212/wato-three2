import React, { useState } from "react";

import Menu from "@/components/Menu";
import Topbar from "@/ui/Topbar";
import Dropdown from "@/ui/Dropdown";

const documents = [
  {
    title: '관심키워드 “전자제품"의 새로운 소식이 올라왔어요',
    date: "2023-10-10",
    description: "공지 : 정기 점검 및 각종 시스템 업데이트 상황 정보",
    detail: "이벤트: 이벤트 정보",
    note: "필독 : 주요 서비스 업데이트 및 보안 관련 정보",
  },
  {
    title: '관심키워드 “전자제품"의 새로운 소식이 올라왔어요',
    date: "2023-10-10",
    description: "공지 : 정기 점검 및 각종 시스템 업데이트 상황 정보",
    detail: "이벤트: 이벤트 정보",
    note: "필독 : 주요 서비스 업데이트 및 보안 관련 정보",
  },
  {
    title: '관심키워드 “전자제품"의 새로운 소식이 올라왔어요',
    date: "2023-10-10",
    description: "공지 : 정기 점검 및 각종 시스템 업데이트 상황 정보",
    detail: "이벤트: 이벤트 정보",
    note: "필독 : 주요 서비스 업데이트 및 보안 관련 정보",
  },
];

export default function Notice() {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      <div className="flex-1">
        <Topbar title={"공지사항"} />
        <div className="max-w-3xl mx-auto py-10 flex">
          <Menu />
          <div className="flex-1 ml-5 mr-5 lg:ml-8 lg:mr-8">
            {documents.map((doc, index) => (
              <Dropdown key={index} {...doc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
