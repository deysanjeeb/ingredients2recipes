import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';


function HomePage({ logGoogleUser, response, handleSubmit }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');
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
