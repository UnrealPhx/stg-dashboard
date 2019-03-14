import React, { Component } from 'react';
import useSTGWebSocket from './utils/useSTGWebSocket';
import './App.css';

const App = () => {
  const [{isOpen, payload, url}] = useSTGWebSocket('ws://127.0.0.1:7379');

  console.log(payload);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {!isOpen ? "Loading..." : `Connected to ${url}`}
        </p>
        <button disabled={!isOpen}>Spawn Asteroid</button>
      </header>
    </div>
  );
};

export default App;
