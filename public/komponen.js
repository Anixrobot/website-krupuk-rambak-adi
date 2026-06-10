/* ============================================================
   KERUPUK RAMBAK ADI — Application Logic (Backend Integrated)
   Product & Review management, Admin CRUD, WhatsApp integration
   ============================================================ */

// ============= CONSTANTS =============
const WA_NUMBER = '6281316390543';
const STORAGE_KEYS = {
    ADMIN_LOGGED_IN: 'rambak_admin_session',
    AUTH_TOKEN: 'rambak_auth_token'
};

// ============= STATE MANAGEMENT =============
let productsData = [];
let reviewsData = [];

async function loadProducts() {
    try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        productsData = await res.json();
    } catch (e) {
        console.error(e);
        showToast('Gagal memuat produk dari server', 'error');
    }
}

async function loadReviews() {
    try {
        const res = await fetch('/api/reviews');
        if (!res.ok) throw new Error('Failed to fetch reviews');
        reviewsData = await res.json();
    } catch (e) {
        console.error(e);
        showToast('Gagal memuat ulasan dari server', 'error');
    }
}

function getAuthToken() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}

function isAdminLoggedIn() {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_LOGGED_IN) === 'true' && getAuthToken();
}

function setAdminSession(loggedIn, token = null) {
    if (loggedIn && token) {
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_LOGGED_IN, 'true');
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } else {
        sessionStorage.removeItem(STORAGE_KEYS.ADMIN_LOGGED_IN);
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    }
}


// ============= UTILITY FUNCTIONS =============
function generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
}

function getStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function getInitial(name) {
    return name.charAt(0).toUpperCase();
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}


// ============= TOAST NOTIFICATIONS =============
function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'toast' + (type ? ' toast-' + type : '');
    
    // Force reflow
    void toast.offsetWidth;
    toast.classList.add('show');
    
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}


// ============= CONFIRM DIALOG =============
let confirmCallback = null;

function showConfirm(title, message, onConfirm) {
    const overlay = document.getElementById('confirm-overlay');
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-text').textContent = message;
    confirmCallback = onConfirm;
    overlay.classList.add('active');
}

function hideConfirm() {
    const overlay = document.getElementById('confirm-overlay');
    overlay.classList.remove('active');
    confirmCallback = null;
}

function handleConfirm() {
    if (confirmCallback) {
        confirmCallback();
    }
    hideConfirm();
}


// ============= PRODUCT RENDERING =============
function renderProducts() {
    const container = document.getElementById('product-grid');
    if (!container) return;
    
    if (productsData.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">📦</div>
                <p class="empty-state-text">Belum ada produk yang ditampilkan.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = productsData.map(product => `
        <div class="product-card fade-up" id="card-${product.id}">
            <div class="product-card-image">
                <img src="/${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23F5F3F0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 x=%22200%22 y=%22150%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-family=%22sans-serif%22 font-size=%2214%22%3EGambar tidak tersedia%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="product-card-body">
                <h3 class="product-card-title">${escapeHtml(product.name)}</h3>
                <p class="product-card-desc">${escapeHtml(product.description)}</p>
                <div class="product-card-price">
                    <span class="price-label">Harga</span>
                    ${escapeHtml(product.price)}
                </div>
                <a href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo Kerupuk Rambak Adi, saya mau pesan ' + product.name + '. Mohon info ketersediaannya ya!')}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="btn btn-wa btn-block"
                   id="order-${product.id}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Pesan via WhatsApp
                </a>
            </div>
        </div>
    `).join('');
    
    // Re-init scroll animations for new elements
    initScrollAnimations();
}


// ============= REVIEW RENDERING =============
function renderReviews() {
    const container = document.getElementById('review-grid');
    const summaryEl = document.getElementById('review-summary');
    if (!container) return;
    
    // Update summary
    if (summaryEl) {
        const avgRating = reviewsData.length > 0 
            ? (reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length).toFixed(1) 
            : '0.0';
        const avgStars = Math.round(parseFloat(avgRating));
        
        document.getElementById('review-avg-score').textContent = avgRating;
        document.getElementById('review-avg-stars').textContent = getStars(avgStars);
        document.getElementById('review-count').textContent = reviewsData.length + ' ulasan';
    }
    
    if (reviewsData.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">💬</div>
                <p class="empty-state-text">Belum ada ulasan.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = reviewsData.map(review => `
        <blockquote class="review-card fade-up">
            <span class="review-quote-mark">"</span>
            <p class="review-text">${escapeHtml(review.text)}</p>
            ${review.image ? `<img src="/${escapeHtml(review.image)}" alt="Foto ulasan ${escapeHtml(review.name)}" class="review-image" loading="lazy" onerror="this.style.display='none'">` : ''}
            <div class="review-author">
                <div class="review-author-avatar">${getInitial(review.name)}</div>
                <div class="review-author-info">
                    <span class="review-author-name">${escapeHtml(review.name)}</span>
                    <span class="review-author-stars">${getStars(review.rating)}</span>
                </div>
            </div>
        </blockquote>
    `).join('');
    
    initScrollAnimations();
}


// ============= ADMIN: LOGIN =============
function showAdminLogin() {
    if (isAdminLoggedIn()) {
        showAdminPanel();
        return;
    }
    const overlay = document.getElementById('login-overlay');
    const input = document.getElementById('admin-password');
    overlay.classList.add('active');
    input.value = '';
    document.getElementById('login-error').textContent = '';
    setTimeout(() => input.focus(), 300);
}

function hideAdminLogin() {
    document.getElementById('login-overlay').classList.remove('active');
}

async function attemptLogin() {
    const input = document.getElementById('admin-password');
    const errorEl = document.getElementById('login-error');
    
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: input.value })
        });
        
        const data = await res.json();
        
        if (data.success) {
            setAdminSession(true, `Bearer ${data.token}`);
            hideAdminLogin();
            showAdminPanel();
            showToast('Berhasil masuk sebagai Admin!', 'success');
        } else {
            errorEl.textContent = 'Password salah. Coba lagi.';
            input.value = '';
            input.focus();
            // Shake animation
            input.style.animation = 'none';
            void input.offsetWidth;
            input.style.animation = 'shake 0.4s ease';
        }
    } catch (e) {
        errorEl.textContent = 'Terjadi kesalahan jaringan.';
    }
}

function logoutAdmin() {
    setAdminSession(false);
    hideAdminPanel();
    showToast('Berhasil keluar dari Admin.', '');
}


// ============= ADMIN: PANEL =============
function showAdminPanel() {
    const overlay = document.getElementById('admin-overlay');
    overlay.classList.add('active');
    renderAdminProducts();
    renderAdminReviews();
    switchAdminTab('products');
}

function hideAdminPanel() {
    document.getElementById('admin-overlay').classList.remove('active');
    resetProductForm();
    resetReviewForm();
}

function switchAdminTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // Update tab content
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.toggle('active', content.id === 'tab-' + tab);
    });
}


// ============= ADMIN: PRODUCT CRUD =============
let editingProductId = null;
let productFile = null;
let productExistingImage = null;

function resetProductForm() {
    editingProductId = null;
    productFile = null;
    productExistingImage = null;
    document.getElementById('product-form').reset();
    document.getElementById('product-image-preview').innerHTML = '<span class="form-file-preview-placeholder">+ Foto</span>';
    document.getElementById('product-form-title').textContent = 'Tambah Produk Baru';
    document.getElementById('product-submit-btn').textContent = 'Tambah Produk';
    document.getElementById('product-submit-btn').disabled = false;
    document.getElementById('product-cancel-btn').style.display = 'none';
}

function handleProductImageUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showToast('Ukuran gambar maksimal 5MB', 'error');
            input.value = '';
            return;
        }
        
        productFile = file;
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('product-image-preview').innerHTML = 
                `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
}

async function submitProduct(e) {
    e.preventDefault();
    
    const name = document.getElementById('product-name').value.trim();
    const description = document.getElementById('product-desc').value.trim();
    const price = document.getElementById('product-price').value.trim();
    
    if (!name || !description || !price) {
        showToast('Mohon lengkapi semua field!', 'error');
        return;
    }
    
    const submitBtn = document.getElementById('product-submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Menyimpan...';
    
    const priceNum = parseInt(price.replace(/\D/g, '')) || 0;
    const formattedPrice = 'Rp ' + priceNum.toLocaleString('id-ID');
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', formattedPrice);
    formData.append('priceNum', priceNum);
    
    if (productFile) {
        formData.append('imageFile', productFile);
    } else if (productExistingImage) {
        formData.append('existingImage', productExistingImage);
    }
    
    try {
        let url = '/api/products';
        let method = 'POST';
        
        if (editingProductId) {
            url = '/api/products/' + editingProductId;
            method = 'PUT';
        } else {
            formData.append('id', generateId());
        }
        
        const res = await fetch(url, {
            method: method,
            headers: { 'Authorization': getAuthToken() },
            body: formData
        });
        
        if (!res.ok) throw new Error('Gagal menyimpan produk');
        
        showToast(editingProductId ? 'Produk berhasil diperbarui!' : 'Produk berhasil ditambahkan!', 'success');
        
        // Reload data
        await loadProducts();
        renderProducts();
        renderAdminProducts();
        resetProductForm();
        
    } catch (e) {
        console.error(e);
        showToast('Terjadi kesalahan saat menyimpan produk', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = editingProductId ? 'Simpan Perubahan' : 'Tambah Produk';
    }
}

function editProduct(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;
    
    editingProductId = id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-desc').value = product.description;
    document.getElementById('product-price').value = product.priceNum || '';
    
    productExistingImage = product.image;
    if (product.image) {
        document.getElementById('product-image-preview').innerHTML = 
            `<img src="/${product.image}" alt="Preview">`;
    } else {
        document.getElementById('product-image-preview').innerHTML = '<span class="form-file-preview-placeholder">+ Foto</span>';
    }
    
    document.getElementById('product-form-title').textContent = 'Edit Produk';
    document.getElementById('product-submit-btn').textContent = 'Simpan Perubahan';
    document.getElementById('product-cancel-btn').style.display = 'inline-flex';
    
    // Scroll form into view
    document.getElementById('product-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function deleteProduct(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;
    
    showConfirm(
        'Hapus Produk?',
        `Apakah Anda yakin ingin menghapus "${product.name}"?`,
        async () => {
            try {
                const res = await fetch('/api/products/' + id, {
                    method: 'DELETE',
                    headers: { 'Authorization': getAuthToken() }
                });
                if (!res.ok) throw new Error('Gagal menghapus');
                
                await loadProducts();
                renderProducts();
                renderAdminProducts();
                showToast('Produk berhasil dihapus!', 'success');
            } catch (e) {
                console.error(e);
                showToast('Terjadi kesalahan', 'error');
            }
        }
    );
}

function renderAdminProducts() {
    const container = document.getElementById('admin-product-list');
    if (!container) return;
    
    if (productsData.length === 0) {
        container.innerHTML = '<p class="empty-state-text" style="padding: 24px 0; color: var(--text-secondary);">Belum ada produk.</p>';
        return;
    }
    
    container.innerHTML = productsData.map(product => `
        <div class="admin-item">
            <img src="/${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" class="admin-item-image" onerror="this.style.display='none'">
            <div class="admin-item-info">
                <div class="admin-item-name">${escapeHtml(product.name)}</div>
                <div class="admin-item-detail">${escapeHtml(product.price)}</div>
            </div>
            <div class="admin-item-actions">
                <button class="btn btn-sm btn-outline" onclick="editProduct('${product.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.id}')">Hapus</button>
            </div>
        </div>
    `).join('');
}


// ============= ADMIN: REVIEW CRUD =============
let editingReviewId = null;
let reviewFile = null;
let reviewExistingImage = null;

function resetReviewForm() {
    editingReviewId = null;
    reviewFile = null;
    reviewExistingImage = null;
    document.getElementById('review-form').reset();
    document.getElementById('review-image-preview').innerHTML = '<span class="form-file-preview-placeholder">+ Foto</span>';
    document.getElementById('review-form-title').textContent = 'Tambah Ulasan';
    document.getElementById('review-submit-btn').textContent = 'Tambah Ulasan';
    document.getElementById('review-submit-btn').disabled = false;
    document.getElementById('review-cancel-btn').style.display = 'none';
    
    // Reset star rating
    const starInputs = document.querySelectorAll('#review-form input[name="rating"]');
    starInputs.forEach(input => input.checked = false);
    const star5 = document.getElementById('star-5');
    if (star5) star5.checked = true;
}

function handleReviewImageUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        if (file.size > 5 * 1024 * 1024) {
            showToast('Ukuran gambar maksimal 5MB', 'error');
            input.value = '';
            return;
        }
        
        reviewFile = file;
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('review-image-preview').innerHTML = 
                `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
}

async function submitReview(e) {
    e.preventDefault();
    
    const name = document.getElementById('review-name').value.trim();
    const text = document.getElementById('review-text').value.trim();
    const ratingInput = document.querySelector('#review-form input[name="rating"]:checked');
    const rating = ratingInput ? parseInt(ratingInput.value) : 5;
    
    if (!name || !text) {
        showToast('Mohon lengkapi nama dan ulasan!', 'error');
        return;
    }
    
    const submitBtn = document.getElementById('review-submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Menyimpan...';
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('text', text);
    formData.append('rating', rating);
    formData.append('date', 'Baru saja');
    
    if (reviewFile) {
        formData.append('imageFile', reviewFile);
    } else if (reviewExistingImage) {
        formData.append('existingImage', reviewExistingImage);
    }
    
    try {
        let url = '/api/reviews';
        let method = 'POST';
        
        if (editingReviewId) {
            url = '/api/reviews/' + editingReviewId;
            method = 'PUT';
        } else {
            formData.append('id', generateId());
        }
        
        const res = await fetch(url, {
            method: method,
            headers: { 'Authorization': getAuthToken() },
            body: formData
        });
        
        if (!res.ok) throw new Error('Gagal menyimpan ulasan');
        
        showToast(editingReviewId ? 'Ulasan berhasil diperbarui!' : 'Ulasan berhasil ditambahkan!', 'success');
        
        await loadReviews();
        renderReviews();
        renderAdminReviews();
        resetReviewForm();
        
    } catch (e) {
        console.error(e);
        showToast('Terjadi kesalahan saat menyimpan ulasan', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = editingReviewId ? 'Simpan Perubahan' : 'Tambah Ulasan';
    }
}

function editReview(id) {
    const review = reviewsData.find(r => r.id === id);
    if (!review) return;
    
    editingReviewId = id;
    document.getElementById('review-name').value = review.name;
    document.getElementById('review-text').value = review.text;
    
    // Set star rating
    const starInput = document.getElementById('star-' + review.rating);
    if (starInput) starInput.checked = true;
    
    reviewExistingImage = review.image;
    if (review.image) {
        document.getElementById('review-image-preview').innerHTML = 
            `<img src="/${review.image}" alt="Preview">`;
    } else {
        document.getElementById('review-image-preview').innerHTML = '<span class="form-file-preview-placeholder">+ Foto</span>';
    }
    
    document.getElementById('review-form-title').textContent = 'Edit Ulasan';
    document.getElementById('review-submit-btn').textContent = 'Simpan Perubahan';
    document.getElementById('review-cancel-btn').style.display = 'inline-flex';
    
    document.getElementById('review-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function deleteReview(id) {
    const review = reviewsData.find(r => r.id === id);
    if (!review) return;
    
    showConfirm(
        'Hapus Ulasan?',
        `Apakah Anda yakin ingin menghapus ulasan dari "${review.name}"?`,
        async () => {
            try {
                const res = await fetch('/api/reviews/' + id, {
                    method: 'DELETE',
                    headers: { 'Authorization': getAuthToken() }
                });
                if (!res.ok) throw new Error('Gagal menghapus');
                
                await loadReviews();
                renderReviews();
                renderAdminReviews();
                showToast('Ulasan berhasil dihapus!', 'success');
            } catch (e) {
                console.error(e);
                showToast('Terjadi kesalahan', 'error');
            }
        }
    );
}

function renderAdminReviews() {
    const container = document.getElementById('admin-review-list');
    if (!container) return;
    
    if (reviewsData.length === 0) {
        container.innerHTML = '<p class="empty-state-text" style="padding: 24px 0; color: var(--text-secondary);">Belum ada ulasan.</p>';
        return;
    }
    
    container.innerHTML = reviewsData.map(review => `
        <div class="admin-item">
            ${review.image ? `<img src="/${escapeHtml(review.image)}" alt="" class="admin-item-image" onerror="this.style.display='none'">` : 
            `<div class="admin-item-image" style="display:flex;align-items:center;justify-content:center;background:var(--muted);font-size:1.2rem;color:var(--accent);font-family:var(--font-serif);font-weight:600;">${getInitial(review.name)}</div>`}
            <div class="admin-item-info">
                <div class="admin-item-name">${escapeHtml(review.name)} — ${getStars(review.rating)}</div>
                <div class="admin-item-detail">${escapeHtml(review.text.substring(0, 80))}${review.text.length > 80 ? '...' : ''}</div>
            </div>
            <div class="admin-item-actions">
                <button class="btn btn-sm btn-outline" onclick="editReview('${review.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteReview('${review.id}')">Hapus</button>
            </div>
        </div>
    `).join('');
}


// ============= NAVBAR SCROLL EFFECT =============
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}


// ============= MOBILE MENU TOGGLE =============
function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const links = document.getElementById('navbar-links');
    
    if (!toggle || !links) return;
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
    });
    
    // Close menu when clicking a link
    links.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('open');
        });
    });
}


// ============= SCROLL ANIMATIONS =============
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });
    
    document.querySelectorAll('.fade-up:not(.visible)').forEach(el => {
        observer.observe(el);
    });
}


// ============= KEYBOARD SHORTCUTS =============
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Escape to close modals
        if (e.key === 'Escape') {
            if (document.getElementById('confirm-overlay').classList.contains('active')) {
                hideConfirm();
            } else if (document.getElementById('admin-overlay').classList.contains('active')) {
                hideAdminPanel();
            } else if (document.getElementById('login-overlay').classList.contains('active')) {
                hideAdminLogin();
            }
        }
        
        // Enter to submit login
        if (e.key === 'Enter' && document.getElementById('login-overlay').classList.contains('active')) {
            attemptLogin();
        }
    });
}


// ============= CLOSE MODAL ON OVERLAY CLICK =============
function initModalOverlayClicks() {
    ['login-overlay', 'admin-overlay'].forEach(id => {
        const overlay = document.getElementById(id);
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    if (id === 'login-overlay') hideAdminLogin();
                    else hideAdminPanel();
                }
            });
        }
    });
    
    const confirmOverlay = document.getElementById('confirm-overlay');
    if (confirmOverlay) {
        confirmOverlay.addEventListener('click', (e) => {
            if (e.target === confirmOverlay) hideConfirm();
        });
    }
}


// ============= SHAKE ANIMATION (for invalid input) =============
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
}
`;

function injectShakeAnimation() {
    const style = document.createElement('style');
    style.textContent = shakeKeyframes;
    document.head.appendChild(style);
}


// ============= INITIALIZATION =============
async function init() {
    injectShakeAnimation();
    
    // Load data from backend
    await Promise.all([loadProducts(), loadReviews()]);
    
    renderProducts();
    renderReviews();
    
    initNavbarScroll();
    initMobileMenu();
    initScrollAnimations();
    initKeyboardShortcuts();
    initModalOverlayClicks();
    
    // Setup admin tab switching
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => switchAdminTab(tab.dataset.tab));
    });
    
    // Setup product form
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', submitProduct);
    }
    
    // Setup review form
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', submitReview);
    }
}

document.addEventListener('DOMContentLoaded', init);
