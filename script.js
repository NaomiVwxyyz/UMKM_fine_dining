(function() {
    'use strict';

    const tombolBurger = document.getElementById('tombolBurger');
    const menuNavigasi = document.getElementById('menuNavigasi');

    if(tombolBurger && menuNavigasi) {
        tombolBurger.addEventListener('click', () => {
            menuNavigasi.classList.toggle('aktif');
        });
    }

    const linkNavigasi = document.querySelectorAll('.link-navigasi');
    const bagian = document.querySelectorAll('section');

    linkNavigasi.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetBagian = document.querySelector(targetId);

            if (targetBagian) {
                targetBagian.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            if(menuNavigasi) menuNavigasi.classList.remove('aktif');
        });
    });

    const opsiObserver = {
        root: null,
        rootMargin: '-70px 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                linkNavigasi.forEach(link => {
                    link.classList.remove('aktif');
                    if (link.getAttribute('data-bagian') === id) {
                        link.classList.add('aktif');
                    }
                });
            }
        });
    }, opsiObserver);

    bagian.forEach(bg => {
        observer.observe(bg);
    });

    const elemenAnimasi = document.querySelectorAll('.animasi-kiri, .animasi-kanan, .animasi-atas, .animasi-bertahap');

    const observerAnimasi = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('muncul');
                observerAnimasi.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elemenAnimasi.forEach(el => observerAnimasi.observe(el));

    const elemenKetik = document.getElementById('teksKetik');
    const daftarTeks = [
        'Premium Quality',
        'Flawless Taste',
        'Unmatched Experience'
    ];
    let indeksTeks = 0;
    let indeksKarakter = 0;
    let sedangMenghapus = false;
    let kecepatanKetik = 100;

    function ketik() {
        if (!elemenKetik) return;
        
        const teksSaatIni = daftarTeks[indeksTeks];

        if (sedangMenghapus) {
            elemenKetik.textContent = teksSaatIni.substring(0, indeksKarakter - 1);
            indeksKarakter--;
            kecepatanKetik = 50;
        } else {
            elemenKetik.textContent = teksSaatIni.substring(0, indeksKarakter + 1);
            indeksKarakter++;
            kecepatanKetik = 100;
        }

        if (!sedangMenghapus && indeksKarakter === teksSaatIni.length) {
            kecepatanKetik = 2000; 
            sedangMenghapus = true;
        } else if (sedangMenghapus && indeksKarakter === 0) {
            sedangMenghapus = false;
            indeksTeks = (indeksTeks + 1) % daftarTeks.length;
            kecepatanKetik = 500;
        }

        setTimeout(ketik, kecepatanKetik);
    }

    ketik();

    const modal = document.getElementById('modalMenu');
    const overlayModal = document.getElementById('overlayModal');
    const tutupModal = document.getElementById('tutupModal');
    const tombolKembali = document.getElementById('tombolKembali');
    const gambarModal = document.getElementById('gambarModal');
    const judulModal = document.getElementById('judulModal');
    const deskripsiModal = document.getElementById('deskripsiModal');
    const kartuMenu = document.querySelectorAll('.kartu-menu');

    kartuMenu.forEach(kartu => {
        kartu.addEventListener('click', function() {
            const img = this.querySelector('img').src;
            const title = this.querySelector('h3').textContent;
            const desc = this.querySelector('p').textContent;

            if (gambarModal) gambarModal.src = img;
            if (judulModal) judulModal.textContent = title;
            if (deskripsiModal) deskripsiModal.textContent = desc;

            if (modal) modal.classList.add('aktif');
        });
    });

    function sembunyikanModal() {
        if (modal) modal.classList.remove('aktif');
    }

    if (tutupModal) tutupModal.addEventListener('click', sembunyikanModal);
    if (tombolKembali) tombolKembali.addEventListener('click', sembunyikanModal);
    if (overlayModal) overlayModal.addEventListener('click', sembunyikanModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            sembunyikanModal();
        }
    });

    const formulirKontak = document.getElementById('formulirKontak');

    if (formulirKontak) {
        formulirKontak.addEventListener('submit', function(e) {
            e.preventDefault();

            const dataFormulir = new FormData(this);
            const nama = dataFormulir.get('name');
            const email = dataFormulir.get('email');
            const pesan = dataFormulir.get('message');

            const linkEmail = `mailto:jogi@example.com?subject=Reservasi dari ${encodeURIComponent(nama)}&body=${encodeURIComponent(pesan)}%0D%0A%0D%0ADari: ${encodeURIComponent(email)}`;

            window.location.href = linkEmail;

            this.reset();
            alert('Terima kasih! Pesan/Reservasi Anda akan kami proses.');
        });
    }

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.background = 'linear-gradient(135deg, rgba(0,245,194,0.1), rgba(0,245,194,0.3))';
            this.alt = 'Gambar tidak tersedia';
        });
    });

})();