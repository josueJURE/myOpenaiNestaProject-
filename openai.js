import OpenAI from "openai";
import dotenv from "dotenv"
dotenv.config()

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function chatCompletion(prompt) {
    const response = await client.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "user", content: prompt }
        ],
      });

      const aiMessage = response.choices[0].message.content;
      console.log(aiMessage);

      return aiMessage;
}

export default chatCompletion

