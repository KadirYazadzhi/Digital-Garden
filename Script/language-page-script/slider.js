document.addEventListener('DOMContentLoaded', () => {
    let glide = null;

    function initSlider() {
        if (window.innerWidth < 768) {
            if (!glide) {
                glide = new Glide('.glide', {
                    type: 'carousel',
                    perView: 1,
                    gap: 0, // Handled by CSS margin
                    animationDuration: 400
                });
                glide.mount();
            }
        } else {
            if (glide) {
                glide.destroy();
                glide = null;
            }
        }
    }

    initSlider();

    window.addEventListener('resize', () => {
        initSlider();
    });
});