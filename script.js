const correctPassword = "17.05";
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiParticles = [];
let animationFrame;

function typeWriter(element, text, speed = 50, callback) {
  let i = 0;
  element.textContent = "";

  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else {
      if (callback) callback();
    }
  }

  typing();
}

function checkPassword() {
  const input = document.getElementById('password').value.trim();
  const errorDiv = document.getElementById('error-message');
  const finalMessageDiv = document.getElementById('final-message');

  if (input === correctPassword) {
    errorDiv.textContent = "";

    // Gizle form ve başlıklar
    document.querySelector("h1").style.display = "none";
    document.querySelector("p").style.display = "none";
    document.getElementById('form').style.display = "none";

    // Göster mesaj alanı (boş başlat)
    finalMessageDiv.style.display = "block";
    finalMessageDiv.textContent = "";

    // Konfeti başlat
    startConfetti();

    // Yazıyı teker teker yaz
    const message = "🎊Salam dayı bugün senin üçün bir sayt düzeltdim. Ad günüvü tebrik eliyirem neçe bele illere çıxasan Allah hemişe yoluvu açıq elesin hemişe elive ne istiyirsen keçsin. Allah balavıda saxlasın dayı neçe gözel illere sağlam çıxasan hemişe :)🎊";

    typeWriter(finalMessageDiv, message, 50, () => {
      setTimeout(() => {
        stopConfetti();
      }, 10000);
    });

  } else {
    errorDiv.textContent = "MEZELENME ÖZ DOĞUM TARİXİVİ BİLMİRSEN?";
  }
}

// Konfeti oluşturma
function createConfetti() {
  for (let i = 0; i < 100; i++) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 4,
      c: `hsl(${Math.random() * 360}, 100%, 50%)`,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 3 + 1
    });
  }
}

// Konfeti çizme
function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiParticles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });
}

// Konfeti animasyonunu başlat
function startConfetti() {
  createConfetti();
  function animate() {
    drawConfetti();
    animationFrame = requestAnimationFrame(animate);
  }
  animate();
}

// Konfeti durdur
function stopConfetti() {
  cancelAnimationFrame(animationFrame);
  confettiParticles = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
