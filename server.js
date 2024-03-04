const express = require('express');
const app = express();
const port = 5000;

require('dotenv').config();
const readline = require('readline');
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

app.get('/', (req, res) => {
  res.send('Hello World!')
});

function startServer() {
  return new Promise((resolve) => {
      app.listen(port, () => {
          console.log(`Server is running on http://localhost:${port}`);
          resolve();
      });
  });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const apiKey = process.env.API_KEY;
const MODEL_NAME = "gemini-1.0-pro";

async function runChat(query) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });

  const result = await chat.sendMessage(query);
  const response = result.response;
  console.log(response.text());
}

async function run() {
  await startServer();
  rl.question('Please enter your ingredients: ', (q) => {
    let query = "Please suggest some recipes using the following ingredients: "+q;
    console.log(`You entered: ${query}`);
    runChat(query);
    rl.close();
  });
  }

run();