// App.js
import React from 'react';
import './App.css';
import PlayerList from './components/PlayerList';
import Scheduler from './components/Scheduler';

function App() {
  const players = [
    { name: 'Priyanka', phoneNumber: '510-609-2370' },
    { name: 'Suhas', phoneNumber: '510-609-2370' },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tennis Scheduler App</h1>
      </header>
      <main>
        <PlayerList players={players} />
        <Scheduler players={players} />
      </main>
    </div>
  );
}

export default App;
