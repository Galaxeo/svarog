export async function generateText(prompt) {
  const response = await fetch("https://galaxeo.pythonanywhere.com/generate_text", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: prompt }),
  })
  const data = await response.json();
  return data.response;
}
export async function checkAnswer(qaObj) {
  const response = await fetch("https://galaxeo.pythonanywhere.com/check_answer", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ qaObj: qaObj }),
  })
  const data = await response.json();
  return data.response;
}
