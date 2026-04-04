const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const statusText = document.getElementById("status");
console.log("JS LOADED ✅");
let uploadedFile = null;

// Click upload
dropArea.addEventListener("click", () => {
  fileInput.click();
});

// File select
fileInput.addEventListener("change", (e) => {
  uploadedFile = e.target.files[0];
  statusText.innerText = `Selected: ${uploadedFile.name}`;
});

// Drag & drop
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadedFile = e.dataTransfer.files[0];
  statusText.innerText = `Uploaded: ${uploadedFile.name}`;
});

// 🔥 ANALYZE
analyzeBtn.addEventListener("click", async (e) => {
  e.preventDefault();  // ✅ now works

  console.log("BUTTON CLICKED ✅");

  if (!uploadedFile) {
    statusText.innerText = "⚠️ Please upload a file first";
    return;
  }

  statusText.innerText = "🔄 Processing...";

  const formData = new FormData();
  formData.append("file", uploadedFile);

  try {
    const res = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData
    });

    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    const data = JSON.parse(text);

    console.log("DATA:", data);

    localStorage.setItem("result", JSON.stringify(data));

    console.log("STORED:", localStorage.getItem("result"));

    statusText.innerText = "✅ Done! Redirecting...";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 500);

  } catch (err) {
    console.error(err);
    statusText.innerText = "❌ Error: " + err.message;
  }
});