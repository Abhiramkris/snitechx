import { animate } from "https://esm.sh/motion";

export function initHeroAnimation() {
    const heroBox = document.querySelector('.hero-box');
    const h1 = document.querySelector('.hero-box h1');
    const p = document.querySelector('.hero-box p');
    const mockupContainer = document.querySelector('.hero-mockup-container');
    const mockup = document.querySelector('.hero-mockup');
    const cta = document.querySelector('.cta-input-container');

    if (!heroBox || !mockupContainer || !mockup) return;

    // 1. Initial 3D Squeeze & Slide-In Animation
    // Set initial states
    if (h1) {
        h1.style.opacity = "0";
        h1.style.transform = "translateY(40px)";
        animate(h1, { opacity: [0, 1], transform: ["translateY(40px)", "translateY(0px)"] }, { duration: 0.8, delay: 0.1, easing: [0.22, 1, 0.36, 1] });
    }

    if (p) {
        p.style.opacity = "0";
        p.style.transform = "translateY(40px)";
        animate(p, { opacity: [0, 1], transform: ["translateY(40px)", "translateY(0px)"] }, { duration: 0.8, delay: 0.25, easing: [0.22, 1, 0.36, 1] });
    }

    if (cta) {
        cta.style.opacity = "0";
        cta.style.transform = "translateX(-50%) translateY(40px)";
        animate(cta, { opacity: [0, 1], transform: ["translateX(-50%) translateY(40px)", "translateX(-50%) translateY(0px)"] }, { duration: 0.8, delay: 0.4, easing: [0.22, 1, 0.36, 1] });
    }

    // Animate 3D Phone Mockup Squeeze & Slide-in
    mockupContainer.style.opacity = "0";
    mockupContainer.style.transform = "perspective(1200px) rotateX(35deg) rotateY(-25deg) scale(0.75) translateY(180px)";

    animate(
        mockupContainer,
        { 
            opacity: [0, 1], 
            transform: [
                "perspective(1200px) rotateX(35deg) rotateY(-25deg) scale(0.75) translateY(180px)", 
                "perspective(1200px) rotateX(-5deg) rotateY(10deg) scale(1.05) translateY(-10px)",
                "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)"
            ] 
        },
        { 
            duration: 1.4, 
            delay: 0.2, 
            easing: [0.22, 1, 0.36, 1] 
        }
    ).finished.then(() => {
        // Start continuous gentle 3D floating animation once entrance completes
        animate(
            mockupContainer,
            { 
                transform: [
                    "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)",
                    "perspective(1200px) rotateX(4deg) rotateY(6deg) translateY(-12px)",
                    "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)"
                ]
            },
            {
                duration: 6,
                repeat: Infinity,
                easing: "ease-in-out"
            }
        );
    });

    // 2. Interactive Mousemove Parallax Effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
        const { innerWidth, innerHeight } = window;
        // Calculate normalized mouse position (-0.5 to 0.5)
        mouseX = (e.clientX / innerWidth) - 0.5;
        mouseY = (e.clientY / innerHeight) - 0.5;
    });

    // Smooth RAF loop for buttery parallax
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    function updateParallax() {
        // Interpolate for smooth trailing effect
        targetX += (mouseX - targetX) * 0.1;
        targetY += (mouseY - targetY) * 0.1;

        // Combine mouse parallax with scroll parallax
        const textOffset = 25;
        const textScroll = scrollY * 0.15;
        if (h1) h1.style.transform = `translate(${targetX * textOffset}px, ${targetY * textOffset + textScroll}px)`;
        if (p) p.style.transform = `translate(${targetX * textOffset * 0.8}px, ${targetY * textOffset * 0.8 + textScroll * 0.8}px)`;

        // Move mockup img in opposite direction for 3D depth
        const mockupOffset = -45;
        mockup.style.transform = `translate(${targetX * mockupOffset}px, ${targetY * mockupOffset}px) rotateY(${targetX * 15}deg) rotateX(${-targetY * 15}deg)`;

        // Move mockupContainer on scroll at a different depth speed
        if (mockupContainer) mockupContainer.style.transform = `translateY(${scrollY * 0.28}px)`;

        requestAnimationFrame(updateParallax);
    }
    
    requestAnimationFrame(updateParallax);
}
