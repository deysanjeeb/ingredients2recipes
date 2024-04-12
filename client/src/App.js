import './App.css';
import React, { useState } from 'react';
import { signInWithGooglePopup } from "./utils/firebase.utils.js"
import ReactMarkdown from 'react-markdown';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import HomePage from './components/home/index.js';
import { PostHog } from 'posthog-node'
// const config = require('./secrets.json');

const client = new PostHog(
  process.env.postHogAPI,
    { host: 'https://app.posthog.com' }
)
// const client = new PostHog(
//   config.postHogAPI,
//     { host: 'https://app.posthog.com' }
// )

function App() {

  const [inputValue, setInputValue] = useState('');
  client.capture({
      distinctId: 'test-id',
      event: 'test-event'
  })

  // Send queued events immediately. Use for example in a serverless environment
  // where the program may terminate before everything is sent.
  // Use `client.flush()` instead if you still need to send more events or fetch feature flags.
  client.shutdown()
  // The URL to send the POST request to
  const url = 'https://ingredients2recipes-5tvk.vercel.app/api/recipe';
  const [response, setResponse] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    
  };


/*
  const logGoogleUser = async () => {
          const response = await signInWithGooglePopup();
          console.log(response);
      };

    
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
    

  }
*/
    return (
      <div>
   
      
      <Router>
        <Routes>
          <Route path="/" element={ <HomePage 
            response={response}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
          />}/>
        </Routes>
      </Router>

      {/* Other components */}
    </div>
    );
  }
  // export default SignIn;
  export default App;
