Feature: Shipping information in Checkout
    As a shopper, I want to shop for a product and fill out the correct shipping information.

@happy-path @workingOn
    Scenario: Shopper is able to add a product to a cart
        When shopper selects yes or no for tracking consent
        Given Shopper searches for "Straight Fit Shorts"
        Then selects size "30"
        Then he adds the product to cart
        Then shopper selects checkout from cart
        And shopper selects checkout as return user
        Then shopper verifies shipping information
        Then shopper proceeds to payment section