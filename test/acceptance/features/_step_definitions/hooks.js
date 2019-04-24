// Add in your custom step files
// use I and productPage via inject() function

const { I, homePage } = inject();

Before(() => {
    I.amOnPage('/s/RefArch/home?lang=en_US');
    homePage.accept();
});

// test REST
Before(async () => {
    const post = await I.sendGetRequest('/todos/1');
    console.log('\n===== REST TEST ======');
    console.log('POSTS:1 > ', post.data);
    console.log('===== ===== ======\n');
});

// test CUSTOM HELPERS
Before(() => {
    I.updateJob();
});
