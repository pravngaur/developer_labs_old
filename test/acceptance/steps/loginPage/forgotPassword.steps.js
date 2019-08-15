const { I, data, loginPage } = inject()

When('shopper clicks forgot password', () => {
  // From "test/acceptance/features/loginPage/forgotPassword.feature" {"line":8,"column":9}
  I.waitForElement(loginPage.locators.forgotPassword);
  I.click(loginPage.locators.forgotPassword);
});

When('shopper fills out their recovery email address', () => {
  // From "test/acceptance/features/loginPage/forgotPassword.feature" {"line":9,"column":9}
  loginPage.forgotPassword(data.home.email);
});

Then('shopper should see request to change password prompt', () => {
  // From "test/acceptance/features/loginPage/forgotPassword.feature" {"line":10,"column":9}
  loginPage.verifyPasswordReset();
});
