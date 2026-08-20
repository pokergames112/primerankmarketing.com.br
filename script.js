document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENU HAMBÚRGUER & MOBILE ---
    const hamburgerBtn = document.getElementById('hamburgerBtn') || document.querySelector('.hamburger-btn');
    const menuMobile = document.getElementById('menuMobile') || document.querySelector('.menu-mobile');
    
    if (hamburgerBtn && menuMobile) {
        hamburgerBtn.addEventListener('click', () => {
            menuMobile.classList.toggle('active');
            hamburgerBtn.classList.toggle('is-open'); 
        });
        
        menuMobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuMobile.classList.remove('active');
                hamburgerBtn.classList.remove('is-open');
            });
        });
    }

    // --- 2. ROLAGAGE SUAVE DOS LINKS DE ÂNCORA ---
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- 3. HEADER INTELIGENTE & BOTÃO VOLTAR AO TOPO (ESTILO DRA. ALINE) ---
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;

        // Header Show/Hide
        if (header) {
            if (currentScroll > 80) {
                if (currentScroll > lastScrollTop) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
            } else {
                header.classList.remove('hidden');
            }
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

        // Botão Voltar ao Topo (aparece após 300px)
        if (scrollToTopBtn) {
            if (currentScroll > 300) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        }
    }, { passive: true });

    // Funcionalidade de clique Voltar ao Topo
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. CARROSSEL DE SERVIÇOS (NOSSAS SOLUÇÕES DIGITAIS) ---
    new Swiper(".mySwiper", {
        loop: true, 
        autoplay: {
            delay: 4500,
            disableOnInteraction: false, 
        },
        speed: 800, 
        navigation: {
            nextEl: ".mySwiper .swiper-button-next",
            prevEl: ".mySwiper .swiper-button-prev",
        },
        pagination: {
            el: ".mySwiper .swiper-pagination",
            clickable: true,
        },
        slidesPerView: 1, 
        spaceBetween: 20, 
        breakpoints: {
            640: { 
                slidesPerView: 1.5,
                spaceBetween: 20 
            },
            768: { 
                slidesPerView: 2,
                spaceBetween: 25 
            },
            1024: { 
                slidesPerView: 3, 
                spaceBetween: 30 
            },
        },
    });

    // --- 5. CARROSSEL DE FERRAMENTAS / MARCAS (ESTEIRA INFINITA) ---
    new Swiper(".mySwiperMarcas", {
        loop: true,
        speed: 5000, 
        autoplay: {
            delay: 0,
            disableOnInteraction: false, 
            pauseOnMouseEnter: false, 
        },
        allowTouchMove: false, 
        freeMode: true,
        slidesPerView: 2, 
        spaceBetween: 25,
        breakpoints: {
            640: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            768: { 
                slidesPerView: 4, 
                spaceBetween: 35 
            },
            1024: { 
                slidesPerView: 5, 
                spaceBetween: 40 
            },
        },
    });

    // --- 6. CARROSSEL DE AVALIAÇÕES & DEPOIMENTOS ---
    new Swiper(".mySwiperReviews", {
        loop: true, 
        autoplay: { 
            delay: 5000,
            disableOnInteraction: false
        },
        speed: 800, 
        slidesPerView: 1, 
        spaceBetween: 25, 
        pagination: {
            el: ".mySwiperReviews .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: { 
                slidesPerView: 2,
                spaceBetween: 25
            },
            1024: { 
                slidesPerView: 3,
                spaceBetween: 30
            },
        },
    });

    // --- 7. LÓGICA DO MODAL DE DETALHES ---
    const modalContainer = document.getElementById('modal-container');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    const openModal = (titulo, descricao) => {
        if(modalTitle && modalDescription && modalContainer) {
            modalTitle.innerHTML = titulo;
            modalDescription.innerHTML = descricao;
            modalContainer.style.display = 'flex';
            modalContainer.classList.add('active');
            modalContainer.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        if(modalContainer) {
            modalContainer.classList.remove('active');
            modalContainer.style.display = 'none';
            modalContainer.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
        }
    };

    document.querySelectorAll('.btn-leia-mais').forEach(button => {
        button.addEventListener('click', () => {
            openModal(button.getAttribute('data-titulo'), button.getAttribute('data-descricao'));
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modalContainer) closeModal();
    });

    // --- 8. RASTREAMENTO DE CONVERSÃO WHATSAPP ---
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