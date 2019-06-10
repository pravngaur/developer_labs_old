Feature: Happy Path
    As a shopper, I want to go through the basic flow of shopping for a product

@happyPath
    Scenario: Shopper is able to follow the happy path
        When shopper selects yes or no for tracking consent
        Given Shopper searches for "Elbow Sleeve Ribbed Sweater"
        And selects size "S"
        When he adds the product to cart
        Then he is able to see the correct product in cart
        And shopper selects checkout from cart
        And shopper selects checkout as guest
        And shopper fills out shipping information
        And shopper fills out payment information
        Then shopper places order
