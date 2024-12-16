import key from "./key.json";
import OpenAI from "openai";

const apiKey = key.openAIKey;

const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

async function generateText(prompt) {
  // TODO: Think about using better model specifically for following format. Look at GPT-4o-mini. Msg seeg
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Give 1-2 active recall questions to user based on topics they studied or notes inputted. Do not number the questions, separate the questions by commas, and return all of the questions on one line. For example: 'What did you learn about a random subject?,What are the reasonings behind blank?'",
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
