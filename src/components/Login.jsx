import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleIsSetLoginForm = () => {
    setError("");
    setIsLoginForm((value) => !value);
  }
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center my-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">
          {isLoginForm ? "Login" : "SignUp"}
        </legend>

        {!isLoginForm && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              value={firstName}
              className="input"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label">Last Name</label>
            <input
              type="text"
              value={lastName}
              className="input"
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        <label className="label">Email</label>
        <input
          type="email"
          value={emailId}
          className="input"
          onChange={(e) => setEmailId(e.target.value)}
        />
        <label className="label">Password</label>
        <input
          type="password"
          value={password}
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500">{error}</p>
        <button
          className="btn btn-neutral mt-4"
          onClick={isLoginForm ? handleLogin : handleSignup}
        >
          {isLoginForm ? "Login" : "SignUp"}
        </button>
        <p
          className="m-auto cursor-pointer my-4 text-blue-400"
          onClick={handleIsSetLoginForm}
        >
          {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
