import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { SearchBar } from "./SearchBar";
import { useState } from "react";
import { SearchResults } from "./SearchResults";
import { VscAccount } from "react-icons/vsc";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { MdAddBusiness } from "react-icons/md";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [results, setResults] = useState([]);

  const handleClick = () => {
    logout();
    console.log(user);
  };
  return (
    <div className="header d-flex">
      <Link to="/" className="col-3">
        <div className="first ">
          <img className="logo m-2" alt="" src="logo.png" />
          <h5 className="comName">
            CHAMA
            <br />
            COMPUTERS
          </h5>
        </div>
      </Link>
      <SearchBar setResults={setResults} />
      <SearchResults results={results} />
      <div className="col-2 d-flex gap-10 justify-content-center">
        <div className="dropdown">
          <button
            className="btn-acc dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <VscAccount className="fs-2" />
            My Account
          </button>
          <ul className="dropdown-menu">
            {user && (
              <li>
                <Link to="/create" className="dropdown-item">
                  <MdAddBusiness className="login-icon" />
                  Add Product
                </Link>
                <button className="dropdown-item" onClick={handleClick}>
                  <IoLogOut className="logout-icon" />
                  Log Out
                </button>
              </li>
            )}
            {!user && (
              <li>
                <Link to="/login" className="dropdown-item">
                  <IoLogIn className="login-icon" />
                  Log In
                </Link>
                <Link to="/signup" className="dropdown-item">
                  <FaUserPlus className="fs-5" />
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
