export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, voiceId } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  // Get API key - handle both quoted and unquoted formats
  let ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  if (ELEVENLABS_API_KEY) {
    ELEVENLABS_API_KEY = ELEVENLABS_API_KEY.replace(/^["']|["']$/g, '');
  }

  const DEFAULT_VOICE_ID = voiceId || '21m00Tcm4TlvDq8ikWAM'; // Rachel - popular female voice

  if (!ELEVENLABS_API_KEY) {
    console.error('Missing ELEVENLABS_API_KEY');
    return res.status(500).json({ error: 'ElevenLabs API key not configured' });
  }

  try {
    console.log('TTS Request:', { text: text.substring(0, 50), voiceId: DEFAULT_VOICE_ID });

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${DEFAULT_VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs Error Response:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `ElevenLabs API Error: ${response.status}`,
        details: errorText 
      });
    }

    // Get the audio buffer
    const audioBuffer = await response.arrayBuffer();
    
    // Send as audio/mpeg
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', audioBuffer.byteLength);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(Buffer.from(audioBuffer));
    
  } catch (error) {
    console.error('TTS Handler Error:', error.message);
    return res.status(500).json({ 
      error: 'Failed to generate speech',
      details: error.message 
    });
  }
}
