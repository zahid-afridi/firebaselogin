import React, { useState, useEffect } from "react";
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
} from "./Confiq";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import API_URL from "../Axios/Axios";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ForgetModal from "./ForgertPassword";
import LoginImg from "../assets/img/login.svg";
import Logo from "../assets/img/Logo.jpeg";
import Google from "../assets/img/google.svg";
import FacebookSvg from "../assets/img/facebook.svg";
import Githubsvg from "../assets/img/github.svg";

export default function Login() {
  // store Form Data
  const [invalue, setinvalue] = useState({
    login: "",
    password: "",
  });

  const navigate = useNavigate();
  // forgetModal
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      navigate("/");
    }
  }, [navigate]);

  ///////Login With Google
  const handleGoogleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);
      handleLoginResponse(data);
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };
  // login with Github
  const handleGitHubLogin = async () => {
    try {
      const data = await signInWithPopup(auth, githubProvider);
      handleLoginResponse(data);
    } catch (error) {
      console.error("GitHub Login Error:", error.message);
    }
  };
  // login with Facebook
  const handleFacebookLogin = async () => {
    try {
      const data = await signInWithPopup(auth, facebookProvider);
      handleLoginResponse(data);
    } catch (error) {
      console.error("Facebook Login Error:", error.message);
    }
  };

  const handleLoginResponse = async (data) => {
    try {
      const accessToken = await data.user.getIdToken();

      // Include the access token in the user object
      data.user.accessToken = accessToken;

      // Save the user data to local storage
      localStorage.setItem("user", JSON.stringify(data.user));

      const userEmail = data.user.email;
      const userName = data.user.displayName;

      try {
        const response = await axios.post(API_URL + "addUser", {
          name: userName,
          email: userEmail,
          password: 1234567,
          c_password: 1234567,
        });

        const responseData = response.data;

        if (responseData.success) {
          const userId2 = responseData.data.user.id;
          localStorage.setItem("userId", userId2);
          // Show a styled success toast notification
          toast.success("Login Successful", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/");

          console.log(responseData);
        } else {
          console.error("Registration Error:", responseData.message);
        }
      } catch (error) {
        console.error("API Request Error:", error);
      }
    } catch (error) {
      console.error("Error getting user token:", error.message);
    }
  };

  const handlechange = (e) => {
    setinvalue((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  // form data submit
  const handlesumbit = async (e) => {
    e.preventDefault();
    // console.log(invalue);
    // try {
    //   const response = await fetch(
    //     "https://api.pressmonitor.com/v1/sec/login",
    //     {
    //       method: "post",
    //       headers: {
    //         cname: "mapp.pressmonitor.co.in",
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //         Accept: "*",
    //       },
    //       body: {
    //         invalue,
    //       },
    //     }
    //   );
    //   console.log(response.json());
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const response = await axios.post(
        "https://api.pressmonitor.com/v1/sec/login",
        // new URLSearchParams({
        //   login: invalue.login,
        //   password: invalue.password,
        // }),
        invalue,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const responseData = response.data;
      console.log(responseData);
      if (responseData) {
        console.log("url", responseData.data.web_url);
        const webUrl = responseData.data.web_url;

        // Redirect to the new domain
        window.location.href = webUrl;
      }
    } catch (error) {
      console.log(error);
    }
    // let axiosConfig = {
    //   headers: {
    //     "Content-Type": "application/json;charset=UTF-8",
    //     // "Access-Control-Allow-Origin": "*",
    //     cname: "mapp.pressmonitor.co.in",
    //     // "Access-Control-Allow-Credentials": true,
    //   },
    // };

    // axios
    //   .post("https://api.pressmonitor.com/v1/sec/login", invalue, axiosConfig)
    //   .then((response) => {
    //     console.log(response, "respspps");
    //   })
    //   .catch((error) => {
    //     console.log(error, "nenenen");
    //   });
  };

  const handleforget = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <ToastContainer
        position="right"
        autoClose={2000}
        hideProgressBar={false}
        pauseOnHover={true}
        draggable={true}
      ></ToastContainer>
      <ForgetModal isOpen={modal} closeModal={closeModal}></ForgetModal>

      {/* header logo */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <img
              src={Logo}
              className="img-fluid mt-4"
              alt=""
              style={{ width: "120px" }}
            />
          </div>
        </div>
      </div>

      <div className="container login-form ">
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12 col-12">
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
                  <label
                    htmlFor=""
                    style={{ fontWeight: "600", fontSize: "0.9rem" }}
                  >
                    Email or phone
                  </label>
                  <input
                    type="text"
                    value={invalue.login}
                    name="login"
                    onChange={handlechange}
                    className=""
                  ></input>
                </div>
                <div className="d-flex flex-column gap-1 mt-3">
                  <label
                    htmlFor=""
                    style={{ fontWeight: "600", fontSize: "0.9rem" }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={invalue.password}
                    onChange={handlechange}
                    name="password"
                    className=""
                  ></input>
                </div>
                <span
                  className="forgot pt-3 "
                  onClick={handleforget}
                  style={{ cursor: "pointer" }}
                >
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

              {/* Loggin with google start  */}
              <div className="d-flex flex-column gap-2 m-5">
                <div className="loginwithBtn" onClick={handleGoogleLogin}>
                  <img src={Google} alt="Google Login" className="img-fluid " />
                  <span>continue with Google</span>
                </div>
                <div className="loginwithBtn" onClick={handleGitHubLogin}>
                  <img
                    src={Githubsvg}
                    alt="Google Login"
                    className="img-fluid "
                  />
                  <span>continue with Github</span>
                </div>
                <div className="loginwithBtn" onClick={handleFacebookLogin}>
                  <img
                    src={FacebookSvg}
                    alt="Google Login"
                    className="img-fluid "
                  />
                  <span>continue with Facebook</span>
                </div>
              </div>

              {/* Loggin with google end */}
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 col-12">
            <div>
              <img src={LoginImg} className="img-fluid " alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
