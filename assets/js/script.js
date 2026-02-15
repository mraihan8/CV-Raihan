document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle'); // New language toggle button
    const flagIcon = document.getElementById('flag-icon'); // New flag icon
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

    // --- Localization Data ---
    const translations = {
        'id': {
            'title': 'Muhammad Raihan Al Fadhil - Web CV',
            'meta_description': 'Profil Web CV profesional Muhammad Raihan Al Fadhil, seorang Engineer Endpoint Security di CISO Mandiri dengan keahlian di Jaringan, Keamanan, Pemrograman, dan Pengembangan Web.',
            'meta_keywords': 'Muhammad Raihan Al Fadhil, CV, Web CV, Engineer Endpoint Security, CISO Mandiri, Jaringan, Keamanan, Pemrograman, Python, Java, Web Development, Resume, IT Security, Portfolio',
            'og_title': 'Muhammad Raihan Al Fadhil - Web CV',
            'og_description': 'Profil Web CV profesional Muhammad Raihan Al Fadhil, seorang Engineer Endpoint Security di CISO Mandiri dengan keahlian di Jaringan, Keamanan, Pemrograman, dan Pengembangan Web.',
            'twitter_title': 'Muhammad Raihan Al Fadhil - Web CV',
            'twitter_description': 'Profil Web CV profesional Muhammad Raihan Al Fadhil, seorang Engineer Endpoint Security di CISO Mandiri dengan keahlian di Jaringan, Keamanan, Pemrograman, dan Pengembangan Web.',

            'nav_home': 'Home',
            'nav_about': 'Tentang Saya',
            'nav_skills': 'Keahlian',
            'nav_contact': 'Kontak',
            'nav_download_cv': 'Unduh CV',
            'hero_name': 'Muhammad Raihan Al Fadhil',
            'hero_tagline': 'Engineer Endpoint Security CISO Mandiri',
            'about_title': 'Tentang Saya',
            'about_content': 'Profesional di Bidang Network & Security Engineer dengan pengalaman lebih dari 1 tahun dalam mengimplementasikan kebijakan serta pengelolaan dan troubleshooting agar menjadi solusi keamanan jaringan yang memenuhi standar keamanan di CISO Mandiri.',
            'skills_title': 'Layanan & Keahlian Saya',
            'skill_cat_programming': 'Pemrograman',
            'skill_cat_database': 'Manajemen Basis Data',
            'skill_cat_office': 'Microsoft Office',
            'skill_cat_networking': 'Jaringan',
            'skill_cat_webdev': 'Pengembangan Web',
            'skill_cat_tools': 'Alat',
            'skill_cat_editor': 'Aplikasi Editor',
            'skill_cat_security': 'Keahlian Manajemen Keamanan',
            'contact_title': 'Hubungi Saya',
            'contact_email_label': 'Email: ',
            'contact_linkedin_label': 'LinkedIn: ',
            'preview_cv_title': 'Pratinjau CV',
            'modal_download_cv': 'Unduh CV'
        },
        'en': {
            'title': 'Muhammad Raihan Al Fadhil - Web CV',
            'meta_description': 'Professional Web CV profile of Muhammad Raihan Al Fadhil, an Endpoint Security Engineer at CISO Mandiri with expertise in Network, Security, Programming, and Web Development.',
            'meta_keywords': 'Muhammad Raihan Al Fadhil, CV, Web CV, Endpoint Security Engineer, CISO Mandiri, Network, Security, Programming, Python, Java, Web Development, Resume, IT Security, Portfolio',
            'og_title': 'Muhammad Raihan Al Fadhil - Web CV',
            'og_description': 'Professional Web CV profile of Muhammad Raihan Al Fadhil, an Endpoint Security Engineer at CISO Mandiri with expertise in Network, Security, Programming, and Web Development.',
            'twitter_title': 'Muhammad Raihan Al Fadhil - Web CV',
            'twitter_description': 'Professional Web CV profile of Muhammad Raihan Al Fadhil, an Endpoint Security Engineer at CISO Mandiri with expertise in Network, Security, Programming, and Web Development.',

            'nav_home': 'Home',
            'nav_about': 'About Me',
            'nav_skills': 'Skills',
            'nav_contact': 'Contact',
            'nav_download_cv': 'Download CV',
            'hero_name': 'Muhammad Raihan Al Fadhil',
            'hero_tagline': 'Engineer Endpoint Security CISO Mandiri',
            'about_title': 'About Me',
            'about_content': 'A professional Network & Security Engineer with over 1 year of experience in implementing policies, management, and troubleshooting to provide network security solutions that meet security standards at CISO Mandiri.',
            'skills_title': 'My Services & Skills',
            'skill_cat_programming': 'Programming',
            'skill_cat_database': 'Database Management',
            'skill_cat_office': 'Microsoft Office',
            'skill_cat_networking': 'Networking',
            'skill_cat_webdev': 'Web Development',
            'skill_cat_tools': 'Tools',
            'skill_cat_editor': 'Editor Applications',
            'skill_cat_security': 'Security Management Skills',
            'contact_title': 'Contact Me',
            'contact_email_label': 'Email: ',
            'contact_linkedin_label': 'LinkedIn: ',
            'preview_cv_title': 'Preview CV',
            'modal_download_cv': 'Download CV'
        }
    };

    // --- Loader ---
    window.addEventListener('load', () => {
        if (loader) {
            loader.classList.add('hidden');
        }
    });
    setTimeout(() => { // Fallback for loader
        if (loader &&!loader.classList.contains('hidden')) {
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
            applyTheme(event.matches? 'dark' : 'light');
        }
    });

    // --- Language Toggle (Bilingual Feature) ---
    let currentLang = localStorage.getItem('lang') || 'id'; // Default to Indonesian

    const updateContent = (lang) => {
        document.documentElement.lang = lang; // Update html lang attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'META') { // Handle meta tags
                    if (element.name === 'description' || element.name === 'keywords') {
                        element.setAttribute('content', translations[lang][key]);
                    } else if (element.hasAttribute('property')) { // Open Graph/Twitter
                        element.setAttribute('content', translations[lang][key]);
                    } else if (element.tagName === 'TITLE') {
                        element.textContent = translations[lang][key];
                    }
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        // Update flag icon
        flagIcon.src = `assets/images/${lang}_flag.png`;
        flagIcon.alt = `${lang.toUpperCase()} Flag`;
        localStorage.setItem('lang', lang); // Save preferred language
    };

    // Apply initial language
    updateContent(currentLang);

    langToggle.addEventListener('click', () => {
        currentLang = (currentLang === 'id')? 'en' : 'id';
        updateContent(currentLang);
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
        // *** Implement your actual tracking here ***
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
    // Initialize ScrollReveal with custom options
    if (typeof ScrollReveal!== 'undefined') {
        ScrollReveal().reveal('[data-scroll-reveal]', {
            delay: 200, // Delay before the animation starts
            distance: '50px', // Distance moved during the animation
            duration: 800, // Duration of the animation
            easing: 'ease-in-out', // Easing function
            origin: 'bottom', // Default origin (can be overridden by data-scroll-reveal value)
            mobile: true, // Animate on mobile as well
            reset: false, // Only animate once
            viewFactor: 0.2, // Percentage of element visible to trigger
            afterReveal: function (el) {
                // Optionally remove the transform after reveal for perfect alignment
                el.style.transform = '';
            }
        });

        // Specific configurations for different origins (overrides default)
        ScrollReveal().reveal('[data-scroll-reveal="left"]', { origin: 'left' });
        ScrollReveal().reveal('[data-scroll-reveal="right"]', { origin: 'right' });
        ScrollReveal().reveal('[data-scroll-reveal="top"]', { origin: 'top' });
        ScrollReveal().reveal('[data-scroll-reveal="bottom"]', { origin: 'bottom' });

        // Apply delay from data-scroll-delay attribute
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
