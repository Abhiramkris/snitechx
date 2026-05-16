export const servicesData = [
    {
        id: 1,
        title: "Communication & networks",
        image: "./assets/service/service1.svg",
        description: "Our sales representative will contact you via email within 1 business day to learn more about your goals."
    },
    {
        id: 2,
        title: "Cloud solutions",
        image: "./assets/service/service2.svg",
        description: "Our sales representative will contact you via email within 1 business day to learn more about your goals."
    },
    {
        id: 3,
        title: "Cyber security",
        image: "./assets/service/service3.svg",
        description: "Our sales representative will contact you via email within 1 business day to learn more about your goals."
    },
    {
        id: 4,
        title: "Software Development",
        image: "./assets/service/service4.svg",
        description: "Our sales representative will contact you via email within 1 business day to learn more about your goals."
    },
    {
        id: 5,
        title: "Data centre solutions",
        image: "./assets/service/service5.svg",
        description: "Our sales representative will contact you via email within 1 business day to learn more about your goals."
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
