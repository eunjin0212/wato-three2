import React from "react";
import { useNavigate } from "react-router-dom";
import backicon from "../assets/back.png";

export default function Topbar({ title, alignLeft }) {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white shadow">
      <div
        className={`max-w-6xl mx-auto relative py-4 px-4 flex items-center ${
          alignLeft ? "justify-start" : "justify-center"
        }`}
      >
        <img
          src={backicon}
          alt="Dropdown Icon"
          className="dropdown-icon absolute left-10  cursor-pointer"
          onClick={navigateBack}
        />
        <h1
          className={`text-lg font-semibold ml-2 body-font font-pretendard ${
            alignLeft ? "text-left ml-20" : ""
          }`}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
