const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const corsOptions = {
  origin: ['https://mind-ginie-chatbot-v10-s1salieso-anjay29s-projects.vercel.app/', 'http://localhost:3000'], 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { userText } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userText },
      ],
    });
    const botMessageContent = completion.choices[0].message.content.trim();
    res.json({ botMessage: botMessageContent });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Error processing request' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
