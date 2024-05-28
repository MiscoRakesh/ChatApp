const socket = io();
let name1;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");
do {
  name1 = prompt("please enter your name ");
} while (!name1);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name1,
    message: message.trim(),
  };

  // append the message to dialogue box

  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // send to server
  socket.emit("message", msg);
}

// Function for appending message

function appendMessage(message, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markUp = `<h4>${message.user}</h4>
        <p>${message.message}</p>`;

  mainDiv.innerHTML = markUp;
  messageArea.appendChild(mainDiv);
}

// Receive Message
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

// for scrolling

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
