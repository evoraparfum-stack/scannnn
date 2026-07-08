function parseOCR(text){

text = text.toUpperCase();

const hasil = [];

PRODUCTS.forEach(product=>{

product.aliases.forEach(alias=>{

if(text.includes(alias)){

let qty = 1;

// cari angka setelah alias
let regex = new RegExp(alias + "[\\s\\S]{0,80}?(\\d+)");

let match = text.match(regex);

if(match){

qty = Number(match[1]);

}

hasil.push({

nama:product.displayName,

qty:qty

});

}

});

});

return hasil;

}