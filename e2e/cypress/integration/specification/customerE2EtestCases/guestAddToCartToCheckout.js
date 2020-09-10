describe('Guest user Purchase "free" product process with country US',  () => {

    const baseUrl = 'https://fooman-pwa-frontend-ewafz.local.pwadev:8659';

    const navigateToCheckout = `${baseUrl}/checkout`;

    let testEmail;

    it('Open product, confirm price, add to cart, confirm price on cart', () => {
        cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('not.visible').then(() => {
            cy.fixture('../fixtures/productData').then(function(data) {

                cy.visit(data.freeProduct.url)

                cy.get(`p[data-testid="productFullDetail-productPrice"]`).then( option => {
                    const actualPrice = [...option].map(o => o.innerText );
                    expect(actualPrice).to.deep.eq([data.freeProduct.USD_Price]);
                });
            });

            cy.get('div[data-testid="productFullDetail-addToCartBtn"]').children().click();

            cy.get('button[aria-label="Toggle mini cart. You have 0 items in your cart."]').first().click();

            cy.fixture('../fixtures/productData').then(function(data) {
                cy.get('span[class="item-price-2Sf"]').then(option => {
                    const cartPrice = [...option].map(o => o.innerText );
                    expect(cartPrice).to.deep.eq([data.freeProduct.USD_Price]);
                })
            });
        });
    });

    it('navigate checkout page and confirm by matching current url',() => {

        cy.get('div[class="miniCart-footer-rP0"]').children().first().click();

        cy.url().should('eq', navigateToCheckout);
    })

    it('guest 1> billing address with country US',  () => {

        cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('be.visible').then(() => {

            cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 20000 }).should('not.visible').then(() => {

                    cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('not.visible').then(() => {

                        cy.fixture('../fixtures/userBillingInfo').then(function(data) {

                            cy.get('input[name="firstname"]').type(data.addressInfo.firstName);

                            cy.get('input[name="lastname"]').type(data.addressInfo.lastName);

                            const uuid = () => Cypress._.random(0, 1e6)
                            const id = uuid()
                            testEmail = `${id}${data.addressInfo.email}`
                            cy.get('input[name="email"]').last().type(testEmail);

                            cy.get('select[name="country"]').select(data.addressInfo.country.countryShouldRegion);

                            cy.get('input[name="street[0]"]').type(data.addressInfo.streetAddress);

                            cy.get('input[name="city"]').type(data.addressInfo.city);

                            cy.get('select[name="region"]').select(data.addressInfo.stateCodeForRegion);

                            cy.get('input[name="postcode"]').type(data.addressInfo.zipCode);

                            cy.get('input[name="telephone"]').type(data.addressInfo.phoneNumber);

                            cy.get('button[type="submit"]').last().click();
                        });
                    });
            });

        });

    });

    it('guest 2> Payment Information ',   () => {
        cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('be.visible').then(() => {

            cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('not.visible').then(() => {

                cy.get('button[data-testid="checkoutPage-reviewOrderBtn"]').click();
            });

        });

    });

    it('guest 3> Place order ',() => {

        cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('be.visible').then(() => {

            cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('not.visible').then(() => {
                cy.get('button[data-testid="checkoutPage-placeOrderBtn"]').click();
            });
        })
    });

    it('success order page and add password to create account ',  () => {

        cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('not.visible').then(() => {
            cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('not.visible').then(() => {

                const isVisibleShippingInfo = cy.get('div[data-testid="orderConfirmation-billingInfo"]').should('be.visible');

                if (isVisibleShippingInfo) {

                    cy.fixture('../fixtures/userBillingInfo').then(function(data) {
                        const { firstName, lastName, city, streetAddress, stateNameForRegion, zipCode, country: {countryShouldRegion}} = data.addressInfo;

                        cy.get('div[data-testid="orderConfirmation-billingInfo"]').children('span').then(option => {

                            const pswd = '@123abcABC';
                            const actualBillingInfo = [ testEmail, `${firstName} ${lastName}`, streetAddress, `${city}, ${stateNameForRegion} ${zipCode} ${countryShouldRegion}`];
                            const confirmOrderBillingInfo = [...option].map(o => o.innerText );

                            confirmOrderBillingInfo.forEach((singleAddressStr, index) => {
                                expect(singleAddressStr).to.deep.eq(actualBillingInfo[index]);
                            });

                            cy.get('input[name="customer.firstname"]').should('have.value', firstName);

                            cy.get('input[name="customer.lastname"]').should('have.value', lastName);

                            cy.get('input[name="customer.email"]').should('have.value', testEmail);

                            cy.get('input[name="password"]').type(pswd);

                            cy.get('button[type="submit"]').last().click();
                        });
                    });
                }
            });
        });
    });
});

describe('Sign out for further test',  () => {

    it('Open product, confirm price, add to cart, confirm price on cart', () => {

        cy.get('.accountChip-loader-ICF', {timeout: 10000}).should('be.visible').then(() => {

            cy.get('.accountChip-loader-ICF', {timeout: 10000}).should('not.visible').then(() => {

                cy.get('button[aria-label="Toggle My Account Menu"]').click();

                cy.get('button').contains('Sign Out').click();

            });
        });
    });
});


describe('Guest user Purchase "free" product process with country NZ',  () => {

    const baseUrl = 'https://fooman-pwa-frontend-ewafz.local.pwadev:8659';

    const navigateToCheckout = `${baseUrl}/checkout`;

    let testEmail;

    it('Open product, confirm price, add to cart, confirm price on cart', () => {
        cy.fixture('../fixtures/productData').then(function (data) {

            cy.visit(data.freeProduct.url)

            cy.get(`p[data-testid="productFullDetail-productPrice"]`).then(option => {
                const actualPrice = [...option].map(o => o.innerText);
                expect(actualPrice).to.deep.eq([data.freeProduct.USD_Price]);
            });
        });

        cy.get('div[data-testid="productFullDetail-addToCartBtn"]').children().click();

        cy.get('button[aria-label="Toggle mini cart. You have 0 items in your cart."]').first().click();

        cy.fixture('../fixtures/productData').then(function (data) {
            cy.get('span[class="item-price-2Sf"]').then(option => {
                const cartPrice = [...option].map(o => o.innerText);
                expect(cartPrice).to.deep.eq([data.freeProduct.USD_Price]);
            })
        });
    });

    it('navigate checkout page and confirm by matching current url',() => {

        cy.get('div[class="miniCart-footer-rP0"]').children().first().click();

        cy.url().should('eq', navigateToCheckout);
    })

    it('guest 1> billing address with country NZ',  () => {

        cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('be.visible').then(() => {

            cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 20000 }).should('not.visible').then(() => {

                cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('not.visible').then(() => {

                    cy.fixture('../fixtures/userBillingInfo').then(function (data) {

                        cy.get('input[name="firstname"]').type(data.addressInfo.firstName);

                        cy.get('input[name="lastname"]').type(data.addressInfo.lastName);

                        const uuid = () => Cypress._.random(0, 1e6)
                        const id = uuid()
                        testEmail = `${id}${data.addressInfo.email}`
                        cy.get('input[name="email"]').last().type(testEmail);

                        cy.get('select[name="country"]').select(data.addressInfo.country.countryWithNullRegion);

                        cy.get('input[name="street[0]"]').type(data.addressInfo.streetAddress);

                        cy.get('input[name="city"]').type(data.addressInfo.city);

                        cy.get('input[name="region"]').type(data.addressInfo.stateForNonRegion);

                        cy.get('input[name="postcode"]').type(data.addressInfo.zipCode);

                        cy.get('input[name="telephone"]').type(data.addressInfo.phoneNumber);

                        cy.get('button[type="submit"]').last().click();
                    });
                });
            });
        });
    });

    it('guest 2> Payment Information ',   () => {
        cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('be.visible').then(() => {

            cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('not.visible').then(() => {

                cy.get('button[data-testid="checkoutPage-reviewOrderBtn"]').click();
            });

        });

    });

    it('guest 3> Place order ',() => {

        cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('be.visible').then(() => {

            cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('not.visible').then(() => {
                cy.get('button[data-testid="checkoutPage-placeOrderBtn"]').click();
            });
        })
    });

    it('success order page and add password to create account ',  () => {

        cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('not.visible').then(() => {
            cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('not.visible').then(() => {

                const isVisibleShippingInfo = cy.get('div[data-testid="orderConfirmation-billingInfo"]').should('be.visible');

                if (isVisibleShippingInfo) {

                    cy.fixture('../fixtures/userBillingInfo').then(function(data) {
                        const { firstName, lastName, city, streetAddress, stateForNonRegion, zipCode, country: {countryWithNullRegion}} = data.addressInfo;

                        cy.get('div[data-testid="orderConfirmation-billingInfo"]').children('span').then(option => {

                            const pswd = '@123abcABC';
                            const actualBillingInfo = [ testEmail, `${firstName} ${lastName}`, streetAddress, `${city}, ${stateForNonRegion} ${zipCode} ${countryWithNullRegion}`];
                            const confirmOrderBillingInfo = [...option].map(o => o.innerText );

                            confirmOrderBillingInfo.forEach((singleAddressStr, index) => {
                                expect(singleAddressStr).to.deep.eq(actualBillingInfo[index]);
                            });

                            cy.get('input[name="customer.firstname"]').should('have.value', firstName);

                            cy.get('input[name="customer.lastname"]').should('have.value', lastName);

                            cy.get('input[name="customer.email"]').should('have.value', testEmail);

                            cy.get('input[name="password"]').type(pswd);

                            cy.get('button[type="submit"]').last().click();
                        });
                    });
                }
            });
        });
    });
});
