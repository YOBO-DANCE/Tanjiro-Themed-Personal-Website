// HAMBURGER MENU
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

// Custom Cursor
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from("#WhoAmI .right_text_box", {
    scrollTrigger: {
      trigger: "#WhoAmI",
      start: "top 75%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power3.out",
    clearProps: "all" 
  });

  gsap.from("#WhoAmI .left_text_box", {
    scrollTrigger: {
      trigger: "#WhoAmI",
      start: "top 75%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 1.2,
    delay: 0.8, 
    ease: "power3.out",
    clearProps: "all" 
  });
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


// Vertical Scroll for Sword Rack
const container = document.querySelector('.swords-container');
const statFormTag = document.getElementById('stat-form');
const statTitle = document.getElementById('stat-title');
const statDesc = document.getElementById('stat-desc');

container.addEventListener('wheel', (event) => {
  if (event.deltaY !== 0) {
    event.preventDefault();
    container.scrollLeft += event.deltaY * 1.2; 
  }
}, { passive: false });

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
