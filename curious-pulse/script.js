// Curious Pulse — original digital experience by eerrgin
// Particles + living clock + idea spark

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
const clockEl = document.getElementById('clock');
const dateEl = document.getElementById('date');
const sparkBtn = document.getElementById('spark');
const ideaEl = document.getElementById('idea');

let width, height;
let particles = [];
let mouse = { x: null, y: null, radius: 120 };

const ideas = [
  "What if silence had a color?",
  "Build something that feels alive.",
  "Code is just frozen curiosity.",
  "Every pixel is a decision.",
  "Ideas decay without motion.",
  "Stay unfinished on purpose.",
  "The best interfaces disappear.",
  "Curiosity is a renewable resource.",
  "Make it feel a little different.",
  "Reality is just compiled ideas.",
  "Less noise. More signal.",
  "The void is also a canvas."
];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initParticles();
}

function initParticles() {
  particles = [];
  const count = Math.floor((width * height) / 14000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.4 + 0.1
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);

  for (let p of particles) {
    // mouse interaction
    if (mouse.x !== null) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        p.vx += (dx / dist) * force * 0.6;
        p.vy += (dy / dist) * force * 0.6;
      }
    }

    p.x += p.vx;
    p.y += p.vy;

    // soft friction
    p.vx *= 0.98;
    p.vy *= 0.98;

    // wrap edges
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(196, 181, 160, ${p.alpha})`;
    ctx.fill();
  }

  // connect nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(196, 181, 160, ${0.08 * (1 - dist / 90)})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawParticles);
}

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  clockEl.textContent = `${h}:${m}:${s}`;

  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString('en-US', options);
}

function sparkIdea() {
  const idea = ideas[Math.floor(Math.random() * ideas.length)];
  ideaEl.textContent = idea;
  ideaEl.classList.remove('visible');
  // force reflow
  void ideaEl.offsetWidth;
  ideaEl.classList.add('visible');

  // small burst of particles near center
  for (let i = 0; i < 12; i++) {
    particles.push({
      x: width / 2 + (Math.random() - 0.5) * 40,
      y: height / 2 + (Math.random() - 0.5) * 40,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      size: Math.random() * 2 + 1,
      alpha: 0.7
    });
  }
  // keep particle count reasonable
  if (particles.length > 220) {
    particles.splice(0, particles.length - 180);
  }
}

// events
window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});
window.addEventListener('click', (e) => {
  // gentle push on click
  for (let p of particles) {
    const dx = p.x - e.clientX;
    const dy = p.y - e.clientY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 160) {
      const force = (160 - dist) / 160;
      p.vx += (dx / dist) * force * 2.2;
      p.vy += (dy / dist) * force * 2.2;
    }
  }
});

sparkBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  sparkIdea();
});

// init
resize();
updateClock();
setInterval(updateClock, 1000);
drawParticles();
