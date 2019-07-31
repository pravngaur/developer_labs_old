const Helper = codecept_helper;

class isExist extends Helper {

    /**
     * checks if selector is found on a webpage
     */
    isExisting(selector) {
        let wdHelper = this.helpers['WebDriver'];
        return wdHelper._locate(selector).then((res) => {
            if(!res || res.length === 0) {
                return false;
            } else {
                return true;
            }
        });
        // console.log('selector: ', selector);
        // let foobar = new Promise((resolve, reject) => {
        //     wdHelper._locate(selector)
        //     .then((results) => {
        //         if(!results || results.length === 0) {
        //             resolve(false);
        //         } else {
        //             resolve(true);
        //         }
        //     })
        //     .catch((err) => {
        //         reject(err);
        //     });
        // console.log('FOOBAR: ', foobar);
        // return foobar;
        // });
        // let foo = await wdHelper._locate(selector);
        // console.log("THIS IS FOO: " + JSON.stringify(foo));
        // return foo;
        // .then((results) => {
        //     if(!results || results.length === 0) {
        //         return Promise.resolve(false);
        //     }
        //     return Promise.resolve(true);
        // });
        // console.log('UTILS FOO: ', foo);
        // return foo;
    }
}

module.exports = isExist;