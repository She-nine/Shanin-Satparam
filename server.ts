import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

let youtubeClient: any = null;

function getYouTube() {
  if (!youtubeClient) {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      console.warn('YOUTUBE_API_KEY is missing. YouTube search will be disabled.');
      return null;
    }
    youtubeClient = google.youtube({
      version: 'v3',
      auth: apiKey,
    });
  }
  return youtubeClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/analyze-mood', async (req, res) => {
    const { message, history = [] } = req.body;
    
    const retryFetch = async (retries = 3, delay = 1000): Promise<any> => {
      try {
        const contents = history.map((h: any) => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        }));

        contents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents,
          config: {
            systemInstruction: `You are Moodify AI, an empathetic and highly conversational sonic assistant. 
            You excel at having natural, supportive, and engaging dialogues, similar to ChatGPT but with a deep soul for music.
            
            Conversation Guidelines:
            - Respond directly to what the user says. If they ask a non-music question, answer it warmly but pivot to how music might relate to their current vibe.
            - Use a warm, human-like tone with personal touches.
            - Validate the user's feelings. If they are happy, celebrate with them. If they are sad, offer comfort.
            - Be concise but expressive.
            
            Output MUST be valid JSON with these fields:
            - sentiment: "Positive", "Negative", or "Neutral".
            - emotion: "Happy", "Sad", "Anxious", "Tired", "Focus", "Calm", "Energetic", or "Nostalgic".
            - explanation: Your direct response to the user. This is what the user will see. Make it feel like a real conversation.
            - spectrum: Scores (0-100) for: Anxious, Sad, Tired, Energetic, Happy.
            - tokens: A few keywords from their message.
            - keywords: Emotional keywords.
            - recommendations: Array of 3 real, popular songs.`,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                sentiment: { type: Type.STRING },
                emotion: { type: Type.STRING },
                explanation: { type: Type.STRING },
                spectrum: {
                  type: Type.OBJECT,
                  properties: {
                    Anxious: { type: Type.NUMBER },
                    Sad: { type: Type.NUMBER },
                    Tired: { type: Type.NUMBER },
                    Energetic: { type: Type.NUMBER },
                    Happy: { type: Type.NUMBER },
                  }
                },
                tokens: { type: Type.ARRAY, items: { type: Type.STRING } },
                keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                recommendations: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      artist: { type: Type.STRING },
                      moodHint: { type: Type.STRING },
                    }
                  }
                }
              },
              required: ['sentiment', 'emotion', 'explanation', 'recommendations']
            }
          },
        });

        if (!response.text) {
          throw new Error('Empty response from Gemini');
        }

        let analysis;
        try {
          analysis = JSON.parse(response.text);
        } catch (e) {
          const jsonMatch = response.text.match(/```json\n([\s\S]*?)\n```/) || response.text.match(/{[\s\S]*}/);
          if (jsonMatch) {
            analysis = JSON.parse(jsonMatch[1] || jsonMatch[0]);
          } else {
            throw new Error('Invalid JSON format from AI');
          }
        }
        return analysis;
      } catch (error: any) {
        if (retries > 0 && (error.status === 503 || error.message?.includes('503') || error.message?.includes('demand'))) {
          console.warn(`Gemini 503 - Retrying in ${delay}ms... (${retries} left)`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return retryFetch(retries - 1, delay * 2);
        }
        throw error;
      }
    };

    try {
      const analysis = await retryFetch();
      
      // Enhance recommendations with YouTube search if available
      const youtube = getYouTube();
      if (youtube && analysis.recommendations) {
        const enrichedRecommendations = await Promise.all(
          analysis.recommendations.map(async (song: any) => {
            try {
              const searchResult = await youtube.search.list({
                q: `${song.title} ${song.artist} official music video`,
                part: ['snippet'],
                maxResults: 1,
                type: ['video'],
              });
              
              const video = searchResult.data.items?.[0];
              if (video) {
                return {
                  ...song,
                  youtubeId: video.id?.videoId,
                  thumbnail: video.snippet?.thumbnails?.high?.url || video.snippet?.thumbnails?.default?.url,
                };
              }
            } catch (e) {
              console.error('YouTube Search Error for:', song.title, e);
            }
            return song;
          })
        );
        analysis.recommendations = enrichedRecommendations;
      }

      res.json(analysis);
    } catch (error: any) {
      console.error('Gemini Error:', error);
      res.status(500).json({ 
        error: 'Failed to analyze mood',
        details: error.message || 'Unknown error',
        status: error.status || 500
      });
    }
  });

  app.get('/api/search-music', async (req, res) => {
    const { q } = req.query;
    const youtube = getYouTube();
    if (!youtube) {
      return res.status(400).json({ error: 'YouTube Search API not configured. Please add YOUTUBE_API_KEY to your settings.' });
    }

    try {
      const response = await youtube.search.list({
        q: `${q}`,
        part: ['snippet'],
        maxResults: 12,
        type: ['video'],
      });

      const results = response.data.items?.map((item: any) => ({
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        youtubeId: item.id.videoId,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        publishedAt: item.snippet.publishedAt,
      }));

      res.json(results);
    } catch (error) {
      console.error('YouTube API Error:', error);
      res.status(500).json({ error: 'Failed to search YouTube' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
