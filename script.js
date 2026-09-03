// --- HAMBURGER MENU ---
const hamburger = document.getElementById("hamburger-btn");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
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
    const formattedIndex = i.toString().padStart(3, "0");

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
    end: () => (window.innerWidth < 768 ? "+=3000" : "+=6000"),
    scrub: 0.5,
    pin: true,
    invalidateOnRefresh: true,
  },
  onUpdate: render,
});

gsap.to("body", {
  backgroundColor: "#12181b",
  scrollTrigger: {
    trigger: "#bio",
    start: "top 80%",
    end: "top 20%",
    scrub: true,
  },
});

// Section 4 Swords and Stats Code
document.querySelectorAll(".sword-slot").forEach((slot) => {
  slot.addEventListener("click", () => {
    const type = slot.getAttribute("data-type");
    const interest = slot.getAttribute("data-interest");
    const form = slot.getAttribute("data-form");

    const formTag = document.getElementById("stat-form");
    const title = document.getElementById("stat-title");
    const container = document.getElementById("stat-desc-container");

    formTag.innerText = form;
    title.innerText = interest;

    if (type === "author") {
      const stats = slot.getAttribute("data-stats");
      const link = slot.getAttribute("data-link");
      container.innerHTML = `
          <p>${stats}</p>
          <a href="${link}" target="_blank" rel="noopener noreferrer" class="book-btn">
            📖 Read 'The Midnight Hunger Vol. 1'
          </a>
        `;
    } else if (type === "singing") {
      const songs = JSON.parse(slot.getAttribute("data-songs"));
      const songItems = songs
        .map(
          (song) =>
            `<li>
            <a href="${song.url}" target="_blank" rel="noopener noreferrer" class="song-link">
              ▶ ${song.title} <span style="opacity:0.7;">(${song.artist})</span>
            </a>
          </li>`,
        )
        .join("");

      container.innerHTML = `
          <p>Click any song to listen on YouTube:</p>
          <ul class="song-list">${songItems}</ul>
        `;
    } else {
      const stats = slot.getAttribute("data-stats");
      container.innerHTML = `<p>${stats}</p>`;
    }

    // Small visual pop effect on update
    const modal = document.getElementById("sword-stats-modal");
    modal.style.transform = "scale(1.02)";
    setTimeout(() => {
      modal.style.transform = "scale(1)";
    }, 150);
  });
});



const container = document.querySelector('.swords-container');
const statFormTag = document.getElementById('stat-form');
const statTitle = document.getElementById('stat-title');
const statDesc = document.getElementById('stat-desc');

// Translate vertical wheel scroll inputs into horizontal row panning instantly
container.addEventListener('wheel', (event) => {
  if (event.deltaY !== 0) {
    event.preventDefault(); // Stop window block bounce
    
    // Nudges coordinates instantly. Multiplied by 1.2 for comfortable travel speed.
    container.scrollLeft += event.deltaY * 1.2; 
  }
}, { passive: false });

// Update stats modal card text nodes dynamically when slots are clicked
document.querySelectorAll('.sword-slot').forEach(slot => {
  slot.addEventListener('click', () => {
    const form = slot.getAttribute('data-form');
    const interest = slot.getAttribute('data-interest');
    const stats = slot.getAttribute('data-stats');
    
    if (form) statFormTag.textContent = form;
    if (interest) statTitle.textContent = interest;
    if (stats) statDesc.textContent = stats;
  });
});
