const { I, cartPage, productPage, data } = inject();

Then('shopper edits products in cart', () => {
    // go to cart
    productPage.viewCart();
    // Verify both products on in the cart
    cartPage.verifyCart(3, data.product.itemPrice, data.product.totalItemPrice,
        data.shippingCosts.ground_usps, data.product.tax, data.product.estimatedTotal);
    cartPage.verifyCart(3, data.product3.itemPrice, data.product3.totalItemPrice,
        data.product3.shipping, data.product3.tax, data.product3.estimatedTotal);
    // Delete Modern Striped Dress Shirt
    cartPage.removeProduct(data.product4.name);
    // Change quantity of Elbow Sleeve Ribbed Sweater
    cartPage.editQuantity();
})