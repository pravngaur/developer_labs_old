'use strict';

module.exports = function Product(product, productType) {
    this.id = product.ID;
    this.productName = product.name;
    this.productType = productType;
};
