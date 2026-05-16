import { animate, stagger } from "https://esm.sh/motion";

export const industryData = [
    {
        id: 1,
        title: "Manufacturing Sector",
        image: "./assets/industry/industry1.svg",
        description: "Industry with high tech machinery needing automations and stuffs like that",
        scale: 1.15
    },
    {
        id: 2,
        title: "FinTech & Finance",
        image: "./assets/industry/industry2.svg",
        description: "Industry with high tech machinery needing automations and stuffs like that",
        scale: 1.1
    },
    {
        id: 3,
        title: "Law & Legislature",
        image: "./assets/industry/industry3.svg",
        description: "Industry with high tech machinery needing automations and stuffs like that",
        scale: 1.2
    },
    {
        id: 4,
        title: "Cloud Infrastructure",
        image: "./assets/industry/industry4.svg",
        description: "Industry with high tech machinery needing automations and stuffs like that",
        scale: 1.25
    },
    {
        id: 5,
        title: "Data centre solutions",
        image: "./assets/industry/industry5.svg",
        description: "Industry with high tech machinery needing automations and stuffs like that",
        scale: 1.25
    },
    {
        id: 6,
        title: "Ecom & Marketplace",
        image: "./assets/industry/industry6.svg",
        description: "Industry with high tech machinery needing automations and stuffs like that",
        scale: 1.15
    }
];

export function initIndustryGrid() {
    const container = document.getElementById('industry-grid-container');
    if (!container) return;

    container.innerHTML = industryData.map(item => `
        <div class="industry-card-wrapper" style="opacity: 0; transform: translateY(60px) scale(0.95); filter: drop-shadow(0 0 0px rgba(1, 148, 215, 0));">
            <div class="industry-card">
                <div class="industry-image-wrapper">
                    <div class="industry-image-scaler" style="transform: scale(${item.scale || 1}); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                        <img src="${item.image}" alt="${item.title}" class="industry-image" />
                    </div>
                </div>
                <div class="industry-divider"></div>
                <div class="industry-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        </div>
    `).join('');

    const wrappers = container.querySelectorAll('.industry-card-wrapper');
    if (!wrappers.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(
                    wrappers, 
                    { 
                        opacity: [0, 1], 
                        transform: ["translateY(60px) scale(0.95)", "translateY(0px) scale(1)"],
                        filter: [
                            "drop-shadow(0 0 0px rgba(1, 148, 215, 0))", 
                            "drop-shadow(0 0 35px rgba(1, 148, 215, 0.85))", 
                            "drop-shadow(0 4px 20px rgba(0, 0, 0, 0.05))"
                        ]
                    }, 
                    { 
                        delay: stagger(0.12), 
                        duration: 1.2, 
                        easing: [0.22, 1, 0.36, 1] 
                    }
                );
                observer.disconnect();
            }
        });
    }, { threshold: 0.15 });

    observer.observe(container);
}
