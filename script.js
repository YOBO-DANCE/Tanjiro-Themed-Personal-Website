// Hamburger Menu
const hamburger = document.getElementById("hamburger-btn");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// GSAP & Scroll Animation
gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("animation-canvas");
const context = canvas.getContext("2d");

const baseWidth = 1920;
const baseHeight = 1080;

const frameCount = 300;
// Updated path with explicit ./
const currentFrame = (index) =>
  `./images/ezgif-frame-${index.toString().padStart(3, "0")}.png`;

const images = [];
const airpods = { frame: 0 };

// --- RENDER CURRENT FRAME ---
function render() {
  const img = images[airpods.frame];
  // Check if image exists AND has finished loading
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  context.clearRect(0, 0, rect.width, rect.height);

  const imageRatio = baseWidth / baseHeight;
  const canvasRatio = rect.width / rect.height;

  let renderWidth, renderHeight, xOffset, yOffset;

  if (canvasRatio > imageRatio) {
    renderWidth = rect.width;
    renderHeight = rect.width / imageRatio;
    xOffset = 0;
    yOffset = (rect.height - renderHeight) / 2;
  } else {
    renderHeight = rect.height;
    renderWidth = rect.height * imageRatio;
    xOffset = (rect.width - renderWidth) / 2;
    yOffset = 0;
  }

  context.drawImage(img, xOffset, yOffset, renderWidth, renderHeight);
}

// --- RESPONSIVE CANVAS SCALING ---
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) return;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  // Reset scale matrix before multiplying by DPR
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.scale(dpr, dpr);

  render();
}

// --- PRELOAD ASSETS SAFELY ---
let loadedCount = 0;

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i + 1);

  img.onload = () => {
    loadedCount++;
    // Draw initial frame as soon as frame 1 finishes loading
    if (i === 0) {
      resizeCanvas();
    }
  };

  images.push(img);
}

window.addEventListener("resize", resizeCanvas);

// --- GSAP SCROLLANIMATION TRACKER ---
gsap.to(airpods, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: ".scroll-wrapper",
    start: "top top",
    end: () => (window.innerWidth < 768 ? "+=3000" : "+=6000"),
    scrub: 0.5,
    pin: true,
    invalidateOnRefresh: true,
  },
  onUpdate: render,
});
