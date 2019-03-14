import React, { Component } from 'react';
import useSTGWebSocket from './utils/useSTGWebSocket';
import './App.css';

let log: string = 'Test';

const App = () => {
  const [{isOpen, payload, ws}] = useSTGWebSocket('ws://localhost:7379');

  if (payload) {
    console.log(payload);
    log += `\n${payload}`;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {!isOpen ? "Loading..." : `Connected to ${ws.url}`}
        </p>
        <button disabled={!isOpen} onClick={() => ws.send(JSON.stringify({version: 1, type: "spawn"}))}>
          Spawn Asteroid
        </button>
      </header>
      <p>{log}</p>
    </div>
  );
};

export default App;
