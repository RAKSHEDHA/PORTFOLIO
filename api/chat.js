import Groq from 'groq-sdk';

// Get API key - handle both quoted and unquoted formats
let GROQ_API_KEY = process.env.GROQ_API_KEY;
if (GROQ_API_KEY) {
  GROQ_API_KEY = GROQ_API_KEY.replace(/^["']|["']$/g, '');
}

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userMessage, chatHistory, contextBrain } = req.body;

  if (!GROQ_API_KEY) {
    console.error('Missing GROQ_API_KEY environment variable');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    console.log('Chat request from user:', userMessage.substring(0, 50));
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are Rada, the highly intelligent and friendly AI assistant for Rakshedha Balachander. 
          You must answer user questions using the following contextual portfolio data:
          
          ${JSON.stringify(contextBrain)}
          
          Core Identity Constraints:
          - You are NOT Rakshedha. If asked, explicitly clarify: 'I am not Rakshedha, I am her AI assistant, Rada!'
          - Always speak of Rakshedha in the third person.
          - Keep answers conversational, ultra-concise (under 3 sentences), and highly professional.
          - If the question cannot be answered using the portfolio data, gracefully state that you don't have that detail and tell them to email her at rakshedhab@gmail.com.`
        },
        ...(chatHistory || []),
        { role: "user", content: userMessage }
      ],
      model: "llama3-8b-8192",
      max_tokens: 150,
      temperature: 0.5,
    });

    const reply = chatCompletion.choices[0].message.content;
    console.log('Chat response generated:', reply.substring(0, 50));
    
    res.status(200).json({ reply: reply });
  } catch (error) {
    console.error("Groq API Error:", error.message);
    res.status(500).json({ error: "Rada's external neural link is down. Try asking simple portfolio queries!" });
  }
}