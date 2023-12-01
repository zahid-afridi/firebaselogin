// firebase.js

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyByTuK4ArJ5krUv7qsfGkIrOYRiyBXGUE0",
  authDomain: "react-app-d4402.firebaseapp.com",
  projectId: "react-app-d4402",
  storageBucket: "react-app-d4402.appspot.com",
  messagingSenderId: "93562085135",
  appId: "1:93562085135:web:4ee916b3092dd2b4a1687a",
  measurementId: "G-0RLHSDWREB",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.log('Notification permission denied.');
    }
  });
}


export const requestForToken = () => {
  return getToken(messaging, { vapidKey: "BFfYWb_zrJWOg66tADi0QUX2jF3wku40XMkEoAj0aAQikD2E0DDB0-cvuDbiWD_N-GlHvavzGRZkraNhmBhBE4w" })
    .then((currentToken) => {
      if (currentToken) {
        console.log('Current token for client:', currentToken);
        // Store the token on your server or perform other actions
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token.', err);
    });
};

// firebase.js

export const onMessageListener = () => {
  return new Promise((resolve) => {
    const unsubscribe = onMessage(messaging, (payload) => {
      // console.log("Received payload:", payload);
      resolve(payload);
    });

    // Return a function to unsubscribe from the message listener
    return () => unsubscribe();
  });
};

