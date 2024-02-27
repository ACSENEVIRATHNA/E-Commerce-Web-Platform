import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, isLoading} = useLogin();

  const handleClick = async (e) => {
    e.preventDefault();
    await login (email, password)
    console.log(email, password);
    error && console.log(error)  };
  return (
    <div className="login-page">
      <div className="div">
        <div className="overlap1">
          <img className="image1" alt="" src="shooter.png" />
          <div className="rectangle" />
        </div>
        <input
          type="text"
          className="rectangle-2"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="rectangle-3"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="text-wrapper">Username:</div>
        <p className="dont-have-and">
          <span className="span">Dont&nbsp;&nbsp;have and account? </span>
          <Link to="/signup" className="text-wrapper-2">
            Register
          </Link>
        </p>
        <div className="text-wrapper-3">Welcome Back!</div>
        <div className="group">
          <button className="overlap-group" onClick={handleClick}
          disabled={isLoading}>
            <div className="text-wrapper-4">LOGIN</div>
          </button>
        </div>
        <div className="text-wrapper-5">Password:</div>
        <div className="overlap-2">
          <div className="rectangle-4" />
          <div className="rectangle-5" />
        </div>
        <div className="CHAMA-COMPUTERS">
          CHAMA
          <br />
          COMPUTERS
        </div>
        <Link to="/">
          <img className="logo-c" alt="" src="logo.png" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
