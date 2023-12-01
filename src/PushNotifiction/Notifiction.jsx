import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notification() {
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationText, setNotificationText] = useState('');


  const sendMessage = () => {
    // Replace 'TO_USER_REGISTRATION_TOKEN' with the actual FCM token of the recipient user
    // const toUserToken = 'cXVYfdPBJMb09zdMcFx05a:APA91bE-1DzPqM5q37O5jZE-PDkUcMy9sYb37jBRV6Nu8bQ1CynH9xqkWrwfNP6b5-CGHJmVJngB1FEB98Bg5DCrtNEv-BvweR7JN4wVOGJIjAnfn9RkxnUQ2tg1ONSghPISoodtv8Vm';
       const toUserToken = 'cuayFQdOxOdhmHVqbq4SCP:APA91bFDMNhaa0z-gRlsKCX9wjedDZh_lPq5DJ92qDTnz0bOrdEys5e_CbzQqKWcz5PnBR-fh1RvX8qkkoQ44_AH-t3ZoJ4vurjxblGU2hfPqenHq8vleCOpk5o4UtWUu9JpfctfkV6l'
    // Replace with the FCM server key from your Firebase project settings
    const serverKey = 'AAAAFci8Hw8:APA91bGfu9p59FcqqnoPIaJgsRZMqRvai1dMyw-XGJZTPHoy4WSsg2QzmYE4LGm7_AF_nQLRhFU-PoqnaLHzzomJk24kMeQ3FmqwPEbyhGuBoiqh6N43o1TEvb1va9iVagZK4aKwKYZ2';

    // Message payload
    const message = {
      to: toUserToken,
      notification: {
        title: notificationTitle,
        body: notificationText,
      },
    };

    // Send the message using Firebase Cloud Messaging API
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${serverKey}`,
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Message sent successfully:', data);
        // Optionally, you can reset the input fields after sending the message
        setNotificationTitle('');
        setNotificationText('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <>
      <div>
        <label htmlFor='notificationTitle'>Notification Title:</label>
        <input
          type='text'
          id='notificationTitle'
          value={notificationTitle}
          onChange={(e) => setNotificationTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='notificationText'>Notification Text:</label>
        <input
          type='text'
          id='notificationText'
          value={notificationText}
          onChange={(e) => setNotificationText(e.target.value)}
        />
      </div>
      <button onClick={sendMessage}>Send Message</button>
      <ToastContainer />
    </>
  );
}
