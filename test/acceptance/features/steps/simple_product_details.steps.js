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
    const socialHrefs = await productPage.grabHrefFromSocialShare();
    socialHrefs[0].should.containEql('pinterest.com'); // Pinterest href
    socialHrefs[1].should.containEql('facebook.com'); // Facebook href
    socialHrefs[2].should.containEql('twitter.com'); // Twitter href
    socialHrefs[3].should.containEql('copy-link-message'); // Copy Link href
    (await productPage.grabProductDescription()).should.equal('This practical and functional case is perfect for business – with no need to check in as luggage due to its cabin size dimensions – or for any convenient no-fuss travel any time any where. You can pull along for comfort or carry by the handle, and with plenty of space inside and a large front pocket with additional zippered pocket, there’s plenty of useful and compact storage.'); // Product Description
    (await productPage.grabProductDetails()).should.equal('1682 ballistic nylon and genuine leather inserts |Pull-out metallic handle for wheeling|Top and side handles|Cabin size for convenient travelling|TSA lock for security'); // Product Details
    productPage.clickCopyLink();
    I.seeElement(productPage.locators.copyLinkMsgVisible); // Success Message Visible
});
