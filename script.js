document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENU HAMBÚRGUER & MOBILE NAVEGAÇÃO ---
    const hamburgerBtn = document.getElementById('hamburgerBtn') || document.querySelector('.hamburger-btn');
    const menuMobile = document.getElementById('menuMobile') || document.querySelector('.menu-mobile');
    
    if (hamburgerBtn && menuMobile) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = menuMobile.classList.toggle('active');
            hamburgerBtn.classList.toggle('is-open', isOpen);
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Fecha ao clicar em qualquer item do menu
        menuMobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuMobile.classList.remove('active');
                hamburgerBtn.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });

        // Fecha ao clicar fora do menu
        document.addEventListener('click', (e) => {
            if (menuMobile.classList.contains('active') && !menuMobile.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                menuMobile.classList.remove('active');
                hamburgerBtn.classList.remove('is-open');
                document.body.style.overflow = '';
            }
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
    
    // --- 3. HEADER INTELIGENTE & BOTÃO VOLTAR AO TOPO ---
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;

        // Se o menu mobile estiver aberto, NUNCA esconde o header
        if (menuMobile && menuMobile.classList.contains('active')) {
            if (header) header.classList.remove('hidden');
            return;
        }

        // Header Show/Hide suave apenas em telas maiores
        if (header) {
            if (window.innerWidth > 768) {
                if (currentScroll > 120) {
                    if (currentScroll > lastScrollTop + 10) {
                        header.classList.add('hidden');
                    } else if (currentScroll < lastScrollTop - 10) {
                        header.classList.remove('hidden');
                    }
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

    // --- 10. REDE NEURAL INTERATIVA ESTILO OBSIDIAN GRAPH (COM NÓS LATERAIS & IMPULSOS ELÉTRICOS) ---
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
            initNeuralNetwork();
        };

        // Estrutura de Nós Neurais (Obsidian Graph Nodes)
        let nodes = [];
        let springs = [];
        let synapticSparks = [];
        let backgroundStars = [];

        const nodeColors = [
            { base: '#9139E5', glow: 'rgba(145, 57, 229, 0.8)', rgb: '145, 57, 229' },
            { base: '#B179F2', glow: 'rgba(177, 121, 242, 0.8)', rgb: '177, 121, 242' },
            { base: '#00ff88', glow: 'rgba(0, 255, 136, 0.9)', rgb: '0, 255, 136' },
            { base: '#00e5ff', glow: 'rgba(0, 229, 255, 0.9)', rgb: '0, 229, 255' }
        ];

        function initNeuralNetwork() {
            nodes = [];
            springs = [];
            synapticSparks = [];
            backgroundStars = [];

            // 1. Chuviscos de Fundo (Estrelas / Micro-partículas)
            const starCount = width < 768 ? 40 : 85;
            for (let i = 0; i < starCount; i++) {
                backgroundStars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5 + 0.5,
                    alpha: Math.random() * 0.5 + 0.2,
                    speedY: (Math.random() - 0.5) * 0.3,
                    speedX: (Math.random() - 0.5) * 0.3,
                    pulse: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.02 + Math.random() * 0.03
                });
            }

            // 2. Neurônios Principais posicionados estrategicamente nas LATERAIS e fundo (Clusters Obsidian)
            const isMobile = width < 768;
            const lateralNodeCount = isMobile ? 18 : 42;

            for (let i = 0; i < lateralNodeCount; i++) {
                // Distribuição com maior densidade nas bordas esquerda e direita (0% a 25% e 75% a 100%)
                const isLeft = Math.random() < 0.5;
                let x;
                if (!isMobile) {
                    x = isLeft ? Math.random() * (width * 0.28) + 20 : width - (Math.random() * (width * 0.28) + 20);
                } else {
                    x = Math.random() * width;
                }
                const y = Math.random() * height;

                const isCore = Math.random() < 0.25; // Neurônio principal maior (Hub Soma)
                const colorObj = nodeColors[Math.floor(Math.random() * nodeColors.length)];

                nodes.push({
                    x: x,
                    y: y,
                    origX: x,
                    origY: y,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: isCore ? Math.random() * 2.5 + 3.5 : Math.random() * 1.5 + 1.8,
                    isCore: isCore,
                    color: colorObj,
                    mass: isCore ? 2.5 : 1,
                    pulse: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.03 + Math.random() * 0.04,
                    connections: []
                });
            }

            // 3. Conexões de Axônios e Sinapses (Molas elásticas estilo Obsidian Graph)
            const maxConnectDist = isMobile ? 120 : 180;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxConnectDist) {
                        springs.push({
                            nodeA: nodes[i],
                            nodeB: nodes[j],
                            length: dist * 0.9,
                            strength: 0.0008,
                            dist: dist
                        });
                        nodes[i].connections.push(nodes[j]);
                        nodes[j].connections.push(nodes[i]);
                    }
                }
            }

            // 4. Criação dos Impulsos Elétricos Sinápticos (Sparks)
            const sparkCount = isMobile ? 8 : 22;
            for (let i = 0; i < sparkCount; i++) {
                if (springs.length > 0) {
                    const randomSpring = springs[Math.floor(Math.random() * springs.length)];
                    synapticSparks.push({
                        spring: randomSpring,
                        progress: Math.random(),
                        speed: 0.008 + Math.random() * 0.015,
                        color: Math.random() < 0.6 ? '#00ff88' : '#ffffff'
                    });
                }
            }
        }

        initNeuralNetwork();
        window.addEventListener('resize', resizeCanvas, { passive: true });

        let lastScrollY = window.scrollY || window.pageYOffset;
        let scrollVelocity = 0;
        let mouseX = -1000, mouseY = -1000;
        let isMouseDown = false;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY || window.pageYOffset;
            scrollVelocity = (currentScroll - lastScrollY) * 0.5;
            lastScrollY = currentScroll;
        }, { passive: true });

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        window.addEventListener('mousedown', () => {
            isMouseDown = true;
            // Explosão de impulsos neurais no clique
            if (springs.length > 0) {
                for (let i = 0; i < 6; i++) {
                    const randomSpring = springs[Math.floor(Math.random() * springs.length)];
                    synapticSparks.push({
                        spring: randomSpring,
                        progress: 0,
                        speed: 0.02 + Math.random() * 0.02,
                        color: '#00ff88'
                    });
                }
            }
        });

        window.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        let isTabActive = true;
        document.addEventListener('visibilitychange', () => {
            isTabActive = !document.hidden;
        });

        // Loop de Renderização e Física Elástica Obsidian
        const animateNeuralGraph = () => {
            if (!isTabActive) {
                requestAnimationFrame(animateNeuralGraph);
                return;
            }

            ctx.clearRect(0, 0, width, height);

            scrollVelocity *= 0.92;

            // --- A. DESENHO DOS CHUVISCOS / ESTRELAS DE FUNDO ---
            for (let i = 0; i < backgroundStars.length; i++) {
                const s = backgroundStars[i];
                s.x += s.speedX;
                s.y += s.speedY - (scrollVelocity * 0.3);

                if (s.x < 0) s.x = width;
                if (s.x > width) s.x = 0;
                if (s.y < 0) s.y = height;
                if (s.y > height) s.y = 0;

                s.pulse += s.pulseSpeed;
                const starAlpha = s.alpha * (0.6 + Math.sin(s.pulse) * 0.4);

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(177, 121, 242, ${starAlpha})`;
                ctx.shadowBlur = 4;
                ctx.shadowColor = 'rgba(145, 57, 229, 0.5)';
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // --- B. FÍSICA DAS MOLAS E CONEXÕES OBSIDIAN GRAPH ---
            for (let i = 0; i < springs.length; i++) {
                const sp = springs[i];
                const na = sp.nodeA;
                const nb = sp.nodeB;

                const dx = nb.x - na.x;
                const dy = nb.y - na.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;

                // Força de atração / repulsão da mola (Hooke's Law)
                const force = (dist - sp.length) * sp.strength;
                const fx = (dx / dist) * force;
                const fy = (dy / dist) * force;

                na.vx += fx / na.mass;
                na.vy += fy / na.mass;
                nb.vx -= fx / nb.mass;
                nb.vy -= fy / nb.mass;

                // Desenho dos Axônios / Sinapses com transparência dinâmica
                const maxD = width < 768 ? 140 : 200;
                if (dist < maxD) {
                    const alpha = Math.max(0, (1 - dist / maxD) * 0.35);
                    ctx.beginPath();
                    ctx.moveTo(na.x, na.y);
                    ctx.lineTo(nb.x, nb.y);
                    ctx.strokeStyle = `rgba(177, 121, 242, ${alpha})`;
                    ctx.lineWidth = sp.nodeA.isCore || sp.nodeB.isCore ? 1.2 : 0.75;
                    ctx.stroke();
                }
            }

            // --- C. IMPULSOS ELÉTRICOS SINÁPTICOS (SPARKS TRAVESSANDO AXÔNIOS) ---
            for (let i = synapticSparks.length - 1; i >= 0; i--) {
                const spark = synapticSparks[i];
                spark.progress += spark.speed;

                if (spark.progress > 1) {
                    // Escolhe uma nova conexão vizinha aleatória
                    const nextNode = spark.spring.nodeB;
                    if (nextNode.connections && nextNode.connections.length > 0) {
                        const nextTarget = nextNode.connections[Math.floor(Math.random() * nextNode.connections.length)];
                        spark.spring = { nodeA: nextNode, nodeB: nextTarget };
                        spark.progress = 0;
                    } else {
                        spark.progress = 0;
                    }
                }

                const na = spark.spring.nodeA;
                const nb = spark.spring.nodeB;
                const sx = na.x + (nb.x - na.x) * spark.progress;
                const sy = na.y + (nb.y - na.y) * spark.progress;

                // Desenha faísca/impulso elétrico brilhante
                ctx.beginPath();
                ctx.arc(sx, sy, 2, 0, Math.PI * 2);
                ctx.fillStyle = spark.color;
                ctx.shadowBlur = 8;
                ctx.shadowColor = spark.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // --- D. ATUALIZAÇÃO E INTERAÇÃO COM O MOUSE NOS NÓS NEURAIS ---
            const mouseRadius = isMouseDown ? 240 : 160;

            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];

                // Movimento do scroll
                node.y -= scrollVelocity * 0.65;

                // Interação Magnética com o Mouse (Puxar / Empurrar estilo Obsidian)
                const mdx = mouseX - node.x;
                const mdy = mouseY - node.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

                if (mDist < mouseRadius && mDist > 0) {
                    // Gravidade Obsidian: atrai suavemente o nó na direção do cursor e move o cluster
                    const factor = (1 - mDist / mouseRadius);
                    const force = isMouseDown ? factor * 4.5 : factor * 2.2;
                    node.vx += (mdx / mDist) * force;
                    node.vy += (mdy / mDist) * force;

                    // Conexão direta de energia com o ponteiro do mouse
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.strokeStyle = `rgba(0, 255, 136, ${factor * 0.45})`;
                    ctx.lineWidth = 1.2;
                    ctx.stroke();
                }

                // Amortecimento / Fricção
                node.vx *= 0.94;
                node.vy *= 0.94;

                // Retorno elástico suave para a posição de origem lateral
                const returnX = (node.origX - node.x) * 0.008;
                const returnY = (node.origY - node.y) * 0.008;
                node.vx += returnX;
                node.vy += returnY;

                node.x += node.vx;
                node.y += node.vy;

                // Limites de tela infinitos
                if (node.x < -40) node.x = width + 40;
                if (node.x > width + 40) node.x = -40;
                if (node.y < -40) node.y = height + 40;
                if (node.y > height + 40) node.y = -40;

                // Pulso biológico do neurônio
                node.pulse += node.pulseSpeed;
                const currentRadius = node.radius + Math.sin(node.pulse) * (node.isCore ? 1.2 : 0.5);

                // Desenho do Neurônio (Soma)
                ctx.beginPath();
                ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
                ctx.fillStyle = node.color.base;
                ctx.shadowBlur = node.isCore ? 14 : 8;
                ctx.shadowColor = node.color.glow;
                ctx.fill();

                // Anel externo pulsante para nós principais (Hubs)
                if (node.isCore) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, currentRadius * 1.8, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(${node.color.rgb}, ${0.35 + Math.sin(node.pulse) * 0.25})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                ctx.shadowBlur = 0;
            }

            requestAnimationFrame(animateNeuralGraph);
        };

        requestAnimationFrame(animateNeuralGraph);
    }
    // --- 11. CARREGADOR DINÂMICO DE ARTIGOS DO BLOG VIA API (VERCEL SERVERLESS) ---
    async function carregarArtigosBlog() {
        var feedContainer = document.getElementById('blog-posts-feed');
        if (!feedContainer) return;

        var API_BACKEND = 'https://primerank-agente.vercel.app';
        var FALLBACK_API_BACKEND = 'https://primerank-blog-agent.vercel.app';

        function renderPosts(postsList) {
            if (!postsList || postsList.length === 0) return;
            var html = '';
            for (var i = 0; i < postsList.length; i++) {
                var post = postsList[i];
                var internalUrl = post.slug ? 'post.html?slug=' + encodeURIComponent(post.slug) : 'post.html';
                var postImg = post.featuredImageUrl || post.imageUrl || 'img/service_blog.jpg';
                var postDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('pt-BR') : (post.date || 'Recente');
                var postReadTime = post.readingTimeMinutes ? post.readingTimeMinutes + ' min de leitura' : (post.readTime || '8 min de leitura');

                html += '<article class="blog-card-site">';
                html += '  <div class="blog-card-img-wrap">';
                html += '    <img src="' + postImg + '" alt="' + post.title + '" class="blog-card-img" loading="lazy">';
                html += '    <span class="blog-card-badge">' + (post.category || 'Estratégia') + '</span>';
                html += '  </div>';
                html += '  <div class="blog-card-body">';
                html += '    <div class="blog-card-meta">';
                html += '      <span>📅 ' + postDate + '</span>';
                html += '      <span>⏱️ ' + postReadTime + '</span>';
                html += '    </div>';
                html += '    <h3>' + post.title + '</h3>';
                html += '    <p>' + post.excerpt + '</p>';
                html += '    <a href="' + internalUrl + '" target="_blank" rel="noopener noreferrer" class="btn-blog-ler">LER ARTIGO COMPLETO ↗</a>';
                html += '  </div>';
                html += '</article>';
            }
            feedContainer.innerHTML = html;
        }

        try {
            var controller = new AbortController();
            var timeoutId = setTimeout(function() { controller.abort(); }, 10000);

            var res = await fetch(API_BACKEND + '/api/blog/posts?limit=3', { signal: controller.signal });
            clearTimeout(timeoutId);

            if (res.ok) {
                var data = await res.json();
                var posts = data.posts || [];
                if (posts.length >= 1) {
                    renderPosts(posts);
                    return;
                }
            }

            var fbRes = await fetch(FALLBACK_API_BACKEND + '/api/blog/posts?limit=3');
            if (fbRes.ok) {
                var fbData = await fbRes.json();
                var fbPosts = fbData.posts || [];
                if (fbPosts.length >= 1) {
                    renderPosts(fbPosts);
                }
            }
        } catch (e) {
            try {
                var fbRes2 = await fetch('https://primerank-blog.vercel.app/api/blog/posts?limit=3');
                if (fbRes2.ok) {
                    var fbData2 = await fbRes2.json();
                    if (fbData2.posts && fbData2.posts.length >= 1) {
                        renderPosts(fbData2.posts);
                    }
                }
            } catch (e2) {}
        }
    }

    carregarArtigosBlog();
});