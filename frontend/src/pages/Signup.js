import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignUp();

  const handleClick = async (e) => {
    e.preventDefault();

    await signup(name, email, password);
    console.log(name, email, password);
    error && console.log({ error });
    if (!error) {
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="register-page">
      <div className="signupcontent">
        <input
          type="email"
          className="rectangle"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          className="rectangle-2"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="password"
          className="rectangle-4"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="usrname">Email:</div>
        <div className="text-wrapper-2">Full name:</div>
        <p className="yes-i-have-an">
          <span className="span">Yes i have an account? </span>
          <Link to="/login" className="text-wrapper-3">
            Login
          </Link>
          <span className="span">&nbsp;</span>
        </p>
        <div className="group">
          <button
            className="overlap-group"
            onClick={handleClick}
            disabled={isLoading}
          >
            <div className="text-wrapper-4">REGISTER</div>
          </button>
        </div>
        <div className="text-wrapper-6">Password:</div>
        <div className="overlap">
          <div className="rectangle-6" />
          <div className="rectangle-7" />
          <img className="imagesold" alt="" src="sold.png" />
        </div>
        <p className="p">Please Fill out form to Register!</p>
      </div>
    </div>
  );
};

export default Signup;
