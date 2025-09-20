export function initJellyfish(canvas) {
  const ctx = canvas.getContext("2d");
  let jellyfish = [];
  const numJellyfish = 14;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  for (let i = 0; i < numJellyfish; i++) {
    jellyfish.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      baseRadius: 30 + Math.random() * 70,
      speedY: 0.3 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
      phase: Math.random() * 1000,
    });
  }

  const drawJellyfish = (j, t) => {
  // --- Pulsing glowing body ---
  const pulse = Math.sin((t / 30) + j.phase) * 4;
  const radius = j.baseRadius + pulse;
  const baseRadius = j.baseRadius;

  const gradient = ctx.createRadialGradient(
    j.x, j.y, radius * 0.1,
    j.x, j.y, radius * 1.3
  );
  gradient.addColorStop(0, "rgba(0,255,255,1)");
  gradient.addColorStop(0.4, "rgba(120,0,255,0.5)");
  gradient.addColorStop(1, "rgba(255,0,180,0.05)");


  ctx.fillStyle = gradient;
  ctx.beginPath();
  
  // --- Draw jellyfish head as hourglass / lobed shape ---
const points = 36;
for (let i = 0; i <= points; i++) {
  const angle = (i / points) * Math.PI * 2;

  // --- Create hourglass / sand-timer shape ---
  // Cosine to squeeze the middle vertically
  const verticalSqueeze = Math.cos(angle * 2) * 0.5 + 0.5; // 0→1→0
  let r = baseRadius * (0.7 + verticalSqueeze * 0.6);

  // --- Pulse + wobble ---
  r += Math.sin(angle * 5 + t / 20 + j.phase) * 4;

  // --- Random asymmetric lobes ---
  const lobe = Math.sin(angle * 3 + t / 20 + j.phase) * 4;
  r += lobe;

  const x = j.x + r * Math.cos(angle);
  const y = j.y + r * Math.sin(angle);

  if (i === 0) ctx.moveTo(x, y);
  else ctx.lineTo(x, y);
}
ctx.closePath();
ctx.globalAlpha = j.opacity;
ctx.fill();


  // --- Tentacles ---
  const numTentacles = 14;
  const length = 220;
  const spreadStrength = 0.95; // how wide they spread from head

  for (let k = 0; k < numTentacles; k++) {
    ctx.beginPath();

    const startX = j.x;
    const startY = j.y + radius * 0.2;
    ctx.moveTo(startX, startY);

    const tentacleGradient = ctx.createLinearGradient(startX, startY, startX, startY + length);
    tentacleGradient.addColorStop(0, "rgba(255,255,255,0)");
    tentacleGradient.addColorStop(0.2, "rgba(0,200,255,0.6)");
    tentacleGradient.addColorStop(0.6, "rgba(120,0,255,0.5)");
    tentacleGradient.addColorStop(1, "rgba(255,0,180,0.2)");

    ctx.strokeStyle = tentacleGradient;
    ctx.lineWidth = 1.2;

    for (let s = 0; s <= length; s += 8) {
      // --- hourglass spread factor ---
      const hourglass = Math.sin((s / length) * Math.PI); // 0→1→0 pattern
      const spread = (k - numTentacles / 2) * hourglass * spreadStrength * (s / 20);

      // --- wavy motion ---
      const wave = Math.sin((s / 25) + (t / 40) + j.phase + k) * (8 + s / 30);

      // final position
      const px = startX + spread + wave * 0.4;
      const py = startY + s;

      ctx.lineTo(px, py);
    }

    ctx.stroke();
  }
};

  const updateJellyfish = () => {
    jellyfish.forEach((j) => {
      j.y -= j.speedY; // float upward
      j.angle += 0.01;
      j.x += Math.sin(j.angle) * 0.3;

      const fadeStart = 30;
      if (j.y < fadeStart){
        j.opacity = Math.max(0, j.y / fadeStart);
      } else {
        j.opacity = 1;
      }

      if (j.y + j.baseRadius < 0) {
        j.y = canvas.height + j.baseRadius;
        j.x = Math.random() * canvas.width;
        j.opacity = 1;
      }
    });
  };

  let tick = 0;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    jellyfish.forEach((j) => drawJellyfish(j, tick));
    updateJellyfish();
    tick++;
    requestAnimationFrame(animate);
  };

  animate();
}
