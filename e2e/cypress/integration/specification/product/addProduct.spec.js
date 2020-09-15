describe('ProductPage', () => {

    it('should open product(free product) and add to cart', () => {
        cy.fixture('../fixtures/productData').then(function (data){
            cy.visit(data.freeProduct.url)
        });

        cy.get("body").then($body => {
            if ($body.find('svg[class*=indicator-indicator]').length > 0) {
                cy.get('svg[class*=indicator-indicator]', { timeout: 40000 }).should('not.visible').then(() => {
                    cy.get('button[data-testid="productFullDetail-addToCartBtn"]').click();
                });
            }
            else cy.get('button[data-testid="productFullDetail-addToCartBtn"]').click();
        });
    });

    it('should open paid product which has option to select with url field also with select installation option', () => {
        cy.fixture('../fixtures/productData').then(function(data) {
            cy.visit(data.paidProductWithOption.url)

            cy.get("body").then($body => {
                if ($body.find('svg[class*=indicator-indicator]').length > 0) {
                    cy.get('svg[class*=indicator-indicator]', { timeout: 40000 }).should('not.visible').then(() => {
                        cy.get(`input[name="options"]`).type(data.paidProductWithOption.urlInputValue)
                        cy.get(`input[value=${data.paidProductWithOption.installationOptionValue}]`).check();
                        cy.get('button[data-testid="productFullDetail-addToCartBtn"]').click();
                    });
                }
                else {
                    cy.get(`input[name="options"]`).type(data.paidProductWithOption.urlInputValue)
                    cy.get(`input[value=${data.paidProductWithOption.installationOptionValue}]`).check();
                    cy.get('button[data-testid="productFullDetail-addToCartBtn"]').click();
                }
            });

        });

    });

    it('should open free product with match (price , option title, option price, select option match price) detail and add to cart', () => {
        cy.fixture('../fixtures/productData').then(function(data) {

            cy.visit(data.freeProductWithOption.url)

            cy.get("body").then($body => {
                if ($body.find('svg[class*=indicator-indicator]').length > 0) {
                    cy.get('svg[class*=indicator-indicator]', { timeout: 40000 }).should('not.visible').then(() => {
                        cy.get(`p[data-testid="productFullDetail-productPrice"]`).then( option => {
                            const actualPrice = [...option].map(o => o.innerText );
                            expect(actualPrice).to.deep.eq([data.freeProductWithOption.NZD_Price]);
                        });

                        cy.get(`label[class*=radioGroup-radioContainer]`).last().then(option => {
                            const actualTitle = [...option].map(o => o.innerText );
                            expect(actualTitle).to.deep.eq([`${data.freeProductWithOption.Option_1_title}+${data.freeProductWithOption.Option_1_nzd_price}`])
                        });
                    });
                }
                else {
                    cy.get(`p[data-testid="productFullDetail-productPrice"]`).then( option => {
                        const actualPrice = [...option].map(o => o.innerText );
                        expect(actualPrice).to.deep.eq([data.freeProductWithOption.NZD_Price]);
                    });

                    cy.get(`label[class*=radioGroup-radioContainer]`).last().then(option => {
                        const actualTitle = [...option].map(o => o.innerText );
                        expect(actualTitle).to.deep.eq([`${data.freeProductWithOption.Option_1_title}+${data.freeProductWithOption.Option_1_nzd_price}`])
                    });
                }
            });

        });

    });

    it('select option title, option price, select option, match price detail and add to cart', () => {
        cy.fixture('../fixtures/productData').then(function(data) {
            cy.get(`input[value=${data.freeProductWithOption.installationOptionValue}]`).check();
            cy.get(`p[data-testid="productFullDetail-productPrice"]`).then( option => {
                const actualPrice = [...option].map( o => o.innerText );
                expect(actualPrice).to.deep.eq([data.freeProductWithOption.Option_1_nzd_price]);
            });

            cy.get('button[data-testid="productFullDetail-addToCartBtn"]').click();

            cy.get('button[data-testid="miniCart-shoppingBtn"]').click();

            cy.get('span[class*=item-price]').then(option => {
                const cartPrice = [...option].map( o => o.innerText);
                expect(cartPrice).to.deep.eq([data.freeProductWithOption.Option_1_nzd_price]);
            })
        });
    });

})
