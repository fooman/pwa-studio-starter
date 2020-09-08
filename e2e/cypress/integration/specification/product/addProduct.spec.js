describe('ProductPage', () => {

    it('should open product(free product) and add to cart', () => {
        cy.fixture('../fixtures/productData').then(function (data){
            cy.visit(data.freeProduct.url)
        });
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

    it('should open paid product which has option to select with url field also with select installation option', () => {
        cy.fixture('../fixtures/productData').then(function(data) {
            cy.visit(data.paidProductWithOption.url)
            cy.get(`input[name=${data.paidProductWithOption.urlInputName}]`).type(data.paidProductWithOption.urlInputValue)
            cy.get(`input[value=${data.paidProductWithOption.installationOptionValue}]`).check();
        });
        cy.get('div[class="productFullDetail-cartActions-elY productFullDetail-section-2jX productFullDetail-section-2jX"]').children().click();
    });

    it('should open free product with match (price , option title, option price, select option match price) detail and add to cart', () => {
        cy.fixture('../fixtures/productData').then(function(data) {

            cy.visit(data.freeProductWithOption.url)

            cy.get(`p[class="productFullDetail-productPrice-2Tk"]`).then( option => {
                const actualPrice = [...option].map(o => o.innerText );
                expect(actualPrice).to.deep.eq([data.freeProductWithOption.USD_Price]);
            });

            cy.get(`label[class="radioGroup-radioContainer-3x9"]`).last().then(option => {
                const actualTitle = [...option].map(o => o.innerText );
                expect(actualTitle).to.deep.eq([`${data.freeProductWithOption.Option_1_title}+${data.freeProductWithOption.Option_1_usd_price}`])
            });

            cy.get(`input[value=${data.freeProductWithOption.installationOptionValue}]`).check();

            cy.get(`p[class="productFullDetail-productPrice-2Tk"]`).then( option => {
                const actualPrice = [...option].map(o => o.innerText );
                expect(actualPrice).to.deep.eq([data.freeProductWithOption.Option_1_usd_price]);
            });
        });

        cy.get('div[class="productFullDetail-cartActions-elY productFullDetail-section-2jX productFullDetail-section-2jX"]').children().click();

        cy.get('button[class="cartTrigger-trigger-2w8 clickable-root-2gB"]').click();

        cy.get('span[class="item-price-2Sf"]').then(option => {
            const cartPrice = [...option].map(o => o.innerText );
            expect(cartPrice).to.deep.eq(["US$65.30"]);
        })
    });

})
