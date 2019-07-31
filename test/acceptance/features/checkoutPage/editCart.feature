Feature: Edit products within the cart
    As a shopper I want to be able to add multiple products to my cart,
    and edit my cart before entering checkout.
@quickview
    Scenario:
        When shopper selects yes or no for tracking consent
        Given shopper searches for category from menu
        And shopper filters product by color
        And shopper filters product by size
        And shopper filters product by price
        
        And shopper adds product

        Then he is able to see the correct product in cart