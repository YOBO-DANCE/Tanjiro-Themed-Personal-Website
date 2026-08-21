// --- HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// --- GSAP & CANVAS SETUP ---
gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("animation-canvas");
const context = canvas.getContext("2d");

const frameCount = 300; 
const animationState = { frame: 0 }; 

// Arrays to cache preloaded images
const landscapeImages = [];
const portraitImages = [];

// Helper to determine active screen orientation
const isPortrait = () => window.innerHeight > window.innerWidth;

// Return base aspect ratio resolution depending on orientation
function getBaseDimensions() {
  return isPortrait() 
    ? { width: 1080, height: 1920 }  // Portrait base resolution
    : { width: 1920, height: 1080 }; // Landscape base resolution
}

// --- PRELOAD BOTH LANDSCAPE & PORTRAIT FRAMES ---
function preloadImages() {
  for (let i = 1; i <= frameCount; i++) {
    const formattedIndex = i.toString().padStart(3, '0');

    // Preload Landscape Frame (Root ./images/ folder)
    const imgLand = new Image();
    imgLand.src = `./images/ezgif-frame-${formattedIndex}.png`;
    landscapeImages.push(imgLand);

    // Preload Portrait Frame (./images/portrait/ folder)
    const imgPort = new Image();
    imgPort.src = `./images/portrait/ezgif-frame-${formattedIndex}.png`;
    portraitImages.push(imgPort);
  }
}

// --- RENDER CURRENT FRAME ---
function render() {
  const activeImages = isPortrait() ? portraitImages : landscapeImages;
  const img = activeImages[animationState.frame];

  // Prevent drawing if frame isn't ready
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  context.clearRect(0, 0, rect.width, rect.height);

  const { width: baseWidth, height: baseHeight } = getBaseDimensions();
  const imageRatio = baseWidth / baseHeight;
  const canvasRatio = rect.width / rect.height;

  let renderWidth, renderHeight, xOffset, yOffset;

  // Object-fit: COVER math (Edge-to-edge rendering without black bars)
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

// --- RESPONSIVE CANVAS SCALING FOR HIGH-DPI DISPLAYS ---
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1; 
  const rect = canvas.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) return;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  // Reset transform matrix to prevent scale stacking on resize
  context.setTransform(1, 0, 0, 1, 0, 0); 
  context.scale(dpr, dpr);

  render();
}

// --- INITIALIZE & LISTENERS ---
preloadImages();

// Initial frame drawing once frame 1 is ready
landscapeImages[0].onload = () => resizeCanvas();
portraitImages[0].onload = () => resizeCanvas();

// Fallback in case images are cached
if (landscapeImages[0].complete || portraitImages[0].complete) {
  resizeCanvas();
}

window.addEventListener("resize", resizeCanvas);

// --- GSAP SCROLL ANIMATION TRACKER ---
gsap.to(animationState, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: ".scroll-wrapper",
    start: "top top",
    end: () => window.innerWidth < 768 ? "+=3000" : "+=6000",
    scrub: 0.5,
    pin: true,
    invalidateOnRefresh: true
  },
  onUpdate: render
});