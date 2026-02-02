// Website Ucapan Ulang Tahun
// Untuk: DINDA ALYSSA LUSIDA PUTRI
// Lahir: 20 Februari 2005

const BIRTH = {
  day: 20,
  month: 2, // 1-12
  year: 2005
};

const $ = (id) => document.getElementById(id);

function pad2(n) {
  return String(n).padStart(2, "0");
}

function nextBirthdayDate() {
  const now = new Date();
  const y = now.getFullYear();
  const thisYear = new Date(y, BIRTH.month - 1, BIRTH.day, 0, 0, 0);

  // kalau hari ini sudah lewat (atau tepat), pakai tahun depan
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(y + 1, BIRTH.month - 1, BIRTH.day, 0, 0, 0);
  }
  return thisYear;
}

function currentAge() {
  const now = new Date();
  let age = now.getFullYear() - BIRTH.year;

  const bThisYear = new Date(now.getFullYear(), BIRTH.month - 1, BIRTH.day, 0, 0, 0);
  if (now.getTime() < bThisYear.getTime()) age -= 1;
  return age;
}

function formatIndoDate(d) {
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

// ========== COUNTDOWN ==========
let target = nextBirthdayDate();

function tick() {
  const now = new Date();
  let diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    // tepat ulang tahun
    ["dd","hh","mm","ss"].forEach(id => { const el = $(id); if (el) el.textContent = "00"; });
    const t = $("targetText");
    if (t) t.textContent = "Hari ini ulang tahunnya! 🎉🎂";
    return;
  }

  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / (3600 * 24));
  const hours = Math.floor((totalSec % (3600 * 24)) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  const dd = $("dd"), hh = $("hh"), mm = $("mm"), ss = $("ss");
  if (dd) dd.textContent = pad2(days);
  if (hh) hh.textContent = pad2(hours);
  if (mm) mm.textContent = pad2(mins);
  if (ss) ss.textContent = pad2(secs);

  const t = $("targetText");
  if (t) t.textContent = `Menuju: ${formatIndoDate(target)} (00:00)`;
}

const ageEl = $("ageNow");
if (ageEl) ageEl.textContent = `${currentAge()} tahun`;

tick();
setInterval(tick, 1000);

// ========== MUSIC ==========
const audio = $("bgMusic");
const btn = $("musicBtn");
let playing = false;

if (audio && btn) {
  audio.volume = 0.8;

  btn.addEventListener("click", async () => {
    try {
      if (!playing) {
        await audio.play();
        playing = true;
        btn.textContent = "⏸️ Pause Musik";
      } else {
        audio.pause();
        playing = false;
        btn.textContent = "▶️ Putar Musik";
      }
    } catch (e) {
      alert("Musik belum bisa diputar. Pastikan file ada di assets/song.mp3 lalu coba lagi ya.");
    }
  });
}

// ========== CONFETTI (ringan, tanpa popup) ==========
const confBtn = $("confettiBtn");
if (confBtn) {
  confBtn.addEventListener("click", () => {
    // efek sederhana pakai emoji "jatuh" (tanpa canvas, aman)
    const count = 22;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.textContent = Math.random() > 0.5 ? "✨" : "🎉";
      s.style.position = "fixed";
      s.style.left = Math.floor(Math.random() * 100) + "vw";
      s.style.top = "-10px";
      s.style.fontSize = (18 + Math.random() * 18) + "px";
      s.style.zIndex = "9999";
      s.style.pointerEvents = "none";
      s.style.transition = "transform 1.2s linear, opacity 1.2s linear";
      document.body.appendChild(s);

      const drop = (window.innerHeight + 120) + Math.random() * 80;
      const drift = (Math.random() * 160 - 80);

      requestAnimationFrame(() => {
        s.style.transform = `translate(${drift}px, ${drop}px) rotate(${Math.random()*360}deg)`;
        s.style.opacity = "0";
      });

      setTimeout(() => s.remove(), 1400);
    }
  });
}
