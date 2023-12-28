import logo from "@/assets/logo_w.png";
import bg from "@/assets/basic_bg_pc.png";
import bgMobile from "@/assets/basic_bg.png";
import LinkButton from '@/components/ui/LinkButton';

export default function Started() {
  const links = [
    {
      label: '로그인',
      to: '/login'
    },
    {
      label: '회원가입',
      to: '/signin'
    },
  ]
  return (
    <div className="flex flex-col lg:flex-row bg-primary min-h-screen">
      <div className="flex-1 px-10 flex flex-col text-center justify-between items-center">
        <img src={logo} alt="Home Icon" className="mt-40 mb-4 h-30" />

        <div className="mb-40 lg:mb-0">
          <h1 className="font-medium text-white text-xl  mt-10 mb-2">
            &quot;우리는 하나&quot;
          </h1>

          <div className="flex flex-col">
            {links.map(({ label, to }) => (
              <LinkButton key={label} to={to} label={label} />
            ))}
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
