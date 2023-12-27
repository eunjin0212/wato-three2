import React, { useState } from "react";
import dropdown from "../assets/dropdown.png";

export default function Dropdown({ title, date, description, detail, note }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="p-4 rounded-lg cursor-pointer relative" // Add 'relative' class
      onClick={() => setIsOpen(!isOpen)}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex justify-end">
        <img
          src={dropdown}
          alt="Dropdown Icon"
          className={`transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <p className="text-sm text-gray-600">{date}</p>

      {isOpen && (
        <div className="mt-3">
          <p className="text-sm">{description}</p>
          <p className="text-sm">{detail}</p>
          <p className="text-sm">{note}</p>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 border-b border-gray-300 mt-4"></div>
    </div>
  );
}
