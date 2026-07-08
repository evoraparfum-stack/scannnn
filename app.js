const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const scanBtn = document.getElementById("scanBtn");

const statusEl = document.getElementById("status");
const ocrResult = document.getElementById("ocrResult");

let currentImage = null;

// Preview gambar
imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    currentImage = file;

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";

    statusEl.innerText = "Foto siap discan";
    ocrResult.innerText = "";
});

// Scan OCR
scanBtn.addEventListener("click", async () => {

    if (!currentImage) {
        alert("Pilih foto resi terlebih dahulu.");
        return;
    }

    statusEl.innerText = "Memindai...";

    const result = await Tesseract.recognize(
        currentImage,
        "eng",
        {
            logger: m => {
                if (m.status) {
                    statusEl.innerText =
                        m.status + " " +
                        Math.round((m.progress || 0) * 100) + "%";
                }
            }
        }
    );

    statusEl.innerText = "Selesai";

    ocrResult.innerText = result.data.text;

});