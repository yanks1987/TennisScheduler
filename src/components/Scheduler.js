// Scheduler.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scheduler = ({ players }) => {
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(0);

  useEffect(() => {
    const lastIndex = localStorage.getItem('lastSelectedPlayerIndex');
    const lastSelectedDate = localStorage.getItem('lastSelectedDate');
    const currentDate = new Date().toISOString().split('T')[0];

    if (lastIndex !== null && lastSelectedDate === currentDate) {
      setSelectedPlayerIndex(parseInt(lastIndex, 10));
    } else {
      const nextIndex = (selectedPlayerIndex + 1) % players.length;
      setSelectedPlayerIndex(nextIndex);
      localStorage.setItem('lastSelectedPlayerIndex', nextIndex);
      localStorage.setItem('lastSelectedDate', currentDate);
    }
  }, []);

  const sendNotification = () => {
    const currentPlayer = players[selectedPlayerIndex];
    const bookingUrl = 'https://cityofoakland.perfectmind.com/SocialSite/MemberRegistration/MemberSignIn';
    const message = `Hello ${currentPlayer.name}, please book the court at ${bookingUrl}`;

    const phoneNumbers = players.map(player => player.phoneNumber);

    axios.post('http://localhost:5000/send-sms', {
      to: phoneNumbers,
      message: message
    })
    .then(response => {
      if (response.data.success) {
        alert('Notification sent successfully!');
      } else {
        alert('Failed to send notification: ' + response.data.error);
      }
    })
    .catch(error => {
      alert('Error sending notification: ' + error.message);
    });
  };

  return (
    <div>
      <h1>Tennis Scheduler</h1>
      <p>Current Player: {players[selectedPlayerIndex].name}</p>
      <button onClick={sendNotification}>Notify Player to Book Court</button>
    </div>
  );
};

export default Scheduler;