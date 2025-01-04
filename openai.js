import key from "./key.json";
import OpenAI from "openai";

const apiKey = key.openAIKey;

const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

async function generateText(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Give 1-2 active recall questions to user based on topics they studied or notes inputted. Do not number the questions, separate the questions by the string |Ð|, and return all of the questions on one line. For example: 'What did you learn about a random subject?|Ð|What are the reasonings behind blank?'",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  return String(response.choices[0].message.content);
}

export async function checkAnswer(qaObj) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", messages: [
      {
        role: "system",
        content: "Based on the question and answer, determine if the answer is correct, incorrect, or half correct. If the answer is correct, respond with 'C'. If the answer is incorrect, respond with 'I'. If the answer is half correct, respond with 'H'.",
      },
      {
        role: "user",
        content: qaObj,
      },
    ]
  });
  return String(response.choices[0].message.content);
}

export default generateText;
