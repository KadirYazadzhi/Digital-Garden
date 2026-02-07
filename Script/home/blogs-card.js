document.addEventListener("DOMContentLoaded", () => {
    const blogCards = document.querySelectorAll(".blog-card");

    // Load liked blogs from storage
    let likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];

    blogCards.forEach((card, index) => {
        const blogId = (index + 1).toString();

        // 1. Read More Button
        const readMoreBtn = card.querySelector(".bottom-button");
        if (readMoreBtn) {
            readMoreBtn.addEventListener("click", () => {
                localStorage.setItem("activeBlog", blogId);
                window.location.href = 'blog.html';
            });
        }

        // 2. Like Button
        const likeBtn = card.querySelector(".actions .fa-heart");
        if (likeBtn) {
            // Init state
            if (likedBlogs.includes(blogId)) {
                likeBtn.classList.add("active-like");
                likeBtn.classList.remove("fa-regular");
                likeBtn.classList.add("fa-solid");
            }

            likeBtn.addEventListener("click", () => {
                const isLiked = likeBtn.classList.contains("active-like");
                if (isLiked) {
                    likeBtn.classList.remove("active-like");
                    likeBtn.classList.remove("fa-solid");
                    likeBtn.classList.add("fa-regular");
                    likedBlogs = likedBlogs.filter(id => id !== blogId);
                } else {
                    likeBtn.classList.add("active-like");
                    likeBtn.classList.remove("fa-regular");
                    likeBtn.classList.add("fa-solid");
                    likedBlogs.push(blogId);
                }
                localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
            });
        }

        // 3. Share Button
        const shareBtn = card.querySelector(".actions .fa-share");
        if (shareBtn) {
            shareBtn.addEventListener("click", () => {
                // Construct URL correctly handles if we are in a subdir or root
                // But mostly straightforward for static sites:
                const baseUrl = window.location.href.split('index.html')[0].split('#')[0]; // Remove index.html or anchors
                // Ensure no double slash if base ends in /
                const cleanBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
                const shareUrl = `${cleanBase}blog.html?id=${blogId}`;
                
                navigator.clipboard.writeText(shareUrl).then(() => {
                    showToast("Link copied to clipboard!");
                }).catch(err => {
                    console.error("Failed to copy: ", err);
                    showToast("Failed to copy link.");
                });
            });
        }
    });
});

// Toast Logic
let toastTimeout;

function showToast(message) {
    let toast = document.getElementById("custom-toast");
    
    // Create if not exists
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "custom-toast";
        toast.className = "toast-notification";
        toast.innerHTML = `
            <span id="toast-message"></span>
            <i class="fa-solid fa-xmark toast-close"></i>
        `;
        document.body.appendChild(toast);
        
        // Close listener
        toast.querySelector(".toast-close").addEventListener("click", () => {
            hideToast(toast);
        });
    }

    const msgSpan = toast.querySelector("#toast-message");
    msgSpan.textContent = message;

    // Reset timeouts
    clearTimeout(toastTimeout);
    
    // Show
    // Force reflow to enable transition if it was just hidden
    void toast.offsetWidth; 
    toast.classList.add("show");

    // Fade out after 8 seconds
    toastTimeout = setTimeout(() => {
        hideToast(toast);
    }, 8000); 
}

function hideToast(toast) {
    if(toast) {
        toast.classList.remove("show");
    }
}
