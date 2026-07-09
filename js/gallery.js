/* =========================================================
   KRIYA YOGA — Gallery behaviors
   - Filter by category
   - Lightbox / image preview
   - Hover zoom (CSS handles the rest)
========================================================= */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        buildLightbox();
        runFilters();
        wireLightbox();
    }

    /* ---------- 1. LIGHTBOX MARKUP ---------- */
    function buildLightbox() {
        if (document.getElementById('kriyaLightbox')) return;
        const lb = document.createElement('div');
        lb.id = 'kriyaLightbox';
        lb.className = 'lightbox';
        lb.setAttribute('aria-hidden', 'true');
        lb.innerHTML = `
            <button class="lightbox-close" type="button" aria-label="Close">×</button>
            <button class="lightbox-prev" type="button" aria-label="Previous">‹</button>
            <button class="lightbox-next" type="button" aria-label="Next">›</button>
            <img class="lightbox-image" alt="">
            <span class="lightbox-caption"></span>
        `;
        document.body.appendChild(lb);
    }

    /* ---------- 2. GALLERY FILTERS ---------- */
    function runFilters() {
        const filters = document.querySelectorAll('.gallery-filters button');
        const items = document.querySelectorAll('.gallery-item[data-cat]');
        if (!filters.length || !items.length) return;

        filters.forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.dataset.filter;
                filters.forEach(b => b.classList.toggle('active', b === btn));
                items.forEach(item => {
                    const match = cat === 'all' || item.dataset.cat === cat;
                    item.style.display = match ? '' : 'none';
                });
            });
        });
    }

    /* ---------- 3. WIRE LIGHTBOX ---------- */
    function wireLightbox() {
        const items = document.querySelectorAll('.gallery-item');
        if (!items.length) return;
        const lb = document.getElementById('kriyaLightbox');
        if (!lb) return;
        const lbImg = lb.querySelector('.lightbox-image');
        const lbCap = lb.querySelector('.lightbox-caption');
        const btnClose = lb.querySelector('.lightbox-close');
        const btnPrev = lb.querySelector('.lightbox-prev');
        const btnNext = lb.querySelector('.lightbox-next');

        let list = [];
        let cur = 0;

        function open(idx) {
            cur = idx;
            const item = list[cur];
            const img = item.querySelector('img');
            lbImg.src = img ? img.src : '';
            lbImg.alt = img ? img.alt : '';
            lbCap.textContent = item.dataset.caption || (img && img.alt) || '';
            lb.classList.add('open');
            lb.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
        function close() {
            lb.classList.remove('open');
            lb.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
        function next() { open((cur + 1) % list.length); }
        function prev() { open((cur - 1 + list.length) % list.length); }

        // build the openable list (only items that have an image)
        list = Array.from(items).filter(i => i.querySelector('img'));
        list.forEach((item, i) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                open(i);
            });
        });

        btnClose.addEventListener('click', close);
        btnNext.addEventListener('click', next);
        btnPrev.addEventListener('click', prev);
        lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
        document.addEventListener('keydown', (e) => {
            if (!lb.classList.contains('open')) return;
            if (e.key === 'Escape')     close();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft')  prev();
        });
    }
})();
