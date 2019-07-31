const { I, homePage, productPage, data } = inject();

Then('shopper filters product by color', () => {
    productPage.filterProductColor(data.product2.color);
});

Then('shopper filters product by size', () => {
    productPage.filterProductSize(data.product2.filterSizeLink);
});

Then('shopper filters product by price', () => {
    productPage.filterProductPrice(data.product2.filterPriceLink);
});