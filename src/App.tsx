import React from 'react';
import './App.css';
import ScattegoriesContent from './Components/ScattegoriesContent';
import PlayerList from './Components/PlayerList';


function App() {
  const appStyle = {backgroundColor: "#adcbe3"}
  return (<div style={appStyle}>
    <div className="page-header">
      <h1>✨ Scattergories</h1>
    </div>
    <ScattegoriesContent />
    <PlayerList />
  </div>);
}

export default App;
