const socket = io();

// Get DOM elements in respective JS variables
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

// Audio that will play on receiving message
var audio = new Audio("ding.mp3");

// Function which will append event info to the container
const append = (message, position) => {
  const messageEl = document.createElement("div");
  messageEl.innerText = message;
  messageEl.classList.add("message");
  messageEl.classList.add(position);
  messageContainer.append(messageEl);
  if (position == "incoming") {
    audio.play();
  }
};

// Ask new user for his/her name
let name;
do {
  name = prompt("Enter your name to join the chat");
} while (!name);

socket.emit("new-user-joined", name);

// User Joined
socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "incoming");
  scrollToBottom();
  
});

// Receive message
socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
  scrollToBottom();
});

// User Left
socket.on("left", (name) => {
  append(`${name} left the chat`, "outgoing");
  scrollToBottom();
});

// If the form gets submitted, send message to the server
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
  scrollToBottom();
});

// function for scroll messages to bottom automatically
function scrollToBottom() {
  messageContainer.scrollTop = messageContainer.scrollHeight;
}