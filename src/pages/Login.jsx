import React from "react";
import Logo from "../assets/images/Logo.jpeg";
import LoginForm from "../Component/LoginForm";
import SocialLogin from "../Component/SocialLogin";
import LoginImg from "../assets/images/login.svg";
export default function Login() {
  return (
    <>
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
            <LoginForm></LoginForm>
            <SocialLogin></SocialLogin>
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
