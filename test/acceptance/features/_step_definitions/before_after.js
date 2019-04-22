// Add in your custom step files
// use I and productPage via inject() function

const { I, homePage } = inject();

Before(() => {
    I.updateJob();
    I.amOnPage('/s/RefArch/home?lang=en_US');
    homePage.accept();
})

// test REST
Before(async () => {
    const post = await I.sendGetRequest('/posts/1');
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