import { prevuser } from "./context/UserContext";

const Api_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyArkVCou2ddCHQ718H0K4AwxM4b39p9JXc";

export async function generateResponse() {
  const parts = [];

  // Always include prompt text
  if (prevuser.prompt) {
    parts.push({ text: prevuser.prompt });
  }

  // Include image data if available
  if (prevuser.data) {
    parts.push({
      inline_data: {
        mime_type: prevuser.mime_type,
        data: prevuser.data,
      },
    });
  }

  const RequestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: parts,
        },
      ],
    }),
  };

  try {
    const response = await fetch(Api_URL, RequestOption);
    const data = await response.json();

    const apiResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text
        ?.replace(/\*\*(.*?)\*\*/g, "$1")
        ?.trim() || "⚠️ No response from model.";

    return apiResponse;
  } catch (error) {
    console.error("Error generating response:", error);
    return "❌ Failed to get response from API.";
  }
}
