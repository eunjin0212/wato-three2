import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDraggable } from "react-use-draggable-scroll";

import Menu from "@/components/Menu";
import Carousel from "@/ui/Carousel";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

import korea from "@/assets/korea.png";

export default function Recommend() {
  const [isMobile, setIsMobile] = useState(false);

  const [countryData, setCountryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  //모바일 화면인지 확인하기
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set your breakpoint as needed
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check for mobile view on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  const getData = () => {
    const authToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaXNzIjoiV2F0byIsImlhdCI6MTcwMzAwMDc0NCwiZXhwIjoxNzAzNjA1NTQ0fQ.6WSafHxzscQnUijReCvQiliovFHTDR6jzDJ6EhrxCJE";

    const endpoint = "https://katalk.store/api/";

    // 카테고리 게시글 fetch
    axios
      .get(`${endpoint}recommend/category?page=1&size=5`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("Category Data Response:", response.data.data.list);
        setCategoryData(response.data.data.list);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // 국가별 게시글 fetch
    axios
      .get(`${endpoint}recommend/country?page=1&size=5`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("Country Data Response:", response.data.data.list);
        setCountryData(response.data.data.list);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      <div className="flex-1">
        <LogoTopbar nomenu />
        <div className="max-w-3xl mx-auto py-4 flex">
          <Menu />
          <div className="flex flex-1 ml-5 mr-5 lg:ml-8 lg:mr-8 flex-wrap">
            <Carousel />

            <h2 className="text-lg font-bold pb-4">카테고리별 게시글</h2>

            <div className="flex  flex-wrap">
              {isMobile ? (
                <CardDrag
                  data={categoryData}
                  formatDate={formatDate}
                  tag
                  country={false}
                />
              ) : (
                <>
                  {categoryData.map((doc, index) => (
                    <Card
                      key={index}
                      {...doc}
                      padding={(index + 1) % 2 == 0}
                      tag
                      formatDate={formatDate}
                    />
                  ))}
                </>
              )}
            </div>
            <h2 className="text-lg font-bold pl-3 pb-4 pt-4">국가별 게시글</h2>
            <div className="flex  flex-wrap">
              {isMobile ? (
                <CardDrag
                  data={countryData}
                  formatDate={formatDate}
                  country={true}
                />
              ) : (
                <>
                  {countryData.map((doc, index) => (
                    <Card
                      country
                      key={index}
                      {...doc}
                      padding={(index + 1) % 2 == 0}
                      formatDate={formatDate}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoTopbar({ title, alignLeft, nomenu }) {
  const [selectedMenu, setSelectedMenu] = useState("홈");
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="bg-white shadow border rounded-b-xl lg:rounded-none h-16">
      <div
        className={`max-w-4xl mx-auto relative  px-4 flex flex-col items-center h-16 ${
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

const Card = ({
  id,
  categoryName,
  content,
  title,
  createDate,
  tag,
  country,
  countryName,
  padding,
  formatDate,
}) => {
  return (
    <div
      className={`w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 ${
        padding ? `lg:pl-3 xl:pl-3` : ""
      }`}
    >
      <div className="p-4 flex flex-col rounded-lg shadow-sm bg-white justify-start space-y-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            {tag && (
              <span className="bg-blue-50 text-primary text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {categoryName}
              </span>
            )}
            {country && (
              <>
                <img
                  src={korea}
                  alt="Recommend Icon"
                  className="w-6 h-6 object-cover"
                />
                <p className="text-xs font-medium ml-2 text-gray-500">
                  {countryName}
                </p>
              </>
            )}
          </div>
          <p className="text-sm font-medium ml-2 text-gray-400">
            {formatDate(createDate)}
          </p>
        </div>
        <h1 className="text-lg font-regular">{title}</h1>
        <p className="text-md font-regular text-gray-400">{content}</p>
      </div>
    </div>
  );
};

function CardDrag({ data, tag, country, padding, formatDate }) {
  const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  return (
    <div
      className="flex max-w-[360px] mx-auto space-x-3 no-scrollbar overflow-x-auto w-full"
      {...events}
      ref={ref}
    >
      {data.map((category) => {
        return (
          <div className={`w-full w-[300px] mb-10`}>
            <div className="p-4 flex flex-col rounded-lg shadow-sm bg-white justify-start space-y-2 w-[220px]">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                  {tag && (
                    <span className="bg-blue-50 text-primary text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      {category.categoryName}
                    </span>
                  )}
                  {country && (
                    <>
                      <img
                        src={korea}
                        alt="Recommend Icon"
                        className="w-6 h-6 object-cover"
                      />
                      <p className="text-xs font-medium ml-2 text-gray-500">
                        dfdf
                      </p>
                    </>
                  )}
                </div>
                <p className="text-xs font-medium ml-2 text-gray-400">
                  {formatDate(category.createDate)}
                </p>
              </div>
              <h1 className="text-sm font-regular">{category.title}</h1>
              <p className="text-sm font-regular text-gray-400">
                {category.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
