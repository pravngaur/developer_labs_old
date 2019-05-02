const { I, homePage  } = inject();

When('shopper selects yes or no for tracking consent', () => {
    homepage.accept();
});