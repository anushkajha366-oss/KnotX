import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Ask KnotX is not configured on this server.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { question, context } = body;
    if (typeof question !== 'string' || !context) {
      return res.status(400).json({ error: 'A question and team context are required.' });
    }

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: [
                  'You are KnotX Team Intelligence.',
                  'Analyze only the supplied project and team data. Do not assume facts not present in the context.',
                  'Give a concise response with these headings: Overall assessment, Biggest strength, Most important gap, Actionable recommendation, and Next teammate or skill (only if relevant).',
                ].join(' '),
              },
            ],
          },
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Selected question: ${question}\n\nLive KnotX context:\n${JSON.stringify(
                    context
                  )}`,
                },
              ],
            },
          ],
          generationConfig: { maxOutputTokens: 500 },
        }),
      }
    );

    const payload = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      error?: { message?: string };
    };

    const analysis = payload.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? '')
      .join('');

    if (!response.ok || !analysis) {
      return res.status(502).json({
        error: payload.error?.message ?? 'KnotX could not complete the analysis.',
      });
    }

    return res.status(200).json({ analysis });
  } catch (error) {
    console.error('Ask KnotX API error:', error);
    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : 'KnotX could not complete the analysis.',
    });
  }
}
