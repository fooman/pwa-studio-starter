describe('ProductPage', () => {

    it('should open product(free product) and add to cart', () => {
        cy.fixture('../fixtures/productData').then(function (data){
            cy.visit(data.freeProduct.url)
        });
        cy.get('div[class="productFullDetail-cartActions-elY productFullDetail-section-2jX productFullDetail-section-2jX"]').children().click();
    });

    it('should open free product which has option to select', () => {
        cy.fixture('../fixtures/productData').then(function(data) {
            cy.visit(data.freeProductWithOption.url)
            cy.get(`input[value=${data.freeProductWithOption.installationOptionValue}]`).check();
        });
        // cy.get('input[name="options"]').type(data.product.urlInput1)
        cy.get('div[class="productFullDetail-cartActions-elY productFullDetail-section-2jX productFullDetail-section-2jX"]').children().click();
    });

    it('should open paid product which has option to select with url field also with select installation option', () => {
        cy.fixture('../fixtures/productData').then(function(data) {
            cy.visit(data.paidProductWithOption.url)
            cy.get(`input[name=${data.paidProductWithOption.urlInputName}]`).type(data.paidProductWithOption.urlInputValue)
            cy.get(`input[value=${data.paidProductWithOption.installationOptionValue}]`).check();
        });
        cy.get('div[class="productFullDetail-cartActions-elY productFullDetail-section-2jX productFullDetail-section-2jX"]').children().click();
    });
})
