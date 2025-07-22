export function initializeCarousel(carouselElement: HTMLElement) {
    const slidesContainer = carouselElement.querySelector('.slides') as HTMLElement;
    const originalSlides = Array.from(slidesContainer.children) as HTMLElement[];
    const numOriginalSlides: number = originalSlides.length;

    const slideMarginRight: number = 6;

    let currentSlideIndex: number = 0;
    let currentPixelOffset: number = 0;

    let intervalId: number;
    const autoPlayDelay: number = 3000;
    const transitionDuration: number = 4000;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const actualTransitionDuration = prefersReducedMotion ? 0 : transitionDuration;

    originalSlides.forEach((slide: HTMLElement) => {
        const clone = slide.cloneNode(true) as HTMLElement;
        slidesContainer.appendChild(clone);
    });

    const allSlides = Array.from(slidesContainer.children) as HTMLElement[];

    const getFullSlideWidth = (index: number): number => {
        const slide = allSlides[index];
        if (!slide) {
            return 0;
        }
        return slide.offsetWidth + slideMarginRight;
    };

    const moveToNextSlide = (): void => {
        currentSlideIndex++;

        currentPixelOffset = 0;
        for (let i = 0; i < currentSlideIndex; i++) {
            currentPixelOffset += getFullSlideWidth(i);
        }

        slidesContainer.style.transition = `transform ${actualTransitionDuration / 1000}s ease-in-out`;
        slidesContainer.style.transform = `translateX(-${currentPixelOffset}px)`;

        if (currentSlideIndex >= numOriginalSlides) {
            setTimeout(() => {
                slidesContainer.style.transition = 'none';

                currentSlideIndex = 0;
                currentPixelOffset = 0;
                slidesContainer.style.transform = `translateX(-${currentPixelOffset}px)`;

                if (!prefersReducedMotion) {
                    setTimeout(() => {
                        slidesContainer.style.transition = `transform ${transitionDuration / 1000}s ease-in-out`;
                    }, 50);
                }
            }, actualTransitionDuration);
        }
    };

    const startAutoPlay = (): void => {
        if (!prefersReducedMotion) {
            intervalId = window.setInterval(moveToNextSlide, autoPlayDelay + transitionDuration);
        }
    };

    startAutoPlay();
}

document.addEventListener('DOMContentLoaded', () => {
    const allCarousels: NodeListOf<HTMLElement> = document.querySelectorAll('.carousel');
    allCarousels.forEach((carousel: HTMLElement) => {
        initializeCarousel(carousel);
    });
});