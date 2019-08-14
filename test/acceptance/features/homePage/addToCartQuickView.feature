Feature: Add a product to cart with selectors using quickview
    As a shopper I want to be able to shop for a product using quickview
    I find a product and open its quickview
    I select product options in quickview
    Then I add the product to my cart

@test
    Scenario:
        When shopper selects yes or no for tracking consent
        Then shopper opens quickview on a product tiles
        And shopper chooses a quickview product color
        And shopper chooses a quickview product size
        And shopper adds product to cart from quickview
