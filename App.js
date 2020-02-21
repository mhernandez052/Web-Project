/**Creator: Martin Hernandez
*  File: App.js
*  Function: Root of created App
**/

import React, { Component } from 'react';
import logo from './logo2.png';
import './App.css';

import TeamTable from './components/teamtable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <TeamTable />
      </div>
    );
  }
}

export default App;
