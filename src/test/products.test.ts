import { beforeEach, describe, expect, it, vi } from 'vitest';
import products from '../data/products.json';


import { renderProductsToCollection } from '../ts/products';

describe('renderProductsToCollection', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div class="collection__images"></div>';
    });

    it('should render all products to the specified container', () => {
        const containerSelector = '.collection__images';
        const container = document.querySelector(containerSelector) as HTMLElement;

        renderProductsToCollection(containerSelector);

        expect(container).not.toBeNull();
        expect(container.children.length).toBe(products.length);

        const firstImage = container.children[0] as HTMLImageElement;
        expect(firstImage.tagName).toBe('IMG');
        expect(firstImage.src).toContain(products[0].url);
        expect(firstImage.alt).toBe(products[0].name);
        expect(firstImage.title).toBe(products[0].description);
        expect(firstImage.classList.contains('collection__image-item')).toBe(true);
        expect(firstImage.loading).toBe('lazy');

        const lastImage = container.children[products.length - 1] as HTMLImageElement;
        expect(lastImage.src).toContain(products[products.length - 1].url);
        expect(lastImage.alt).toBe(products[products.length - 1].name);
        expect(lastImage.title).toBe(products[products.length - 1].description);
    });

    it('should clear existing content in the container before rendering', () => {
        const containerSelector = '.collection__images';
        const container = document.querySelector(containerSelector) as HTMLElement;

        container.innerHTML = '<p>Some old content</p>';

        renderProductsToCollection(containerSelector);

        expect(container.innerHTML).not.toContain('<p>Some old content</p>');
        expect(container.children.length).toBe(products.length);
    });

    it('should use the default container selector if none is provided', () => {
        document.body.innerHTML = '<div class="collection__images"></div>';
        const defaultContainer = document.querySelector('.collection__images') as HTMLElement;

        renderProductsToCollection();

        expect(defaultContainer.children.length).toBe(products.length);
        expect(defaultContainer.children[0].tagName).toBe('IMG');
    });

    it('should log a warning if the container is not found', () => {
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });

        renderProductsToCollection('.non-existent-container');

        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith(
            'Container with selector ".non-existent-container" not found for product rendering.'
        );

        consoleWarnSpy.mockRestore();
    });

    it('should not render anything if the container is not found', () => {
        const containerSelector = '.another-non-existent-container';
        const nonExistentContainer = document.querySelector(containerSelector);

        expect(nonExistentContainer).toBeNull();

        renderProductsToCollection(containerSelector);

        expect(document.body.querySelectorAll('img.collection__image-item').length).toBe(0);
    });
});