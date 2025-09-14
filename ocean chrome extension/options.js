document.getElementById("save").addEventListener("click", () => {
  const key = document.getElementById("apiKey").value.trim();

  if (!key) {
    document.getElementById("status").innerText = "❌ Please enter an API key.";
    return;
  }

  chrome.storage.sync.set({ geminiApiKey: key }, () => {
    document.getElementById("status").innerText = "✅ API Key saved successfully!";
    setTimeout(() => { document.getElementById("status").innerText = ""; }, 2000);
  });
});

// Load saved key on page load
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("geminiApiKey", (data) => {
    if (data.geminiApiKey) {
      document.getElementById("apiKey").value = data.geminiApiKey;
    }
  });
});
