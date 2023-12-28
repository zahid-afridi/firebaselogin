import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    login: "",
    password: "",
  });
  const handlesumbit = async (e) => {
    console.log(value);
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.pressmonitor.com/v1/sec/login",

        value,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const responseData = await response.data;
      console.log(responseData);
      if (responseData) {
        console.log("url", responseData.data.web_url);
        const webUrl = responseData.data.web_url;

        // // Redirect to the new domain
        window.location.href = webUrl;
        // navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlechange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      {/* start form  */}
      <h3
        className=" "
        style={{ color: "#b24020", fontSize: "3rem", fontWeight: "300" }}
      >
        Welcome to your <br /> professional community
      </h3>
      <div>
        <form action="" className="mt-5" onSubmit={handlesumbit}>
          <div className="d-flex flex-column gap-1">
            <label htmlFor="" style={{ fontWeight: "600", fontSize: "0.9rem" }}>
              Email or phone
            </label>
            <input
              type="text"
              onChange={handlechange}
              name="login"
              value={value.login}
              className=""
            ></input>
          </div>
          <div className="d-flex flex-column gap-1 mt-3">
            <label htmlFor="" style={{ fontWeight: "600", fontSize: "0.9rem" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={value.password}
              onChange={handlechange}
              className=""
            ></input>
          </div>
          <span className="forgot pt-3 " style={{ cursor: "pointer" }}>
            Forgot password?
          </span>
          <button
            type="submit"
            className="btn btn-primary w-75 mt-4 rounded-pill "
            style={{ height: "3.1rem" }}
          >
            Sign in
          </button>
        </form>

        {/* End Form Jsx */}
        <div
          className="d-flex align-items-center gap-2 mt-4 mb-2"
          style={{ marginLeft: "50px" }}
        >
          <hr className="w-25" /> or <hr className="w-25" />
        </div>
      </div>
    </>
  );
}
