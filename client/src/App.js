import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <header className="App-header">
    
    <div className='centered'>
      <input type="text" value={inputValue} onChange={handleInputChange} />
    </div></header>
  );
}

export default App;
