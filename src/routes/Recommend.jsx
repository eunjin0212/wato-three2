import { useState, useEffect, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { api } from '@/api/axios';
import Menu from "@/components/Menu";
import Carousel from "@/ui/Carousel";
import logo from "@/assets/logo.png";
import checkCountryImg from '@/utils/checkCountryImg';
import formatDate from '@/utils/formatDate';

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



  async function getRecommendCategories() {
    try {
      const res = await api.get('recommend/category?page=1&size=10')
      setCategoryData(res.data.data.list);
    } catch (error) {
      console.error(error)
    }
  }
  async function getRecommendCountries() {
    try {
      const res = await api.get('recommend/country?page=1&size=10')
      setCountryData(res.data.data.list);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getRecommendCategories()
    getRecommendCountries()

    return () => { }
  }, []);

  return (
    <div className="main">
      <div className="flex-1">
        <LogoTopbar nomenu />
        <div className="max-w-3xl mx-auto py-4 flex flex-col">
          <Menu />
          <Carousel />
          <div className="flex flex-1 mx-5 lg:mx-8 flex-wrap">
            <h2 className="text-lg font-bold pb-4">카테고리별 게시글</h2>
            <div className="flex  flex-wrap">
              {isMobile ? (
                <CardDrag
                  data={categoryData}
                  formatDate={formatDate}
                  tag
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
                  country
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

function LogoTopbar({ alignLeft, nomenu }) {
  const [selectedMenu, setSelectedMenu] = useState("홈");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="bg-white shadow border rounded-b-xl lg:rounded-none h-16">
      <div
        className={`max-w-4xl mx-auto relative  px-4 flex flex-col items-center h-16 ${alignLeft ? "justify-start" : "justify-center"
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
              className={`h-full w-20 pt-5 cursor-pointer ${alignLeft ? "text-left ml-20" : ""
                } ${selectedMenu === "홈" ? "border-b-2 border-black" : "mb-0.5"
                }`}
            >
              <h1
                className={`text-center text-md font-semibold ml-2 cursor-pointer ${alignLeft ? "text-left ml-20" : ""
                  } ${selectedMenu === "홈" ? "text-black" : "text-gray-400"}`}
                onClick={() => handleMenuClick("홈")}
              >
                홈
              </h1>
            </div>

            <div
              className={`h-full w-20 pt-5 cursor-pointer ${alignLeft ? "text-left ml-20" : ""
                }  ${selectedMenu === "인기" ? "border-b-2 border-black" : "mb-0.5"
                }`}
            >
              <h1
                className={`text-center text-md font-semibold ml-2 cursor-pointer ${alignLeft ? "text-left ml-20" : ""
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
      className={`w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 ${padding ? `lg:pl-3 xl:pl-3` : ""
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
                  src={checkCountryImg(countryName)}
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

function CardDrag({ data, tag, country, formatDate }) {
  const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  return (
    <div
      className="flex max-w-[360px] mx-auto space-x-3 no-scrollbar overflow-x-auto w-full"
      {...events}
      ref={ref}
    >
      {data.map((item) => {
        return (
          <div className={`w-[300px] mb-10`} key={item.countryName}>
            <div className="p-4 flex flex-col rounded-lg shadow-sm bg-white justify-start space-y-2 w-[220px]">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                  {tag && (
                    <span className="bg-blue-50 text-primary text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      {item.categoryName}
                    </span>
                  )}
                  {country && (
                    <>
                      <img
                        src={checkCountryImg(item.countryName)}
                        alt="Recommend Icon"
                        className="w-6 h-6 object-cover"
                      />
                      <p className="text-xs font-medium ml-2 text-gray-500">
                        {item.countryName}
                      </p>
                    </>
                  )}
                </div>
                <p className="text-xs font-medium ml-2 text-gray-400">
                  {formatDate(item.createDate)}
                </p>
              </div>
              <h1 className="text-sm font-regular">{item.title}</h1>
              <p className="text-sm font-regular text-gray-400">
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
