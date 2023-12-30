import { useState } from "react";

import Menu from "@/components/Menu";
import Topbar from "@/ui/Topbar";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownValue = [
    "naver.com",
    "hanmail.net",
    "hotmail.com",
    "nate.com",
    "yahoo.co.kr",
    "empas.com",
    "dreamwiz.com",
    "freechal.com",
    "lycos.co.kr",
    "korea.com",
    "gmail.com",
    "hanmir.com",
    "paran.com",
  ];

  return (
    <>
      {/* Dropdown */}
      <div className="relative inline-block text-left">
        <div className="relative inline-block">
          <button
            type="button"
            className="bg-white border border-gray-300 text-gray-900 text-lg rounded-lg  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  h-14 w-44"
            id="menu-button"
            aria-expanded={isOpen ? "true" : "false"}
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            <div className="flex flex-row justify-between">
              <p className="text-sm">직접입력</p>

              <svg
                className={`-mr-1 h-5 w-5 text-gray-400 transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>

        {isOpen && (
          <div
            className="absolute bg-white border border-gray-300 text-gray-900 text-lg rounded-lg  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white w-44"
            role="menu"
            aria-labelledby="menu-button"
            tabIndex="-1"
            style={{ top: "calc(100% + 8px)", right: 0 }}
          >
            <div className="py-1" role="none">
              {dropdownValue.map((value) => {
                return (
                  <a
                    key={value}
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    {value}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* Dropdown */}
    </>
  );
};

export default function Customer() {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      <div className="flex-1">
        <Topbar title={"고객센터"} />
        <div className="max-w-3xl mx-auto py-10 flex">
          <Menu />
          <div className="flex-1 ml-5 mr-5 lg:ml-8 lg:mr-8 ">
            <form>
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  보내는 사람 이메일
                </label>

                <div className="flex flex-row justify-center items-center mb-3 space-x-2">
                  <input
                    type="text"
                    id="first_name"
                    className="bg-white border border-gray-300 text-gray-900 text-lg rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-14"
                    placeholder="메일주소입력"
                    required
                  />

                  <h2 className="text-lg font-semibold">@</h2>

                  <Dropdown />
                </div>

                <input
                  type="text"
                  id="first_name"
                  className="mb-3 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  h-14"
                  placeholder="제목을 입력하세요"
                  required
                />

                <input
                  type="text"
                  id="first_name"
                  className="bg-white border border-gray-300 text-gray-900 text-lg rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-56"
                  placeholder="문의 내용을 입력해주세요"
                  required
                />
              </div>
              <button
                type="button"
                className="w-full text-white bg-primary hover:bg-blue-800 font-bold rounded-lg text-xl px-5 py-4 me-2 mt-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
              >
                문의하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
