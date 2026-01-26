document.addEventListener('DOMContentLoaded', () => {
    let glide = null;

    function initSlider() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            if (!glide) {
                glide = new Glide('.glide', {
                    type: 'slider',
                    perView: 1,
                    gap: 0,
                    rewind: false,
                    animationDuration: 400
                }).mount();
            }
        } else {
            if (glide) {
                glide.destroy();
                glide = null;
            }
        }
    }

    initSlider();
    window.addEventListener('resize', initSlider);
});