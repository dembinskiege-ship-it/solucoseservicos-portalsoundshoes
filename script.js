/* ===== SOUND SHOES - SCRIPT PRINCIPAL ===== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- HEADER SCROLL ---------- */
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Header sombra ao rolar
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Botão voltar ao topo
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Atualizar link ativo no menu
        updateActiveLink();
    });

    /* ---------- BACK TO TOP ---------- */
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ---------- MENU MOBILE ---------- */
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    /* ---------- FECHAR MENU AO CLICAR EM LINK ---------- */
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* ---------- LINK ATIVO CONFORME SCROLL ---------- */
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ---------- ACCORDION (POLÍTICA DE PRIVACIDADE) ---------- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Fecha todos
            document.querySelectorAll('.accordion-item').forEach(accItem => {
                accItem.classList.remove('active');
            });

            // Abre o clicado (se não estava ativo)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    /* ---------- ANIMAÇÃO DE ENTRADA (SCROLL REVEAL) ---------- */
    const revealElements = document.querySelectorAll(
        '.section-header, .sobre-text, .sobre-cards, .fabrica-content, .cert-card, .empresa-card, .endereco-box, .contato-card, .privacidade-content, .stat-card'
    );

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ---------- EFEITO PARALLAX SUAVE NO HERO ---------- */
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
            }
        });
    }

    /* ---------- CONTADOR ANIMADO DOS STATS ---------- */
    const statCards = document.querySelectorAll('.stat-card h3');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        const rect = heroStats.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
            countersAnimated = true;

            statCards.forEach(card => {
                const text = card.textContent.trim();
                const match = text.match(/(\d+)/);

                if (match) {
                    const target = parseInt(match[1]);
                    const suffix = text.replace(/[\d]/g, '').trim();
                    let current = 0;
                    const duration = 1500;
                    const stepTime = 16;
                    const steps = duration / stepTime;
                    const increment = target / steps;

                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            card.textContent = target + suffix;
                            clearInterval(counter);
                        } else {
                            card.textContent = Math.floor(current) + suffix;
                        }
                    }, stepTime);
                }
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    window.addEventListener('load', () => {
        setTimeout(animateCounters, 600);
    });

    /* ---------- SMOOTH SCROLL PARA LINKS INTERNOS ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ---------- LOG DE BOAS-VINDAS ---------- */
    console.log('%c Sound Shoes ', 'background: linear-gradient(135deg, #0066FF, #00D9A5); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
    console.log('%c 30 anos transformando paixão em calçados! 👟🇧🇷', 'color: #FF6B00; font-size: 14px; font-weight: bold;');
});
