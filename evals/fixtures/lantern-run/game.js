// Lantern Run: move through a dark cave, drop lanterns to see, and manage oil.
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const oilLabel = document.getElementById('oil');
const oilWarning = document.getElementById('oilWarning');

const MOVE_SPEED = 160;        // pixels per second
const OIL_PER_SECOND = 3;      // drained while moving
const OIL_PER_LANTERN = 15;
const LANTERN_RADIUS = 90;
const PLAYER_LIGHT = 36;

let state;
const keys = new Set();

function reset() {
  state = { x: 80, y: 280, oil: 100, lanterns: [], running: false, over: false };
  oilWarning.style.display = 'none';
}

function show(id, visible) {
  document.getElementById(id).style.display = visible ? 'block' : 'none';
}

window.addEventListener('keydown', (e) => {
  if (['Space', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) e.preventDefault();
  keys.add(e.code);
  if (e.code === 'Space' && state.running && state.oil >= OIL_PER_LANTERN) {
    state.lanterns.push({ x: state.x, y: state.y });
    state.oil -= OIL_PER_LANTERN;
  }
});
window.addEventListener('keyup', (e) => keys.delete(e.code));

document.getElementById('start').addEventListener('click', () => {
  show('title', false);
  show('tip', false);
  state.running = true;
});
document.getElementById('retry').addEventListener('click', () => {
  reset();
  show('gameover', false);
  state.running = true;
});

let last = performance.now();
function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  if (state.running) update(dt);
  draw();
  requestAnimationFrame(frame);
}

function update(dt) {
  let dx = 0, dy = 0;
  if (keys.has('KeyW')) dy -= 1;
  if (keys.has('KeyS')) dy += 1;
  if (keys.has('KeyA')) dx -= 1;
  if (keys.has('KeyD')) dx += 1;
  if (dx || dy) {
    const len = Math.hypot(dx, dy);
    state.x = Math.max(10, Math.min(canvas.width - 10, state.x + (dx / len) * MOVE_SPEED * dt));
    state.y = Math.max(10, Math.min(canvas.height - 10, state.y + (dy / len) * MOVE_SPEED * dt));
    state.oil -= OIL_PER_SECOND * dt;
  }
  if (state.oil <= 0) {
    state.oil = 0;
    state.running = false;
    show('gameover', true);
  }
  oilLabel.textContent = Math.ceil(state.oil);
  oilWarning.style.display = state.oil < 25 ? 'block' : 'none';
}

function draw() {
  ctx.fillStyle = '#05070a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'lighter';
  for (const l of state.lanterns) glow(l.x, l.y, LANTERN_RADIUS);
  glow(state.x, state.y, PLAYER_LIGHT);
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#f2d27a';
  ctx.fillRect(state.x - 6, state.y - 6, 12, 12);
}

function glow(x, y, r) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, 'rgba(255, 210, 120, 0.55)');
  g.addColorStop(1, 'rgba(255, 210, 120, 0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

reset();
requestAnimationFrame(frame);
