/* ============================================================
   KERUPUK RAMBAK ADI — Application Logic (Static Version)
   Product & Review display, WhatsApp integration
   ============================================================ */

// ============= CONSTANTS =============
const WA_NUMBER = '6281316390543';

// ============= STATIC DATA =============
// Data Produk: Silakan tambahkan atau ubah data produk di sini
const productsData = [
    {
        id: 'p1',
        name: 'Kerupuk Rambak Kemasan Besar',
        description: 'Kerupuk rambak sapi asli, renyah dan gurih. Cocok untuk lauk pauk.',
        price: 'Rp 50.000',
        image: 'assets/logo kerupuk rambak adi .png'
    },
    {
        id: 'p2',
        name: 'Kerupuk Rambak Kemasan Sedang',
        description: 'Kerupuk rambak kemasan sedang yang pas untuk ngemil santai.',
        price: 'Rp 25.000',
        image: 'assets/logo kerupuk rambak adi .png'
    }
];

// Data Ulasan: Silakan tambahkan atau ubah data ulasan di sini
const reviewsData = [
    {
        id: 'r1',
        name: 'Budi Santoso',
        text: 'Kerupuknya sangat renyah dan gurih, mantap rasanya!',
        rating: 5,
        image: null
    },
    {
        id: 'r2',
        name: 'Siti Aminah',
        text: 'Enak banget buat teman makan soto. Pengiriman juga cepat.',
        rating: 5,
        image: null
    }
];


// ============= UTILITY FUNCTIONS =============
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
                <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23F5F3F0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 x=%22200%22 y=%22150%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-family=%22sans-serif%22 font-size=%2214%22%3EGambar tidak tersedia%3C/text%3E%3C/svg%3E'">
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
            ${review.image ? `<img src="${escapeHtml(review.image)}" alt="Foto ulasan ${escapeHtml(review.name)}" class="review-image" loading="lazy" onerror="this.style.display='none'">` : ''}
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


// ============= INITIALIZATION =============
function init() {
    renderProducts();
    renderReviews();
    
    initNavbarScroll();
    initMobileMenu();
    initScrollAnimations();
}

document.addEventListener('DOMContentLoaded', init);
