chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "askGemini") {
    chrome.storage.sync.get("geminiApiKey", async (data) => {
      const apiKey = data.geminiApiKey;
      if (!apiKey) {
        sendResponse({ error: "API key not set. Please go to extension options." });
        return;
      }

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: request.prompt }] }]
            })
          }
        );

        const dataRes = await response.json();
        if (dataRes.candidates && dataRes.candidates[0].content.parts[0].text) {
          sendResponse({ result: dataRes.candidates[0].content.parts[0].text });
        } else {
          sendResponse({ error: "No valid response from Gemini." });
        }
      } catch (err) {
        sendResponse({ error: err.message });
      }
    });

    return true; // async response
  }
});
