import { vi } from 'vitest';
import { initializeCarousel } from '../ts/carousel';

describe('Carousel Functionality', () => {
    let carouselHtml: string;
    const MOCK_SLIDE_WIDTH = 600;
    const SLIDE_MARGIN_RIGHT = 6;

    beforeEach(() => {
        vi.useFakeTimers();

        carouselHtml = `
            <div class="carousel">
                <div class="slides">
                    <div class="slide slide-1" data-index="0">
                        <img src="/assets/img1.png" class="slide-content">
                        <span class="slide-counter">01/05</span>
                    </div>
                    <div class="slide slide-2" data-index="1">
                        <img src="/assets/img2.png" class="slide-content">
                        <span class="slide-counter">02/05</span>
                    </div>
                    <div class="slide slide-3" data-index="2">
                        <img src="/assets/img3.png" class="slide-content">
                        <span class="slide-counter">03/05</span>
                    </div>
                    <div class="slide slide-4" data-index="3">
                        <img src="/assets/img4.png" class="slide-content">
                        <span class="slide-counter">04/05</span>
                    </div>
                    <div class="slide slide-5" data-index="4">
                        <img src="/assets/img5.png" class="slide-content">
                        <span class="slide-counter">05/05</span>
                    </div>
                </div>
            </div>
            <div class="carousel">
                <div class="slides">
                    <div class="slide slide-1" data-index="0">
                        <img src="/assets/imgA.png" class="slide-content">
                        <span class="slide-counter">01/03</span>
                    </div>
                    <div class="slide slide-2" data-index="1">
                        <img src="/assets/imgB.png" class="slide-content">
                        <span class="slide-counter">02/03</span>
                    </div>
                    <div class="slide slide-3" data-index="2">
                        <img src="/assets/imgC.png" class="slide-content">
                        <span class="slide-counter">03/03</span>
                    </div>
                </div>
            </div>
        `;
        document.body.innerHTML = carouselHtml;

        document.querySelectorAll('.slide').forEach((slide) => {
            Object.defineProperty(slide, 'offsetWidth', {
                configurable: true,
                get: () => MOCK_SLIDE_WIDTH,
            });
        });
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
        document.body.innerHTML = '';
    });

    it('should initialize all carousels on the page', () => {
        const carousels = document.querySelectorAll('.carousel');
        expect(carousels.length).toBe(2);
        carousels.forEach(carousel => initializeCarousel(carousel as HTMLElement));
    });

    it('should clone original slides for infinite loop for the first carousel', () => {
        const firstCarousel = document.querySelectorAll('.carousel')[0] as HTMLElement;
        initializeCarousel(firstCarousel);

        const slidesContainer = firstCarousel.querySelector('.slides') as HTMLElement;
        expect(slidesContainer.children.length).toBe(10);
    });

    it('should clone original slides for infinite loop for the second carousel', () => {
        const secondCarousel = document.querySelectorAll('.carousel')[1] as HTMLElement;
        initializeCarousel(secondCarousel);

        const slidesContainer = secondCarousel.querySelector('.slides') as HTMLElement;
        expect(slidesContainer.children.length).toBe(6);
    });

    it('should smoothly loop back to the beginning after all original slides are shown (first carousel)', () => {
        const firstCarousel = document.querySelectorAll('.carousel')[0] as HTMLElement;
        initializeCarousel(firstCarousel);

        const slidesContainer = firstCarousel.querySelector('.slides') as HTMLElement;

        const numOriginalSlides = 5;
        const autoPlayDelay = 3000;
        const transitionDuration = 4000;

        vi.advanceTimersByTime((autoPlayDelay + transitionDuration) * numOriginalSlides);

        const offsetBeforeReset = (MOCK_SLIDE_WIDTH + SLIDE_MARGIN_RIGHT) * numOriginalSlides;
        expect(slidesContainer.style.transform).toBe(`translateX(-${offsetBeforeReset}px)`);
        expect(slidesContainer.style.transition).toBe(`transform ${transitionDuration / 1000}s ease-in-out`);

        vi.advanceTimersByTime(transitionDuration + 50);

        expect(slidesContainer.style.transform).toBe('translateX(-0px)');
        expect(slidesContainer.style.transition).toBe(`transform ${transitionDuration / 1000}s ease-in-out`);
    });

    it('should use "none" transition momentarily during the teleport', () => {
        const firstCarousel = document.querySelectorAll('.carousel')[0] as HTMLElement;
        initializeCarousel(firstCarousel);

        const slidesContainer = firstCarousel.querySelector('.slides') as HTMLElement;

        const numOriginalSlides = 5;
        const autoPlayDelay = 3000;
        const transitionDuration = 4000;

        vi.advanceTimersByTime((autoPlayDelay + transitionDuration) * numOriginalSlides);

        vi.advanceTimersByTime(transitionDuration);

        expect(slidesContainer.style.transition).toBe('none');

        vi.advanceTimersByTime(50);
        expect(slidesContainer.style.transition).toBe(`transform ${transitionDuration / 1000}s ease-in-out`);
    });
});