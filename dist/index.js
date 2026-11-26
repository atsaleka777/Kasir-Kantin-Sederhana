"use strict";
// Program Kasir Kantin Sederhana
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
// Membuat input terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Fungsi input
function input(tanya) {
    return new Promise((resolve) => {
        rl.question(tanya, resolve);
    });
}
async function main() {
    // Input data pembeli
    const nama = await input("Nama pembeli: ");
    console.log("\n=== MENU KANTIN ===");
    console.log("1. Nasi Goreng - Rp15000");
    console.log("2. Mie Goreng  - Rp12000");
    console.log("3. Es Teh      - Rp5000");
    const pilihan = Number(await input("Pilih menu: "));
    const jumlah = Number(await input("Jumlah: "));
    const member = (await input("Member? (y/n): ")) === "y";
    let barang = "";
    let harga = 0;
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
    const subtotal = harga * jumlah;
    let diskon = 0;
    // IF 1
    if (member && subtotal >= 50000) {
        diskon = 10;
    }
    // IF 2
    if (!member && subtotal >= 100000) {
        diskon = 5;
    }
    const potongan = subtotal * diskon / 100;
    let total = subtotal;
    total -= potongan;
    console.log("\n=== PEMBAYARAN ===");
    console.log("1. Cash");
    console.log("2. QRIS");
    console.log("3. Debit");
    const metode = Number(await input("Pilih pembayaran: "));
    // Switch 2: memilih pembayaran
    switch (metode) {
        case 1: {
            const uang = Number(await input("Uang dibayar: Rp"));
            // IF 3
            if (uang >= total) {
                let kembalian = uang;
                kembalian -= total;
                console.log("Kembalian: Rp" + kembalian);
            }
            else {
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
//# sourceMappingURL=index.js.map