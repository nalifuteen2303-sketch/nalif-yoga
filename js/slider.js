/* =========================================================
   KRIYA YOGA — Slider behaviors
   - Hero slider (autoplay + clickable dots)
   - Testimonial slider
========================================================= */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        runHeroSlider();
        runTestimonialSlider();
    }

    /* ---------- HERO SLIDER ---------- */
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

    /* ---------- TESTIMONIAL SLIDER ---------- */
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
})();
