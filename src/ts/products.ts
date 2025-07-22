import products from '../data/products.json';

interface Product {
    id: number;
    name: string;
    url: string;
    description: string;
}

const productList: Product[] = products as Product[];

export function renderProductsToCollection(containerSelector: string = '.collection__images'): void {
    const collectionImagesContainer = document.querySelector(containerSelector);

    if (collectionImagesContainer) {
        collectionImagesContainer.innerHTML = '';
        const fragment = document.createDocumentFragment();

        productList.forEach(product => {
            const imgElement = document.createElement('img');
            imgElement.src = product.url;
            imgElement.alt = product.name;
            imgElement.title = product.description;
            imgElement.classList.add('collection__image-item');
            imgElement.loading = 'lazy';

            fragment.appendChild(imgElement);
        });
        collectionImagesContainer.appendChild(fragment);
    } else {
        console.warn(`Container with selector "${containerSelector}" not found for product rendering.`);
    }
}