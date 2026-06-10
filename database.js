const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize Database Tables
db.serialize(() => {
    // Products Table
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price TEXT NOT NULL,
            priceNum INTEGER NOT NULL,
            image TEXT
        )
    `);

    // Reviews Table
    db.run(`
        CREATE TABLE IF NOT EXISTS reviews (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            rating INTEGER NOT NULL,
            text TEXT NOT NULL,
            image TEXT,
            date TEXT NOT NULL
        )
    `);

    // Seed default data if empty
    db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
        if (row && row.count === 0) {
            console.log("Seeding default products...");
            const stmt = db.prepare("INSERT INTO products VALUES (?, ?, ?, ?, ?, ?)");
            const defaults = [
                ['prod_1', 'Kemasan Plastik ¼ KG', 'Ukuran kecil, pas untuk coba-coba atau camilan ringan di rumah. Renyah dan gurih khas Boyolali.', 'Rp 10.000', 10000, 'assets/foto produk 3.webp'],
                ['prod_2', 'Kemasan Plastik ½ KG', 'Ukuran sedang, cocok untuk stok lauk harian keluarga. Digoreng dadakan dengan minyak segar.', 'Rp 15.000', 15000, 'assets/foto produk 3.webp'],
                ['prod_3', 'Kemasan Plastik 1 KG', 'Ukuran besar dan hemat untuk keluarga besar. Cocok juga untuk warung makan dan usaha katering.', 'Rp 25.000', 25000, 'assets/foto produk 1.webp'],
                ['prod_4', 'Kemasan Toples Premium', 'Kemasan toples rapat, aman dan praktis. Sangat pas untuk oleh-oleh atau disajikan di ruang tamu.', 'Rp 25.000', 25000, 'assets/foto produk 2.webp']
            ];
            defaults.forEach(d => stmt.run(d));
            stmt.finalize();
        }
    });

    db.get("SELECT COUNT(*) as count FROM reviews", (err, row) => {
        if (row && row.count === 0) {
            console.log("Seeding default reviews...");
            const stmt = db.prepare("INSERT INTO reviews VALUES (?, ?, ?, ?, ?, ?)");
            const defaults = [
                ['rev_1', 'Rafie Armansyah', 5, 'Kerupuk boyolali ini wajib di coba!!! Cocok untuk di makan dengan nasi anget, bakso, dll. Rasanya autentik dan berbeda dari krupuk lainnya — bikin nagih! 👍👍', null, '5 bulan lalu'],
                ['rev_2', 'angga_dip', 5, 'Satu hal yang lebih saya sukai daripada membicarakan yaitu nyobain makan kerupuk rambak Adi khas boyolali ini. Dr sekian banyak kerupuk yang saya cobain, cuma kerupuk rambak Adi khas boyolali ini yg paling bikin nagih. Gurihnya nagih!', null, '4 bulan lalu'],
                ['rev_3', 'Johan Pramusinto', 5, 'Rambaknya bersih gurih renyah dijamin rasanya enak beda sama yang lain pasti nagihhh buat lauk makan apapun cocok kakak! 👍', null, '5 bulan lalu'],
                ['rev_4', 'Laelani Sukarno', 5, 'Kerupuknya enak renyah dan gurih, nga da rasa sakit tenggorokan kl makan banyak2 km minyaknya fresh dan digorengnya dadakan.', null, '5 bulan lalu'],
                ['rev_5', 'mila puspita', 5, 'Kerupuk Rambak Asli Boyolali... Renyah, gurih, dan tidak alot. Kualitas okee, pas banget untuk dijadiin lauk tambahan maupun camilan!', null, '3 bulan lalu'],
                ['rev_6', 'Afrinda Rahmadanti', 5, 'Kerupuk rambak yang paling enak! Renyah banget dan rasanya beda dari yang lain. Sangat recommended untuk teman makan nasi hangat.', null, '5 bulan lalu']
            ];
            defaults.forEach(d => stmt.run(d));
            stmt.finalize();
        }
    });
});

module.exports = db;
