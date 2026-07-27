// 1. Hiệu ứng làm mượt chuyển đổi Active trạng thái Menu khi cuộn trang
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href").includes(current)) {
      a.classList.add("active");
    }
  });
});

// 2. Kích hoạt hiệu ứng chạy Thanh Kỹ Năng (Skill Bars)
const skillsSection = document.getElementById("skills");
const progressBars = document.querySelectorAll(".skill-bar-fill");

function showProgress() {
  progressBars.forEach((progressBar) => {
    const value = progressBar.getAttribute("data-percent");
    progressBar.style.width = value;
  });
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showProgress();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

observer.observe(skillsSection);

// 3. Xử lý bộ lọc dự án (Project Grid Filter)
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");

    const filterValue = e.target.getAttribute("data-filter");

    projectCards.forEach((card) => {
      if (
        filterValue === "all" ||
        card.getAttribute("data-tech") === filterValue
      ) {
        card.style.display = "flex";
        card.style.animation = "fadeIn 0.5s ease forwards";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// song ngu
document.addEventListener("DOMContentLoaded", () => {
  const btnVi = document.getElementById("lang-vi");
  const btnEn = document.getElementById("lang-en");

  // Hàm chuyển đổi ngôn ngữ
  const setLanguage = (lang) => {
    // Cập nhật thuộc tính lang của thẻ html
    document.documentElement.lang = lang;

    // Tìm tất cả các phần tử có thuộc tính data-vi hoặc data-en
    const translatableElements = document.querySelectorAll(
      "[data-vi], [data-en]",
    );

    translatableElements.forEach((el) => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        el.innerHTML = text;
      }
    });

    // Cập nhật trạng thái Active của các nút
    if (lang === "en") {
      btnEn.classList.add("active");
      btnVi.classList.remove("active");
    } else {
      btnVi.classList.add("active");
      btnEn.classList.remove("active");
    }

    // Lưu lựa chọn vào localStorage
    localStorage.setItem("preferred_lang", lang);
  };

  // Lắng nghe sự kiện click nút
  if (btnVi && btnEn) {
    btnVi.addEventListener("click", () => setLanguage("vi"));
    btnEn.addEventListener("click", () => setLanguage("en"));
  }

  // Khởi tạo ngôn ngữ ban đầu (ưu tiên localStorage, mặc định là 'vi')
  const savedLang = localStorage.getItem("preferred_lang") || "vi";
  setLanguage(savedLang);
});
