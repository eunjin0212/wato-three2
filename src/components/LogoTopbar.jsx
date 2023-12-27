import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backicon from "../assets/back.png";
import logo from "../assets/logo.png";

export default function LogoTopbar({ title, alignLeft, nomenu }) {
  const [selectedMenu, setSelectedMenu] = useState("홈");
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    // Handle navigation or other actions when a menu is clicked
    // navigate(`/your-route/${menu}`); // Example navigation logic
  };

  return (
    <div className="bg-white shadow border rounded-b-xl lg:rounded-none min-h-16">
      <div
        className={`max-w-4xl mx-auto relative  px-4 flex flex-col items-center ${
          alignLeft ? "justify-start" : "justify-center"
        }`}
      >
        <img
          src={logo}
          alt="Dropdown Icon"
          className={`dropdown-icon lg:absolute left-10 cursor-pointer w-16 mt-3 lg:mt-0 lg:ml-10`}
        />

        {!nomenu ? (
          <div className="flex flex-row space-x-20 h-16">
            <div
              className={`h-full w-20 pt-5 cursor-pointer ${
                alignLeft ? "text-left ml-20" : ""
              } ${
                selectedMenu === "홈" ? "border-b-2 border-black" : "mb-0.5"
              }`}
            >
              <h1
                className={`text-center text-md font-semibold ml-2 cursor-pointer ${
                  alignLeft ? "text-left ml-20" : ""
                } ${selectedMenu === "홈" ? "text-black" : "text-gray-400"}`}
                onClick={() => handleMenuClick("홈")}
              >
                홈
              </h1>
            </div>

            <div
              className={`h-full w-20 pt-5 cursor-pointer ${
                alignLeft ? "text-left ml-20" : ""
              }  ${
                selectedMenu === "인기" ? "border-b-2 border-black" : "mb-0.5"
              }`}
            >
              <h1
                className={`text-center text-md font-semibold ml-2 cursor-pointer ${
                  alignLeft ? "text-left ml-20" : ""
                } ${selectedMenu === "인기" ? "text-black" : "text-gray-400"}`}
                onClick={() => handleMenuClick("인기")}
              >
                인기
              </h1>
            </div>
          </div>
        ) : (
          <div className="h-full w-20 pt-4 pb-1 cursor-pointer min-h-16" />
        )}
      </div>
    </div>
  );
}
