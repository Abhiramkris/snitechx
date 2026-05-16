import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@11.11.11/+esm";

class NavbarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header class="navbar">
                <div class="nav-container">
                    <a href="/" class="logo">
                        <img src="./assets/snitechxLogo.svg" alt="Snitechx" />
                    </a>

                    <nav class="desktop-nav">
                        <a href="#home">Home</a>
                        <a href="#services">Services</a>
                        <a href="#blog">Blog</a>
                        <a href="#contact">Contact</a>
                        <a href="#industries">Industries</a>
                    </nav>

                    <div class="cta-container">
                        <a href="#connect" class="cta-button">Connect Back</a>
                        <button class="mobile-toggle" aria-label="Toggle menu">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path class="line-top" d="M4 6H20" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                <path class="line-middle" d="M4 12H20" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                <path class="line-bottom" d="M4 18H20" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="mobile-menu">
                    <div class="mobile-nav-links">
                        <a href="#home">Home</a>
                        <a href="#services">Services</a>
                        <a href="#blog">Blog</a>
                        <a href="#contact">Contact</a>
                        <a href="#industries">Industries</a>
                        <a href="#connect" class="mobile-cta">Connect Back</a>
                    </div>
                </div>
            </header>
        `;

        this.setupInteractions();
    }

    setupInteractions() {
        const toggleBtn = this.querySelector('.mobile-toggle');
        const mobileMenu = this.querySelector('.mobile-menu');
        const lineTop = this.querySelector('.line-top');
        const lineMiddle = this.querySelector('.line-middle');
        const lineBottom = this.querySelector('.line-bottom');
        const mobileLinks = this.querySelectorAll('.mobile-nav-links a');
        
        let isOpen = false;
        let animationInProgress = false;

        toggleBtn.addEventListener('click', () => {
            if (animationInProgress) return;
            animationInProgress = true;
            
            isOpen = !isOpen;

            if (isOpen) {
                // Open menu
                mobileMenu.style.display = 'flex';
                
                // Animate menu background from top to bottom
                animate(mobileMenu, { 
                    y: ["-100%", "0%"],
                    opacity: [0, 1]
                }, { 
                    duration: 0.6, 
                    easing: [0.22, 1, 0.36, 1] 
                });

                // Animate hamburger icon to X
                animate(lineTop, { d: "M6 6L18 18" }, { duration: 0.4 });
                animate(lineMiddle, { opacity: 0 }, { duration: 0.2 });
                animate(lineBottom, { d: "M6 18L18 6" }, { duration: 0.4 });

                // Stagger in links
                animate(
                    mobileLinks, 
                    { y: [40, 0], opacity: [0, 1] }, 
                    { 
                        delay: stagger(0.08, { startDelay: 0.2 }), 
                        duration: 0.5, 
                        easing: [0.22, 1, 0.36, 1] 
                    }
                ).finished.then(() => {
                    animationInProgress = false;
                });
                
            } else {
                // Close menu
                animate(
                    mobileLinks, 
                    { y: [0, -20], opacity: [1, 0] }, 
                    { 
                        duration: 0.3,
                        easing: [0.22, 1, 0.36, 1]
                    }
                );

                animate(mobileMenu, { 
                    y: ["0%", "-100%"],
                    opacity: [1, 0]
                }, { 
                    duration: 0.5, 
                    delay: 0.1,
                    easing: [0.22, 1, 0.36, 1] 
                }).finished.then(() => {
                    mobileMenu.style.display = 'none';
                    animationInProgress = false;
                });

                // Animate X back to hamburger
                animate(lineTop, { d: "M4 6H20" }, { duration: 0.4 });
                animate(lineMiddle, { opacity: 1 }, { duration: 0.4 });
                animate(lineBottom, { d: "M4 18H20" }, { duration: 0.4 });
            }
        });
        
        // Close on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isOpen && !animationInProgress) toggleBtn.click();
            });
        });
    }
}

customElements.define('snitechx-navbar', NavbarComponent);
