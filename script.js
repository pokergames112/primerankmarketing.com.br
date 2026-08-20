document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const menuMobile = document.querySelector('.menu-mobile');
    
    if (hamburgerBtn && menuMobile) {
        hamburgerBtn.addEventListener('click', () => {
            menuMobile.classList.toggle('active');
            hamburgerBtn.classList.toggle('is-open'); 

            if (!menuMobile.classList.contains('active')) {
                 const dropdown = document.querySelector('.dropdown');
                 if(dropdown) dropdown.classList.remove('active');
            }
        });
    }
    
    const menuLinks = document.querySelectorAll('.menu-mobile a[href^="#"]');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuMobile.classList.remove('active');
            hamburgerBtn.classList.remove('is-open');
        });
    });
    
    // --- LÓGICA DO DROPDOWN PARA MOBILE ---
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdown = document.querySelector('.dropdown');
    
    if(dropdownBtn && dropdown) {
        dropdownBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            dropdown.classList.toggle('active');
        });
    }

    // --- LÓGICA DE ROLAGEM SUAVE ---
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.getAttribute('href').startsWith('#')) return; 
            
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, 
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- HEADER INTELIGENTE ---
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    if(header) {
        window.addEventListener('scroll', () => {
            let currentScroll = window.scrollY || document.documentElement.scrollTop;

            if (currentScroll > 80) {
                if (currentScroll > lastScrollTop) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
            } else {
                header.classList.remove('hidden');
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }, false);
    }
    
    // --- BOTÃO VOLTAR AO TOPO ---
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if(scrollBtn) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollBtn.style.display = "block";
            } else {
                scrollBtn.style.display = "none";
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 1. CARROSSEL DE ARMAÇÕES (CATÁLOGO) ---
    new Swiper(".mySwiper", {
        loop: true, 
        autoplay: {
            delay: 5000,
            disableOnInteraction: false, 
        },
        speed: 1000, 
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        slidesPerView: 1, 
        spaceBetween: 20, 
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
        },
    });

    // --- 2. CARROSSEL DE MARCAS (ESTEIRA INFINITA - 4 LOGOS NO DESKTOP) ---
    new Swiper(".mySwiperMarcas", {
        loop: true,
        speed: 6000, 
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false, 
        },
        allowTouchMove: false, 
        freeMode: true,
        slidesPerView: 2, // Mobile mostra 2
        spaceBetween: 30,
        breakpoints: {
            768: { 
                slidesPerView: 3, 
                spaceBetween: 40 
            },
            1024: { 
                slidesPerView: 4, // Desktop fixo em 4 conforme solicitado
                spaceBetween: 50 
            },
        },
    });

    // --- 3. CARROSSEL DE AVALIAÇÕES DOS CLIENTES ---
    new Swiper(".mySwiperReviews", {
        loop: true, 
        autoplay: { delay: 5000 },
        speed: 800, 
        slidesPerView: 1, 
        spaceBetween: 30, 
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 2 },
        },
    });

    // --- LÓGICA DO MODAL (LEIA MAIS) ---
    const modalContainer = document.getElementById('modal-container');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    const openModal = (titulo, descricao) => {
        if(modalTitle && modalDescription && modalContainer) {
            modalTitle.innerHTML = titulo;
            modalDescription.innerHTML = descricao;
            modalContainer.style.display = 'flex'; 
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        if(modalContainer) {
            modalContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    document.querySelectorAll('.btn-leia-mais').forEach(button => {
        button.addEventListener('click', () => {
            openModal(button.getAttribute('data-titulo'), button.getAttribute('data-descricao'));
        });
    });

    if(modalClose) modalClose.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modalContainer) closeModal();
    });

    // --- RASTREAMENTO DE CONVERSÃO ---
    const whatsappButtons = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'conversion', {'send_to': 'AW-17614495292/CONTATO_WHATSAPP'});
            }
            if (typeof fbq === 'function') {
                fbq('track', 'Lead');
            }
        });
    });
});