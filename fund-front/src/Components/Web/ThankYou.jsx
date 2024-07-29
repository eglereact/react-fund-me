import { FaLongArrowAltLeft } from "react-icons/fa";
export const ThankYou = () => {
  return (
    <div className="center-all h-screen bg-slate-y100">
      <div className="center-all flex-col ">
        <img src="/images/ty3.png" className="w-[400px]" />
        <h1 className="text-3xl mb-10 w-1/2 text-center">
          Thank you for making a donation! Your gift is sure to make a real
          difference to people's lives.
        </h1>
        <div>
          <a href="/#" className="center-all gap-2 button-light">
            {" "}
            <FaLongArrowAltLeft /> Back Home
          </a>
        </div>
      </div>
    </div>
  );
};
