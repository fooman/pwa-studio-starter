describe('ProductPage', () => {

    it('should open product detail page(simple product) and add to cart', () => {
        cy.visit('/magento-extension-speedster.html')
        cy.get('div[class="productFullDetail-cartActions-elY productFullDetail-section-2jX productFullDetail-section-2jX"]').children().click();
    });

    it('Add to cart for product which has option to select with url field', () => {
        cy.visit('/magento-extension-flexible-navigation-menu.html')
        cy.fixture('../fixtures/productData').then(function(data) {
            cy.get('input[name="options"]').type(data.product.urlInput1)
        });
        cy.get('div[class="productFullDetail-cartActions-elY productFullDetail-section-2jX productFullDetail-section-2jX"]').children().click();
    });

    it('Add to cart for product which has option to select with url field also with select installation option', () => {
        cy.visit('/magento-extension-flexible-navigation-menu.html')
        cy.fixture('../fixtures/productData').then(function(data) {
            cy.get('input[name="options"]').type(data.product.urlInput2)
        });
        cy.get('input[value="35"]').check();
        cy.get('div[class="productFullDetail-cartActions-elY productFullDetail-section-2jX productFullDetail-section-2jX"]').children().click();
    });
})
