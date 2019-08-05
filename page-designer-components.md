###Page Designer Components for Storefront Reference Architecture


#### Campaign Banner
*Thin banner used for campaigns / announcements.*

##### Files:
```
./cartridges/app_storefront_base/cartridge/client/default/js/campaignBanner.js
./cartridges/app_storefront_base/cartridge/client/default/scss/experience/components/storefront/campaignBanner.scss
./cartridges/app_storefront_base/cartridge/experience/components/storefront/campaignBanner.js
./cartridges/app_storefront_base/cartridge/experience/components/storefront/campaignBanner.json
./cartridges/app_storefront_base/cartridge/templates/default/experience/components/storefront/campaignBanner.isml
./cartridges/app_storefront_base/cartridge/templates/resources/campaignBanner.properties
./cartridges/bm_app_storefront_base/cartridge/static/default/css/experience/components/storefront/campaignBanner.css
./cartridges/bm_app_storefront_base/cartridge/templates/resources/experience/components/storefront/campaignBanner.properties
```

##### Notes:

*Has one text attribute for the campaign announcement.*

*It is mosl likely meant to be driven by the “Customer Groups” and/or the “Schedule” settings at the top of the component attributes panel during creation.*

-------------------


#### Carousel

*The carousel can be used to show components such as product tiles or other components.*

##### Files:
```
./cartridges/app_storefront_base/cartridge/client/default/js/carousel.js
./cartridges/app_storefront_base/cartridge/client/default/scss/experience/components/storefront/carousel.scss
./cartridges/app_storefront_base/cartridge/experience/components/storefront/carousel.js
./cartridges/app_storefront_base/cartridge/experience/components/storefront/carousel.json
./cartridges/app_storefront_base/cartridge/templates/default/experience/components/storefront/carousel.isml
./cartridges/bm_app_storefront_base/cartridge/static/default/css/experience/components/storefront/carousel.css
./cartridges/bm_app_storefront_base/cartridge/static/default/css/experience/sfra_carousel.css
./cartridges/bm_app_storefront_base/cartridge/templates/resources/experience/components/storefront/carousel.properties
```

##### Notes:

*The carousel has configurable display attributes for phone and desktop.*

*This component reuses and overrides the Bootstrap Carousel.*

-------------------

#### Shop Category

*Navigation bar with links to categories.*


##### Files:
```
./cartridges/app_storefront_base/cartridge/client/default/scss/experience/components/storefront/category.scss
./cartridges/app_storefront_base/cartridge/experience/components/storefront/category.js
./cartridges/app_storefront_base/cartridge/experience/components/storefront/category.json
./cartridges/app_storefront_base/cartridge/templates/default/experience/components/storefront/category.isml
./cartridges/bm_app_storefront_base/cartridge/static/default/css/experience/category.css
./cartridges/bm_app_storefront_base/cartridge/static/default/css/experience/components/storefront/category.css
./cartridges/bm_app_storefront_base/cartridge/templates/resources/experience/components/storefront/category.properties
```

##### Notes:

*Has a text headline attribute.*

*Has 4 required category attributes and 8 more as optional.*

-------------------

#### Editorial Rich Text

*Add text or pictures to a section*

##### Files:
```
./cartridges/app_storefront_base/cartridge/experience/components/storefront/editorialRichText.js
./cartridges/app_storefront_base/cartridge/experience/components/storefront/editorialRichText.json
./cartridges/app_storefront_base/cartridge/templates/default/experience/components/storefront/editorialRichText.isml
./cartridges/bm_app_storefront_base/cartridge/templates/resources/experience/components/storefront/editorialRichText.properties
```

##### Notes:

*Has a single rich text attribute.*

-------------------

#### Image and Text

*A component combined image and text.*

##### Files:
```
./cartridges/app_storefront_base/cartridge/experience/components/storefront/imageAndText.js
./cartridges/app_storefront_base/cartridge/experience/components/storefront/imageAndText.json
./cartridges/app_storefront_base/cartridge/templates/default/experience/components/storefront/imageAndText.isml
./cartridges/bm_app_storefront_base/cartridge/templates/resources/experience/components/storefront/imageAndText.properties
```

##### Notes:

*Has an image picker attribute, a text overlay attribute and a link.*


-------------------

#### Main Banner

*Hero Image with text overlay + ‘Shop Now’ link.*

##### Files:
```
./cartridges/app_storefront_base/cartridge/experience/components/storefront/MainBanner.js
./cartridges/app_storefront_base/cartridge/experience/components/storefront/MainBanner.json
./cartridges/app_storefront_base/cartridge/templates/default/experience/components/assets/mainBanner.isml
./cartridges/bm_app_storefront_base/cartridge/static/default/css/experience/mainBanner.css
./cartridges/bm_app_storefront_base/cartridge/templates/resources/experience/components/storefront/mainBanner.properties
```

##### Notes:

*Has an image attribute, a text overlay attribute and a category picker to create a link.*

-------------------

#### Mobile Grid 2 rows 3 columns

*A component with 6 droppable regions.*

##### Files:
```
./cartridges/app_storefront_base/cartridge/experience/components/storefront/mobileGrid2r3c.js
./cartridges/app_storefront_base/cartridge/experience/components/storefront/mobileGrid2r3c.json
./cartridges/app_storefront_base/cartridge/templates/default/experience/components/storefront/mobileGrid2r3c.isml
./cartridges/bm_app_storefront_base/cartridge/templates/resources/experience/components/storefront/mobileGrid2r3c.properties
```

##### Notes:

*Desktop and Tablet mode will display 1 row x 6 column*

*Mobile Phone will display 2 Rows with 3 Columns*


-------------------

#### Photo Tile

*Adds an image to a page or section.*

##### Files:
```
./cartridges/app_storefront_base/cartridge/client/default/scss/experience/components/storefront/photoTile.scss
./cartridges/app_storefront_base/cartridge/experience/components/storefront/photoTile.js
./cartridges/app_storefront_base/cartridge/experience/components/storefront/photoTile.json
./cartridges/app_storefront_base/cartridge/templates/default/experience/components/storefront/photoTile.isml
./cartridges/bm_app_storefront_base/cartridge/templates/resources/experience/components/storefront/photoTile.properties
```

##### Notes:

*Has a sinlge image picker attribute.*

-------------------

#### Popular Categories

*The Popular Category is a component container.*

##### Files:
```
./cartridges/app_storefront_base/cartridge/client/default/scss/experience/components/storefront/popularCategories.scss
./cartridges/app_storefront_base/cartridge/experience/components/storefront/popularCategories.js
./cartridges/app_storefront_base/cartridge/experience/components/storefront/popularCategories.json
./cartridges/app_storefront_base/cartridge/templates/default/experience/components/storefront/popularCategories.isml
./cartridges/bm_app_storefront_base/cartridge/templates/resources/experience/components/storefront/popularCategories.properties
```

##### Notes:

*Just a text heading and a region for dropping the "Popular Category" component(s)*

-------------------

#### Popular Category

*The Popular Category component (used with Popular Categories)*

##### Files:
```
./cartridges/app_storefront_base/cartridge/client/default/scss/experience/components/storefront/popularCategory.scss
./cartridges/app_storefront_base/cartridge/experience/components/storefront/popularCategory.js
./cartridges/app_storefront_base/cartridge/experience/components/storefront/popularCategory.json
./cartridges/app_storefront_base/cartridge/templates/default/experience/components/storefront/popularCategory.isml
./cartridges/bm_app_storefront_base/cartridge/templates/resources/experience/components/storefront/popularCategory.properties
```

##### Notes:


*Has one category, one display name text, one image, and one offset attribute.*

-------------------

#### Product Tile

*Displays a product in tile + ‘Shop Now’ overlay.*

##### Files:
```
./cartridges/app_storefront_base/cartridge/client/default/scss/experience/components/storefront/productTile.scss
./cartridges/app_storefront_base/cartridge/experience/components/storefront/productTile.js
./cartridges/app_storefront_base/cartridge/experience/components/storefront/productTile.json
./cartridges/app_storefront_base/cartridge/templates/default/experience/components/storefront/product/productTile.isml
./cartridges/bm_app_storefront_base/cartridge/static/default/css/experience/components/storefront/productTile.css
./cartridges/bm_app_storefront_base/cartridge/templates/resources/experience/components/storefront/productTile.properties
```

##### Notes:

*Has a product picker attribute and a boolean attribute to toggle display ratings.*

-------------------

#### Shop the Look

*Product Tiles that links to Quick View of a set.*

##### Files:
```
./cartridges/app_storefront_base/cartridge/client/default/scss/experience/components/storefront/shopTheLook.scss
./cartridges/app_storefront_base/cartridge/experience/components/storefront/shopTheLook.js
./cartridges/app_storefront_base/cartridge/experience/components/storefront/shopTheLook.json
./cartridges/app_storefront_base/cartridge/templates/default/experience/components/storefront/shopTheLook.isml
./cartridges/bm_app_storefront_base/cartridge/static/default/css/experience/components/storefront/shopTheLook.css
./cartridges/bm_app_storefront_base/cartridge/templates/resources/experience/components/storefront/shopTheLook.properties
```

##### Notes:

*Has a product picker attribute and a boolean attribute to toggle display product pricing.*
