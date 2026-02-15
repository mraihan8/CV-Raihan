/* AUTO DETECT DEVICE MODE */
if(window.matchMedia('(prefers-color-scheme: light)').matches){
  document.documentElement.setAttribute("data-theme","light");
}

/* TOGGLE MODE */
function toggleTheme(){
  const current=document.documentElement.getAttribute("data-theme");

  if(current==="light"){
    document.documentElement.removeAttribute("data-theme");
  }else{
    document.documentElement.setAttribute("data-theme","light");
  }
}

/* MODAL */
function openPreview(){
  document.getElementById("modal").style.display="flex";
}

function closePreview(){
  document.getElementById("modal").style.display="none";
}

/* DOWNLOAD TRACKING */
let downloadCount = localStorage.getItem("cv_download") || 0;

function downloadCV(){
  downloadCount++;
  localStorage.setItem("cv_download", downloadCount);

  console.log("Total Download:", downloadCount);

  const link=document.createElement("a");
  link.href="cv.pdf";
  link.download="CV_Muhammad_Raihan.pdf";
  link.click();
}

/* CLOSE MODAL CLICK OUTSIDE */
window.onclick=function(e){
  const modal=document.getElementById("modal");
  if(e.target===modal){
    modal.style.display="none";
  }
}
