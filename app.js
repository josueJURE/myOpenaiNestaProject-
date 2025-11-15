import express from "express"
// import chatCompletion from "./openai.js"
import OpenAI from "openai";
import dotenv from "dotenv"
dotenv.config()

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post("/userInput", async (req, res)=> {
    console.log("POST request on /userInput")

    try {
        const userPrompt = req.body.input
        
        // const aiResponse = await chatCompletion(userPrompt)
        async function chatCompletion(userPrompt) {
     
            const response = await client.chat.completions.create({
                model: "gpt-4",
                messages: [
                    { role: "user", content: userPrompt }
                ],
              });
        
              const aiMessage = response.choices[0].message.content;
              console.log(aiMessage);
        
              return aiMessage;
        }
       let aiResponse =  await chatCompletion(userPrompt)
        res.json({ response: aiResponse })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ error: "Failed to process request" })
    }
})

const PORT = process.env.PORT

app.listen(PORT || 3000, () => {
    console.log("app is listening on PORT 3000")
})


export default app 