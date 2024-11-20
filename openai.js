import key from "./key.json";
import OpenAI from "openai";

const apiKey = key.openAIKey;

const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

async function generateText(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Give 1-2 active recall questions to user based on topics they studied",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  return String(response.choices[0].message.content);
}

export default generateText;
