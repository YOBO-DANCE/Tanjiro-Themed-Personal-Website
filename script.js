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

const landscapeImages = [];
const portraitImages = [];
const isPortrait = () => window.innerHeight > window.innerWidth;

function getBaseDimensions() {
  return isPortrait() 
    ? { width: 1080, height: 1920 }  
    : { width: 1920, height: 1080 };
}

function preloadImages() {
  for (let i = 1; i <= frameCount; i++) {
    const formattedIndex = i.toString().padStart(3, '0');

    const imgLand = new Image();
    imgLand.src = `./images/ezgif-frame-${formattedIndex}.png`;
    landscapeImages.push(imgLand);

    const imgPort = new Image();
    imgPort.src = `./images/portrait/ezgif-frame-${formattedIndex}.png`;
    portraitImages.push(imgPort);
  }
}

function render() {
  const activeImages = isPortrait() ? portraitImages : landscapeImages;
  const img = activeImages[animationState.frame];

  if (!img || !img.complete || img.naturalWidth === 0) return;

  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  context.clearRect(0, 0, rect.width, rect.height);

  const { width: baseWidth, height: baseHeight } = getBaseDimensions();
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

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1; 
  const rect = canvas.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) return;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  context.setTransform(1, 0, 0, 1, 0, 0); 
  context.scale(dpr, dpr);

  render();
}

preloadImages();

landscapeImages[0].onload = () => resizeCanvas();
portraitImages[0].onload = () => resizeCanvas();

if (landscapeImages[0].complete || portraitImages[0].complete) {
  resizeCanvas();
}

window.addEventListener("resize", resizeCanvas);

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

gsap.to("body", {
  backgroundColor: "#12181b",
  scrollTrigger: {
    trigger: "#bio",
    start: "top 80%",
    end: "top 20%",
    scrub: true
  }
});