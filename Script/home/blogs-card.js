const elements = document.querySelectorAll(".bottom-button");

elements.forEach((element, index) => {
    element.addEventListener("click", (e) => {
        localStorage.setItem("activeBlog", (index + 1).toString());
        window.location.href = 'blog.html';
    });
});