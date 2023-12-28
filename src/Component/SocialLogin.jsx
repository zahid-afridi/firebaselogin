import React from "react";
import FacebookSvg from "../assets/images/facebook.svg";
import Githubsvg from "../assets/images/github.svg";
import Google from "../assets/images/google.svg";
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
} from "../Firebase/Confiq";
import { signInWithPopup } from "firebase/auth";
export default function SocialLogin() {
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

      //   data.user.accessToken = accessToken;
    } catch (error) {
      console.error("Error getting user token:", error.message);
    }
  };

  return (
    <>
      {/* Loggin with google start  */}
      <div className="d-flex flex-column gap-2 m-5">
        <div className="loginwithBtn" onClick={handleGoogleLogin}>
          <img src={Google} alt="Google Login" className="img-fluid " />
          <span>continue with Google</span>
        </div>
        <div className="loginwithBtn" onClick={handleGitHubLogin}>
          <img src={Githubsvg} alt="Google Login" className="img-fluid " />
          <span>continue with Github</span>
        </div>
        <div className="loginwithBtn" onClick={handleFacebookLogin}>
          <img src={FacebookSvg} alt="Google Login" className="img-fluid " />
          <span>continue with Facebook</span>
        </div>
      </div>

      {/* Loggin with google end */}
    </>
  );
}
