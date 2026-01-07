/* =========================
   GEMINI AI CONFIG
========================= */

// TODO: Replace with your actual API Key from Google AI Studio
const GEMINI_API_KEY = "AIzaSyC1MuY6A_9xDArZr0OhE0RwqZSc656AiMw"; 

const GEMINI_API_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/* =========================
   ASK GEMINI FUNCTION
========================= */
async function askGemini(prompt) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY.includes("YOUR_VALID_API_KEY")) {
        return "⚠️ API Key missing. Please open js/gemini.js and add your API key.";
    }

    try {
        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error:", data);
            return "Error: Unable to fetch response. Please try again.";
        }

        // Extract text safely
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        return text || "No response generated.";

    } catch (error) {
        console.error("Fetch failed:", error);
        return "Network error. Please check your internet connection.";
    }
}