const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(express.json());
app.use(cors());


app.post('/summarize', async (req, res) => {
    const { text } = req.body;
    try {
      const response = await axios.post(
        `https://api.openai.com/v1/chat/completions`,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Summarize the following text into less than 150 words.\n\n${text}
              \n Make the summary meaningful and informative as well.`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      const summary = response.data.choices[0].message.content;
      res.json({ summary });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while summarizing the text' });
    }
});

app.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;
    try {
        const response = await axios.post(
          `https://api.openai.com/v1/chat/completions`,
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Translate this text -\n\n ${text}\n\n into ${targetLanguage}.`,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );
        const translatedText = response.data.choices[0].message.content;
        res.json({ translatedText });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while Translating the text' });
      }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
