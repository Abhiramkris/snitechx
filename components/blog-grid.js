export const blogData = [
    {
        id: 1,
        title: "Communication & networks and some heading realted to this for the blog",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
        readTime: "7 minutes",
        author: "Aurther Name",
        link: "#blog-1"
    },
    {
        id: 2,
        title: "Communication & networks and some heading realted to this for the blog",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
        readTime: "7 minutes",
        author: "Aurther Name",
        link: "#blog-2"
    },
    {
        id: 3,
        title: "Communication & networks and some heading realted to this for the blog",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
        readTime: "7 minutes",
        author: "Aurther Name",
        link: "#blog-3"
    }
];

export function initBlogGrid() {
    const container = document.getElementById('blog-grid-container');
    if (!container) return;

    container.innerHTML = blogData.map(item => `
        <article class="blog-card" onclick="window.location.href='${item.link}'">
            <div class="blog-image-wrapper">
                <img src="${item.image}" alt="${item.title}" class="blog-image" />
            </div>
            <div class="blog-content">
                <h3 class="blog-title">${item.title}</h3>
                <div class="blog-footer">
                    <div class="blog-meta">
                        <span class="blog-time">${item.readTime}</span>
                        <span class="blog-author">${item.author}</span>
                    </div>
                    <div class="blog-arrow-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M7 17L17 7M17 7H7M17 7V17"/>
                        </svg>
                    </div>
                </div>
            </div>
        </article>
    `).join('');
}
