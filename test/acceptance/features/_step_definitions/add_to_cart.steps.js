// Add in your custom step files
// use I and productPage via inject() function
const { I, homePage } = inject();

Given('Fred searches for {string}', () => {
    homePage.search('Elbow Sleeve Ribbed Sweater');
  });
  
When('selects size {string}', () => {
// From "test/acceptance/features/addToCart.feature" {"line":9,"column":5}
});

When('he adds the product to cart', () => {
// From "test/acceptance/features/addToCart.feature" {"line":10,"column":5}
});

Then('he is able to see the correct product in cart', () => {
// From "test/acceptance/features/addToCart.feature" {"line":11,"column":5}
});