function sendMessage() {
    const userMessage = document.getElementById("user-input").value;
    if (userMessage.trim() === "") return;

    // Add the user's message to the chat box
    const chatBox = document.getElementById("chat-box");
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("message", "user-message");
    userMessageDiv.textContent = userMessage;
    chatBox.appendChild(userMessageDiv);

    // Clear the input field
    document.getElementById("user-input").value = "";

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send message to the bot and get a response
    fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "sender": "user", "message": userMessage })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = data.length > 0 ? data[0].text : "Sorry, I didn't understand that.";
        const botMessageDiv = document.createElement("div");
        botMessageDiv.classList.add("message", "bot-message");
        botMessageDiv.textContent = botMessage;
        chatBox.appendChild(botMessageDiv);

        // Scroll to the bottom again after adding the bot's message
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
