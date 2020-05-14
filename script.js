const main = document.getElementById("main");
const voicesSelect = document.getElementById("voices");
const textares = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/pic1.jpg",
    text: "I'm happy",
  },
  {
    image: "./img/pic2.jpg",
    text: "I'm cunfused",
  },
  {
    image: "./img/pic3.jpg",
    text: "I'm very happy",
  },
  {
    image: "./img/pic4.jpg",
    text: "I'm scared a bit",
  },
  {
    image: "./img/pic5.jpg",
    text: "I'm angry",
  },
  {
    image: "./img/pic6.jpg",
    text: "I'm not pleased",
  },
  {
    image: "./img/pic7.jpg",
    text: "I'm playful",
  },
  {
    image: "./img/pic8.jpg",
    text: "I'm peaceful",
  },
];

data.forEach(createBox);

function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;
  box.classList.add("box");
  box.innerHTML = `<img src=${image} alt="${text}" />
                <p class="info">${text}</p>
  `;
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });
  main.appendChild(box);
}
const message = new SpeechSynthesisUtterance();

let voices = [];
function getVoices() {
  voices = speechSynthesis.getVoices();
  console.log("voices", voices);
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
  console.log("message.voice", message.voice);
}

speechSynthesis.addEventListener("voiceschanged", getVoices);

toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

voicesSelect.addEventListener("change", setVoice);

readBtn.addEventListener("click", () => {
  setTextMessage(textares.value);
  speakText();
});

getVoices();
