import { useState, useEffect, useRef } from "react";
import LogoTopbar from "@/components/LogoTopbar";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDraggable } from "react-use-draggable-scroll";

import { useNavigate } from "react-router-dom";
import backicon from "@/assets/back.png";

import bubble from "@/assets/ico_comment_gray.svg";
import trash from "@/assets/trash-2.svg";
import edit from "@/assets/edit.svg";
import formatDate from '@/utils/formatDate';

export default function Terms() {
  const { id } = useParams();

  const [isMobile, setIsMobile] = useState(false);

  const [data, setData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [comment, setComment] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getData();

    return () => {};
  }, [update]);

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

    // 게시글의 댓글 fetch
    axios
      .get(`${endpoint}post/${id}/comment`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("Comment Response:", response.data.data.list);
        setCommentData(response.data.data.list);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onCreateComment = (event) => {
    event.preventDefault();

    console.log("onCreateComment");
    const authToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaXNzIjoiV2F0byIsImlhdCI6MTcwMzAwMDc0NCwiZXhwIjoxNzAzNjA1NTQ0fQ.6WSafHxzscQnUijReCvQiliovFHTDR6jzDJ6EhrxCJE";

    const endpoint = "https://katalk.store/api/";

    // 댓글 작성
    axios
      .post(
        `${endpoint}post/${id}/comment`,
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setUpdate(!update);
        console.log("Comment created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onDeleteComment = (commentId) => {
    console.log("onDeleteComment", commentId);
    const authToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaXNzIjoiV2F0byIsImlhdCI6MTcwMzAwMDc0NCwiZXhwIjoxNzAzNjA1NTQ0fQ.6WSafHxzscQnUijReCvQiliovFHTDR6jzDJ6EhrxCJE";

    const endpoint = "https://katalk.store/api/";

    // 댓글 삭제
    axios
      .delete(`${endpoint}post/${id}/comment`, {
        data: {
          commentId: commentId,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUpdate(!update);
        console.log("Comment deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="flex-1">
        {!isMobile && <LogoTopbar />}
        <Topbar
          title={"저체중 or 과체중인 사람?"}
          alignLeft
          formatDate={formatDate}
          data={data}
          id={id}
        />
        <div className="max-w-5xl mx-auto py-10 flex">
          <div className="flex-1">
            <div className="space-y-10 px-4">
              <h2 className="text-sm lg:text-md font-semibold">{data.title}</h2>
              {/* <img src={detail} alt="Home Icon" className="mt-4 mb-4" /> */}
              <div
                className="text-sm lg:text-md font-regular whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white">
        <div className="max-w-5xl mx-auto py-4 flex">
          <div className="flex-1 ml-5 mr-5 lg:ml-8 lg:mr-8">
            <div className="flex flex-row items-center mb-8">
              <img
                src={bubble}
                alt="Recommend Icon"
                className="w-6 h-6 object-cover"
              />

              <h1 className="text-sm lg:text-md font-medium text-gray-400 pl-1">
                댓글 {data.commentCount}
              </h1>
            </div>

            {commentData.map((item) => {
              return (
                <div key={item.id}>
                  <div className="flex p-4 bg-gray-100 rounded-lg mb-2 flex-row justify-between">
                    <div>
                      <p className="text-sm lg:text-md font-regular whitespace-pre-line">
                        {item.content}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(data.createDate)}
                      </p>
                    </div>

                    <img
                      src={trash}
                      alt="Alert Icon"
                      className="w-5"
                      onClick={() => onDeleteComment(item.id)}
                    />
                  </div>
                </div>
              );
            })}

            <form onSubmit={onCreateComment}>
              <input
                value={comment} // Bind value to the state
                onChange={handleCommentChange}
                type="text"
                id="first_name"
                className="mb-2 mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  h-14"
                placeholder="댓글을 입력하세요"
                required
              />

              <button
                type="submit"
                className="w-full text-white bg-primary hover:bg-blue-800 font-bold rounded-lg text-sm px-5 py-4 me-2 mt-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
              >
                댓글 쓰기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Topbar({ title, alignLeft, formatDate, data, id }) {
  const navigate = useNavigate();

  const onDeletePost = (postId) => {
    console.log("onDeleteComment", postId);
    const authToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaXNzIjoiV2F0byIsImlhdCI6MTcwMzAwMDc0NCwiZXhwIjoxNzAzNjA1NTQ0fQ.6WSafHxzscQnUijReCvQiliovFHTDR6jzDJ6EhrxCJE";

    const endpoint = "https://katalk.store/api/";

    // 게시글 삭제
    axios
      .delete(`${endpoint}post`, {
        data: {
          postId: postId,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Comment deleted successfully:", response.data);
        navigateBack();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white shadow pr-2">
      <div
        className={`max-w-6xl mx-auto relative py-4 px-0 flex items-center justify-between lg:px-4`}
      >
        <div>
          <img
            src={backicon}
            alt="Dropdown Icon"
            className="dropdown-icon absolute left-6 cursor-pointer lg:left-10"
            onClick={navigateBack}
          />
          <h1
            className={`text-md font-semibold ml-[60px] lg:text-lg lg:ml-[80px] ${
              alignLeft ? "text-left ml-20" : ""
            }`}
          >
            {data.title}
          </h1>
        </div>

        <div className="flex flex-row justify-center items-center">
          <p className="text-xs text-gray-600 w-20 text-center lg:w-28 lg:text-sm">
            {formatDate(data.createDate)}
          </p>
          <span className="bg-blue-50 text-primary text-xs font-medium ml-2 px-2.5 py-0.5 rounded dark:bg-blue-900 white-space nowrap dark:text-blue-300 h-6 lg:text-sm">
            {data.categoryName}
          </span>

          <Link to={`/edit/${id}`}>
            <img
              src={edit}
              alt="Alert Icon"
              className="w-5 ml-2"
              // onClick={() => onEdit()}
            />
          </Link>
          <img
            src={trash}
            alt="Alert Icon"
            className="w-5 ml-2"
            onClick={() => onDeletePost(id)}
          />
        </div>
      </div>
    </div>
  );
}
