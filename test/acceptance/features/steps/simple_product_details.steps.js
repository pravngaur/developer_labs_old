const { I, homePage, productPage } = inject();
var should = require('should');

Given('shopper goes to the Product Detail Page', () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":6,"column":9}
    I.amOnPage('/on/demandware.store/Sites-RefArch-Site/en_US/Product-Show?pid=P0150M');
    homePage.accept();
});

Then('shopper is able to see all the information related to a Simple Product', async () => {
    (await productPage.grabProductImageSrc())[0].should.containEql('P0150_001.jpg'); // Product Image
    const breadcrumbsHrefs = await productPage.grabHrefFromBreadcrumbs();
    breadcrumbsHrefs[0].should.containEql('mens'); // Mens Category
    breadcrumbsHrefs[1].should.containEql('accessories'); // Accessories Category
    breadcrumbsHrefs[2].should.containEql('luggage'); // Luggage Category
    (await productPage.grabProductName())[0].should.equal('Upright Case (33L - 3.7Kg)'); // Product Name
    (await productPage.grabProductItemNo()).should.equal('P0150M'); // Product ID
    (await productPage.grabProductAvailability()).should.equal('In Stock'); // Product Availability
    (await productPage.grabProductPrice()).should.equal('$99.99'); // Product Price
    I.seeElement(productPage.locators.addToCartButtonEnabled); // Add to Cart Button Enabled
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

Then('shopper is able to see Add to Cart Button Enabled', () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":21,"column":9}
    I.seeElement(productPage.locators.addToCartButtonEnabled);
});

Then('shopper is able to copy Product URL using Copy Link Icon', () => {
    // From "test/acceptance/features/productDetailPage/pdpSimpleLayout.feature" {"line":25,"column":9}
    productPage.clickCopyLink();
    I.seeElement(productPage.locators.copyLinkMsgVisible);
});
