export function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                animateStat(statElement);
                observer.unobserve(statElement); // Animate only once when entering view
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateStat(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2500; // 2.5 seconds
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    // Helper for cubic ease-out
    const easeOutCubic = x => 1 - Math.pow(1 - x, 3);

    const timer = setInterval(() => {
        currentFrame++;
        const progress = currentFrame / totalFrames;
        const easedProgress = easeOutCubic(progress);

        if (currentFrame >= totalFrames) {
            clearInterval(timer);
            element.textContent = target + suffix;
        } else {
            // Digital scramble effect: during the first 40% of animation, add some random digital jitter
            let currentValue = easedProgress * target;
            if (progress < 0.4) {
                const randomJitter = (Math.random() - 0.5) * (target * 0.25);
                currentValue = Math.max(0, currentValue + randomJitter);
            }
            
            // Format number cleanly
            let displayValue;
            if (target >= 100) {
                displayValue = Math.round(currentValue);
            } else {
                displayValue = currentValue.toFixed(0);
            }
            
            element.textContent = displayValue + suffix;
        }
    }, frameRate);
}
