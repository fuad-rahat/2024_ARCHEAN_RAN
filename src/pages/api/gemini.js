import axios from 'axios';
require('dotenv').config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GOOGLE_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const geminiData = response.data;
      res.status(200).json(geminiData);
    } catch (error) {
      console.error('Error fetching data from Gemini API:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
