import './App.css';
import React, { useState } from 'react';
import { signInWithGooglePopup } from "./utils/firebase.utils.js"

import axios from 'axios';


function App() {

  // The URL to send the POST request to
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    
  };


  const logGoogleUser = async () => {
          const response = await signInWithGooglePopup();
          console.log(response);
      };
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputValue);
    const url = 'http://localhost:5000/api/recipe';
    // The data to send in the POST request
    const data = {
      ingr: inputValue
    };
    try {
      const response = await axios.post(url, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    
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
