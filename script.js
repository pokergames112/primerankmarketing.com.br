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

    // --- 4. CARROSSEL DE SERVIÇOS (NOSSAS SOLUÇÕES DIGITAIS) - AUTOMÁTICO ---
    new Swiper(".mySwiper", {
        loop: true, 
        autoplay: {
            delay: 3000, // Passa automaticamente a cada 3 segundos
            disableOnInteraction: false, 
            pauseOnMouseEnter: false,
        },
        speed: 800, 
        observer: true,
        observeParents: true,
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

    // --- 5. CARROSSEL DE FERRAMENTAS / MARCAS (ESTEIRA INFINITA AUTOMÁTICA) ---
    new Swiper(".mySwiperMarcas", {
        loop: true,
        speed: 4000, 
        autoplay: {
            delay: 0,
            disableOnInteraction: false, 
            pauseOnMouseEnter: false, 
        },
        allowTouchMove: false, 
        freeMode: true,
        observer: true,
        observeParents: true,
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

    // --- 6. CARROSSEL DE AVALIAÇÕES & DEPOIMENTOS - AUTOMÁTICO ---
    new Swiper(".mySwiperReviews", {
        loop: true, 
        autoplay: { 
            delay: 3500, // Passa automaticamente a cada 3.5 segundos
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
        },
        speed: 800, 
        observer: true,
        observeParents: true,
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

    // --- 9. CURSOR CUSTOMIZADO (DOT & CIRCLE TRAILING - ESTILO OCEAN MARINE SERVICES) ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorCircle = document.getElementById('cursor-circle');

    if (cursorDot && cursorCircle && window.innerWidth > 992) {
        let mouseX = -100, mouseY = -100;
        let circleX = -100, circleY = -100;
        const smoothingFactor = 0.18;
        let hasMoved = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!hasMoved) {
                hasMoved = true;
                circleX = mouseX;
                circleY = mouseY;
                cursorDot.style.opacity = '1';
                cursorCircle.style.opacity = '1';
            }

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorCircle.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            if (hasMoved) {
                cursorDot.style.opacity = '1';
                cursorCircle.style.opacity = '1';
            }
        });

        // Reação a elementos clicáveis (hover expand)
        const clickables = 'a, button, input, select, textarea, .btn, .servico-card, .diferencial-card, .step-card, .review-box, .platform-pill, .btn-leia-mais, .hamburger-btn, .modal-close, #scrollToTopBtn';

        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(clickables)) {
                cursorCircle.classList.add('hover');
                cursorDot.classList.add('hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(clickables)) {
                cursorCircle.classList.remove('hover');
                cursorDot.classList.remove('hover');
            }
        });

        document.addEventListener('mousedown', () => {
            cursorCircle.classList.add('click');
        });

        document.addEventListener('mouseup', () => {
            cursorCircle.classList.remove('click');
        });

        // Loop de animação contínua e suave para o círculo que persegue o cursor
        function animateCircle() {
            const deltaX = mouseX - circleX;
            const deltaY = mouseY - circleY;

            circleX += deltaX * smoothingFactor;
            circleY += deltaY * smoothingFactor;

            cursorCircle.style.left = `${circleX}px`;
            cursorCircle.style.top = `${circleY}px`;

            requestAnimationFrame(animateCircle);
        }
        animateCircle();
    }

    // --- 10. FUNDO TECNOLÓGICO INTERATIVO COM SCROLL (CYBER MESH MATRIX) ---
    const canvas = document.getElementById('tech-bg-canvas');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });

        // Gerador de partículas cibernéticas e nós de dados
        const particleCount = width < 768 ? 30 : 65;
        const particles = [];
        const colors = [
            'rgba(145, 57, 229, ', // Neon Violet (#9139E5)
            'rgba(177, 121, 242, ', // Purple Soft (#B179F2)
            'rgba(0, 255, 136, ',   // Neon Emerald (#00ff88)
            'rgba(0, 229, 255, ',   // Cyan Cyber (#00e5ff)
            'rgba(237, 229, 249, '  // Light Lavender (#EDE5F9)
        ];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * 0.85 + 0.15,
                radius: Math.random() * 2 + 1.2,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                colorPrefix: colors[Math.floor(Math.random() * colors.length)],
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.03
            });
        }

        let lastScrollY = window.scrollY || window.pageYOffset;
        let scrollVelocity = 0;
        let currentMouse = { x: -1000, y: -1000 };

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY || window.pageYOffset;
            scrollVelocity = (currentScroll - lastScrollY) * 0.5;
            lastScrollY = currentScroll;
        }, { passive: true });

        window.addEventListener('mousemove', (e) => {
            currentMouse.x = e.clientX;
            currentMouse.y = e.clientY;
        }, { passive: true });

        let isTabActive = true;
        document.addEventListener('visibilitychange', () => {
            isTabActive = !document.hidden;
        });

        const maxConnectionDist = width < 768 ? 100 : 140;

        const animateTechCanvas = () => {
            if (!isTabActive) {
                requestAnimationFrame(animateTechCanvas);
                return;
            }

            ctx.clearRect(0, 0, width, height);

            scrollVelocity *= 0.92;
            const absSpeed = Math.abs(scrollVelocity);

            // Conexões neurais entre nós próximos
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxConnectionDist) {
                        const alpha = (1 - dist / maxConnectionDist) * (0.18 + Math.min(absSpeed * 0.02, 0.25)) * particles[i].z;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(177, 121, 242, ${alpha})`;
                        ctx.lineWidth = 0.8 * particles[i].z;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Atualiza e desenha partículas com reação ao scroll e mouse
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                p.x += p.vx;
                const scrollOffset = scrollVelocity * p.z * 0.7;
                p.y += p.vy - scrollOffset;

                // Interação com o mouse
                const mdx = currentMouse.x - p.x;
                const mdy = currentMouse.y - p.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < 120) {
                    const force = (1 - mDist / 120) * 1.6;
                    p.x -= (mdx / mDist) * force;
                    p.y -= (mdy / mDist) * force;
                }

                if (p.x < -20) p.x = width + 20;
                if (p.x > width + 20) p.x = -20;
                if (p.y < -20) p.y = height + 20;
                if (p.y > height + 20) p.y = -20;

                p.pulse += p.pulseSpeed;
                const currentAlpha = 0.4 + Math.sin(p.pulse) * 0.3;

                // Rastro de dobra espacial no scroll rápido
                if (absSpeed > 1.5) {
                    ctx.beginPath();
                    ctx.strokeStyle = `${p.colorPrefix}${Math.min(currentAlpha, 0.6)})`;
                    ctx.lineWidth = p.radius * p.z * 0.7;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x, p.y + scrollOffset * 2);
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
                ctx.fillStyle = `${p.colorPrefix}${currentAlpha})`;
                ctx.shadowBlur = 8 * p.z;
                ctx.shadowColor = 'rgba(145, 57, 229, 0.7)';
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            requestAnimationFrame(animateTechCanvas);
        };

        requestAnimationFrame(animateTechCanvas);
    }
});