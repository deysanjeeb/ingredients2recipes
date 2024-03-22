import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { signInWithGooglePopup } from "../../utils/firebase.utils.js"



function HomePage({ }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  // The URL to send the POST request to
  const url = 'https://ingredients2recipes-5tvk-6umhuvfsr-deysanjeebs-projects.vercel.app:5000/api/recipe';
  const [response, setResponse] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    
  };


  const logGoogleUser = async () => {
          const response = await signInWithGooglePopup();
          console.log(response);
      };

  // const handleSendMessage = () => {
  //   if (inputValue.trim() !== '') {
  //     setMessages([...messages, { text: inputValue, sender: 'user' }]);
  //     setInputValue('');
  //   }
   
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // data recieved from the input field
    console.log(inputValue);

    // The data to send in the POST request
    const data = {
      ingr: inputValue
    };

    // sending POST request
    try {
      const response = await axios.post(url, data);

      console.log(response.data);
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <header className="App-header">
    <div>
      <button onClick={logGoogleUser}>Sign In With Google</button>
    </div>
    <div style={{ fontSize: '20px'}}>
      {response && <div><ReactMarkdown>{response}</ReactMarkdown></div>}
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

export default HomePage;
