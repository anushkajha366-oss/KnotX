import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Ask KnotX is not configured on this server.",
    });
  }

  try {
    const { question, context } = req.body;

    if (!question || !context) {
      return res.status(400).json({
        error: "Question and team context are required.",
      });
    }

    const prompt = `
You are KnotX, an intelligent team-building assistant.

Analyze the following live team and project context carefully.

${JSON.stringify(context, null, 2)}

The user asks:

${question}

Give a practical, concise recommendation based only on the provided team and project data.
Focus on:
- missing skills or roles
- current team strengths
- remaining gaps
- the best next improvement

Do not invent team members, skills, or project requirements that are not present in the context.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", data);

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "KnotX could not complete the AI analysis.",
      });
    }

    const analysis =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!analysis) {
      return res.status(500).json({
        error: "No analysis was returned by the AI model.",
      });
    }

    return res.status(200).json({ analysis });
  } catch (error) {
    console.error("Ask KnotX API error:", error);

    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "KnotX could not complete the analysis.",
    });
  }
}