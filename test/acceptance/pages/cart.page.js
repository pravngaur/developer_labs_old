const I = actor();

module.exports = {
    locators: {
        lineItemQuantity: '.form-control.quantity.custom-select',
        totalItemQuantity: 'h2.number-of-items',
        lineItemPriceTotal: 'span.value',
        totalItemPrice: '.line-item-total-price',
        shippingCost: '.text-right.shipping-cost',
        taxTotal: '.text-right.tax-total',
        estimatedTotal: '.text-right.grand-total',
        checkoutBtn: '.btn.btn-primary.btn-block.checkout-btn'
    },
    verifyCart(totalQuantity, itemPrice, totalItemPrice, shipping, tax, estimatedTotal) {
        I.waitForElement(this.locators.lineItemQuantity);
        I.waitForText(totalQuantity, this.locators.lineItemQuantity);
        I.waitForElement(this.locators.totalItemQuantity);
        I.waitForText(totalQuantity + ' Items', this.locators.totalItemQuantity);
        I.waitForElement(this.locators.lineItemPriceTotal);
        I.waitForText(itemPrice, this.locators.lineItemPriceTotal);
        I.waitForElement(this.locators.totalItemPrice);
        I.waitForText(totalItemPrice, this.locators.totalItemPrice);
        I.waitForElement(this.locators.shippingCost);
        I.waitForText(shipping, this.locators.shippingCost);
        I.waitForElement(this.locators.taxTotal);
        I.waitForText(tax, this.locators.taxTotal);
        I.waitForElement(this.locators.estimatedTotal);
        I.waitForText(estimatedTotal, this.locators.estimatedTotal);
    },
    removeProduct(name) {
        console.log('bow');
    },
    editQuantity(quantity) {
        console.log('wow');
    }
};
