const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;
// const bodyParser = require('body-parser');
app.use(cors());


const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();
// 
// const uri = process.env.MONGODB_URI;
const uri = 'mongodb://127.0.0.1:27017'
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//   if (err) {
//     console.error('Error connecting to MongoDB', err);
//     return;
//   }
  
//   const collection = client.db("ingr2recipes").collection("users");
//   // perform actions on the collection object
//   client.close();
// });


const readline = require('readline');
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use(express.json());

app.post('/api/recipe', async (req, res) => {
  const data =req.body; // Access the JSON data sent
  console.log(data.ingr);
  let query = "Please suggest some recipes using the following ingredients: " + data.ingr;
  const response = await runChat(query);
  console.log( response);
  res.send(response);
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
  return new Promise((resolve) => {
    setTimeout(() => {
      rec= response.text();
      console.log((rec));
      resolve(rec);
    }, 3000);
  });
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