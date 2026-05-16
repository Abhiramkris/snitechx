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

    // Render cards from JSON
    track.innerHTML = servicesData.map(service => `
        <div class="service-card">
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

    // Scroll peek animation on enter viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // True physical scroll peek animation
                setTimeout(() => {
                    track.scrollBy({ left: 80, behavior: 'smooth' });
                    setTimeout(() => {
                        track.scrollBy({ left: -80, behavior: 'smooth' });
                    }, 800);
                }, 500); // Wait 500ms after entering view so user is looking at it
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
        observer.observe(servicesSection);
    }
}
