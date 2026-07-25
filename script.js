// Hiệu ứng chuột đi theo
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Hiệu ứng xuất hiện khi cuộn (ScrollReveal)
ScrollReveal().reveal(".hero-content", {
  delay: 200,
  origin: "bottom",
  distance: "50px",
});
ScrollReveal().reveal(".project-card", {
  interval: 200,
  origin: "right",
  distance: "100px",
});
ScrollReveal().reveal(".skill-box", { interval: 100, scale: 0.5 });

// Hiệu ứng Hover card
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(3)";
    cursor.style.backgroundColor = "rgba(0, 242, 255, 0.1)";
  });
  card.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    cursor.style.backgroundColor = "transparent";
  });
});

// Giả lập đồng hồ Uptime của hệ thống
function updateUptime() {
  const start = new Date("2021-09-01").getTime(); // Giả định ngày bắt đầu sự nghiệp
  setInterval(() => {
    const now = new Date().getTime();
    const diff = now - start;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("uptime").innerText =
      `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, 1000);
}

// Hiệu ứng Fade-in khi scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".case-study, .layer-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.6s ease-out";
  observer.observe(el);
});

updateUptime();
