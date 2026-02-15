// AUTO DETECT DARK MODE
const html = document.documentElement;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

if (localStorage.getItem("theme")) {
  html.setAttribute("data-bs-theme", localStorage.getItem("theme"));
} else {
  html.setAttribute("data-bs-theme", prefersDark.matches ? "dark" : "light");
}

// TOGGLE
document.getElementById("lightMode").onclick = () => {
  html.setAttribute("data-bs-theme", "light");
  localStorage.setItem("theme", "light");
};

document.getElementById("darkMode").onclick = () => {
  html.setAttribute("data-bs-theme", "dark");
  localStorage.setItem("theme", "dark");
};

// DOWNLOAD COUNTER
let count = localStorage.getItem("downloadCount") || 0;
document.getElementById("downloadCount").innerText = count;

document.getElementById("downloadBtn").addEventListener("click", () => {
  count++;
  localStorage.setItem("downloadCount", count);
  document.getElementById("downloadCount").innerText = count;

  const link = document.createElement("a");
  link.href = "assets/cv/CV-Raihan.pdf";
  link.download = "CV-Raihan.pdf";
  link.click();
});

// PREVIEW MODAL
const modal = new bootstrap.Modal(document.getElementById('cvModal'));
document.getElementById("previewBtn").onclick = () => {
  modal.show();
};
