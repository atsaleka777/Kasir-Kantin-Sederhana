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

// =====================================================================
// MODUL FUNGSI PERHITUNGAN (Dengan Parameter & Return Value Bertipe)
// =====================================================================

// 1. Fungsi menghitung subtotal (parameter + return number)
function hitungSubtotal(harga: number, jumlah: number): number {
    return harga * jumlah;
}

// 2. Fungsi menentukan persen diskon (parameter + return number)
function hitungDiskon(member: boolean, subtotal: number): number {
    if (member && subtotal >= 50000) {
        return 10;
    }
    if (!member && subtotal >= 100000) {
        return 5;
    }
    return 0;
}

// 3. Arrow Function menghitung nominal potongan (parameter + return number)
const hitungPotongan = (subtotal: number, diskon: number): number => {
    return (subtotal * diskon) / 100;
};

// 4. Fungsi menghitung total akhir (parameter + return number)
function hitungTotal(subtotal: number, diskon: number): number {
    const potongan: number = hitungPotongan(subtotal, diskon);
    return subtotal - potongan;
}

// 5. Fungsi menghitung kembalian tunai (parameter + return number)
function hitungKembalian(uang: number, total: number): number {
    return uang - total;
}

// =====================================================================
// MODUL FUNGSI TAMPILAN (Tanpa Return / VOID)
// =====================================================================

// 6. Fungsi tanpa parameter & tanpa return (void)
function tampilkanMenuKantin(): void {
    console.log("\n=== MENU KANTIN ===");
    console.log("1. Nasi Goreng - Rp15000");
    console.log("2. Mie Goreng  - Rp12000");
    console.log("3. Es Teh      - Rp5000");
}

// 7. Fungsi dengan parameter & tanpa return (void)
function cetakStruk(trx: Transaksi): void {
    console.log("\n===== STRUK =====");
    console.log("ID       : #" + trx.id);
    console.log("Nama     : " + trx.nama);
    console.log("Barang   : " + trx.barang);
    console.log("Jumlah   : " + trx.jumlah);
    console.log("Subtotal : Rp" + trx.subtotal);
    console.log("Diskon   : " + trx.diskon + "%");
    console.log("Total    : Rp" + trx.total);
    if (trx.metode === 1) {
        console.log("Dibayar  : Rp" + trx.uang);
        console.log("Kembali  : Rp" + trx.kembalian);
    }
}

// Fungsi Create: Transaksi baru (pondasi kasir UTS)
async function tambahTransaksi(): Promise<void> {
    const nama: string = await input("Nama pembeli: ");

    // Memanggil fungsi void tanpa parameter
    tampilkanMenuKantin();

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

    // Memanggil fungsi-fungsi perhitungan (return value)
    const subtotal: number = hitungSubtotal(harga, jumlah);
    const diskon: number = hitungDiskon(member, subtotal);
    const potongan: number = hitungPotongan(subtotal, diskon);
    const total: number = hitungTotal(subtotal, diskon);

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
                kembalian = hitungKembalian(uang, total);
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

    const transaksiBaru: Transaksi = {
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
    };

    // Operasi Array push()
    daftarTransaksi.push(transaksiBaru);

    // Memanggil fungsi void dengan parameter
    cetakStruk(transaksiBaru);

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
// 2. PENGULANGAN FOR...OF + ARRAY FILTER (SEARCH) — Pencarian nama pembeli
// =====================================================================
async function cariData(): Promise<void> {
    console.log("\n=== CARI TRANSAKSI ===");

    if (daftarTransaksi.length === 0) {
        console.log("Belum ada data transaksi.");
        return;
    }

    const kataKunci: string = (await input("Masukkan nama pembeli: ")).toLowerCase();

    // Operasi Array filter(): menyaring elemen array yang namanya cocok
    const hasilFilter: Transaksi[] = daftarTransaksi.filter((trx) =>
        trx.nama.toLowerCase().includes(kataKunci)
    );

    if (hasilFilter.length === 0) {
        console.log("Data tidak ditemukan.");
        return;
    }

    for (const trx of hasilFilter) {
        console.log(
            `- [ID: ${trx.id}] ${trx.nama} | ${trx.barang} x${trx.jumlah} | Total: Rp${trx.total}`
        );
    }
}

async function ubahData(): Promise<void> {
    console.log("\n=== UBAH JUMLAH TRANSAKSI ===");

    if (daftarTransaksi.length === 0) {
        console.log("Belum ada data transaksi.");
        return;
    }

    tampilkanData();
    const idCari: number = Number(await input("Masukkan ID transaksi yang ingin diubah: "));

    const trx = daftarTransaksi.find((item) => item.id === idCari);

    if (!trx) {
        console.log("ID transaksi tidak ditemukan.");
        return;
    }

    const jumlahBaru: number = Number(
        await input(`Jumlah baru untuk ${trx.barang} (sebelumnya ${trx.jumlah}): `)
    );

    if (isNaN(jumlahBaru) || jumlahBaru <= 0) {
        console.log("Jumlah tidak valid.");
        return;
    }

    const subtotalBaru: number = trx.harga * jumlahBaru;
    let diskonBaru: number = 0;

    if (trx.member && subtotalBaru >= 50000) {
        diskonBaru = 10;
    }

    if (!trx.member && subtotalBaru >= 100000) {
        diskonBaru = 5;
    }

    const potonganBaru: number = (subtotalBaru * diskonBaru) / 100;
    const totalBaru: number = subtotalBaru - potonganBaru;

    if (trx.metode === 1) {
        const uangBaru: number = Number(await input(`Total baru Rp${totalBaru} | Uang dibayar: Rp`));
        if (uangBaru < totalBaru) {
            console.log("Uang tidak cukup. Perubahan dibatalkan.");
            return;
        }
        trx.uang = uangBaru;
        trx.kembalian = uangBaru - totalBaru;
    } else {
        trx.uang = totalBaru;
        trx.kembalian = 0;
    }

    trx.jumlah = jumlahBaru;
    trx.subtotal = subtotalBaru;
    trx.diskon = diskonBaru;
    trx.potongan = potonganBaru;
    trx.total = totalBaru;

    console.log(`Transaksi #${trx.id} berhasil diperbarui! Total baru: Rp${trx.total}`);
}

async function hapusData(): Promise<void> {
    console.log("\n=== HAPUS TRANSAKSI ===");

    if (daftarTransaksi.length === 0) {
        console.log("Belum ada data transaksi.");
        return;
    }

    tampilkanData();
    const idHapus: number = Number(await input("Masukkan ID transaksi yang ingin dihapus: "));

    const indeks: number = daftarTransaksi.findIndex((item) => item.id === idHapus);

    if (indeks === -1) {
        console.log("ID transaksi tidak ditemukan.");
        return;
    }

    daftarTransaksi.splice(indeks, 1);
    console.log(`Transaksi #${idHapus} berhasil dihapus.`);
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
        console.log("4. Ubah Jumlah Transaksi (Update)");
        console.log("5. Hapus Transaksi (Delete)");
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
            case 4:
                await ubahData();
                break;
            case 5:
                await hapusData();
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