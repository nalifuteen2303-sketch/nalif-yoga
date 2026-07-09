/* =========================================================
   KRIYA YOGA — Site behaviors
   - Preloader
   - Hero slider (auto + dots)
   - Testimonial slider
   - Pricing tabs
   - Animated counters
   - Sticky header
   - Mobile menu + submenu toggles
   - Back to top
   - Newsletter form
========================================================= */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        runPreloader();
        runHeroSlider();
        runTestimonialSlider();
        runPricingTabs();
        runCounters();
        runStickyHeader();
        runMobileMenu();
        runBackToTop();
        runNewsletter();
        runDropdowns();
    }

    /* ---------- 1. PRELOADER ---------- */
    function runPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;
        window.addEventListener('load', () => {
            setTimeout(() => preloader.classList.add('hidden'), 400);
            setTimeout(() => preloader.remove(), 1200);
        });
    }

    /* ---------- 2. HERO SLIDER ---------- */
    function runHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        const dotsWrap = document.getElementById('heroDots');
        if (!slides.length || !dotsWrap) return;

        slides.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.setAttribute('aria-label', `Slide ${i + 1}`);
            if (i === 0) btn.classList.add('active');
            btn.addEventListener('click', () => show(i));
            dotsWrap.appendChild(btn);
        });
        const dots = dotsWrap.querySelectorAll('button');

        let idx = 0;
        let timer;

        function show(n) {
            slides[idx].classList.remove('active');
            dots[idx].classList.remove('active');
            idx = (n + slides.length) % slides.length;
            slides[idx].classList.add('active');
            dots[idx].classList.add('active');
        }
        function autoplay() { timer = setInterval(() => show(idx + 1), 6000); }
        function start() { stop(); autoplay(); }
        function stop()  { if (timer) clearInterval(timer); }

        start();

        const root = document.querySelector('.hero-slider');
        if (root) {
            root.addEventListener('mouseenter', stop);
            root.addEventListener('mouseleave', start);
        }
    }

    /* ---------- 3. TESTIMONIAL SLIDER ---------- */
    function runTestimonialSlider() {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dotsWrap = document.getElementById('testimonialDots');
        if (!slides.length || !dotsWrap) return;

        slides.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.setAttribute('aria-label', `Testimonial ${i + 1}`);
            if (i === 0) btn.classList.add('active');
            btn.addEventListener('click', () => show(i));
            dotsWrap.appendChild(btn);
        });
        const dots = dotsWrap.querySelectorAll('button');

        let idx = 0;
        let timer;

        function show(n) {
            slides[idx].classList.remove('active');
            dots[idx].classList.remove('active');
            idx = (n + slides.length) % slides.length;
            slides[idx].classList.add('active');
            dots[idx].classList.add('active');
        }
        function autoplay() { timer = setInterval(() => show(idx + 1), 7000); }
        function start() { stop(); autoplay(); }
        function stop() { if (timer) clearInterval(timer); }
        start();
    }

    /* ---------- 4. PRICING TABS ---------- */
    function runPricingTabs() {
        const tabs = document.querySelectorAll('.pricing-tab');
        const panels = document.querySelectorAll('.pricing-panel');
        if (!tabs.length) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;
                tabs.forEach(t => t.classList.toggle('active', t === tab));
                panels.forEach(p => {
                    p.classList.toggle('active', p.dataset.panel === target);
                });
            });
        });
    }

    /* ---------- 5. ANIMATED COUNTERS ---------- */
    function runCounters() {
        const wrap = document.getElementById('statusNumbers');
        if (!wrap) return;
        const counters = wrap.querySelectorAll('.stat-value');
        const speed = 2000;

        function easeOutQuad(t) { return t * (2 - t); }

        function animate(el) {
            const target = parseInt(el.dataset.target, 10) || 0;
            const start = performance.now();
            function step(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / speed, 1);
                const value = Math.floor(easeOutQuad(progress) * target);
                el.textContent = value.toLocaleString();
                if (progress < 1) requestAnimationFrame(step);
                else el.textContent = target.toLocaleString();
            }
            requestAnimationFrame(step);
        }

        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(animate);
                    io.disconnect();
                }
            });
        }, { threshold: 0.35 });
        io.observe(wrap);
    }

    /* ---------- 6. STICKY HEADER ---------- */
    function runStickyHeader() {
        const header = document.getElementById('siteHeader');
        if (!header) return;
        function onScroll() {
            header.classList.toggle('scrolled', window.scrollY > 40);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- 7. MOBILE MENU ---------- */
    function runMobileMenu() {
        const toggle = document.getElementById('navToggle');
        const nav    = document.getElementById('primaryNav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            toggle.classList.toggle('active', open);
            toggle.setAttribute('aria-expanded', String(open));
            document.body.style.overflow = open ? 'hidden' : '';
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                document.querySelectorAll('.has-dropdown.open, .has-submenu.open, .has-mega.open')
                    .forEach(el => el.classList.remove('open'));
            }
        });
    }

    /* ---------- 8. DROPDOWN TOGGLES (mobile) ---------- */
    function runDropdowns() {
        const parents = document.querySelectorAll('.has-dropdown, .has-mega, .has-submenu');
        parents.forEach(parent => {
            const trigger = parent.querySelector(':scope > a');
            if (!trigger) return;
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth > 768) return;
                e.preventDefault();
                const level = parent.classList.contains('has-mega') ? 'mega'
                            : parent.classList.contains('has-submenu') ? 'sub'
                            : 'top';
                parents.forEach(other => {
                    if (other === parent) return;
                    const olevel = other.classList.contains('has-mega') ? 'mega'
                                 : other.classList.contains('has-submenu') ? 'sub'
                                 : 'top';
                    if (olevel === level) other.classList.remove('open');
                });
                parent.classList.toggle('open');
            });
        });
    }

    /* ---------- 9. BACK TO TOP ---------- */
    function runBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;
        function onScroll() {
            btn.classList.toggle('visible', window.scrollY > 600);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        onScroll();
    }

    /* ---------- 10. NEWSLETTER ---------- */
    function runNewsletter() {
        const form = document.getElementById('newsletterForm');
        const status = document.getElementById('formStatus');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value.trim();
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!valid) {
                status.textContent = 'Please enter a valid email address.';
                status.style.color = '#c64b3b';
                return;
            }
            status.textContent = 'Welcome to the KRIYA circle. We\'ll write soon.';
            status.style.color = '#6f8c6f';
            form.reset();
        });
    }
})();
