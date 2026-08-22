/* =========================================================
   0. CONFIG — edit these to personalize the page
   ========================================================= */
const CONFIG = {
  password: "valencia",           // password for the gate (case-insensitive)
  recipientName: "valencia",           // shown on the finale scene
  senderName: "Nandha Kumar",               // shown as the letter signature
  letterText:
    "I honestly don't know how to put into words how special you are to me. " + "We started as strangers, but somehow, over time, we built an unforgettable " + "bond. We spent so many days together, sharing countless laughs, random " + "conversations, silly moments, and beautiful memories. You came into my " + "life as a stranger, but became my sister and one of the most special " + "people in my life. " + "You may not share the same blood as me, but you are my sister, and that " + "means no less to me. You've brought so much happiness into my life, and " + "I'm truly grateful for every moment we've shared. " + "No matter where life takes us, you'll always have a special place in my " + "heart. I'll always support you, care for you, and cheer for you. ❤️ " + "Happy Birthday to my sister — not by blood, but by an unforgettable bond. 🫂❤️",
};

/* =========================================================
   1. GRAB ELEMENTS
   ========================================================= */
const scenes = document.querySelectorAll(".scene");
const starsLayer = document.getElementById("starsLayer");
const confettiCanvas = document.getElementById("confetti-canvas");
const ctx = confettiCanvas.getContext("2d");

/* =========================================================
   2. SCENE NAVIGATION
   Shows exactly one <section class="scene" data-scene="..."> at a time.
   ========================================================= */
function goToScene(name) {
  scenes.forEach((scene) => {
    scene.classList.toggle("active", scene.dataset.scene === name);
  });
}

/* =========================================================
   3. DECORATIVE TWINKLING STARS
   ========================================================= */
function createStars(count = 18) {
  const symbols = ["⭐", "✨", "🌟"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "star-deco";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${Math.random() * 100}vw`;
    el.style.top = `${Math.random() * 100}vh`;
    el.style.animationDelay = `${Math.random() * 3}s`;
    el.style.fontSize = `${Math.random() * 0.8 + 0.8}rem`;
    starsLayer.appendChild(el);
  }
}
createStars();

/* =========================================================
   4. SCENE 1 — PASSWORD GATE
   ========================================================= */
document.getElementById("passwordHint").textContent = CONFIG.password;

const passwordInput = document.getElementById("passwordInput");
const robotCheck = document.getElementById("robotCheck");
const continueBtn = document.getElementById("continueBtn");
const passwordError = document.getElementById("passwordError");

continueBtn.addEventListener("click", () => {
  const isCorrect =
    passwordInput.value.trim().toLowerCase() === CONFIG.password.toLowerCase();

  if (isCorrect && robotCheck.checked) {
    goToScene("ask");
  } else {
    passwordError.classList.add("show");
    continueBtn.classList.add("shake");
    setTimeout(() => continueBtn.classList.remove("shake"), 400);
  }
});

// Let Enter key submit the password too
passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") continueBtn.click();
});

/* =========================================================
   5. SCENE 2/3/4 — Yes / No / Go back / Click flow
   ========================================================= */
document.getElementById("yesBtn").addEventListener("click", () => goToScene("goodgirl"));
document.getElementById("noBtn").addEventListener("click", () => goToScene("angry"));
document.getElementById("goBackBtn").addEventListener("click", () => goToScene("ask"));
document.getElementById("clickBtn").addEventListener("click", () => {
  goToScene("bday");
  buildCollageTitle();
});

/* =========================================================
   6. SCENE 5 — Happy Birthday collage title
   Builds "HaPPYy BiRthdAy" with each letter in a random pastel
   color and slight rotation, like a cut-out paper collage.
   ========================================================= */
function buildCollageTitle() {
  const titleEl = document.getElementById("collageTitle");
  if (!titleEl || titleEl.dataset.built) return; // only build once
  titleEl.dataset.built = "true";

  const text = "Happy Birthday!";
  const colors = ["#8b7ff0", "#f4c860", "#f6a6c1", "#6c5fd8", "#e0567a"];

  titleEl.innerHTML = "";
  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.color = colors[i % colors.length];
    span.style.transform = `rotate(${(i % 2 === 0 ? -1 : 1) * (Math.random() * 8 + 3)}deg)`;
    titleEl.appendChild(span);
  });
}

document.getElementById("toMenuBtn").addEventListener("click", () => goToScene("menu"));

/* =========================================================
   7. SCENE 6 — Menu: click each item to open its modal
   ========================================================= */
const modalOverlay = document.getElementById("modalOverlay");
const modals = {
  memories: document.getElementById("memoriesModal"),
  letter: document.getElementById("letterModal"),
  song: document.getElementById("songModal"),
};
const openedItems = { memories: false, letter: false, song: false };
const toFinaleBtn = document.getElementById("toFinaleBtn");
const menuHint = document.getElementById("menuHint");

// Fill in the letter text & signature from CONFIG
document.getElementById("letterText").textContent = CONFIG.letterText;
document.getElementById("letterSignature").textContent = CONFIG.senderName;
document.getElementById("finaleName").textContent = CONFIG.recipientName;

function openModal(key) {
  Object.values(modals).forEach((m) => m.classList.remove("show"));
  modals[key].classList.add("show");
  modalOverlay.classList.add("active");

  if (!openedItems[key]) {
    openedItems[key] = true;
    const badge = document.querySelector(`.check-badge[data-check="${key}"]`);
    if (badge) badge.classList.add("show");
    checkAllOpened();
  }
}

function closeModal() {
  modalOverlay.classList.remove("active");
}

document.getElementById("openMemories").addEventListener("click", () => openModal("memories"));
document.getElementById("openLetter").addEventListener("click", () => openModal("letter"));
document.getElementById("openSong").addEventListener("click", () => openModal("song"));

document.querySelectorAll("[data-close]").forEach((btn) =>
  btn.addEventListener("click", closeModal)
);

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) closeModal();
});

function checkAllOpened() {
  const allOpened = Object.values(openedItems).every(Boolean);
  if (allOpened) {
    menuHint.textContent = "all unlocked! tap Next 💛";
  }
}

toFinaleBtn.addEventListener("click", () => {
  const allOpened = Object.values(openedItems).every(Boolean);
  if (!allOpened) {
    menuHint.classList.add("shake");
    setTimeout(() => menuHint.classList.remove("shake"), 400);
    return;
  }
  goToScene("finale");
  launchConfetti();
});

/* =========================================================
   8. SCENE 7 — Finale / Replay
   ========================================================= */
document.getElementById("replayBtn").addEventListener("click", () => {
  // reset state so a second run behaves correctly
  passwordInput.value = "";
  robotCheck.checked = false;
  passwordError.classList.remove("show");
  Object.keys(openedItems).forEach((k) => (openedItems[k] = false));
  document.querySelectorAll(".check-badge").forEach((b) => b.classList.remove("show"));
  menuHint.textContent = "open all three to unlock the next surprise 💛";
  goToScene("password");
});

/* =========================================================
   9. CONFETTI ANIMATION (canvas-based, dependency-free)
   ========================================================= */
function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const confettiColors = ["#8b7ff0", "#f4c860", "#f6a6c1", "#6c5fd8", "#ffffff"];
let confettiPieces = [];
let confettiAnimId = null;

class ConfettiPiece {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = -20 - Math.random() * confettiCanvas.height * 0.3;
    this.size = Math.random() * 8 + 6;
    this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    this.speedY = Math.random() * 3 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 8 - 4;
    this.opacity = 1;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;
    if (this.y > confettiCanvas.height * 0.75) this.opacity -= 0.02;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = Math.max(this.opacity, 0);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
    ctx.restore();
  }
}

function launchConfetti() {
  for (let i = 0; i < 140; i++) confettiPieces.push(new ConfettiPiece());
  if (!confettiAnimId) animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach((p) => { p.update(); p.draw(); });
  confettiPieces = confettiPieces.filter(
    (p) => p.y < confettiCanvas.height + 30 && p.opacity > 0
  );
  if (confettiPieces.length > 0) {
    confettiAnimId = requestAnimationFrame(animateConfetti);
  } else {
    cancelAnimationFrame(confettiAnimId);
    confettiAnimId = null;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}
