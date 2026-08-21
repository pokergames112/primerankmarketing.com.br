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

    // --- 9. CURSOR TECNOLÓGICO FUTURISTA COM MIRA/TARGET (DESKTOP) ---
    const customCursor = document.getElementById('customCursor');
    if (customCursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        let isCursorActive = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isCursorActive) {
                isCursorActive = true;
                customCursor.classList.add('is-active');
            }
        }, { passive: true });

        document.addEventListener('mouseleave', () => {
            customCursor.classList.remove('is-active');
            isCursorActive = false;
        });

        document.addEventListener('mouseenter', () => {
            customCursor.classList.add('is-active');
            isCursorActive = true;
        });

        // Efeito de trava de mira (Target Lock) em elementos interativos
        const interactiveElements = 'a, button, input, select, textarea, .btn, .servico-card, .diferencial-card, .step-card, .review-box, .platform-pill, .btn-leia-mais, .hamburger-btn, .modal-close';
        
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(interactiveElements)) {
                customCursor.classList.add('cursor-hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(interactiveElements)) {
                customCursor.classList.remove('cursor-hover');
            }
        });

        document.addEventListener('mousedown', () => {
            customCursor.classList.add('cursor-click');
        });

        document.addEventListener('mouseup', () => {
            customCursor.classList.remove('cursor-click');
        });

        // Loop de interpolação suave (Lerp) para a mira acompanhar com precisão e fluidez
        const renderCursor = () => {
            // Suavização do anel externo (retículo)
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;

            customCursor.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

            requestAnimationFrame(renderCursor);
        };
        renderCursor();
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

        // Gerador de partículas cibernéticas
        const particleCount = width < 768 ? 28 : 55;
        const particles = [];
        const colors = [
            'rgba(145, 57, 229, ', // Neon Violet (#9139E5)
            'rgba(177, 121, 242, ', // Purple Soft (#B179F2)
            'rgba(0, 255, 136, ',   // Neon Cyber Accent (#00ff88)
            'rgba(237, 229, 249, '  // Light Lavender (#EDE5F9)
        ];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * 0.8 + 0.2, // Profundidade 3D
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
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
            scrollVelocity = (currentScroll - lastScrollY) * 0.4;
            lastScrollY = currentScroll;
        }, { passive: true });

        window.addEventListener('mousemove', (e) => {
            currentMouse.x = e.clientX;
            currentMouse.y = e.clientY;
        }, { passive: true });

        // Loop de Renderização e Animação Cibernética
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

            // Suaviza velocidade de scroll
            scrollVelocity *= 0.92;

            // Desenha conexões cibernéticas (Neural Cyber Grid)
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxConnectionDist) {
                        const alpha = (1 - dist / maxConnectionDist) * 0.18 * particles[i].z;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(145, 57, 229, ${alpha})`;
                        ctx.lineWidth = 0.8 * particles[i].z;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Atualiza e desenha partículas com Parallax de Scroll
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Movimento orgânico base + distorção com a velocidade do scroll (profundidade 3D)
                p.x += p.vx;
                p.y += p.vy - (scrollVelocity * p.z * 0.6);

                // Interação sutil de proximidade com o cursor do mouse
                const mdx = currentMouse.x - p.x;
                const mdy = currentMouse.y - p.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < 120) {
                    const force = (1 - mDist / 120) * 1.5;
                    p.x -= (mdx / mDist) * force;
                    p.y -= (mdy / mDist) * force;
                }

                // Loop infinito nas bordas da tela
                if (p.x < -20) p.x = width + 20;
                if (p.x > width + 20) p.x = -20;
                if (p.y < -20) p.y = height + 20;
                if (p.y > height + 20) p.y = -20;

                // Pulso de brilho tecnológico
                p.pulse += p.pulseSpeed;
                const currentAlpha = 0.35 + Math.sin(p.pulse) * 0.25;

                // Desenho do nó / partícula
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
                ctx.fillStyle = `${p.colorPrefix}${currentAlpha})`;
                ctx.shadowBlur = 8 * p.z;
                ctx.shadowColor = 'rgba(145, 57, 229, 0.6)';
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            requestAnimationFrame(animateTechCanvas);
        };

        requestAnimationFrame(animateTechCanvas);
    }
});