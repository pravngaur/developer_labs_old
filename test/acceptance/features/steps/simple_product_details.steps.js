const { I, homePage, productPage } = inject();
var should = require('should'); // eslint-disable-line

Given('shopper goes to the Product Detail Page', () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":6,"column":9}
    I.amOnPage('/on/demandware.store/Sites-RefArch-Site/en_US/Product-Show?pid=P0150M');
    homePage.accept();
});

Then('shopper is able to see Product Image', async () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":7,"column":9}
    (await I.grabAttributeFrom(productPage.locators.productImage, 'src'))[0].should.containEql('P0150_001.jpg');
});

Then('shopper is able to see Product Navigation Categories', async () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":8,"column":9}
    const breadcrumbsHrefs = await I.grabAttributeFrom(productPage.locators.navigationCrumbs, 'href');
    breadcrumbsHrefs[0].should.containEql('mens'); // Mens Category
    breadcrumbsHrefs[1].should.containEql('accessories'); // Accessories Category
    breadcrumbsHrefs[2].should.containEql('luggage'); // Luggage Category
});

Then('shopper is able to see Product Name', async () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":9,"column":9}
    (await I.grabTextFrom(productPage.locators.productName))[0].should.equal('Upright Case (33L - 3.7Kg)');
});

Then('shopper is able to see Product ID', async () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":10,"column":9}
    (await I.grabTextFrom(productPage.locators.productId)).should.equal('P0150M');
});

Then('shopper is able to see Product Availability', async () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":11,"column":9}
    (await I.grabTextFrom(productPage.locators.productAvailability)).should.equal('In Stock');
});

Then('shopper is able to see Product Price', async () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":12,"column":9}
    (await I.grabTextFrom(productPage.locators.productPrice)).should.equal('$99.99');
});

Then('shopper is able to see Add to Cart Button Enabled', () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":13,"column":9}
    I.seeElement(productPage.locators.addToCartButtonEnabled);
});

Then('shopper is able to see Social Share Icons and Links', async () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":14,"column":9}
    I.seeElement(productPage.locators.pinterest); // Pinterest
    I.seeElement(productPage.locators.facebook); // Facebook
    I.seeElement(productPage.locators.twitter); // Twitter
    I.seeElement(productPage.locators.copyLink); // Copy Link
    const socialHrefs = await I.grabAttributeFrom(productPage.locators.socialShare, 'href');
    socialHrefs[0].should.containEql('pinterest.com'); // Pinterest href
    socialHrefs[1].should.containEql('facebook.com'); // Facebook href
    socialHrefs[2].should.containEql('twitter.com'); // Twitter href
    socialHrefs[3].should.containEql('copy-link-message'); // Copy Link href
});

Then('shopper is able to copy Product URL using Copy Link Icon', () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":15,"column":9}
    productPage.clickCopyLink();
    I.seeElement(productPage.locators.copyLinkMsgVisible);
});

Then('shopper is able to see Product Description', async () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":16,"column":9}
    (await I.grabTextFrom(productPage.locators.productDescription)).should.equal('This practical and functional case is perfect for business – with no need to check in as luggage due to its cabin size dimensions – or for any convenient no-fuss travel any time any where. You can pull along for comfort or carry by the handle, and with plenty of space inside and a large front pocket with additional zippered pocket, there’s plenty of useful and compact storage.');
});

Then('shopper is able to see Product Details', async () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":17,"column":9}
    (await I.grabTextFrom(productPage.locators.productDetails)).should.equal('1682 ballistic nylon and genuine leather inserts |Pull-out metallic handle for wheeling|Top and side handles|Cabin size for convenient travelling|TSA lock for security');
});
