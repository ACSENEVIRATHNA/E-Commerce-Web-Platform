import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { SearchBar } from "./SearchBar";
import { useState } from "react";
import { SearchResults } from "./SearchResults";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [results, setResults] = useState([]);

  const handleClick = () => {
    logout();
  };
  return (
    <div className="header1 d-flex">
      <div className="first col-5">
        <Link to="/">
          <img className="logo" alt="" src="logo.png" />
        </Link>
        <div className="comName">
          CHAMA
          <br />
          COMPUTERS
        </div>
      </div>
      <SearchBar setResults = {setResults}/>
      <SearchResults results={results}/>
      <div className="col-2 d-flex gap-10">
      {!user && (
        <div className="accsign">
          <img alt="" src="acc.png" />
          <Link to="/login" className="signin-link">
            Sign In
          </Link>
        </div>
      )}
      {!user && (
        <div className="accreg">
          <img className="register" alt="" src="reg.png" />
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </div>
      )}
      {user && (
        <div>
          <img className="add" alt="" src="add.png" />
          <Link to="/create">
            <button className="logout-but">Add More</button>
          </Link>
        </div>
      )}
      {user && (
        <div className="acclogout">
          <img className="logout" alt="" src="logout.png" />
          <button className="logout-but" onClick={handleClick}>
            Log Out
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Header;
