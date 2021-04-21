import React from 'react';
import './App.css';
import ScattegoriesContent from './Components/ScattegoriesContent';
import PlayerList from './Components/PlayerList';


function App() {
  return (<div>
    <div className="page-header bg-secondary text-white">
      <h1>✨ Scattergories</h1>
    </div>
    <ScattegoriesContent />
    <PlayerList />
  </div>);
}

export default App;
