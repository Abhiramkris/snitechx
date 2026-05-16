import { animate, stagger } from "https://esm.sh/motion";

export const apartData = [
    {
        id: 1,
        title: "Elite engineering talent",
        description: "We hire only the top 0.4% from Asia's strongest engineering pools. These aren't your average developers. They're proven scale-up product builders who have done this exact thing before, many times",
        statNumber: "0.4%",
        statLabel: "Applicant only survive",
        highlightText: "Get results from week one, not after months of ramp-up"
    },
    {
        id: 2,
        title: "AI-native, and it compounds",
        description: "AI is embedded in our software development lifecycle. It helps us build better quality products faster, and it's how we've consistently become our clients' highest-performing product teams on projects",
        statNumber: "3%",
        statLabel: "Faster development pace",
        highlightText: "Get results from week one, not after months of ramp-up"
    },
    {
        id: 3,
        title: "Built for the long term",
        description: "We work with clients for years, not projects. Ownership, continuity, and commitment are core to the Snitechx way. And when the time comes to build your own team, we don't just step aside, we help you make that transition.",
        statNumber: "18 months",
        statLabel: "average partnership duration, and counting",
        highlightText: "Hiring the best people and setting them up for success"
    },
    {
        id: 4,
        title: "We know your stage",
        description: "Whether you are a Series B scale-up expanding your core product line or a Fortune 500 enterprise undergoing digital transformation, we adapt our engineering velocity and governance models to fit your precise operational maturity.",
        statNumber: "100%",
        statLabel: "Stage-aligned execution",
        highlightText: "Custom architectural roadmaps tailored to your immediate runway and growth milestones"
    }
];

export function initApartGrid() {
    const container = document.getElementById('apart-grid-container');
    if (!container) return;

    container.innerHTML = apartData.map(item => `
        <div class="apart-card" style="opacity: 0; transform: translateY(60px) scale(0.95);">
            <div class="apart-card-top">
                <h3>${item.title}<span class="blue-dot">.</span></h3>
                <p>${item.description}</p>
            </div>
            <div class="apart-card-bottom">
                <div class="apart-stat-row">
                    <span class="apart-stat-num">${item.statNumber}</span>
                    <span class="apart-stat-label">${item.statLabel}</span>
                </div>
                <div class="apart-highlight-text">${item.highlightText}</div>
            </div>
        </div>
    `).join('');

    const cards = container.querySelectorAll('.apart-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(
                    cards, 
                    { 
                        opacity: [0, 1], 
                        transform: ["translateY(60px) scale(0.95)", "translateY(0px) scale(1)"] 
                    }, 
                    { 
                        delay: stagger(0.15), 
                        duration: 0.8, 
                        easing: [0.22, 1, 0.36, 1] 
                    }
                );
                observer.disconnect();
            }
        });
    }, { threshold: 0.15 });

    observer.observe(container);
}
