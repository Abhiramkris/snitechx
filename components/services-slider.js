import { animate, stagger } from "https://esm.sh/motion";

export const servicesData = [
    {
        id: 1,
        title: "Communication & networks",
        image: "./assets/service/service1.svg",
        description: "Architecting ultra-low latency, high-throughput network topologies designed for mission-critical enterprise compliance."
    },
    {
        id: 2,
        title: "Cloud solutions",
        image: "./assets/service/service2.svg",
        description: "Deploying resilient, multi-cloud infrastructure with automated scaling, failover redundancy, and optimized cloud economics."
    },
    {
        id: 3,
        title: "Cyber security",
        image: "./assets/service/service3.svg",
        description: "Implementing zero-trust security architectures and automated threat detection to safeguard enterprise digital assets."
    },
    {
        id: 4,
        title: "It solutions",
        image: "./assets/service/service4.svg",
        description: "Modernizing legacy IT systems with agile workflows, seamless system integrations, and continuous operational support."
    },
    {
        id: 5,
        title: "Softwares & development",
        image: "./assets/service/service5.svg",
        description: "Building high-performance, AI-native software applications engineered for rapid scaling and long-term maintainability."
    },
    {
        id: 6,
        title: "Data centre solutions",
        image: "./assets/service/service6.svg",
        description: "Delivering state-of-the-art data center management, server virtualization, and bulletproof disaster recovery pipelines."
    }
];

export function initServicesSlider() {
    const track = document.getElementById('services-track');
    if (!track) return;

    // Render cards from JSON with initial hidden swipe state
    track.innerHTML = servicesData.map(service => `
        <div class="service-card" style="opacity: 0; transform: translateX(100px);">
            <div class="service-image-wrapper">
                <img src="${service.image}" alt="${service.title}" class="service-image" />
            </div>
            <div class="service-content">
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            </div>
        </div>
    `).join('');

    // Navigation Arrows
    const leftArrow = document.getElementById('service-arrow-left');
    const rightArrow = document.getElementById('service-arrow-right');

    if (leftArrow && rightArrow) {
        const scrollAmount = 344; // Card width (320) + gap (24)

        leftArrow.addEventListener('click', () => {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        rightArrow.addEventListener('click', () => {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    const cards = track.querySelectorAll('.service-card');
    if (!cards.length) return;

    // Scroll peek & swipe animation on enter viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Motion One staggered swipe-in entrance with 0.3s (300ms) delay
                animate(
                    cards,
                    {
                        opacity: [0, 1],
                        transform: ["translateX(100px)", "translateX(0px)"]
                    },
                    {
                        delay: stagger(0.15, { startDelay: 0.3 }),
                        duration: 0.8,
                        easing: [0.22, 1, 0.36, 1]
                    }
                );

                // 2. Physical scroll peek animation triggers right after cards finish swiping in
                setTimeout(() => {
                    track.scrollBy({ left: 120, behavior: 'smooth' });
                    setTimeout(() => {
                        track.scrollBy({ left: -120, behavior: 'smooth' });
                    }, 800);
                }, 1200);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
        observer.observe(servicesSection);
    }
}
