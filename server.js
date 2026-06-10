const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend files

// Multer Setup for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'img-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Admin Authentication (Simple Password Check)
const ADMIN_PASSWORD = 'rambakadi';

app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, token: 'admin_token_123' }); // Simple token
    } else {
        res.status(401).json({ success: false, message: 'Password salah' });
    }
});

// Simple Auth Middleware
const requireAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader === 'Bearer admin_token_123') {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

// ================= API ENDPOINTS =================

// --- PRODUCTS ---
app.get('/api/products', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/products', requireAuth, upload.single('imageFile'), (req, res) => {
    const { id, name, description, price, priceNum, existingImage } = req.body;
    let imageUrl = existingImage || 'assets/foto produk 1.webp';
    if (req.file) {
        imageUrl = 'uploads/' + req.file.filename;
    }

    db.run(
        "INSERT INTO products (id, name, description, price, priceNum, image) VALUES (?, ?, ?, ?, ?, ?)",
        [id, name, description, price, priceNum, imageUrl],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id: id, image: imageUrl });
        }
    );
});

app.put('/api/products/:id', requireAuth, upload.single('imageFile'), (req, res) => {
    const { id } = req.params;
    const { name, description, price, priceNum, existingImage } = req.body;
    let imageUrl = existingImage;
    if (req.file) {
        imageUrl = 'uploads/' + req.file.filename;
    }

    db.run(
        "UPDATE products SET name = ?, description = ?, price = ?, priceNum = ?, image = ? WHERE id = ?",
        [name, description, price, priceNum, imageUrl, id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, image: imageUrl });
        }
    );
});

app.delete('/api/products/:id', requireAuth, (req, res) => {
    db.run("DELETE FROM products WHERE id = ?", req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// --- REVIEWS ---
app.get('/api/reviews', (req, res) => {
    db.all("SELECT * FROM reviews ORDER BY rowid DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/reviews', requireAuth, upload.single('imageFile'), (req, res) => {
    const { id, name, rating, text, date, existingImage } = req.body;
    let imageUrl = existingImage || null;
    if (req.file) {
        imageUrl = 'uploads/' + req.file.filename;
    }

    db.run(
        "INSERT INTO reviews (id, name, rating, text, image, date) VALUES (?, ?, ?, ?, ?, ?)",
        [id, name, rating, text, imageUrl, date],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id: id, image: imageUrl });
        }
    );
});

app.put('/api/reviews/:id', requireAuth, upload.single('imageFile'), (req, res) => {
    const { id } = req.params;
    const { name, rating, text, existingImage } = req.body;
    let imageUrl = existingImage || null;
    if (req.file) {
        imageUrl = 'uploads/' + req.file.filename;
    }

    db.run(
        "UPDATE reviews SET name = ?, rating = ?, text = ?, image = ? WHERE id = ?",
        [name, rating, text, imageUrl, id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, image: imageUrl });
        }
    );
});

app.delete('/api/reviews/:id', requireAuth, (req, res) => {
    db.run("DELETE FROM reviews WHERE id = ?", req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Removed fallback as express.static handles index.html and wildcard is incompatible in Express 5.x

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});
