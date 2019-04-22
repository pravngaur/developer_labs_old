// Add in your custom step files
// use I and productPage via inject() function
const { I, loginPage } = inject();

Before(() => {
    I.amOnPage('/on/demandware.store/Sites-Site/default/');
    loginPage.login('support','KgajjarVpod1!');
})