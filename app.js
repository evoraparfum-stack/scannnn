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

const hasil = parseOCR(result.data.text);

document.getElementById("variantResult").innerHTML = "";
document.getElementById("qtyResult").innerHTML = "";
document.getElementById("outputResult").innerHTML = "";

if(hasil.length==0){

document.getElementById("variantResult").innerHTML="Tidak ditemukan";

document.getElementById("qtyResult").innerHTML="-";

document.getElementById("outputResult").innerHTML="-";

}else{

document.getElementById("variantResult").innerHTML=
hasil.map(x=>x.nama).join("<br>");

document.getElementById("qtyResult").innerHTML=
hasil.map(x=>x.qty).join("<br>");

document.getElementById("outputResult").innerHTML=
hasil.map(x=>`${x.nama}:${x.qty}`).join("<br>");

}

});