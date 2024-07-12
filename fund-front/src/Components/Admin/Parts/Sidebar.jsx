import React, { useState } from "react";
import { FaUsers, FaFile } from "react-icons/fa";
import { MdDashboard, MdMenu, MdMenuOpen } from "react-icons/md";
import Logo from "../../Common/Logo";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div
        className={`bg-light-grey text-dark h-screen p-5 ${
          isOpen ? "w-64" : "w-20"
        } transition-width duration-300 `}
      >
        <div className="flex justify-between items-center mb-5 h-20">
          <div>{isOpen ? <Logo /> : <h1>rFm</h1>}</div>
        </div>
        <ul className="mt-10">
          <li className="mb-4 flex items-center h-10">
            <MdDashboard className="text-xl" />
            <a
              href="/#dashboard"
              className={`ml-4 text-lg ${!isOpen && "hidden"}`}
            >
              Dashboard
            </a>
          </li>
          <li className="mb-4 flex items-center h-10">
            <FaUsers className="text-xl" />
            <span className={`ml-4 text-lg ${!isOpen && "hidden"}`}>Users</span>
          </li>
          <li className="mb-4 flex items-center h-10">
            <FaFile className="text-xl" />
            <span className={`ml-4 text-lg ${!isOpen && "hidden"}`}>Posts</span>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-10">
        <button
          onClick={toggleSidebar}
          className=" focus:outline-none text-4xl  text-red-500"
        >
          {isOpen ? <MdMenu /> : <MdMenuOpen />}
        </button>
        {/* Main content goes here */}
        <h1 className="text-3xl">Main Content</h1>
      </div>
    </div>
  );
};

export default Sidebar;
