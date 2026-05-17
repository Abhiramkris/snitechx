import { animate, stagger } from "https://esm.sh/motion";

export function getDriveImageUrl(url) {
    if (!url) return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop';
    if (url.includes('drive.google.com')) {
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            return `https://drive.google.com/uc?export=view&id=${match[1]}`;
        }
    }
    return url;
}

export async function initBlogGrid() {
    const container = document.getElementById('blog-grid-container');
    if (!container) return;

    let allBlogs = [];
    try {
        const res = await fetch('./blogs.json');
        allBlogs = await res.json();
    } catch (err) {
        console.error('Failed to fetch blogs.json:', err);
        return;
    }

    // Sort by idx ascending (if not already) so idx: 3 is last
    allBlogs.sort((a, b) => a.idx - b.idx);

    let showingAll = false;

    function renderBlogs(items, animateIn = true) {
        container.innerHTML = items.map(item => {
            const dateStr = new Date(item.created_at.split(' ')[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            return `
                <article class="blog-card" onclick="window.location.href='blog.html?slug=${item.slug}'" style="opacity: 0; transform: translateY(60px) scale(0.95);">
                    <div class="blog-image-wrapper">
                        <img src="${getDriveImageUrl(item.main_image_url)}" alt="${item.title}" class="blog-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop';" />
                    </div>
                    <div class="blog-content">
                        <h3 class="blog-title">${item.title}</h3>
                        <div class="blog-footer">
                            <div class="blog-meta">
                                <span class="blog-time">${dateStr}</span>
                                <span class="blog-author">Snitechx AI</span>
                            </div>
                            <div class="blog-arrow-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        const cards = container.querySelectorAll('.blog-card');
        if (!cards.length) return;

        if (animateIn) {
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
        } else {
            cards.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = 'translateY(0px) scale(1)';
            });
        }
    }

    // Initial render: top 3 latest (biggest json number - 3)
    const latestBlogs = allBlogs.slice(-3).reverse();
    renderBlogs(latestBlogs, false); // initial animation handled by intersection observer below

    const cards = container.querySelectorAll('.blog-card');
    if (cards.length) {
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

    // Setup toggle button
    const toggleBtn = document.getElementById('toggle-blogs-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            showingAll = !showingAll;
            if (showingAll) {
                toggleBtn.textContent = 'Show Latest Blogs';
                // Show all blogs reversed (latest first)
                renderBlogs([...allBlogs].reverse(), true);
            } else {
                toggleBtn.textContent = 'View All Blogs';
                renderBlogs(allBlogs.slice(-3).reverse(), true);
            }
        });
    }
}
