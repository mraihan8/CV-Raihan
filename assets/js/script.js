document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const downloadCvButton = document.getElementById('download-cv');
    const cvPreviewModal = document.getElementById('cv-preview-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const cvIframe = document.getElementById('cv-iframe');
    const confirmDownloadModalButton = document.getElementById('confirm-download-modal');
    const pageTransition = document.querySelector('.page-transition');
    const loader = document.getElementById('loader');

    // --- Path ke file PDF CV kamu (di root folder) ---
    const cvPdfPath = 'cv.pdf';

    // --- Loader ---
    window.addEventListener('load', () => {
        if (loader) {
            loader.classList.add('hidden');
        }
    });
    setTimeout(() => { // Fallback for loader
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
        }
    }, 1000);

    // --- Theme Toggle (Dark/Light Mode) ---
    const currentTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.remove('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    };

    const initialTheme = () => {
        if (currentTheme) {
            applyTheme(currentTheme);
        } else if (prefersDarkScheme.matches) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    };

    initialTheme();

    themeToggle.addEventListener('click', () => {
        pageTransition.classList.add('fade-out');
        setTimeout(() => {
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'dark');
                applyTheme('dark');
            } else {
                localStorage.setItem('theme', 'light');
                applyTheme('light');
            }
            pageTransition.classList.remove('fade-out');
        }, 300);
    });

    prefersDarkScheme.addEventListener('change', (event) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });

    // --- Burger Menu for Mobile ---
    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.querySelector('i').classList.toggle('fa-bars');
        burgerMenu.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burgerMenu.querySelector('i').classList.remove('fa-times');
            burgerMenu.querySelector('i').classList.add('fa-bars');
        });
    });

    // --- Smooth Scroll for Navbar Links ---
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- CV Download & Preview ---
    const trackDownload = () => {
        console.log('CV Download clicked!');
        // *** Implement your actual tracking here (misal: kirim ke Google Analytics) ***
    };

    downloadCvButton.addEventListener('click', () => {
        cvIframe.src = `${cvPdfPath}#toolbar=0&navpanes=0`;
        cvPreviewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            cvPreviewModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            cvIframe.src = '';
        });
    });

    cvPreviewModal.addEventListener('click', (e) => {
        if (e.target === cvPreviewModal) {
            cvPreviewModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            cvIframe.src = '';
        }
    });

    confirmDownloadModalButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = cvPdfPath;
        link.setAttribute('download', 'CV-Muhammad-Raihan-Al-Fadhil.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        trackDownload();
        cvPreviewModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        cvIframe.src = '';
    });

    // --- Scroll Reveal Initialization ---
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('[data-scroll-reveal]', {
            delay: 200,
            distance: '50px',
            duration: 800,
            easing: 'ease-in-out',
            origin: 'bottom',
            mobile: true,
            reset: false,
            viewFactor: 0.2,
            afterReveal: function (el) {
                el.style.transform = ''; // Ensures element stays in place after animation
            }
        });

        ScrollReveal().reveal('[data-scroll-reveal="left"]', { origin: 'left' });
        ScrollReveal().reveal('[data-scroll-reveal="right"]', { origin: 'right' });
        ScrollReveal().reveal('[data-scroll-reveal="top"]', { origin: 'top' });
        ScrollReveal().reveal('[data-scroll-reveal="bottom"]', { origin: 'bottom' });

        document.querySelectorAll('[data-scroll-reveal][data-scroll-delay]').forEach(element => {
            const delay = parseInt(element.getAttribute('data-scroll-delay'));
            ScrollReveal().reveal(element, { delay: delay });
        });

    } else {
        console.warn('ScrollReveal library not loaded. Scroll animations will not work.');
        // Make all elements visible if ScrollReveal doesn't load
        document.querySelectorAll('[data-scroll-reveal]').forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.transform = 'none';
        });
    }

});
