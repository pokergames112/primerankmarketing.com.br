document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 0. EFEITO DAS LETRAS/PALAVRAS SUBINDO SUAVE NO SCROLL (KINETIC TEXT REVEAL)
    // ==========================================================================
    function initKineticTypography() {
        // Exclui .hero-title para preservar o rotator dinâmico de palavras
        const targetHeadings = document.querySelectorAll('.section-header h2, .banner-headline, .cta-box h2');
        
        targetHeadings.forEach(heading => {
            const fragment = document.createDocumentFragment();
            
            const processNode = (node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const words = node.textContent.split(/(\s+)/);
                    words.forEach(w => {
                        if (w.trim().length > 0) {
                            const wrap = document.createElement('span');
                            wrap.className = 'kinetic-word-wrap';
                            const inner = document.createElement('span');
                            inner.className = 'kinetic-word';
                            inner.textContent = w;
                            wrap.appendChild(inner);
                            fragment.appendChild(wrap);
                        } else if (w.length > 0) {
                            fragment.appendChild(document.createTextNode(w));
                        }
                    });
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.tagName === 'BR') {
                        fragment.appendChild(document.createElement('br'));
                    } else {
                        const clonedEl = node.cloneNode(false);
                        const childNodes = Array.from(node.childNodes);
                        childNodes.forEach(child => {
                            if (child.nodeType === Node.TEXT_NODE) {
                                const words = child.textContent.split(/(\s+)/);
                                words.forEach(w => {
                                    if (w.trim().length > 0) {
                                        const wrap = document.createElement('span');
                                        wrap.className = 'kinetic-word-wrap';
                                        const inner = document.createElement('span');
                                        inner.className = 'kinetic-word';
                                        inner.textContent = w;
                                        wrap.appendChild(inner);
                                        clonedEl.appendChild(wrap);
                                    } else if (w.length > 0) {
                                        clonedEl.appendChild(document.createTextNode(w));
                                    }
                                });
                            } else {
                                clonedEl.appendChild(child.cloneNode(true));
                            }
                        });
                        fragment.appendChild(clonedEl);
                    }
                }
            };

            Array.from(heading.childNodes).forEach(processNode);
            heading.innerHTML = '';
            heading.appendChild(fragment);

            const words = heading.querySelectorAll('.kinetic-word');
            words.forEach((w, idx) => {
                w.style.transitionDelay = `${idx * 0.04}s`;
            });
        });
    }

    initKineticTypography();

    // ==========================================================================
    // 0.1 ROTATOR DE PALAVRAS NA HERO (SEU FUNIL / SUA PROSPECÇÃO / SUA MARCA / ETC)
    // ==========================================================================
    function initHeroWordRotator() {
        const wordEl = document.getElementById('heroRotatorWord');
        if (!wordEl) return;
        
        const words = ['SEU FUNIL', 'SUA PROSPECÇÃO', 'SUA MARCA', 'SEU WHATSAPP', 'SEU CAIXA'];
        let currentIndex = 0;
        
        setInterval(() => {
            wordEl.classList.add('flip-out');
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % words.length;
                wordEl.textContent = words[currentIndex];
                wordEl.classList.remove('flip-out');
                wordEl.classList.add('flip-in');
                
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        wordEl.classList.remove('flip-in');
                    }, 40);
                });
            }, 320);
        }, 2400);
    }

    // ==========================================================================
    // 0.2 ROTATOR DE PALAVRAS NO NÍVEL 3 (MODO TUBARÃO)
    // ==========================================================================
    function initSharkWordRotator() {
        const wordEl = document.getElementById('sharkRotatorWord');
        if (!wordEl) return;
        
        const words = ['NA BOCA DO POVO', 'NO TOPO DO MERCADO', 'EM TODO O BRASIL', 'VENDENDO 24 HORAS'];
        let currentIndex = 0;
        
        setInterval(() => {
            wordEl.classList.add('flip-out');
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % words.length;
                wordEl.textContent = words[currentIndex];
                wordEl.classList.remove('flip-out');
                wordEl.classList.add('flip-in');
                
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        wordEl.classList.remove('flip-in');
                    }, 40);
                });
            }, 320);
        }, 2500);
    }

    // ==========================================================================
    // ==========================================================================
    // 0.2.1 DIGITAÇÃO & DESDIGITAÇÃO MÁGICA NO SCROLL (BIDIRECTIONAL TYPEWRITER)
    // ==========================================================================
    function initScrollTypewriter() {
        const typewriterEls = document.querySelectorAll('[data-typewriter="true"]');
        if (!typewriterEls.length) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Estrutura de controladores de digitação/desdigitação
        const controllers = [];

        typewriterEls.forEach(el => {
            const rawText = el.getAttribute('data-typewriter-text') || el.textContent;
            const fullText = rawText.replace(/\s+/g, ' ').trim();
            el.setAttribute('data-typewriter-text', fullText);

            if (prefersReducedMotion) {
                el.textContent = fullText;
                return;
            }

            el.innerHTML = '<span class="typewriter-body"></span><span class="typewriter-cursor">|</span>';
            const bodyEl = el.querySelector('.typewriter-body');
            const cursorEl = el.querySelector('.typewriter-cursor');

            const ctrl = {
                el,
                fullText,
                bodyEl,
                cursorEl,
                charIdx: 0,
                mode: 'idle_empty', // 'typing' | 'typed' | 'untyping' | 'idle_empty'
                timer: null,
                cursorFadeTimer: null,

                showCursor() {
                    if (this.cursorFadeTimer) {
                        clearTimeout(this.cursorFadeTimer);
                        this.cursorFadeTimer = null;
                    }
                    if (this.cursorEl) {
                        this.cursorEl.classList.remove('is-hidden');
                    }
                },

                hideCursorLater(delay = 1400) {
                    if (this.cursorFadeTimer) clearTimeout(this.cursorFadeTimer);
                    this.cursorFadeTimer = setTimeout(() => {
                        if (this.cursorEl) {
                            this.cursorEl.classList.add('is-hidden');
                        }
                    }, delay);
                },

                typeForward() {
                    if (this.mode === 'typing' || this.mode === 'typed') return;
                    this.mode = 'typing';
                    if (this.timer) {
                        clearTimeout(this.timer);
                        this.timer = null;
                    }
                    this.showCursor();

                    const step = () => {
                        if (this.mode !== 'typing') return;
                        if (this.charIdx < this.fullText.length) {
                            this.charIdx++;
                            this.bodyEl.textContent = this.fullText.slice(0, this.charIdx);
                            const c = this.fullText[this.charIdx - 1];
                            let delay = 12;
                            if (c === ':' || c === '—' || c === '-') delay = 40;
                            else if (c === ' ') delay = 18;
                            this.timer = setTimeout(step, delay);
                        } else {
                            this.mode = 'typed';
                            this.hideCursorLater(1400);
                        }
                    };
                    step();
                },

                untype() {
                    if (this.mode === 'untyping' || this.mode === 'idle_empty') return;
                    this.mode = 'untyping';
                    if (this.timer) {
                        clearTimeout(this.timer);
                        this.timer = null;
                    }
                    this.showCursor();

                    const step = () => {
                        if (this.mode !== 'untyping') return;
                        if (this.charIdx > 0) {
                            this.charIdx--;
                            this.bodyEl.textContent = this.fullText.slice(0, this.charIdx);
                            // Efeito de backspace rápido e suave (~11ms por caractere)
                            this.timer = setTimeout(step, 11);
                        } else {
                            this.mode = 'idle_empty';
                            this.bodyEl.textContent = '';
                        }
                    };
                    step();
                },

                resetEmpty() {
                    if (this.timer) {
                        clearTimeout(this.timer);
                        this.timer = null;
                    }
                    this.mode = 'idle_empty';
                    this.charIdx = 0;
                    this.bodyEl.textContent = '';
                    this.showCursor();
                }
            };

            controllers.push(ctrl);
        });

        if (prefersReducedMotion || !controllers.length) return;

        // ======================================================================
        // RASTREAMENTO INTELIGENTE DE NAVEGAÇÃO & SENTIDO DO SCROLL DO USUÁRIO
        // ======================================================================
        let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        let ticking = false;

        function checkControllers() {
            const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDir = currentScrollY > lastScrollY ? 'down' : (currentScrollY < lastScrollY ? 'up' : 'none');
            lastScrollY = currentScrollY;

            const vh = window.innerHeight;

            controllers.forEach(ctrl => {
                const rect = ctrl.el.getBoundingClientRect();

                // 1. O usuário está DESCENDO a página
                if (scrollDir === 'down') {
                    // Quando a seção entra na faixa de leitura (a partir de 82% da altura da tela)
                    if (rect.top < vh * 0.82 && rect.bottom > 80) {
                        ctrl.typeForward();
                    }
                    // Quando a seção já passou completamente e sumiu pelo topo
                    if (rect.bottom < -60) {
                        ctrl.resetEmpty();
                    }
                } 
                // 2. O usuário está VOLTANDO (subindo a página em direção ao topo)
                else if (scrollDir === 'up') {
                    // Se o usuário está descendo de volta para esta seção vindo de baixo
                    if (rect.bottom > vh * 0.25 && rect.top < vh * 0.70) {
                        ctrl.typeForward();
                    }
                    // Se o usuário está subindo em direção ao topo (Hero) e a seção está descendo para sair:
                    // Quando o topo da seção ultrapassa 32% da tela descendo, o usuário vê as letras se desdigitando!
                    if (rect.top > vh * 0.32) {
                        ctrl.untype();
                    }
                } else {
                    // Caso neutro / primeiro carregamento da página
                    if (rect.top < vh * 0.80 && rect.bottom > vh * 0.20) {
                        ctrl.typeForward();
                    }
                }
            });

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(checkControllers);
                ticking = true;
            }
        }, { passive: true });

        // Verificação inicial após renderização do DOM
        setTimeout(checkControllers, 200);

    }

    initHeroWordRotator();
    initSharkWordRotator();
    initScrollTypewriter();

    // ==========================================================================
    // 0.3 SIMULADOR INTERATIVO DE WHATSAPP (NÍVEL 01 - SETUP INICIAL)
    // ==========================================================================
    function initWhatsAppSimulator() {
        const form = document.getElementById('waSimForm');
        const input = document.getElementById('waSimInput');
        const msgOut = document.getElementById('waMsgOut');
        const msgOutText = document.getElementById('waMsgOutText');
        const typingRow = document.getElementById('waTypingRow');
        const statusEl = document.getElementById('waSimStatus');
        const msgReaction1 = document.getElementById('waMsgReaction1');
        const msgCard = document.getElementById('waMsgCard');
        const chatArea = document.getElementById('waSimChatArea');

        if (!form || !chatArea) return;

        let isRunning = false;

        function sendMessage(text) {
            if (isRunning) return;
            isRunning = true;

            const replyText = (text && text.trim().length > 0) ? text.trim() : 'Boa tarde! Atendemos sim na sua região.';
            if (msgOutText) msgOutText.textContent = replyText;

            // 1. Mostra a mensagem enviada pelo visitante
            if (msgOut) msgOut.classList.remove('is-hidden');
            if (input) input.value = '';

            chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });

            // 2. Camila entra em "digitando..."
            setTimeout(() => {
                if (statusEl) {
                    statusEl.textContent = 'digitando...';
                    statusEl.classList.add('is-typing');
                }
                if (typingRow) typingRow.classList.remove('is-hidden');
                chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });

                // 3. Camila manda a resposta de choque no chat
                setTimeout(() => {
                    if (typingRow) typingRow.classList.add('is-hidden');
                    if (msgReaction1) msgReaction1.classList.remove('is-hidden');
                    chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });

                    // 4. Surge o Card de Ação com o botão para o WhatsApp real
                    setTimeout(() => {
                        if (statusEl) {
                            statusEl.textContent = 'online';
                            statusEl.classList.remove('is-typing');
                        }
                        if (msgCard) msgCard.classList.remove('is-hidden');
                        chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });

                        if (navigator.vibrate) {
                            try { navigator.vibrate([40, 80, 40]); } catch (e) {}
                        }
                        isRunning = false;
                    }, 800);
                }, 1200);
            }, 500);
        }

        // Submissão pelo formulário ou Enter
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = input ? input.value : '';
            sendMessage(text);
        });

        // Botão de reiniciar simulação
        function resetSimulation() {
            isRunning = false;
            if (msgOut) msgOut.classList.add('is-hidden');
            if (typingRow) typingRow.classList.add('is-hidden');
            if (msgReaction1) msgReaction1.classList.add('is-hidden');
            if (msgCard) msgCard.classList.add('is-hidden');
            if (statusEl) {
                statusEl.textContent = 'online';
                statusEl.classList.remove('is-typing');
            }
            if (input) input.value = '';
            chatArea.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Delegação de evento para o botão de reset
        chatArea.addEventListener('click', (e) => {
            if (e.target.closest('#waSimResetBtn')) {
                resetSimulation();
            }
        });
    }

    initWhatsAppSimulator();

    // ==========================================================================
    // 0.3.1 SIMULADOR INTERATIVO DE PESQUISA GOOGLE (NÍVEL 02 - ESCALA NO GOOGLE)
    // ==========================================================================
    function initGoogleSimulator() {
        const form = document.getElementById('googleSimForm');
        const input = document.getElementById('googleSimInput');
        const loadBar = document.getElementById('googleLoadBar');
        const emptyState = document.getElementById('googleEmptyState');
        const resultsView = document.getElementById('googleResultsView');
        const searchedBrandName = document.getElementById('searchedBrandName');
        const shockCard = document.getElementById('googleShockCard');
        const successCard = document.getElementById('googleSuccessCard');
        const shockCta = document.getElementById('googleShockCta');
        const screenArea = document.getElementById('googleScreenArea');
        const quickTags = document.querySelectorAll('.google-tag-pill');
        const btnRetry = document.getElementById('btnRetrySearch');
        const btnRetry2 = document.getElementById('btnRetrySearch2');

        if (!form || !input || !resultsView) return;

        let isSearching = false;

        function runSearch(query) {
            if (isSearching) return;
            const term = (query || input.value || '').trim() || 'Minha Empresa';
            input.value = term;
            isSearching = true;

            // 1. Ativa barra de progresso azul Google
            if (loadBar) {
                loadBar.classList.remove('is-hidden');
                loadBar.style.animation = 'none';
                void loadBar.offsetWidth; // trigger reflow
                loadBar.style.animation = 'googleProgress 0.75s ease forwards';
            }

            // 2. Renderiza SERP do Google com a pegadinha / diagnóstico do Nível 02
            setTimeout(() => {
                if (loadBar) loadBar.classList.add('is-hidden');
                if (emptyState) emptyState.classList.add('is-hidden');
                resultsView.classList.remove('is-hidden');

                const lower = term.toLowerCase();
                const isPrimeRankOrClient = lower.includes('prime rank') || lower.includes('klim') || lower.includes('betânia') || lower.includes('aline marques') || lower.includes('concept loc');

                if (isPrimeRankOrClient) {
                    if (shockCard) shockCard.classList.add('is-hidden');
                    if (successCard) successCard.classList.remove('is-hidden');
                } else {
                    if (successCard) successCard.classList.add('is-hidden');
                    if (shockCard) shockCard.classList.remove('is-hidden');
                    if (searchedBrandName) searchedBrandName.textContent = term;

                    // Personaliza link e mensagem oficial do WhatsApp com a marca digitada
                    if (shockCta) {
                        const encodedText = encodeURIComponent(`Olá! Fiz a simulação de pesquisa no Google com a marca "${term}" no site da Prime Rank e quero colocar minha empresa no topo da minha região!`);
                        shockCta.href = `whatsapp.html?text=${encodedText}`;
                    }
                }

                if (screenArea) {
                    screenArea.scrollTo({ top: screenArea.scrollHeight, behavior: 'smooth' });
                }

                if (navigator.vibrate) {
                    try { navigator.vibrate([30, 60]); } catch (e) {}
                }

                isSearching = false;
            }, 700);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            runSearch(input.value);
        });

        quickTags.forEach(pill => {
            pill.addEventListener('click', () => {
                const searchVal = pill.getAttribute('data-search') || pill.textContent;
                runSearch(searchVal);
            });
        });

        function resetToSearch() {
            if (emptyState) emptyState.classList.remove('is-hidden');
            if (resultsView) resultsView.classList.add('is-hidden');
            if (input) {
                input.value = '';
                input.focus();
            }
            if (screenArea) {
                screenArea.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        if (btnRetry) btnRetry.addEventListener('click', resetToSearch);
        if (btnRetry2) btnRetry2.addEventListener('click', resetToSearch);
    }

    initGoogleSimulator();

    // ==========================================================================
    // 1. BARRA DE PROGRESSO DE SCROLL NO TOPO
    // ==========================================================================
    const progressBar = document.getElementById('scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0 && progressBar) {
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }, { passive: true });

    // ==========================================================================
    // 2. SISTEMA DE DINAMISMO & SURGIMENTO SUAVE NO SCROLL (INTERSECTION OBSERVER)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger, .hero-title, .section-header h2, .banner-headline, .cta-box h2');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');

                    // Se houver contadores numéricos dentro do elemento, inicia contagem suave
                    const counters = entry.target.querySelectorAll('.counter-val');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        if (target && !counter.classList.contains('counted')) {
                            counter.classList.add('counted');
                            let count = 0;
                            const step = Math.max(1, Math.floor(target / 30));
                            const updateCounter = () => {
                                count += step;
                                if (count < target) {
                                    counter.innerText = `+${count} contatos novos`;
                                    setTimeout(updateCounter, 25);
                                } else {
                                    counter.innerText = `+${target} contatos novos`;
                                }
                            };
                            updateCounter();
                        }
                    });
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback para navegadores sem observer
        revealElements.forEach(el => el.classList.add('is-revealed'));
    }

    // ==========================================================================
    // 3. MENU MOBILE NAVEGAÇÃO
    // ==========================================================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const menuMobile = document.getElementById('menuMobile');
    
    if (hamburgerBtn && menuMobile) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = menuMobile.classList.toggle('active');
            hamburgerBtn.classList.toggle('is-open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        
        menuMobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuMobile.classList.remove('active');
                hamburgerBtn.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (menuMobile.classList.contains('active') && !menuMobile.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                menuMobile.classList.remove('active');
                hamburgerBtn.classList.remove('is-open');
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================================================
    // 4. ROLAGEM SUAVE DOS LINKS DE NAVEGAÇÃO
    // ==========================================================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 70, 
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================================================
    // 5. HEADER INTELIGENTE & VOLTAR AO TOPO
    // ==========================================================================
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;

        if (menuMobile && menuMobile.classList.contains('active')) {
            if (header) header.classList.remove('hidden');
            return;
        }

        if (header && window.innerWidth > 768) {
            if (currentScroll > 100) {
                if (currentScroll > lastScrollTop + 10) {
                    header.classList.add('hidden');
                } else if (currentScroll < lastScrollTop - 10) {
                    header.classList.remove('hidden');
                }
            } else {
                header.classList.remove('hidden');
            }
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

        if (scrollToTopBtn) {
            scrollToTopBtn.style.display = currentScroll > 350 ? 'flex' : 'none';
        }
    }, { passive: true });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================================
    // 6. CURSOR CUSTOMIZADO
    // ==========================================================================
    const cursorDot = document.getElementById('cursor-dot');
    const cursorCircle = document.getElementById('cursor-circle');

    if (cursorDot && cursorCircle && window.innerWidth > 992) {
        let mouseX = -100, mouseY = -100;
        let circleX = -100, circleY = -100;
        const smoothing = 0.2;
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

        const clickables = 'a, button, .btn, .tab-item, .sol-card, .case-box, .compare-box, #scrollToTopBtn';

        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(clickables)) {
                cursorCircle.classList.add('hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(clickables)) {
                cursorCircle.classList.remove('hover');
            }
        });

        function animateCursor() {
            circleX += (mouseX - circleX) * smoothing;
            circleY += (mouseY - circleY) * smoothing;

            cursorCircle.style.left = `${circleX}px`;
            cursorCircle.style.top = `${circleY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // ==========================================================================
    // 7. ARQUITETURA VITRUVIAN: 3 CAMADAS ROMANAS & TELEMETRIA OPERACIONAL
    // ==========================================================================
    function initHowItWorksVitruvian() {
        const layerBtns = document.querySelectorAll('.how-layer-btn');
        const stepTag = document.getElementById('telemetryStepTag');
        const contentBox = document.getElementById('telemetryContent');
        if (layerBtns.length === 0 || !contentBox) return;

        const layersData = {
            '1': {
                file: 'operacao_comercial_fase_1.ts',
                canal: 'Google Ads &bull; Meta Ads (Recife e Região)',
                objetivo: 'Mensagens Diretas no WhatsApp Comercial',
                publico: 'Homens e mulheres com intenção ativa de compra',
                metric1: '+84 contatos novos',
                metric2: 'R$ 4,20 custo por contato'
            },
            '2': {
                file: 'conversao_ultra_rapida_fase_2.ts',
                canal: 'Página Ultra-Rápida Mobile (0,8 segundo)',
                objetivo: 'Quebra de Objeções e Abertura Imediata do WhatsApp',
                publico: 'Visitantes prontos para cotar e tirar dúvidas',
                metric1: '14,8% taxa de conversão',
                metric2: '0,8s tempo de resposta'
            },
            '3': {
                file: 'fechamento_comercial_fase_3.ts',
                canal: 'Roteiro Comercial no WhatsApp (Método Ping-Pong)',
                objetivo: 'Acolhimento Rápido, Qualificação e Proposta no Caixa',
                publico: 'Leads quentes com orçamento em negociação',
                metric1: 'R$ 8.500 contrato médio',
                metric2: '94% taxa de resposta'
            }
        };

        let activeIndex = 0;
        let autoTimer = null;

        function renderStep(step) {
            const d = layersData[step];
            if (!d) return;

            layerBtns.forEach((btn, i) => {
                const isActive = (btn.getAttribute('data-step') === step);
                btn.classList.toggle('active', isActive);
                if (isActive) activeIndex = i;
            });

            if (stepTag) stepTag.textContent = d.file;
            contentBox.innerHTML = `
                <div class="telemetry-row">
                    <span class="t-key">Canal:</span>
                    <span class="t-val">${d.canal}</span>
                </div>
                <div class="telemetry-row">
                    <span class="t-key">Objetivo:</span>
                    <span class="t-val text-green">${d.objetivo}</span>
                </div>
                <div class="telemetry-row">
                    <span class="t-key">Público:</span>
                    <span class="t-val">${d.publico}</span>
                </div>
                <div class="telemetry-metrics">
                    <div class="t-metric-box">
                        <span class="t-metric-label">Conversas no mês</span>
                        <span class="t-metric-val text-green">${d.metric1}</span>
                    </div>
                    <div class="t-metric-box">
                        <span class="t-metric-label">Desempenho</span>
                        <span class="t-metric-val">${d.metric2}</span>
                    </div>
                </div>
            `;
        }

        layerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const step = btn.getAttribute('data-step');
                renderStep(step);
                resetAutoTimer();
            });
        });

        function resetAutoTimer() {
            if (autoTimer) clearInterval(autoTimer);
            autoTimer = setInterval(() => {
                activeIndex = (activeIndex + 1) % layerBtns.length;
                const nextStep = layerBtns[activeIndex].getAttribute('data-step');
                renderStep(nextStep);
            }, 4500);
        }

        resetAutoTimer();
    }

    initHowItWorksVitruvian();

    // ==========================================================================
    // 8. CANVAS DE FUNDO SUAVE
    // ==========================================================================
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
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let dots = [];
        const count = width < 768 ? 20 : 40;

        for (let i = 0; i < count; i++) {
            dots.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.35 + 0.1,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2
            });
        }

        function render() {
            ctx.clearRect(0, 0, width, height);

            dots.forEach(d => {
                d.x += d.vx;
                d.y += d.vy;

                if (d.x < 0) d.x = width;
                if (d.x > width) d.x = 0;
                if (d.y < 0) d.y = height;
                if (d.y > height) d.y = 0;

                ctx.beginPath();
                ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(177, 121, 242, ${d.alpha})`;
                ctx.fill();
            });

            requestAnimationFrame(render);
        }
        render();
    }

    // ==========================================================================
    // 9. GLOBO 3D FLUIDO DE PARTÍCULAS (ESTILO VITRUVIAN COM ÓRBITAS E DINHEIRO)
    // ==========================================================================
    function initHero3DGlobe() {
        const canvas = document.getElementById('hero-globe-canvas');
        if (!canvas || !canvas.getContext) return;

        const ctx = canvas.getContext('2d');
        const wrapper = canvas.parentElement || canvas;
        let width = 560;
        let height = 560;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        function resizeGlobe() {
            const rect = wrapper.getBoundingClientRect();
            width = rect.width || 540;
            height = rect.height || 540;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        }
        window.addEventListener('resize', resizeGlobe);
        resizeGlobe();

        // 1. GERAÇÃO DE PARTÍCULAS NA ESFERA 3D VIA ESPIRAL DOURADA (FIBONACCI)
        const NUM_POINTS = 920;
        const points = [];
        const phi = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < NUM_POINTS; i++) {
            const y = 1 - (i / (NUM_POINTS - 1)) * 2;
            const r = Math.sqrt(Math.max(0, 1 - y * y));
            const theta = phi * i;
            const x = Math.cos(theta) * r;
            const z = Math.sin(theta) * r;

            let color = '#b179f2';
            let type = 'dash';
            if (i % 8 === 0) { 
                color = '#00ff88';
                type = 'dot'; 
            } else if (i % 6 === 0) { 
                color = '#ffd700';
                type = 'gold'; 
            } else if (i % 14 === 0) {
                color = '#ffffff';
                type = 'white-dot';
            }

            points.push({
                x, y, z,
                color,
                type,
                length: Math.random() * 4.5 + 3,
                size: Math.random() * 1.6 + 1.2,
                pulseOffset: Math.random() * Math.PI * 2
            });
        }

        // 2. ÓRBITAS FLUIDAS AO REDOR DA ESFERA
        const orbitalRings = [
            { radius: 1.14, tiltX: 0.38, tiltZ: 0.22, speed: 0.005, angle: 0, color: 'rgba(0, 255, 136, 0.45)' },
            { radius: 1.24, tiltX: -0.42, tiltZ: -0.28, speed: -0.004, angle: Math.PI / 3, color: 'rgba(177, 121, 242, 0.4)' }
        ];

        // 3. SPARKLES E BLIPS DE DINHEIRO FLUTUANTES (R$ E BRILHOS)
        const cashSparks = [];
        for (let i = 0; i < 18; i++) {
            cashSparks.push({
                x: (Math.random() - 0.5) * 0.6,
                y: Math.random() * 0.8 + 0.2,
                z: (Math.random() - 0.5) * 0.6,
                vy: -(Math.random() * 0.006 + 0.003),
                alpha: Math.random(),
                label: i % 4 === 0 ? 'R$' : (i % 3 === 0 ? '+' : '•'),
                color: i % 2 === 0 ? '#00ff88' : '#ffd700'
            });
        }

        // 4. INTERATIVIDADE COM O MOUSE (TILT SUAVE COM SPRING)
        let mouseTiltX = 0, mouseTiltY = 0;
        let targetTiltX = 0, targetTiltY = 0;

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            targetTiltY = ((e.clientX - cx) / (window.innerWidth / 2)) * 0.65;
            targetTiltX = ((e.clientY - cy) / (window.innerHeight / 2)) * -0.55;
        }, { passive: true });

        // 5. LOOP PRINCIPAL DE RENDERIZAÇÃO 3D A 60 FPS
        let baseAngleY = 0;
        let baseAngleX = 0;
        let t = 0;

        function renderGlobe() {
            ctx.clearRect(0, 0, width, height);

            t += 0.02;
            baseAngleY += 0.0032;
            baseAngleX = Math.sin(t * 0.3) * 0.1;

            mouseTiltX += (targetTiltX - mouseTiltX) * 0.045;
            mouseTiltY += (targetTiltY - mouseTiltY) * 0.045;

            const pitch = baseAngleX + mouseTiltX;
            const yaw = baseAngleY + mouseTiltY;

            const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
            const cosX = Math.cos(pitch), sinX = Math.sin(pitch);

            const sphereRadius = Math.min(width, height) * 0.38;
            const cx = width / 2;
            const cy = height / 2;
            const fov = 420;

            const projectedPoints = points.map(p => {
                const x1 = p.x * cosY + p.z * sinY;
                const z1 = -p.x * sinY + p.z * cosY;
                const y2 = p.y * cosX - z1 * sinX;
                const z2 = p.y * sinX + z1 * cosX;

                const scale = fov / (fov + z2 * sphereRadius);
                const screenX = cx + x1 * sphereRadius * scale;
                const screenY = cy + y2 * sphereRadius * scale;

                return {
                    screenX,
                    screenY,
                    scale,
                    z: z2,
                    color: p.color,
                    type: p.type,
                    length: p.length * scale,
                    size: p.size * scale,
                    pulse: Math.sin(t * 1.5 + p.pulseOffset) * 0.2 + 0.8
                };
            });

            projectedPoints.sort((a, b) => b.z - a.z);

            projectedPoints.forEach(p => {
                const isFront = p.z < 0;
                const alpha = isFront 
                    ? Math.min(1, Math.max(0.45, (0.5 - p.z * 0.7) * p.pulse))
                    : Math.max(0.1, (0.35 + p.z * 0.4) * 0.5);

                ctx.save();
                ctx.globalAlpha = alpha;

                if (p.type === 'dash') {
                    ctx.strokeStyle = p.color;
                    ctx.lineWidth = isFront ? 1.6 : 1;
                    if (isFront && p.z < -0.3) {
                        ctx.shadowBlur = 6;
                        ctx.shadowColor = p.color;
                    }
                    ctx.beginPath();
                    ctx.moveTo(p.screenX, p.screenY - p.length * 0.5);
                    ctx.lineTo(p.screenX, p.screenY + p.length * 0.5);
                    ctx.stroke();
                } else {
                    ctx.fillStyle = p.color;
                    if (isFront) {
                        ctx.shadowBlur = 8;
                        ctx.shadowColor = p.color;
                    }
                    ctx.beginPath();
                    ctx.arc(p.screenX, p.screenY, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.restore();
            });

            orbitalRings.forEach(ring => {
                ring.angle += ring.speed;
                ctx.save();
                ctx.strokeStyle = ring.color;
                ctx.lineWidth = 1.2;
                ctx.setLineDash([4, 6]);

                ctx.beginPath();
                const segments = 48;
                for (let i = 0; i <= segments; i++) {
                    const a = (i / segments) * Math.PI * 2 + ring.angle;
                    const rx = Math.cos(a) * ring.radius;
                    const rz = Math.sin(a) * ring.radius;
                    const ry = rx * Math.sin(ring.tiltX) + rz * Math.sin(ring.tiltZ);

                    const rx1 = rx * cosY + rz * sinY;
                    const rz1 = -rx * sinY + rz * cosY;
                    const ry2 = ry * cosX - rz1 * sinX;
                    const rz2 = ry * sinX + rz1 * cosX;

                    const scale = fov / (fov + rz2 * sphereRadius);
                    const sx = cx + rx1 * sphereRadius * scale;
                    const sy = cy + ry2 * sphereRadius * scale;

                    if (i === 0) ctx.moveTo(sx, sy);
                    else ctx.lineTo(sx, sy);
                }
                ctx.stroke();
                ctx.restore();
            });

            cashSparks.forEach(s => {
                s.y += s.vy;
                s.alpha -= 0.008;

                if (s.y < -0.8 || s.alpha <= 0) {
                    s.y = 0.8 + Math.random() * 0.3;
                    s.x = (Math.random() - 0.5) * 0.7;
                    s.z = (Math.random() - 0.5) * 0.7;
                    s.alpha = 1;
                }

                const sx1 = s.x * cosY + s.z * sinY;
                const sz1 = -s.x * sinY + s.z * cosY;
                const sy2 = s.y * cosX - sz1 * sinX;
                const sz2 = s.y * sinX + sz1 * cosX;

                const scale = fov / (fov + sz2 * sphereRadius);
                const px = cx + sx1 * sphereRadius * scale;
                const py = cy + sy2 * sphereRadius * scale;

                ctx.save();
                ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
                ctx.fillStyle = s.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = s.color;
                ctx.font = 'bold 11px monospace';
                ctx.fillText(s.label, px, py);
                ctx.restore();
            });

            requestAnimationFrame(renderGlobe);
        }

        requestAnimationFrame(renderGlobe);
    }

    initHero3DGlobe();

    // ==========================================================================
    // 10. DINAMISMO TÁTIL 3D & SPOTLIGHT SUTIL (DESKTOP)
    // ==========================================================================
    if (window.innerWidth > 992) {
        const interactiveCards = document.querySelectorAll('.vitruvian-sol-item, .case-box, .creative-slot-card, .split-row');
        
        interactiveCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -3;
                const rotateY = ((x - centerX) / centerX) * 3;
                
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ==========================================================================
    // 11. SISTEMA DE SEGURANÇA, ANTI-SCRAPING, HONEYPOT & TROLAGEM DE FRONT-END
    // ==========================================================================

    // Objeto Global de Controle e Teste (Acessível via DevTools Console)
    window.PRIME_SHIELD = {
        version: "2.0-ULTIMATE",
        author: "Prime Rank Marketing Digital",
        
        // Dispara a tela de código roubado na hora
        testPirate: function() {
            triggerPirateTroll();
        },

        // Dispara o Toast Cyber de Curioso
        testToast: function(customMsg) {
            showCuriousToast(customMsg);
        },

        // Simula a detecção de Robô Headless (Puppeteer/Selenium)
        testHeadless: function() {
            triggerHeadlessDetection(true);
        },

        // Verifica a assinatura criptográfica do Canvas 3D
        verifyCanvasSignature: function() {
            const globeCanvas = document.getElementById('hero-globe-canvas');
            if (globeCanvas && globeCanvas.getContext) {
                const ctx = globeCanvas.getContext('2d');
                const sig = ctx ? ctx.__PRIME_RANK_SIGNATURE__ : null;
                console.log("%c[CANVAS CERTIFICATE VERIFIED]", "color:#00ff88;font-weight:bold;background:#07020d;padding:4px 8px;border-radius:4px;");
                console.log("Assinatura Original:", sig || "Não inicializado");
                return sig;
            }
            return "Canvas não encontrado";
        },

        // Abre o Honeypot da API
        openHoneypot: function() {
            window.open('api/v1/leads-database.json', '_blank');
        },

        // Abre o robots.txt
        openRobots: function() {
            window.open('robots.txt', '_blank');
        }
    };

    // Atalho legado para compatibilidade
    window.__testPirateMode = window.PRIME_SHIELD.testPirate;

    // 11.1 Banner Neon no Console do DevTools (F12)
    (function initDevToolsBanner() {
        const titleStyle = "color: #00ff88; font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900; background: #07020d; padding: 10px 16px; border-radius: 8px; border: 2px solid #9139E5; text-shadow: 0 0 10px rgba(0,255,136,0.6);";
        const bodyStyle = "color: #d2c7e5; font-family: sans-serif; font-size: 12px; line-height: 1.6;";
        const cmdStyle = "color: #00ff88; font-family: monospace; font-size: 12px; font-weight: bold; background: rgba(0,255,136,0.1); padding: 2px 6px; border-radius: 4px;";
        const linkStyle = "color: #00ff88; font-weight: bold; text-decoration: underline;";
        
        console.log("%c⚡ PRIME RANK MARKETING DIGITAL | SISTEMA ANTI-THEFT ATIVO ⚡", titleStyle);
        console.log(
            "%cProcurando a fórmula dos simuladores de iPhone e do funil de vendas? 😂\n" +
            "Fariseu, código bonito na mão de amador não dá lucro. Aqui o tráfego se paga!\n" +
            "Em vez de raspar front-end alheio, venha fechar vendas de verdade:\n" +
            "%chttps://primerankmarketing.com.br/whatsapp.html\n\n" +
            "%c🛠️ COMANDOS PARA TESTAR AS DEFESAS NO CONSOLE:\n" +
            "• %cPRIME_SHIELD.testPirate()%c       -> Simular tela de código roubado\n" +
            "• %cPRIME_SHIELD.testToast()%c        -> Simular alerta de botão direito/curioso\n" +
            "• %cPRIME_SHIELD.testHeadless()%c     -> Simular detecção de robô raspador (Puppeteer)\n" +
            "• %cPRIME_SHIELD.verifyCanvasSignature()%c -> Validar certificado esteganográfico do Canvas\n" +
            "• %cPRIME_SHIELD.openHoneypot()%c     -> Abrir Pote de Mel com rimas do fariseu",
            bodyStyle,
            linkStyle,
            "color: #9139E5; font-weight: bold; font-size: 13px;",
            cmdStyle, bodyStyle,
            cmdStyle, bodyStyle,
            cmdStyle, bodyStyle,
            cmdStyle, bodyStyle,
            cmdStyle, bodyStyle
        );
    })();

    // 11.2 Honeypot Silencioso na Aba Network (Isca para Inspetores de Requisições)
    (function triggerHoneypotNetworkBait() {
        try {
            fetch('api/v1/leads-database.json', { cache: 'no-store' })
                .then(r => r.json())
                .catch(() => {});
        } catch (e) {}
    })();

    // 11.3 Domain Lock Troll & Defesa Anti-Clonagem
    function triggerPirateTroll() {
        document.body.innerHTML = `
            <div style="position:fixed;inset:0;background:#07020d;color:#ffffff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Montserrat',sans-serif;text-align:center;padding:24px;z-index:999999999;box-sizing:border-box;">
                <div style="width:76px;height:76px;border-radius:50%;background:rgba(255,77,109,0.15);border:2px solid #ff4d6d;display:flex;align-items:center;justify-content:center;margin-bottom:20px;font-size:36px;">🏴‍☠️</div>
                <h1 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,7vw,4.5rem);color:#00ff88;letter-spacing:2px;margin:0 0 14px 0;line-height:1;">🚨 CÓDIGO ROUBADO DETECTADO! 🚨</h1>
                <p style="font-size:1.15rem;color:#d2c7e5;max-width:620px;line-height:1.6;margin:0 0 24px 0;">
                    O dono deste site copiou o código e os simuladores de iPhone desenvolvidos exclusivamente pela <strong>Prime Rank Marketing Digital</strong> achando que ninguém ia perceber. Fariseu sem criatividade! 😂
                </p>
                <div style="background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,77,109,0.4);padding:14px 28px;border-radius:12px;margin-bottom:28px;">
                    <p style="color:#ff4d6d;font-weight:800;font-size:1.05rem;margin:0;">
                        Redirecionando clientes para os criadores originais em <span id="pirateCount" style="color:#00ff88;font-size:1.3rem;">5</span> segundos...
                    </p>
                </div>
                <a href="https://primerankmarketing.com.br/?ref=site_clonado_trollado" style="display:inline-flex;align-items:center;gap:10px;padding:16px 36px;background:linear-gradient(135deg,#00ff88,#00cc6a);color:#07020d;border-radius:9999px;font-weight:900;text-decoration:none;font-size:0.95rem;text-transform:uppercase;box-shadow:0 8px 30px rgba(0,255,136,0.4);">
                    <span>Ir para o Site Original da Prime Rank</span> &rarr;
                </a>
            </div>
        `;

        let count = 5;
        const counterEl = document.getElementById('pirateCount');
        const timer = setInterval(() => {
            count--;
            if (counterEl) counterEl.textContent = count;
            if (count <= 0) {
                clearInterval(timer);
                window.location.href = "https://primerankmarketing.com.br/?ref=site_clonado_trollado";
            }
        }, 1000);
    }

    (function initDomainLockSecurity() {
        const allowedHosts = [
            'primerankmarketing.com.br',
            'www.primerankmarketing.com.br',
            'localhost',
            '127.0.0.1',
            '::1'
        ];

        const isAuthorizedDomain = allowedHosts.some(host => 
            window.location.hostname === host || window.location.hostname.endsWith('.' + host)
        );

        const urlParams = new URLSearchParams(window.location.search);
        if (!isAuthorizedDomain || urlParams.has('test_pirate')) {
            triggerPirateTroll();
        }
    })();

    // 11.4 Clipboard Poisoning (Veneno no Ctrl + C de Grandes Blocos)
    (function initClipboardProtection() {
        document.addEventListener('copy', (e) => {
            const selection = window.getSelection().toString();
            if (selection && selection.length > 55) {
                const credits = "\n\n[Fonte Original: Prime Rank Marketing Digital - https://primerankmarketing.com.br | Conteúdo registrado. Cópia não autorizada protegida pela Lei 9.610/98]";
                e.clipboardData.setData('text/plain', selection + credits);
                e.preventDefault();
            }
        });
    })();

    // 11.5 Assinatura Esteganográfica Invisível no Canvas
    (function injectCanvasWatermark() {
        const globeCanvas = document.getElementById('hero-globe-canvas');
        if (globeCanvas && globeCanvas.getContext) {
            const ctx = globeCanvas.getContext('2d');
            if (ctx) {
                ctx.__PRIME_RANK_SIGNATURE__ = "REGISTRY:PrimeRankMarketingDigital:AUTHOR:Joao:DOMAIN:primerankmarketing.com.br";
            }
        }
    })();

    // 11.6 Cyber Toast Easter Egg (Botão Direito & Atalhos DevTools)
    let toastTimeout = null;
    function showCuriousToast(customMessage) {
        let toast = document.getElementById('primeShieldToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'primeShieldToast';
            toast.className = 'prime-shield-toast';
            toast.innerHTML = `
                <div class="prime-shield-toast-header">
                    <span class="prime-shield-toast-title">🕵️‍♂️ MODO CURIOSO DETECTADO</span>
                    <button class="prime-shield-toast-close" onclick="document.getElementById('primeShieldToast').classList.remove('show')">&times;</button>
                </div>
                <div class="prime-shield-toast-body" id="primeShieldToastBody">
                    Procurando a fórmula secreta dos simuladores de iPhone? Em vez de quebrar a cabeça copiando o front-end, fale com a Prime Rank e feche vendas de verdade!
                </div>
                <a href="whatsapp.html" class="prime-shield-toast-btn">
                    <span>Falar no WhatsApp</span> &rarr;
                </a>
            `;
            document.body.appendChild(toast);
        }

        if (customMessage) {
            const bodyEl = document.getElementById('primeShieldToastBody');
            if (bodyEl) bodyEl.textContent = customMessage;
        }

        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 6000);
    }

    (function initCuriousInterceptors() {
        // Intercepta botão direito com easter egg suave (não destrói a usabilidade normal do usuário)
        let lastToastTime = 0;
        document.addEventListener('contextmenu', () => {
            const now = Date.now();
            if (now - lastToastTime > 8000) {
                lastToastTime = now;
                showCuriousToast("Botão direito detectado! Curioso para ver o código? Chame a Prime Rank no WhatsApp e tenha clientes no topo das pesquisas!");
            }
        });

        // Intercepta atalhos de desenvolvedor (Ctrl+U para código-fonte)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
                showCuriousToast("Inspecionando o código-fonte? 😂 O segredo não tá nas tags HTML, tá na estratégia de tráfego!");
            }
        });
    })();

    // 11.7 Detector de Robôs Headless (Puppeteer, Selenium, Scraping Bots)
    function triggerHeadlessDetection(isSimulation) {
        console.warn("🚨 [HEADLESS DETECTED]: Robô raspador identificado no ambiente.");
        
        // Insere marca d'água no topo (capturada em screenshots de headless browsers)
        if (!document.getElementById('headlessBotWatermark')) {
            const banner = document.createElement('div');
            banner.id = 'headlessBotWatermark';
            banner.className = 'headless-bot-watermark';
            banner.innerHTML = `
                <span>🤖 BOT SCRAPER DETECTADO:</span>
                <span>Capturando telas? Layout protegido da Prime Rank Marketing Digital!</span>
            `;
            document.body.prepend(banner);
        }

        if (isSimulation) {
            showCuriousToast("🤖 Simulação de Robô Scraper Ativada! A marca d'água de proteção contra screenshots foi inserida no topo da tela!");
        }
    }

    (function initHeadlessDetection() {
        const urlParams = new URLSearchParams(window.location.search);
        const isHeadlessTest = urlParams.has('test_headless');
        
        // Verifica flags típicas de Puppeteer / Selenium
        const isAutomated = navigator.webdriver || 
            window.__webdriver || 
            window._phantom || 
            window.callPhantom || 
            (navigator.userAgent && /HeadlessChrome|PhantomJS|Selenium/i.test(navigator.userAgent));

        if (isAutomated || isHeadlessTest) {
            triggerHeadlessDetection(isHeadlessTest);
        }
    })();
});


