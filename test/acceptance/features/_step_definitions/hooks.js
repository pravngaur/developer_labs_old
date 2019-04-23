// Add in your custom step files
// use I and productPage via inject() function

const { I, homePage, config } = inject();

Before(() => {
    console.log('this.config ==================\n\n\n\n', this);
    // I.updateJob();
    I.amOnPage('/s/RefArch/home?lang=en_US');
    homePage.accept();
})

// test REST
Before(async () => {
    const post = await I.sendGetRequest('/todos/1');

    console.log('\n===== REST TEST ====== ');
    console.log('POSTS:1 > ', post.data);
    console.log('===== ===== ======\n');
})

// test CUSTOM HELPERS
Before(() => {
    console.log('\n===== CUSTOM HELPERS TEST ====== ');
    I.updateJob();
    console.log('===== ===== ======\n');
})
