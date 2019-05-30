Feature: Product Detail Page Simple Layout
    As a shopper, I want to see Product Details for a Simple Product

@simpleProductDetail
    Scenario: Shopper is able to  view all details for a Simple Product on Product Detail Page
        Given shopper goes to the Product Detail Page
        Then shopper is able to see Product Image
        And shopper is able to see Product Navigation Categories
        And shopper is able to see Product Name
        And shopper is able to see Product ID
        And shopper is able to see Product Availability
        And shopper is able to see Product Price
        And shopper is able to see Add to Cart Button Enabled
        And shopper is able to see Social Share Icons and Links
        And shopper is able to copy Product URL using Copy Link Icon
        And shopper is able to see Product Description
        And shopper is able to see Product Details

