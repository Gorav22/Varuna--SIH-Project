// Create chatbot container
const chatContainer = document.createElement("div");
chatContainer.id = "ocean-chatbot";
chatContainer.innerHTML = `
  <div id="chat-header">🌊 Ocean Chatbot</div>
  <div id="chat-body"></div>
  <div id="chat-input-area">
    <input type="text" id="chat-input" placeholder="Ask about oceans..."/>
    <button id="chat-send">Send</button>
  </div>
`;
document.body.appendChild(chatContainer);

const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg.innerText = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

chatSend.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage("user", "You: " + text);
  chatInput.value = "";

  // Ensure query is ocean-related
  if (!/ocean|sea|wave|current|salinity|temperature|climate|coast/i.test(text)) {
    addMessage("bot", "🤖 I can only answer ocean-related questions.");
    return;
  }

  chrome.runtime.sendMessage({ type: "askGemini", prompt: text }, (response) => {
    if (response.error) {
      addMessage("bot", "❌ Error: " + response.error);
    } else {
      addMessage("bot", "🌊 " + response.result);
    }
  });
}
