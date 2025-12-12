const backendURL = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;

const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function appendChat(txt, cls="bot"){
  const div = document.createElement("div");
  div.textContent = txt;
  div.className = cls;
  chatMessages.appendChild(div);
}

async function detectIntentAI(message){
  const res = await fetch(`${backendURL}/api/analyze`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message })
  });
  const data = await res.json();
  return data.result;
}

sendBtn.addEventListener("click", async ()=>{
  const text = userInput.value.trim();
  if (!text) return;
  appendChat(text, "user");
  userInput.value = "";
  appendChat("🧠 جارٍ التحليل...", "bot");
  const aiRes = await detectIntentAI(text);
  appendChat(aiRes, "bot");
});
