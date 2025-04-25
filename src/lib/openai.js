// lib/openai.js
export async function fetchAIResponse(messages, systemPrompt, model) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5173", // change to your deployed domain
      "X-Title": "ChatWithCharacter", // optional title for analytics
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({
          role: m.sender === "you" ? "user" : "assistant",
          content: m.text,
        })),
      ],
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Sorry, no response.";
}
