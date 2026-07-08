function parseOCR(text){

    text = text.toUpperCase();

    // Hilangkan enter ganda
    text = text.replace(/\r/g,"");

    const hasil = [];

    PRODUCTS.forEach(product=>{

        let ketemu = false;

        product.aliases.forEach(alias=>{

            if(ketemu) return;

            if(text.includes(alias)){

                ketemu = true;

                let qty = 1;

                // Cari angka setelah alias (maks 80 karakter)
                let after = text.substring(text.indexOf(alias));

                let angka = after.match(/\b(\d+)\b/);

                if(angka){

                    qty = Number(angka[1]);

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