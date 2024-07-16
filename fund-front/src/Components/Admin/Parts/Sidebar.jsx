import { MdDashboard } from "react-icons/md";
import { FaUsers, FaFile } from "react-icons/fa";
import Logo from "../../Common/Logo";
import * as l from "../../../Constants/urls";

const Sidebar = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-darkblue h-16 w-full flex items-center pl-10 justify-between">
        <Logo />
        <div className="center-all gap-4">
          <h2 className="text-white">Hello, admin</h2>
          <a href="/#" className="button-light py-2 mr-10">
            Logout
          </a>
        </div>
      </div>
      <div className="flex h-full">
        <div
          className={`bg-lightgray w-20 md:w-64 text-gray-400 h-full overflow-hidden p-5 transition-width duration-300 `}
        >
          <ul className="mt-10">
            <li className="mb-4 h-10">
              <a
                href={l.SITE_DASHBOARD}
                className={`text-xs flex flex-col items-center md:text-lg md:flex-row md:gap-2`}
              >
                <MdDashboard className="text-lg md:text-xl " />
                <span className="flex">Dashboard</span>
              </a>
            </li>
            <li className="mb-4 h-10">
              <a
                href={l.USERS_LIST}
                className={`text-xs flex flex-col items-center md:text-lg md:flex-row md:gap-2`}
              >
                <FaUsers className="text-lg md:text-xl " />
                <span className="flex">Users</span>
              </a>
            </li>
            <li className="mb-4 h-10">
              <a
                href="/#posts"
                className={`text-xs flex flex-col items-center md:text-lg md:flex-row md:gap-2`}
              >
                <FaFile className="text-lg md:text-xl " />
                <span className="flex">Posts</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 h-full p-10 bg-gray-100">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
