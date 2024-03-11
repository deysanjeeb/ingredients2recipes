import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { signInWithGooglePopup } from "./utils/firebase.utils.js"


function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  const logGoogleUser = async () => {
          const response = await signInWithGooglePopup();
          console.log(response);
      };
    
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
  }

  return (
    <header className="App-header">
    <div>
                <button onClick={logGoogleUser}>Sign In With Google</button>
    </div>

    <div className='centered'>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div> 
   
   </header>
  );
}
// export default SignIn;
export default App;
