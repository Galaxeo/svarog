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

export async function extractTextFromPDF(fileUri, fileName) {
  try {
    const response = await fetch(fileUri);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("file", blob, fileName);

    const serverResponse = await fetch(`https://galaxeo.pythonanywhere.com/check_answer/parse-pdf`, {
      method: "POST",
      body: formData,
    });

    const data = await serverResponse.json();
    if (data.text) {
      return data.text;
    } else {
      throw new Error("Failed to extract text from PDF.");
    }
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw error;
  }
}