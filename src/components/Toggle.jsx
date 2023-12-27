import React, { useState } from "react";

const Toggle = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          name="autoSaver"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`slider mr-3 flex h-[32px] w-[56px] items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-primary" : "bg-[#CCCCCE]"
          }`}
        >
          <span
            className={`dot h-[24px] w-[24px] rounded-full bg-white duration-200 ${
              isChecked ? "translate-x-6" : ""
            }`}
          ></span>
        </span>
        {/* <span className="label flex items-center text-sm font-medium text-black">
          Auto Saver <span className="pl-1"> {isChecked ? "On" : "Off"} </span>
        </span> */}
      </label>
    </>
  );
};

export default Toggle;
