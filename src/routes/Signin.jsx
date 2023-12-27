import  { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

import logo from "../assets/logo_w.png";
import bg from "../assets/basic_bg_pc.png";
import bgMobile from "../assets/basic_bg.png";
import api from '../api/axios';

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [job, setJob] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("form submitted");

    // Construct the payload with input values
    // const formData = {
    //   email,
    //   password,
    //   nickname,
    //   gender,
    //   yearOfBirth,
    //   job,
    // };

    // Send formData to your signup API using Axios or Fetch
    // Example using Axios:
    // axios.post('your_signup_api_endpoint', formData)
    //   .then(response => {
    //     // Handle success
    //   })
    //   .catch(error => {
    //     // Handle error
    //   });
  };

  /**
   * 
   * @param {'email' | 'nickname'} type 
   * @returns {boolean} 유효성 검사 체크 통과 X -> true
   */
  function checkTypoValidation(type) {
    const emailRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/);
    if(type === 'email') {
      return !emailRegex.test(email)
    }

  }

  async function checkDuplicateEmail() {
    if (checkTypoValidation('email')) {
      throw new Error('올바른 이메일을 입력해주세요.')
    }

    try {
      const res = await api.get(`signup/check/email?email=${email}`)

      if (res.data.message !== 'Success') {
        throw new Error(res.data.message)
      }
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row bg-primary min-h-screen">
      <div className="flex-1 px-10 flex flex-col text-center justify-between items-center">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Home Icon" className="mt-40 mb-8" />
          <div>
            <form onSubmit={handleSubmit}>
              {/* TODO: input component 만들기 */}
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={checkDuplicateEmail}
                className="mb-3 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  h-14"
                placeholder="이메일을 입력하세요"
                required
                name='email'
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-3 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  h-14"
                placeholder="비밀번호를 입력하세요"
                required
              />
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="mb-3 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  h-14"
                placeholder="닉네임을 입력하세요"
                required
              />
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mb-3 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  h-14"
                placeholder="성별을 입력하세요"
                required
              />
              <input
                type="text"
                value={yearOfBirth}
                onChange={(e) => setYearOfBirth(e.target.value)}
                className="mb-3 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  h-14"
                placeholder="생년월일을 입력하세요 (YYYY-MM-DD)"
                required
              />
              <input
                type="text"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className="mb-3 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  h-14"
                placeholder="직업을 입력하세요"
                required
              />
              <button
                type="submit"
                className="text-primary bg-white font-bold rounded-lg text-xl w-96 px-3 py-3 me-2 mt-3 mb-2 dark:bg-blue-600 dark:text-white focus:outline-none"
              >
                회원가입
              </button>
            </form>
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
