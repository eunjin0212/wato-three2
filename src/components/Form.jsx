import { useEffect, useState, useContext } from "react";
import add from "../images/add.svg";

import { API } from "../../api";
import { Navigate, useNavigate } from "react-router";

export const Form = () => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [inputValues, setInputValues] = useState({
    name: "",
    age: 0,
    gender: "",
    medicalHistory: "",
    currentMedication: "",
    symptom: "",
  });
  const [medicalHistories, setMedicalHistories] = useState([]);
  const [currentMedications, setCurrentMedications] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("useEffect");
    getListUsers();
  }, []);

  const getListUsers = async () => {
    const list = await API.ListUsers();
    setUserList(list);
  };

  const getDiagnose = async () => {
    console.log("get diagnose");
    // console.log(currentUser._id, symptoms);
    const res = await API.GetDiagnose(currentUser._id, symptoms);
    navigate("/diagnosis");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const onDropdownPressed = (id) => {
    const selectedUser = userList.filter((user) => user._id === id)[0];
    setCurrentUser(selectedUser);

    setInputValues({
      ...inputValues,
      name: selectedUser.name,
      age: selectedUser.age,
      gender: selectedUser.gender,
    });
    setMedicalHistories(selectedUser.medical_history);
    setCurrentMedications(selectedUser.medication_list);
    setIsOpen(false);
  };

  return (
    <div className="pl-[58px] h-screen">
      <h1 className="text-[50px] font-bold pt-16 pb-[106px]">
        Start By Answering
      </h1>
      <form
        className="flex flex-wrap gap-x-[109px] gap-y-[100px] max-w-[1000px]"
        onSubmit={handleSubmit}
      >
        <label className="items-start flex flex-col text-[28px] gap-y-3 font-bold">
          Name
          {/* Dropdown */}
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="outline rounded-lg outline-[#CCDFFF] p-2 text-[#00003C] w-[253px] placeholder: text-base font-light"
                id="menu-button"
                aria-expanded={isOpen ? "true" : "false"}
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                <div className="flex flex-row justify-between">
                  <p>{inputValues.name}</p>

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
                className="outline rounded-lg outline-[#CCDFFF] p-2 text-[#00003C] w-[253px] placeholder: text-base font-light"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  {userList.map((user) => {
                    return (
                      <a
                        key={user._id}
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        onClick={() => onDropdownPressed(user._id)}
                      >
                        {user.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {/* Dropdown */}
          {/* ddd */}
        </label>
        <label className="flex flex-col items-start text-[28px] gap-y-3 font-bold">
          Age
          <input
            className="outline rounded-lg p-2 outline-[#CCDFFF] max-w-[149px] placeholder: text-base font-light"
            type="number"
            name="age"
            onChange={handleChange}
            value={inputValues.age}
            placeholder="Age"
          />
        </label>
        <label className="flex flex-col items-start text-[28px] gap-y-3 font-bold">
          Gender
          <input
            className="outline rounded-lg p-2 outline-[#CCDFFF] max-w-[149px] placeholder: text-base font-light"
            type="text"
            name="gender"
            onChange={handleChange}
            value={inputValues.gender}
            placeholder="Gender"
          />
        </label>
        <label className="flex flex-col items-start text-[28px] gap-y-3 font-bold relative">
          Medical History
          <input
            className="outline rounded-lg p-2 outline-[#CCDFFF] w-[253px] placeholder: text-base font-light"
            type="text"
            name="medicalHistory"
            placeholder="Medical history"
            value={inputValues.medicalHistory}
            onChange={handleChange}
          />
          <button
            onClick={() => {
              setMedicalHistories([
                ...medicalHistories,
                inputValues.medicalHistory,
              ]);
              setInputValues({ ...inputValues, medicalHistory: "" });
            }}
            style={{ backgroundImage: `url(${add})` }}
            className="bg-plus absolute left-[260px] top-14 rounded-full text-blueplus p-3 text-4xl w-[40px] h-[40px] bg-no-repeat bg-center"
          ></button>
          {medicalHistories && (
            <div className="absolute m-w-[250px] top-[110px] flex flex-wrap gap-x-2 gap-y-2">
              {medicalHistories &&
                medicalHistories.map((item, index) => (
                  <span
                    className="text-plusplus bg-plus text-base font-normal px-4 py-3 rounded-[40px]"
                    key={index}
                  >
                    {item}
                  </span>
                ))}
            </div>
          )}
        </label>
        <label className="flex relative flex-col items-start text-[28px] gap-y-3 font-bold">
          Medication List
          <input
            className="w-[253px] outline rounded-lg p-2 outline-[#CCDFFF] placeholder: text-base font-light"
            type="text"
            name="currentMedication"
            onChange={handleChange}
            value={inputValues.currentMedication}
            placeholder="Current medications"
          />
          <button
            onClick={() => {
              setCurrentMedications([
                ...currentMedications,
                inputValues.currentMedication,
              ]);
              setInputValues({ ...inputValues, currentMedication: "" });
            }}
            style={{ backgroundImage: `url(${add})` }}
            className="bg-plus absolute left-[260px] top-14 rounded-full text-blueplus p-3 text-4xl w-[40px] h-[40px] bg-no-repeat bg-center "
          ></button>
          {currentMedications && (
            <>
              <div className="absolute m-w-[250px] top-[110px] flex flex-wrap gap-x-2 gap-y-2">
                {currentMedications &&
                  currentMedications.map((item, index) => (
                    <span
                      className="text-plusplus bg-plus text-base font-normal px-4 py-3 rounded-[40px]"
                      key={index}
                    >
                      {item}
                    </span>
                  ))}
              </div>
              <span></span>
            </>
          )}
        </label>
        <label className="flex relative flex-col items-start text-[28px] gap-y-3 font-bold">
          Symptoms
          <input
            className="w-[253px] outline rounded-lg p-2 outline-[#CCDFFF] placeholder: text-base font-light"
            type="text"
            name="symptom"
            onChange={handleChange}
            value={inputValues.symptom}
            placeholder="Symptoms"
          />
          <button
            onClick={() => {
              setSymptoms([...symptoms, inputValues.symptom]);
              setInputValues({ ...inputValues, symptom: "" });
            }}
            style={{ backgroundImage: `url(${add})` }}
            className="bg-plus absolute left-[260px] top-14 rounded-full text-blueplus p-3 text-4xl w-[40px] h-[40px] bg-no-repeat bg-center "
          ></button>
          {symptoms && (
            <div className="absolute m-w-[250px] top-[110px] flex flex-wrap gap-x-2 gap-y-2">
              {symptoms &&
                symptoms.map((item, index) => (
                  <span
                    className="text-plusplus bg-plus text-base font-normal px-4 py-3 rounded-[40px]"
                    key={index}
                  >
                    {item}
                  </span>
                ))}
            </div>
          )}
        </label>
        <button
          className="rounded-[40px] outline text-xl bg-button text-white py-5 px-[30px] self-center mt-24 mx-auto"
          onClick={() => getDiagnose()}
          type="submit"
        >
          Get Diagnosis
        </button>
      </form>
    </div>
  );
};
