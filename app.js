const imageInput=document.getElementById("imageInput");

const preview=document.getElementById("preview");

imageInput.onchange=e=>{

const file=e.target.files[0];

if(!file)return;

preview.src=URL.createObjectURL(file);

preview.style.display="block";

};