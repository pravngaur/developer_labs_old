// Add in your custom step files
// use I and productPage via inject() function
const { I, homePage } = inject();

Given('Fred searches for {string}', (searchesFor) => {
    // From "test/acceptance/features/addToCart.feature" {"line":8,"column":5}
    homePage.search(searchesFor);
    // pause();
});
  
When('selects size {string}', (size) => {
// From "test/acceptance/features/addToCart.feature" {"line":9,"column":5}
});

When('he adds the product to cart', () => {
// From "test/acceptance/features/addToCart.feature" {"line":10,"column":5}
});

Then('he is able to see the correct product in cart', () => {
// From "test/acceptance/features/addToCart.feature" {"line":11,"column":5}
});