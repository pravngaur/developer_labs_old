
Start Selenium Server (this is temporary steps. It will become part of Test bootstrap in future)

```
➜  storefront-reference-architecture git:(poc/codeceptJS) ✗ selenium-standalone start
```

To run feature file test on local chrome browser
```
codeceptjs run --grep "@add_to_cart"
```

To run tests on Multi-Browsers in Parallel (chrome & firefox locally)
```
codeceptjs run-multiple parallel --grep "@search"
```

To run tests on HEADLESS Chrome
```
CODECEPT_ENV=headless codeceptjs run-multiple parallel --grep "@search"
```

To run tests on SAUCELABS Chrome browser
```
CODECEPT_ENV=sauce codeceptjs run-multiple parallel --grep "@search"
```

To run tests on TRADITIONAL STYLED test under `tests` folder 
```
CODECEPT_ENV=headless codeceptjs run-multiple parallel --grep "@add_to_cart_traditional_test"
```

To print verbose
```
codeceptjs run-multiple parallel --grep "@search" --verbose
```


