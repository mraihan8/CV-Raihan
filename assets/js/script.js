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

    // --- Path ke file PDF CV kamu (sekarang di root folder) ---
    const cvPdfPath = 'cv.pdf';

    // --- Loader ---
    // Hide loader after all assets (including images, if any) are loaded
    window.addEventListener('load', () => {
        if (loader) {
            loader.classList.add('hidden');
        }
    });
    // Fallback if load event fires too quickly
    setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
        }
    }, 1000); // Ensures loader hides after 1 second even if load event is missed/fast

    // --- Theme Toggle (Dark/Light Mode) ---
    const currentTheme = localStorage.getItem('theme'); // Get user's preferred theme from local storage
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)'); // Check OS preference

    // Function to apply theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.remove('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Icon for light mode toggle
        } else {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Icon for dark mode toggle
        }
    };

    // Set initial theme on page load
    const initialTheme = () => {
        if (currentTheme) {
            applyTheme(currentTheme);
        } else if (prefersDarkScheme.matches) {
            applyTheme('dark'); // Apply dark if OS prefers dark and no theme set
        } else {
            applyTheme('light'); // Default to light if no theme set and OS doesn't prefer dark
        }
    };

    initialTheme(); // Apply theme when script runs

    // Event listener for theme toggle button
    themeToggle.addEventListener('click', () => {
        // Start fade out animation for page content
        pageTransition.classList.add('fade-out');

        // Allow time for fade out before changing theme
        setTimeout(() => {
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'dark'); // Save preference
                applyTheme('dark');
            } else {
                localStorage.setItem('theme', 'light'); // Save preference
                applyTheme('light');
            }
            // Remove fade out animation
            pageTransition.classList.remove('fade-out');
        }, 300); // Matches CSS transition duration for page-transition
    });

    // Listen for changes in OS theme preference (if user hasn't manually selected a theme)
    prefersDarkScheme.addEventListener('change', (event) => {
        if (!localStorage.getItem('theme')) { // Only auto-switch if user hasn't manually set a theme
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });

    // --- Burger Menu for Mobile ---
    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Toggle visibility of nav links
        burgerMenu.querySelector('i').classList.toggle('fa-bars'); // Change icon from burger to close
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
            e.preventDefault(); // Prevent default jump behavior
            const targetId = this.getAttribute('href').substring(1); // Get target section ID
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Smooth scroll effect
                });
            }
        });
    });

    // --- CV Download & Preview ---

    // Function to track download (Placeholder for actual analytics)
    const trackDownload = () => {
        console.log('CV Download clicked!');
        // *** Implement your actual tracking here ***
        // Example with a hypothetical API endpoint:
        // fetch('/api/track-cv-download', { method: 'POST' })
        //     .then(response => console.log('Download tracked:', response.status))
        //     .catch(error => console.error('Error tracking download:', error));
        
        // For demonstration, a simple alert:
        // alert('Thank you for downloading my CV!'); 
    };

    // Open Preview Modal
    downloadCvButton.addEventListener('click', () => {
        cvIframe.src = `${cvPdfPath}#toolbar=0&navpanes=0`; // Load PDF into iframe
        cvPreviewModal.classList.add('active'); // Show modal
        document.body.style.overflow = 'hidden'; // Prevent scrolling on body when modal is open
    });

    // Close Modal
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            cvPreviewModal.classList.remove('active'); // Hide modal
            document.body.style.overflow = 'auto'; // Restore body scrolling
            cvIframe.src = ''; // Clear iframe src to stop any PDF loading/memory usage
        });
    });

    // Close modal if clicked outside modal content
    cvPreviewModal.addEventListener('click', (e) => {
        if (e.target === cvPreviewModal) {
            cvPreviewModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            cvIframe.src = '';
        }
    });

    // Confirm Download from Modal
    confirmDownloadModalButton.addEventListener('click', () => {
        const link = document.createElement('a'); // Create a temporary anchor element
        link.href = cvPdfPath; // Set href to the PDF file
        link.setAttribute('download', 'CV-Muhammad-Raihan-Al-Fadhil.pdf'); // Suggest a file name
        document.body.appendChild(link); // Append to body (required for Firefox)
        link.click(); // Programmatically click the link to start download
        document.body.removeChild(link); // Remove temporary link
        
        trackDownload(); // Track the download
        cvPreviewModal.classList.remove('active'); // Close modal after download
        document.body.style.overflow = 'auto'; // Restore body scrolling
        cvIframe.src = ''; // Clear iframe src
    });
});
