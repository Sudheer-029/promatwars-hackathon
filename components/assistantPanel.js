// components/assistantPanel.js
// Handles the chat UI



function setupAssistant() {
    const btnSend = document.getElementById('btn-send-chat');
    const input = document.getElementById('assistant-input');
    const chips = document.querySelectorAll('.prompt-chip');

    btnSend.addEventListener('click', () => handleSend(input.value));
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend(input.value);
    });

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            handleSend(chip.textContent);
        });
    });
}

function appendMessage(text, role) {
    const container = document.getElementById('assistant-chat-container');
    const msg = document.createElement('div');
    msg.className = `chat-message ${role}`;
    
    // Safety check: always use textContent for dynamic strings (Anti-XSS best practice)
    msg.textContent = text;
    
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
}

async function handleSend(text) {
    if (!text || text.trim() === '') return;
    
    // Clear input
    document.getElementById('assistant-input').value = '';
    
    // Render User message
    appendMessage(text, 'user');

    // Show typing
    const container = document.getElementById('assistant-chat-container');
    const typing = document.createElement('div');
    typing.className = `chat-message assistant`;
    typing.id = 'typing-indicator';
    typing.textContent = 'Thinking...';
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;

    // Await API
    const reply = await geminiService.askAssistant(text);

    // Remove typing, render Response
    document.getElementById('typing-indicator').remove();
    appendMessage(reply, 'assistant');
}
