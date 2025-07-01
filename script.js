const chatBox = document.getElementById('chat');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Lil Scoom greets on load
addMessage('Lil Scoom is here to help you!', 'ai');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, 'user');
  input.value = '';

  try {
    const res = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText }),
    });
    const data = await res.json();
    if (data.reply) {
      addMessage(data.reply, 'ai');
    } else {
      addMessage('Scoom confused 😢', 'ai');
    }
  } catch {
    addMessage('Scoom broke 😢', 'ai');
  }
});
