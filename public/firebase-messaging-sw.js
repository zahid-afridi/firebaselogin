importScripts("https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyByTuK4ArJ5krUv7qsfGkIrOYRiyBXGUE0",
  authDomain: "react-app-d4402.firebaseapp.com",
  projectId: "react-app-d4402",
  storageBucket: "react-app-d4402.appspot.com",
  messagingSenderId: "93562085135",
  appId: "1:93562085135:web:4ee916b3092dd2b4a1687a",
  measurementId: "G-0RLHSDWREB"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle push messages here
messaging.onBackgroundMessage((payload) => {
//   console.log("Background message received:", payload);
});
