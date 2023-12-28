import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "@/ui/Topbar";
import mouth from "@/assets/cate01.png";

export default function Edit() {
  const {
    id,
    // originalCounrty,
    // originalCategory,
    // originalTitle,
    // originalContent,
  } = useParams();

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState({
    id: 1,
    name: "블라블라",
  });
  const [selectedCountry, setSelectedCountry] = useState({
    id: 1,
    name: "대한민국",
  });

  const [data, setData] = useState([]);
  const [title, setTitle] = useState(""); // State for the title input
  const [content, setContent] = useState(""); // State for the content input

  const [countryData, setCountryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const navigateBack = () => {
    navigate(-2);
  };

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  const getData = () => {
    const authToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaXNzIjoiV2F0byIsImlhdCI6MTcwMzAwMDc0NCwiZXhwIjoxNzAzNjA1NTQ0fQ.6WSafHxzscQnUijReCvQiliovFHTDR6jzDJ6EhrxCJE";

    const endpoint = "https://katalk.store/api/";

    // 게시글 fetch
    axios
      .get(`${endpoint}post/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // 국가 fetch
    axios
      .get(`${endpoint}country`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        // console.log("Response:", response.data.data);
        setCountryData(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // 카테고리 fetch
    axios
      .get(`${endpoint}main/category`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data.data);
        setCategoryData(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const createPost = () => {
    const authToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaXNzIjoiV2F0byIsImlhdCI6MTcwMjkwMTkwMCwiZXhwIjoxNzAzNTA2NzAwfQ.XEVYXfzniyluKp440vTAcyD3AO3htQ7GoN3-7uvws6c"; // Replace with your authentication token
    const endpoint = `https://katalk.store/api/post/${id}`;

    const requestData = {
      title: title,
      content: content,
      country: selectedCountry.id,
      category: selectedCategory.id,
    };

    const formData = new FormData();
    formData.append("file", mouth);

    formData.append(
      "request",
      new Blob([JSON.stringify(requestData)], { type: "application/json" })
    );

    axios
      .put(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Post created successfully:", response.data);
        // Handle a successful post creation here
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        // Handle errors here
      });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    createPost();
    navigateBack();
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      <div className="flex-1">
        <Topbar title={"글 수정"} />
        <div className="max-w-3xl mx-auto py-10 flex">
          <div className="flex-1 ml-5 mr-5 lg:ml-8 lg:mr-8 ">
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  국가 선택
                </label>
                <div className="flex flex-row justify-center items-center mb-3 space-x-2">
                  <Dropdown
                    data={countryData}
                    selected={selectedCountry}
                    setSelected={setSelectedCountry}
                  />
                </div>

                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  카테고리 선택
                </label>
                <div className="flex flex-row justify-center items-center mb-3 space-x-2">
                  <Dropdown
                    data={categoryData}
                    selected={selectedCategory}
                    setSelected={setSelectedCategory}
                  />
                </div>

                {/* Title Input */}
                <input
                  type="text"
                  id="title"
                  className="mb-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-14 lg:text-lg"
                  placeholder="제목입니다"
                  // defaultValue={data.title}
                  value={title} // Bind value to the state
                  onChange={handleTitleChange} // Handle input changes
                  required
                />

                {/* Content Input */}
                <textarea
                  id="content"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-56 lg:text-lg"
                  placeholder="내용입니다"
                  value={content} // Bind value to the state
                  onChange={handleContentChange} // Handle input changes
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary hover:bg-blue-800 font-bold rounded-lg text-xl px-5 py-4 me-2 mt-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
              >
                글 수정
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const Dropdown = ({ data, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (name, id) => {
    setSelected({ id, name }); // Update the selected state with both ID and name
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <>
      {/* Dropdown */}
      <div className="w-full relative inline-block text-left">
        <div className="relative inline-block w-full">
          <button
            type="button"
            className="bg-white border border-gray-300 text-gray-900 text-lg rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-14"
            id="menu-button"
            aria-expanded={isOpen ? "true" : "false"}
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-row justify-center items-center">
                {/* <img src={mouth} alt="Home Icon" className="w-6 mr-2" /> */}
                <p className="text-sm">{selected.name}</p>
              </div>

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
            className="absolute bg-white border border-gray-300 text-gray-900 text-lg rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white z-10"
            role="menu"
            aria-labelledby="menu-button"
            tabIndex="-1"
            style={{ top: "calc(100% + 8px)", right: 0, width: "100%" }}
          >
            <div className="py-1" role="none">
              {data.map(({ id, name }) => {
                return (
                  <div
                    key={id}
                    className="flex flex-row justify-start items-center"
                    onClick={() => handleItemClick(name, id)}
                    role="menuitem"
                    tabIndex="0"
                  >
                    {/* Display the country name */}
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      {name}
                    </a>
                  </div>
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
