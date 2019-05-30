const { I, data, homePage, loginPage } = inject();
var should = require('should'); // eslint-disable-line

Then('shopper is able to fill out the order number, email, and zip code', () => {
    // From "test/acceptance/features/loginPage/checkOrder.feature" {"line":7,"column":9}
    loginPage.checkOrder(data.login.orderNum, data.login.orderEmail, data.login.orderZip);
  });
  
Then('shopper is able to click the check status button', () => {
    // From "test/acceptance/features/loginPage/checkOrder.feature" {"line":8,"column":9}
    I.waitForElement(loginPage.locators.primaryButton);
    I.click(locate(loginPage.locators.primaryButton).withText('Check status'));
});
  
Then('shopper is able to view order detail', () => {
    // From "test/acceptance/features/loginPage/checkOrder.feature" {"line":9,"column":9}
    I.seeElement(loginPage.locators.checkOrderError);
    //I.see('Order Detail', '.page-title')
});
  
  