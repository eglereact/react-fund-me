import { navLinks } from "../../../Data/links";
import Logo from "../../Common/Logo";
import * as l from "../../../Constants/urls";
import { useContext } from "react";
import { AuthContext } from "../../../Contexts/Auth";

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
        <div className="max-w-[1200px] m-auto flex items-center justify-between h-24">
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
            {user ? (
              <>
                <p className="text-white">
                  Hello,{" "}
                  <span className="font-bold capitalize">{user.name}</span>
                </p>
                <button type="button" className="button-light py-2">
                  Logout
                </button>
                <a href={l.SITE_DASHBOARD} className="button-light py-2">
                  Admin
                </a>
              </>
            ) : (
              <>
                <a href={l.SITE_LOGIN} className="button-light">
                  Login
                </a>
                <a href={l.SITE_REGISTER} className="button-light">
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
