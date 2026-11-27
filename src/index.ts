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

// Struktur data entitas Transaksi
interface Transaksi {
    id: number;
    nama: string;
    pilihan: number;
    barang: string;
    harga: number;
    jumlah: number;
    member: boolean;
    subtotal: number;
    diskon: number;
    potongan: number;
    total: number;
    metode: number;
    uang: number;
    kembalian: number;
}

// Penyimpanan array transaksi
let daftarTransaksi: Transaksi[] = [];
let idBerikutnya: number = 1;

// Fungsi Create: Transaksi baru (pondasi kasir UTS)
async function tambahTransaksi(): Promise<void> {
    const nama: string = await input("Nama pembeli: ");

    console.log("\n=== MENU KANTIN ===");
    console.log("1. Nasi Goreng - Rp15000");
    console.log("2. Mie Goreng  - Rp12000");
    console.log("3. Es Teh      - Rp5000");

    const pilihan: number = Number(await input("Pilih menu: "));
    const jumlah: number = Number(await input("Jumlah: "));
    const member: boolean = (await input("Member? (y/n): ")).toLowerCase() === "y";

    let barang: string = "";
    let harga: number = 0;

    // Switch 1: memilih menu
    switch (pilihan) {
        case 1:
            barang = "Nasi Goreng";
            harga = 15000;

            if (jumlah >= 5 && member) {
                console.log("Mendapat promo member.");
            }
            break;

        case 2:
            barang = "Mie Goreng";
            harga = 12000;

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
            return;
    }

    // Menghitung total
    const subtotal: number = harga * jumlah;
    let diskon: number = 0;

    if (member && subtotal >= 50000) {
        diskon = 10;
    }

    if (!member && subtotal >= 100000) {
        diskon = 5;
    }

    const potongan: number = (subtotal * diskon) / 100;
    let total: number = subtotal;
    total -= potongan;

    console.log("\n=== PEMBAYARAN ===");
    console.log("1. Cash");
    console.log("2. QRIS");
    console.log("3. Debit");

    const metode: number = Number(await input("Pilih pembayaran: "));
    let uang: number = total;
    let kembalian: number = 0;

    // Switch 2: memilih pembayaran
    switch (metode) {
        case 1: {
            uang = Number(await input("Uang dibayar: Rp"));

            if (uang >= total) {
                kembalian = uang;
                kembalian -= total;
                console.log("Kembalian: Rp" + kembalian);
            } else {
                console.log("Uang tidak cukup.");
                return;
            }
            break;
        }

        case 2:
            console.log("Pembayaran menggunakan QRIS.");

            if (member && total >= 50000) {
                console.log("Promo QRIS digunakan.");
            }
            break;

        case 3:
            console.log("Pembayaran menggunakan Debit.");
            break;

        default:
            console.log("Metode pembayaran tidak tersedia.");
            return;
    }

    // Simpan transaksi ke array
    daftarTransaksi.push({
        id: idBerikutnya++,
        nama,
        pilihan,
        barang,
        harga,
        jumlah,
        member,
        subtotal,
        diskon,
        potongan,
        total,
        metode,
        uang,
        kembalian
    });

    // Menampilkan struk
    console.log("\n===== STRUK =====");
    console.log("ID       : #" + (idBerikutnya - 1));
    console.log("Nama     : " + nama);
    console.log("Barang   : " + barang);
    console.log("Jumlah   : " + jumlah);
    console.log("Subtotal : Rp" + subtotal);
    console.log("Diskon   : " + diskon + "%");
    console.log("Total    : Rp" + total);
}

// =====================================================================
// 1. PENGULANGAN FOR — Menampilkan seluruh data transaksi
// =====================================================================
function tampilkanData(): void {
    console.log("\n=== DAFTAR TRANSAKSI ===");

    if (daftarTransaksi.length === 0) {
        console.log("Belum ada data transaksi.");
        return;
    }

    for (let i: number = 0; i < daftarTransaksi.length; i++) {
        const trx = daftarTransaksi[i];
        if (!trx) continue;
        console.log(
            `${i + 1}. [ID: ${trx.id}] ${trx.nama} | ${trx.barang} x${trx.jumlah} | Total: Rp${trx.total}`
        );
    }
}

// =====================================================================
// 2. PENGULANGAN FOR...OF — Pencarian transaksi berdasarkan nama
// =====================================================================
async function cariData(): Promise<void> {
    console.log("\n=== CARI TRANSAKSI ===");

    if (daftarTransaksi.length === 0) {
        console.log("Belum ada data transaksi.");
        return;
    }

    const kataKunci: string = (await input("Masukkan nama pembeli: ")).toLowerCase();
    let ditemukan: number = 0;

    for (const trx of daftarTransaksi) {
        if (trx.nama.toLowerCase().includes(kataKunci)) {
            console.log(
                `- [ID: ${trx.id}] ${trx.nama} | ${trx.barang} x${trx.jumlah} | Total: Rp${trx.total}`
            );
            ditemukan++;
        }
    }

    if (ditemukan === 0) {
        console.log("Data tidak ditemukan.");
    }
}

// =====================================================================
// 3. PENGULANGAN DO...WHILE — Mengulang Menu Utama
// =====================================================================
async function main(): Promise<void> {
    let menu: number;

    do {
        console.log("\n=== PROGRAM KASIR KANTIN ===");
        console.log("1. Transaksi Baru (Create)");
        console.log("2. Tampilkan Semua Transaksi (Read)");
        console.log("3. Cari Transaksi (Search)");
        console.log("0. Keluar");

        menu = Number(await input("Pilih menu: "));

        switch (menu) {
            case 1:
                await tambahTransaksi();
                break;
            case 2:
                tampilkanData();
                break;
            case 3:
                await cariData();
                break;
            case 0:
                console.log("Program selesai. Terima kasih!");
                break;
            default:
                console.log("Pilihan menu tidak valid!");
                break;
        }
    } while (menu !== 0);

    rl.close();
}

main();