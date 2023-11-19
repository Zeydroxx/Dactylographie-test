const paragraphs = [
  "Dans une forêt enchantée, une petite fée découvre une fleur magique. Chaque pétale renferme un vœu. Elle les utilise pour répandre la joie parmi les animaux de la forêt, transformant leur quotidien en une aventure étincelante.",
  "Dans un jardin secret, une plante rare fleurit une fois par siècle. Quiconque la voit est transporté dans un rêve féérique. Une jeune fille chanceuse découvre la plante et vit une journée magique où tous ses souhaits deviennent réalité.",
  "Sur une île lointaine, un explorateur découvre un trésor mystérieux. Chaque pièce émet une lueur douce et exauce un souhait. Il choisit la simplicité, souhaitant le bonheur pour tous. L'île devient alors un havre de paix.",
  "Au cœur de la ville, un musicien de rue jouait une mélodie enchanteresse. Les passants stressés ralentissaient, captivés par la musique. Bientôt, une foule joyeuse se formait, transformant la rue en une scène de bonheur spontané.",
  "Sur une île lointaine, un explorateur découvre un trésor mystérieux. Chaque pièce émet une lueur douce et exauce un souhait. Il choisit la simplicité, souhaitant le bonheur pour tous. L'île devient alors un havre de paix.",
  "Dans une forêt enchantée, une petite fée découvre une fleur magique. Chaque pétale renferme un vœu. Elle les utilise pour répandre la joie parmi les habitants de la forêt, transformant leur quotidien en une aventure étincelante.",
  "Sous un ciel étoilé, deux étrangers partagent un regard complice dans un café. Sans mots, une connexion spéciale les enveloppe. Ils décident de s'aventurer ensemble dans la nuit, découvrant une ville endormie pleine de mystères, transformant une simple rencontre en une aventure inattendue.",
  "Sur la plage, un enfant trouve une bouteille renfermant une carte au trésor. Intrigué, il se lance dans une chasse au trésor excitante. À mesure qu'il suit les indices, il découvre non seulement un coffre rempli de souvenirs, mais aussi une leçon précieuse sur la magie de l'imagination.",
  "Une vieille librairie cache un passage secret menant à un monde fantastique. Un lecteur passionné découvre ce portail enchanté et se retrouve au milieu d'une aventure extraordinaire. Les personnages des livres prennent vie, créant un récit interactif où l'imagination devient réalité.",
  "Dans une petite ville, un artiste de rue peint des œuvres colorées sur des murs gris. Chaque tableau raconte une histoire différente. Les habitants, touchés par la créativité, commencent à interagir avec les peintures, transformant la rue en une galerie vivante où l'art devient une célébration communautaire."
];

const root = document.getElementById("teext");
const restart = document.getElementById("reest");
const txt = document.getElementById("txt");
const textinput = document.getElementById("texinput");
const timer = document.getElementById("timer");
let isTyping = false;
let currentParagraph;
let paragraphArray;
let startTime;
let endTime;
let elapsedTime;
let minutes;
let seconds;
let milliseconds;
let interval;

function refresh() {
  currentParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  paragraphArray = currentParagraph.split("");
  root.innerHTML = '';

  paragraphArray.forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    root.appendChild(characterSpan);
  });

  txt.value = '';
  textinput.classList.add('texinput');
  textinput.classList.remove('incorrect', 'correct', 'final');
  isTyping = false;
  milliseconds = 0;

  // Afficher le chronomètre à côté du texte
  timer.innerText = "00:00:00";
}

function refresh1() {
  location.reload();
}

function handleInput() {
  if (!isTyping) {
    isTyping = true;
    startTime = new Date();
    clearInterval(interval); // Arrêter l'ancien intervalle
    interval = setInterval(updateTime, 10);
  }

  checkInput();
}

function checkInput() {
  const inputArray = txt.value.split("");
  let isCorrect = true;

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] !== paragraphArray[i]) {
      isCorrect = false;
      break;
    }
  }

  if (isCorrect) {
    textinput.classList.add("correct");
    textinput.classList.remove("incorrect", "texinput");
  } else {
    textinput.classList.add("incorrect");
    textinput.classList.remove("correct", "texinput");
  }

  updateStyles();
}

function updateStyles() {
  const spanElements = root.querySelectorAll('span');

  spanElements.forEach((characterSpan, index) => {
    const userChar = txt.value[index];

    if (userChar == null) {
      characterSpan.classList.remove('correctpara', 'incorrectpara');
    } else if (userChar === characterSpan.innerText) {
      characterSpan.classList.add('correctpara');
      characterSpan.classList.remove('incorrectpara');
    } else {
      characterSpan.classList.remove('correctpara');
      characterSpan.classList.add('incorrectpara');
    }
  });

  if (txt.value.length === paragraphArray.length && txt.value === currentParagraph) {
    textinput.classList.remove("correct", "incorrect", "texinput");
    textinput.classList.add("final");
    clearInterval(interval);
    txt.setAttribute("readonly", "");

    setInterval(toggleTimerDisplay, 500);
  }
}

function toggleTimerDisplay() {
  if (!timer.hasAttribute("style")) {
    timer.setAttribute("style", "visibility:hidden;");
  } else {
    timer.removeAttribute("style");
  }
}

function padValue(value) {
  const stringValue = value + "";

  if (stringValue.length < 2) {
    return "0" + stringValue;
  } else {
    return stringValue;
  }
}

function updateTime() {
  endTime = new Date();
  elapsedTime = endTime - startTime;
  minutes = Math.floor(elapsedTime / 60000);
  seconds = Math.floor((elapsedTime - minutes * 60000) / 1000);
  milliseconds = Math.floor(elapsedTime % 1000 / 10); // Afficher les deux premiers chiffres des millisecondes

  timer.innerText = padValue(minutes) + ':' + padValue(seconds) + ':' + padValue(milliseconds);
}

refresh();
restart.addEventListener("click", refresh1, true);
txt.addEventListener("input", handleInput, false);
