import './App.css';
import React, { useState } from 'react';
import { signInWithGooglePopup } from "./utils/firebase.utils.js"
import ReactMarkdown from 'react-markdown';

import axios from 'axios';
import HomePage from './components/home/index.js';



function App() {

  const [inputValue, setInputValue] = useState('');
  // The URL to send the POST request to
  const url = 'https://ingredients2recipes-5tvk-6umhuvfsr-deysanjeebs-projects.vercel.app:5000/api/recipe';
  const [response, setResponse] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    
  };


  // const logGoogleUser = async () => {
  //         const response = await signInWithGooglePopup();
  //         console.log(response);
  //     };
    
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   // data recieved from the input field
  //   console.log(inputValue);

  //   // The data to send in the POST request
  //   const data = {
  //     ingr: inputValue
  //   };

  //   // sending POST request
  //   try {
  //     const response = await axios.post(url, data);

  //     console.log(response.data);
  //     setResponse(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
    
  // }

    return (
      <div>
      <HomePage 
        response={response}
        inputValue={inputValue}
        
      />

      {/* Other components */}
    </div>
    );
  }
  // export default SignIn;
  export default App;
