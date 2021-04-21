import React from 'react';
import './App.css';
import ScattegoriesContent from './Components/ScattegoriesContent';


function App() {
  return (<div>
    <div className="page-header" style={{backgroundColor: "#f7f7f7"}}>
      <h1>✨ Scattergories</h1>
    </div>
    <ScattegoriesContent />
  </div>);
}

export default App;
