const input=document.getElementById("imageInput");
const preview=document.getElementById("preview");

input.addEventListener("change",e=>{

const file=e.target.files[0];

if(!file)return;

preview.style.display="block";

preview.src=URL.createObjectURL(file);

});