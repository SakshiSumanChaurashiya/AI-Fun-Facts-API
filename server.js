require("dotenv").config();

const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json());

// Frontend folder connect
app.use(express.static(path.join(__dirname, "frontend")));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Fun Fact API
app.post("/api/fun-fact", async (req, res) => {
    try {
        const { topic } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Give me one short, interesting and true fun fact about ${topic}.`
        });

        const fact = response.text;

        res.json({
            success: true,
            message: fact
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to generate fun fact"
        });
    }
});

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});