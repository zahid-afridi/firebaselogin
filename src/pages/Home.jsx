import React, { useEffect } from "react";
import { auth } from "./Confiq";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../Axios/Axios";
import Notification from "../Notification/Notification";
import { ToastContainer,toast } from "react-toastify";
export default function Home() {
  const navigate = useNavigate();

 useEffect(() => {
    const userstring = localStorage.getItem("user");
     const lgoinuser = JSON.parse(userstring);
  
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
  
    if (!user && !lgoinuser) {
      navigate("/login");
    } else {
      try {
        const token = await user.getIdToken();
        
        console.log("User Token:", token);

        user.accessToken = token;
     

        

      } catch (error) {
        console.error("Error getting user token:", error.message);
      }
    }
  });

  return () => unsubscribe();
}, [navigate,]); // Ensure that only navigate is in the dependency array

  
  const logout = async () => {
     // Sign out from Firebase authentication
  signOut(auth)
    .then(() => {
      navigate("/login");
        const userString = localStorage.getItem("user");
       localStorage.removeItem("user");
                   toast.success("logout success", {

    });
       localStorage.removeItem(userString);
    })
    .catch((error) => {
      console.error("Logout error:", error.message);
    });
  try {
    const userString = await localStorage.getItem("user");
    const user = JSON.parse(userString);

    

    // Check if the user object exists and contains the access token
    if ( user.accessToken) {
      // Include the access token in the headers of the logout request
     const logoutuser= await axios.post(
      API_URL +  "logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      console.log(logoutuser)
      // Clear user data from local storage
      localStorage.removeItem("user");
           localStorage.removeItem('userId')
      // Navigate to the login page
      navigate("/login");
    } else {
      console.error("Access token not found in user object.");
    }
  } catch (error) {
    console.error("Error accessing user from local storage:", error.message);
  }

 
};


  const user = JSON.parse(localStorage.getItem("user"));
         
  return (
    <> 
    <Notification></Notification>
    <ToastContainer position='top-center' autoClose="2000" 
            closeOnClick={true} pauseOnHover={true} draggable={true} ></ToastContainer>
      <div className="container mt-5">
      {user && (
        <div className="container">
          <h2>Welcome, {user.displayName || user.email}!</h2>
          <p>Email: {user.email}</p>
          {user.displayName && <p>Display Name: {user.displayName}</p>}
          {user.providerData && user.providerData.length > 0 && (
            <p>Provider: {user.providerData[0].providerId}</p>
            )}
          <button className="btn btn-primary" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
      </>
  );
}


