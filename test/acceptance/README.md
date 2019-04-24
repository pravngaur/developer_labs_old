
## CodeceptJS POC
> BDD Test Framework
> more info on POC is availble [here](https://salesforce.quip.com/61xcAMSf14J4)

### To get started

Start Selenium Server (this is temporary steps. It will become part of Test bootstrap in future)

```
$ npm install selenium-standalone@latest -g
$ selenium-standalone start
```

### How to run

```
$ cd /path/to/storefront-reference-architecture
```

To run feature file test on local chrome browser
```
$ codeceptjs run --grep "@add_to_cart"
```

To run tests on Multi-Browsers in Parallel (chrome & firefox locally)
```
$ codeceptjs run-multiple parallel --grep "@search"
```

To run tests on HEADLESS Chrome
```
$ CODECEPT_ENV=headless codeceptjs run-multiple parallel --grep "@search"
```

To run tests on SAUCELABS Chrome browser
```
$ CODECEPT_ENV=sauce codeceptjs run-multiple parallel --grep "@search"
```

To run tests on TRADITIONAL STYLED test under `tests` folder 
```
$ CODECEPT_ENV=headless codeceptjs run-multiple parallel --grep "@add_to_cart_traditional_test"
```

To print verbose
```
$ codeceptjs run-multiple parallel --grep "@search" --verbose
```

To generate HTML reporting
```
$ codeceptjs run-multiple parallel --grep "@search" --verbose --plugins allure
$ allure serve test/acceptance/report

```




