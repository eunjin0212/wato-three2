import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo_w.png";
import bg from "@/assets/basic_bg_pc.png";
import bgMobile from "@/assets/basic_bg.png";

export default function Started() {
  return (
    <div className="flex flex-col lg:flex-row bg-primary min-h-screen">
      <div className="flex-1 px-10 flex flex-col text-center justify-between items-center">
        <img src={logo} alt="Home Icon" className="mt-40 mb-4 h-30" />

        <div className="mb-40 lg:mb-0">
          <h1 className="font-medium text-white text-xl  mt-10 mb-2">
            "우리는 하나"
          </h1>

          <div className="flex flex-col">
            <Link to="/login">
              <button
                type="button"
                className="text-primary bg-white font-bold rounded-lg text-xl lg:w-96 w-80 px-3 py-3  mt-3 mb-2 dark:bg-blue-600 focus:outline-none"
              >
                로그인
              </button>
            </Link>

            <Link to="/signin">
              <button
                type="button"
                className="text-primary bg-white font-bold rounded-lg text-xl lg:w-96 w-80 px-3 py-3 mt-3 mb-2 dark:bg-blue-600 focus:outline-none"
              >
                회원가입
              </button>
            </Link>
          </div>
        </div>

        <img
          src={bg}
          alt="Desktop Background"
          className="w-auto hidden lg:block"
        />
      </div>
      <img
        src={bgMobile}
        alt="Mobile Background"
        className="w-full block lg:hidden"
      />
    </div>
  );
}
