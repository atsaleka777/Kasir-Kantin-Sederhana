// Program Kasir Kantin Sederhana

import * as readline from "readline";

// Membuat input terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fungsi input
function input(tanya: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(tanya, resolve);
    });
}

async function main() {

    // Input data pembeli
    const nama: string = await input("Nama pembeli: ");

    console.log("\n=== MENU KANTIN ===");
    console.log("1. Nasi Goreng - Rp15000");
    console.log("2. Mie Goreng  - Rp12000");
    console.log("3. Es Teh      - Rp5000");

    const pilihan: number = Number(await input("Pilih menu: "));
    const jumlah: number = Number(await input("Jumlah: "));
    const member: boolean = (await input("Member? (y/n): ")) === "y";

    let barang: string = "";
    let harga: number = 0;

    // Switch 1: memilih menu
    switch (pilihan) {
        case 1:
            barang = "Nasi Goreng";
            harga = 15000;

            // IF nested
            if (jumlah >= 5 && member) {
                console.log("Mendapat promo member.");
            }
            break;

        case 2:
            barang = "Mie Goreng";
            harga = 12000;

            // IF nested
            if (jumlah >= 5 || member) {
                console.log("Mendapat harga spesial.");
            }
            break;

        case 3:
            barang = "Es Teh";
            harga = 5000;
            break;

        default:
            console.log("Menu tidak tersedia.");
            rl.close();
            return;
    }

    // Menghitung total
    const subtotal: number = harga * jumlah;
    let diskon: number = 0;

    // IF 1
    if (member && subtotal >= 50000) {
        diskon = 10;
    }

    // IF 2
    if (!member && subtotal >= 100000) {
        diskon = 5;
    }

    const potongan: number = subtotal * diskon / 100;
    let total: number = subtotal;
    total -= potongan;

    console.log("\n=== PEMBAYARAN ===");
    console.log("1. Cash");
    console.log("2. QRIS");
    console.log("3. Debit");

    const metode: number = Number(await input("Pilih pembayaran: "));

    // Switch 2: memilih pembayaran
    switch (metode) {
        case 1: {
            const uang: number = Number(
                await input("Uang dibayar: Rp")
            );

            // IF 3
            if (uang >= total) {
                let kembalian: number = uang;
                kembalian -= total;
                console.log("Kembalian: Rp" + kembalian);
            } else {
                console.log("Uang tidak cukup.");
            }
            break;
        }

        case 2:
            console.log("Pembayaran menggunakan QRIS.");

            // IF 4
            if (member && total >= 50000) {
                console.log("Promo QRIS digunakan.");
            }
            break;

        case 3:
            console.log("Pembayaran menggunakan Debit.");
            break;

        default:
            console.log("Metode pembayaran tidak tersedia.");
            rl.close();
            return;
    }

    // Menampilkan struk
    console.log("\n===== STRUK =====");
    console.log("Nama     : " + nama);
    console.log("Barang   : " + barang);
    console.log("Jumlah   : " + jumlah);
    console.log("Subtotal : Rp" + subtotal);
    console.log("Diskon   : " + diskon + "%");
    console.log("Total    : Rp" + total);

    rl.close();
}

main();