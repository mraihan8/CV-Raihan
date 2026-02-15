const html = document.documentElement;

// Auto detect theme
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme) {
  html.setAttribute("data-bs-theme", savedTheme);
} else {
  html.setAttribute("data-bs-theme", prefersDark ? "dark" : "light");
}

// Toggle
document.getElementById("lightMode").onclick = () => {
  html.setAttribute("data-bs-theme", "light");
  localStorage.setItem("theme", "light");
};

document.getElementById("darkMode").onclick = () => {
  html.setAttribute("data-bs-theme", "dark");
  localStorage.setItem("theme", "dark");
};

// Download Counter
let count = localStorage.getItem("downloadCount") || 0;
document.getElementById("downloadCount").innerText = count;

document.getElementById("downloadBtn").addEventListener("click", () => {
  count++;
  localStorage.setItem("downloadCount", count);
  document.getElementById("downloadCount").innerText = count;

  // DIRECT DOWNLOAD FIX
  const link = document.createElement("a");
  link.href = "cv.pdf";
  link.download = "CV-Raihan.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Preview Modal
const modal = new bootstrap.Modal(document.getElementById("cvModal"));

document.getElementById("previewBtn").addEventListener("click", () => {
  modal.show();
});
