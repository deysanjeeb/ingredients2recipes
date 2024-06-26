import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { signInWithGooglePopup } from "../../utils/firebase.utils.js"


import './home.css';
import { NavLink } from 'react-router-dom';


function Sidebar(){
  return(
    <div className="sidebar">
      <h3 className='sidebar-heading'>Menu</h3>
      <ul className='sidebar-list'>
        <li> <NavLink to='/'>Home</NavLink></li>
        <li>Recipes</li>
        <li>Ingredients</li>
        <li>Profile</li>
      </ul>
    </div>
  )
}

function HomePage({ }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  // The URL to send the POST request to
  const url = 'https://ingredients2recipes-5tvk.vercel.app/api/recipe';
  const [response, setResponse] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };

  /*
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');

    }
    
  };
*/

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
    <div className='homepageContainer'>
      
      <header className="App-header">
        
          <Sidebar/>
    
         
        <div className='main-content'>
          <div>
            <button onClick={logGoogleUser}>Sign In With Google</button>
          </div>
          <div className='response-container'style={{ fontSize: '20px'}}>
            {response && <div><ReactMarkdown>{response}</ReactMarkdown></div>}
          </div>
          <div className='centered'>
            <form onSubmit={handleSubmit}>
              <input type="text" value={inputValue} onChange={handleInputChange} />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div> 
      </header>
    </div>
  );
}

export default HomePage;
