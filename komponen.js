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
        id: 'p5',
        name: 'Krupuk Rambak Kemasan 400gram',
        description: 'Ngemil renyah tanpa ribet! Kemasan ekonomis ini pas banget buat nemenin waktu santai, nugas, atau jadi pengganjal perut saat di jalan. Sekali gigit, gurih sapi aslinya bikin nggak mau berhenti ngunyah.',
        price: 'Rp 6.000',
        image: 'assets/ukuran 400gram.jpg'
    },
    {
        id: 'p3',
        name: 'Kerupuk Rambak Kemasan 1/4kg',
        description: 'Pilihan tepat buat kamu yang hobi ngemil. Ukuran 1/4 kg ini praktis banget buat dibawa bepergian, piknik, atau jadi temen setia saat nonton film. Renyahnya awet, bumbunya pas, dan pastinya anti-melempem!',
        price: 'Rp 15.000',
        image: 'assets/setengah kg.jpeg'
    },
    {
        id: 'p2',
        name: 'Kerupuk Rambak Kemasan 1/2kg',
        description: 'Ukuran ideal yang pas buat sharing bareng keluarga atau teman tongkrongan. Selain enak buat ngemil, kerupuk ini juara banget kalau dijadiin pelengkap makan nasi, soto, atau bakso. Bikin makan makin lahap dengan ekstra sensasi kriuk!',
        price: 'Rp 25.000',
        image: 'assets/seperempat kg.jpeg'
    },
    {
        id: 'p6',
        name: 'Krupuk Rambak Kemasan Grosir Harga Kiloan',
        description: 'Peluang cuan maksimal buat usahamu! Dengan harga spesial grosir, kemasan 1 kg ini jadi pilihan paling cerdas untuk dijual kembali, distok di warung, atau rumah makan. Harga modal lebih miring, margin untung makin tebal, dengan kualitas renyah asli Boyolali yang pasti bikin pelanggan balik lagi. Yuk, borong dan raih untungmu!',
        price: 'Rp 40.000/Kg',
        image: 'assets/paket grosiran 40k.jpg'
    },
    {
        id: 'p1',
        name: 'Kerupuk Rambak Kemasan 1kg',
        description: 'Puas banget! Kemasan 1 kg ini adalah stok wajib yang harus ada di rumah. Jaminan puas untuk lauk makan sehari-hari sekeluarga atau sajian saat ada tamu. Kerupuk rambak sapi asli Boyolali berkualitas premium yang renyah dan bikin ketagihan.',
        price: 'Rp 45.000',
        image: 'assets/1kg.jpeg'
    },
    {
        id: 'p4',
        name: 'Kerupuk Rambak Kemasan Satu Ball 4kg',
        description: 'Solusi hemat untuk kebutuhan besar! Kemasan 1 Ball (4 kg) ini adalah pilihan paling cuan buat kamu yang mau jual lagi (reseller), atau untuk sajian acara besar seperti hajatan, arisan, dan kumpul keluarga. Kualitas juara dengan harga grosir!',
        price: 'Rp 160.000',
        image: 'assets/satu ball 4kg.jpeg'
    },
];

// Data Ulasan: Silakan tambahkan atau ubah data ulasan di sini
const reviewsData = [
    {
        id: 'r1',
        name: 'Rafie Armansyah',
        text: 'kerupuk boyolali ini wajib di coba!!!, cocok untuk di makan dengan nasi anget, bakso, dll, rasanya autentik dan berbeda dari krupuk lainnya - bikin nagih👍👍',
        rating: 5,
        image: null
    },
    {
        id: 'r2',
        name: 'angga_ dip',
        text: 'Satu hal yang lebih saya sukai daripada membicarakan yaitu nyobain makan kerupuk rambak Adi khas boyolali ini, dr sekian banyak kerupuk yang saya cobain, cuma kerupuk rambak Adi khas boyolali ini yg paling bikin nagih, Gurihnya nagih, Renyah poll, Lumer di mulut, bener² Bikin nagih, Teksturnya pas banget, ga keras, Garingnya dapet bgd, rasanya jg meresap, Kerupuk rambak Adi khas boyolali yang gurih dan renyah, cocok bgd nih buat temen makan atau sekedar buat cemilan rekomen bgd 👍🏻👍🏻👍🏻👍🏻👍🏻',
        rating: 5,
        image: null
    },
    {
        id: 'r3',
        name: 'Fakhri Bagas Arbiansyah',
        text: 'Kerupuknya enal bgttt, renyah bgt gesss. Digorengnya dadakan. Topp. Pasti beli lagi',
        rating: 5,
        image: null
    },
    {
        id: 'r4',
        name: 'Afrinda Rahmadanti',
        text: 'Mantap banget ini kerupuknya, yg mau cobain,, buruan deh cuss pesen,,, ga perlu jauh2 ke boyolali..recomended bgt pokoke',
        rating: 5,
        image: null
    },
    {
        id: 'r5',
        name: 'Laelani Sukarno',
        text: 'Kerupuknya enak renyah dan gurih, nga da rasa sakit tenggorokan kl makan banyak2 krn minyaknya fresh dan digorengnya dadakan',
        rating: 5,
        image: null
    },
    {
        id: 'r6',
        name: 'mila puspita',
        text: 'Kerupuk Rambak Asli Boyolali... Renyah, gurih, dan tidak alot. Kualitas okee, pas banget untuk dijadiin lauk tambahan maupun camilan Recommended untuk pecinta kerupuk',
        rating: 5,
        image: null
    },
    {
        id: 'r7',
        name: 'Lia Rahmaliyanti',
        text: 'Krupuk nagih dari Boyolali...the one and only KRUPUK RAMBAK ADI!!! Gak bisa berenti ngunyahnya... Hati-hati kena candunya! 🤩🤩🤩',
        rating: 5,
        image: null
    },
    {
        id: 'r8',
        name: 'Sukarnod Putra',
        text: 'Recomend krupuk boyolali nya, enak gurih renyah. Top krupuknya',
        rating: 5,
        image: null
    },
    {
        id: 'r9',
        name: 'VELL',
        text: 'kerupuknya enak banget selalu pesan terus dan terus. kerupuknya renyah dan nga keras. recomend banget kerupuk asli boyolali',
        rating: 5,
        image: null
    },
    {
        id: 'r10',
        name: 'Johan Pramusinto',
        text: 'Rambaknya bersih gurih renyah dijamin rasanya enak beda sama yang lain pasti nagihhh buat lauk makan apapun cocok kakak ...👍',
        rating: 5,
        image: null
    },
    {
        id: 'r11',
        name: 'Ari Warokka',
        text: 'It is the best traditional crackers snack for those who love "rambak" for their snacks. It is so crispy, tasteful, and make you cannot stop keeping eating this snack. It is also so affordable and really a value-for-money to buy it.',
        rating: 5,
        image: null
    },
    {
        id: 'r12',
        name: 'Johan Pramusinto',
        text: 'Krupuk mantep gurih,,tidak mengecewakan,,hati" ketagihan',
        rating: 5,
        image: null
    },
    {
        id: 'r13',
        name: 'sisie melanie',
        text: 'Enak, garing, bikin nagih dan gak bikin batuk',
        rating: 5,
        image: null
    },
    {
        id: 'r14',
        name: 'Ketty Darmadjaya',
        text: 'renyah dan gurih, gak bikin sakit tenggorokan, pokoknya maknyuuus',
        rating: 5,
        image: null
    },
    {
        id: 'r15',
        name: 'Ade Anggra',
        text: 'Kerupuknya enak.. gurih.. garing.. ga bikin sakit tenggorokan, mantaplah..',
        rating: 5,
        image: null
    },
    {
        id: 'r16',
        name: 'Prast Tewek',
        text: 'Benar2 gurih dan renyah..tidak gatal di tenggorokan',
        rating: 5,
        image: null
    },
    {
        id: 'r17',
        name: 'Tara Ayusty Shinta Dewi',
        text: 'Top mantab is the best 👌',
        rating: 5,
        image: null
    },
    {
        id: 'r18',
        name: 'Yuyun Salsa',
        text: 'Enak gurih renyak nggak gatel di tenggorokan,prosesnya 2x penggorengan. Semoga laris terus.',
        rating: 5,
        image: null
    },
    {
        id: 'r19',
        name: 'Charintya Astarie',
        text: 'Rate 10/10 banget, kerupuknya renyah, gurih, ga melempem, gk bau apek, kerupuknya bersih.. enak banget beda sm dipasaran.. packingnya rapih dan rapet.. sukses terus usahanya.. berkah barokah utk penjual dan pembeli.. aamiin ya allah',
        rating: 5,
        image: null
    },
    {
        id: 'r20',
        name: 'NUR HELIDA SANI',
        text: 'Ga bisa sedikit makan kerupuk nya klo sudah buka toples kerupuk. Renyah, di goreng dadakan sesuai PO. Lihat review nya, langsung order banyak sekalian stok lebaran untuk teman makan ketupat sayur, bakso, dll',
        rating: 5,
        image: null
    },
    {
        id: 'r21',
        name: 'Amalia Dwi Satuti',
        text: 'Uenakkkkeee polll. Make a charge. Just change the snack. It\'s very tasty.',
        rating: 5,
        image: null
    },
    {
        id: 'r22',
        name: '45_Singgih Wibisono',
        text: 'Mantap kerupuk rambaknya.',
        rating: 5,
        image: null
    }
];


// ============= UTILITY FUNCTIONS =============
function getStars(rating) {
    return Array.from({ length: 5 }, (_, i) => 
        i < rating ? '<i class="ph-fill ph-star"></i>' : '<i class="ph ph-star"></i>'
    ).join('');
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
        <div class="bg-brand-bg rounded-xl md:rounded-2xl overflow-hidden border border-brand-gold/20 hover:shadow-xl transition-shadow duration-300 group fade-up" id="card-${product.id}">
            <div class="h-48 md:h-64 overflow-hidden relative">
                <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=800&auto=format&fit=crop'">
                ${(product.id === 'p1' || product.id === 'p6') ? `<div class="absolute top-3 right-3 md:top-4 md:right-4 bg-brand-nav backdrop-blur px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold text-white shadow-sm">Best Seller</div>` : ''}
            </div>
            <div class="p-5 md:p-8">
                <h4 class="font-serif text-lg md:text-2xl font-bold text-brand-dark mb-1 md:mb-2">${escapeHtml(product.name)}</h4>
                <p class="text-xs md:text-sm text-brand-brown/80 mb-4 md:mb-6 min-h-[36px] md:min-h-[40px]">${escapeHtml(product.description)}</p>
                
                <div class="flex items-end justify-between mb-4 md:mb-6">
                    <div>
                        <span class="text-[10px] md:text-xs text-brand-nav uppercase tracking-wider font-semibold block mb-0.5 md:mb-1">Harga</span>
                        <span class="text-xl md:text-2xl font-bold text-brand-dark">${escapeHtml(product.price)}</span>
                    </div>
                </div>

                <a href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo Kerupuk Rambak Adi, saya mau pesan ' + product.name)}" target="_blank" class="w-full block text-center py-2.5 md:py-3 bg-brand-green text-white text-sm md:text-base font-medium rounded-lg hover:bg-brand-greenhover transition-colors shadow-md shadow-brand-green/20">
                    <i class="ph ph-whatsapp-logo mr-1"></i> Pesan via WhatsApp
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
        document.getElementById('review-avg-stars').innerHTML = getStars(avgStars);
        document.getElementById('review-count').textContent = 'Dari ' + reviewsData.length + ' Ulasan Pelanggan';
    }
    
    if (reviewsData.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <p class="text-center text-brand-brown">Belum ada ulasan.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = reviewsData.map(review => `
        <div class="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-md border-b-4 border-brand-gold relative fade-up">
            <i class="ph-fill ph-quotes text-3xl md:text-4xl text-brand-gold/10 absolute top-3 right-3 md:top-4 md:right-4"></i>
            <p class="text-brand-brown/90 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 relative z-10">
                "${escapeHtml(review.text)}"
            </p>
            <div class="flex items-center gap-2 md:gap-3">
                <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-nav text-white flex items-center justify-center font-bold text-xs md:text-base">${getInitial(review.name)}</div>
                <div>
                    <h5 class="font-bold text-brand-dark text-xs md:text-sm">${escapeHtml(review.name)}</h5>
                    <div class="flex text-brand-gold text-[10px] md:text-xs">
                        ${getStars(review.rating)}
                    </div>
                </div>
            </div>
        </div>
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
