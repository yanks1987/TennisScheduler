import React from 'react';

const PlayerList = ({ players }) => {
  return (
    <ul>
      {players.map((player, index) => (
        <li key={index}>{player.name} - {player.phoneNumber}</li>
      ))}
    </ul>
  );
};

export default PlayerList;