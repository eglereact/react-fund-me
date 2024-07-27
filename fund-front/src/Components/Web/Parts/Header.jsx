import { navLinks } from "../../../Data/links";
import Logo from "../../Common/Logo";
import * as l from "../../../Constants/urls";
import { useContext } from "react";
import { AuthContext } from "../../../Contexts/Auth";
import Logout from "../../Common/Logout";
import Gate from "../../Common/Gate";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header>
      <div className="center-all bg-light py-2">
        <p className="text-white tracking-widest font-bold text-lg">
          Thank you for your support!
        </p>
      </div>
      <nav className="bg-dark">
        <div className="max-width m-auto flex items-center justify-between h-24">
          <Logo />
          <ul className="center-all space-x-10 text-white text-lg">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className="text-white font-bold hover:text-light transition-all"
              >
                <a href={link.link}>{link.title}</a>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 items-center ">
            <Gate status="logged">
              <p className="text-white">
                Hello,{" "}
                <span className="font-bold capitalize">{user?.name}</span>
              </p>
              <Logout />
            </Gate>

            <Gate status="not-logged">
              <a href={l.SITE_LOGIN} className="button-light">
                Login
              </a>
              <a href={l.SITE_REGISTER} className="button-light">
                Sign Up
              </a>
            </Gate>
            <Gate status="role" role={["admin"]}>
              <a href={l.SITE_DASHBOARD} className="button-light py-2">
                Admin
              </a>
            </Gate>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
