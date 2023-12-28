import logo from "@/assets/logo_w.png";
import kakao from "@/assets/kakao.png";
import email from "@/assets/email.png";
import facebook from "@/assets/facebook.png";
import naver from "@/assets/naver.png";

import bg from "@/assets/basic_bg_pc.png";
import bgMobile from "@/assets/basic_bg.png";
import SnsButton from '@/ui/SnsButton';

export default function Login() {
  return (
    <div className="flex flex-col lg:flex-row bg-primary min-h-screen">
      <div className="flex-1 px-10 flex flex-col text-center justify-between items-center">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Home Icon" className="mt-40 mb-4 " />
          <div>
            <SnsButton 
              src={facebook}
              className="bg-positive"
              label="페이스북 로그인"
            />

            <SnsButton 
              src={kakao}
              className="bg-white"
              label="카카오 로그인"
            />

            <SnsButton 
              src={naver}
              className="bg-naver"
              label="네이버 로그인"
            />
            <SnsButton 
              src={email}
              className="bg-primary"
              label="이메일 로그인"
            />
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
