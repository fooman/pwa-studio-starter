const guestSignOutProcess = () => {
    it('Guest Sign out process', () => {

        cy.get("body").then($body => {
            if ($body.find('svg[class*=accountChip-loader]', {timeout: 50000}).length > 0) {
                cy.get('svg[class*=accountChip-loader]', {timeout: 50000}).should('be.visible').then(() => {

                    cy.get('svg[class*=accountChip-loader]', {timeout: 50000}).should('not.visible').then(() => {

                        cy.get('button[aria-label="Toggle My Account Menu"]').click();

                        cy.get('button').contains('Sign Out').click({force: true});

                    });
                });
            }
            else {
                cy.get('button[aria-label="Toggle My Account Menu"]').click();

                cy.get('button').contains('Sign Out').click({force: true});
            }
        });
    });
}

const freeProductOpenAndConfirmPrice = () => {
    cy.fixture('../fixtures/productData').then(function(data) {

        cy.visit(data.freeProduct.url);

        cy.get(`p[data-testid="productFullDetail-productPrice"]`).then( option => {
            const actualPrice = [...option].map(o => o.innerText );
            expect(actualPrice).to.deep.eq([data.freeProduct.NZD_Price]);
        });
    });
}

const paidProductOpenAndConfirmPrice = () => {

    cy.fixture('../fixtures/productData').then(function (data) {
        cy.visit(data.paidProductWithOption.url)

        cy.get(`p[data-testid="productFullDetail-productPrice"]`).then(option => {
            const actualPrice = [...option].map(o => o.innerText);
            expect(actualPrice).to.deep.eq([data.paidProductWithOption.NZD_Price]);
        });

        cy.get(`label[class*=radioGroup-radioContainer]`).last().then(option => {
            const actualTitle = [...option].map(o => o.innerText);
            expect(actualTitle).to.deep.eq([`${data.paidProductWithOption.Option_1_title}+${data.paidProductWithOption.Option_1_nzd_price.replace('NZ', '')}`])
        });
    });
}

const PaidProductAddUrlSelectOptionAddToCart = (nzdTag) => {
    let priceWithInstallation;
    cy.fixture('../fixtures/productData').then(function (data) {
        cy.get(`input[name="options"]`).type(data.paidProductWithOption.urlInputValue);

        cy.get(`input[name="options"]`).should('have.value', data.paidProductWithOption.urlInputValue);

        cy.get(`input[value=${data.paidProductWithOption.installationOptionValue}]`).check();

        cy.get(`p[data-testid="productFullDetail-productPrice"]`).then(option => {
            const actualPrice = [...option].map(o => o.innerText);
            const actualPriceValue = (data.paidProductWithOption.NZD_Price).split('$');
            const optionPriceValue = (data.paidProductWithOption.Option_1_nzd_price).split('$');
            priceWithInstallation = (parseFloat(actualPriceValue[1]) + parseFloat(optionPriceValue[1])).toString();
            priceWithInstallation = nzdTag + priceWithInstallation;
            expect(actualPrice).to.deep.eq([priceWithInstallation]);
        });

        cy.get('button[data-testid="productFullDetail-addToCartBtn"]').click();

        cy.get('button[data-testid="miniCart-shoppingBtn"]').click();

        cy.get('span[class*=item-price]').then(option => {
            const cartPrice = [...option].map(o => o.innerText);
            expect(cartPrice).to.deep.eq([priceWithInstallation]);
        });
    });
}

const freeProductAddToCartAndConfirmPrice = () => {
    cy.get('button[data-testid="productFullDetail-addToCartBtn"]').click();

    cy.get('button[data-testid="miniCart-shoppingBtn"]').click();

    cy.fixture('../fixtures/productData').then(function(data) {
        cy.get('span[class*=item-price]', { timeout: 50000}).should('be.visible').then(option => {
            const cartPrice = [...option].map(o => o.innerText );
            expect(cartPrice).to.deep.eq([data.freeProduct.NZD_Price]);
        });
    });
}

const AddBillingInfoWithRegion = (data, testEmail) => {

        cy.get('input[name="firstname"]').type(data.addressInfo.firstName);

        cy.get('input[name="lastname"]').type(data.addressInfo.lastName);

        cy.get('input[name="email"]').last().type(testEmail);

        cy.get('select[name="country"]').select(data.addressInfo.country.countryShouldRegion);

        cy.get('input[name="street[0]"]').type(data.addressInfo.streetAddress);

        cy.get('input[name="city"]').type(data.addressInfo.city);

        cy.get('select[name="region"]').select(data.addressInfo.stateCodeForRegion);

        cy.get('input[name="postcode"]').type(data.addressInfo.zipCode);

        cy.get('input[name="telephone"]').type(data.addressInfo.phoneNumber);

        cy.get('button[type="submit"]').last().click();
}

const AddBillingInfoWithNonRegion = (data, testEmail) => {

    cy.get('input[name="firstname"]').type(data.addressInfo.firstName);

    cy.get('input[name="lastname"]').type(data.addressInfo.lastName);

    cy.get('input[name="email"]').last().type(testEmail);

    cy.get('select[name="country"]').select(data.addressInfo.country.countryWithNullRegion);

    cy.get('input[name="street[0]"]').type(data.addressInfo.streetAddress);

    cy.get('input[name="city"]').type(data.addressInfo.city);

    cy.get('input[name="region"]').type(data.addressInfo.stateForNonRegion);

    cy.get('input[name="postcode"]').type(data.addressInfo.zipCode);

    cy.get('input[name="telephone"]').type(data.addressInfo.phoneNumber);

    cy.get('button[type="submit"]').last().click();
}

const orderConfirmMation = (testEmail, stateParams) => {
    cy.get('div[data-testid="orderConfirmation-billingInfo"]', { timeout: 50000}).should('be.visible').then(() => {

        cy.fixture('../fixtures/userBillingInfo').then(function(data) {
            const { firstName, lastName, city, streetAddress, stateNameForRegion, stateForNonRegion, zipCode, country: {countryShouldRegion, countryWithNullRegion }} = data.addressInfo;

            cy.get('div[data-testid="orderConfirmation-billingInfo"]').children('span').then(option => {

                const pswd = '@123abcABC';
                const actualBillingInfo = stateParams === 'stateForRegion' ?
                    [ testEmail, `${firstName} ${lastName}`, streetAddress, `${city}, ${stateNameForRegion} ${zipCode} ${countryShouldRegion}`]
                    :
                    [ testEmail, `${firstName} ${lastName}`, streetAddress, `${city}, ${stateForNonRegion} ${zipCode} ${countryWithNullRegion}`];
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
    });
}

const addCreditCardInfo = (featureExpirationDate) => {
    cy.fixture('../fixtures/userBillingInfo').then(  function(data) {
        cy.get('svg[class*=indicator-indicator]', {timeout: 50000}).should('be.visible').then(() => {
            cy.get('svg[class*=indicator-indicator]', { timeout: 50000 }).should('not.visible').then(() => {
                cy.get('input[id="braintree__card-view-input__cardholder-name"]').type(data.creditCardInfo.cardHolderName);
                /*it is use to get iframe element using iframe document*/
                const getIframeDocument = (id) => {
                    return cy.get(`iframe[id=${id}]`)
                        .its('0.contentDocument').should('exist')
                }

                const getIframeBody = (id) => {
                    // get the document
                    return getIframeDocument(id)
                        .its('body').should('not.be.undefined')
                        .then(cy.wrap)
                }

                getIframeBody('braintree-hosted-field-number').find('#credit-card-number').type(data.creditCardInfo.cardNumber);
                getIframeBody('braintree-hosted-field-expirationDate').find('#expiration').type(featureExpirationDate);
                getIframeBody('braintree-hosted-field-cvv').find('#cvv').type(data.creditCardInfo.cvv);

                cy.get('button[data-testid="checkoutPage-reviewOrderBtn"]').click();
            });
        })
    });
}

describe('1> Guest user Purchase "free" product process with country "US"',  () => {

    const navigateToCheckout = `/checkout`;
    let testEmail;

    it('Open product, confirm price', () => {
        freeProductOpenAndConfirmPrice();
    });

    it('add to cart and confirm price on cart', () => {
        freeProductAddToCartAndConfirmPrice();
    });

    it('navigate checkout page and confirm by matching current url', () => {

        cy.get('button[data-testid="miniCart-checkoutBtn"]').click();

        cy.url().should('eq', Cypress.config().baseUrl + navigateToCheckout);
    });

    it('guest 1> billing address with country "US"', () => {
        cy.get("body").then($body => {
            if ($body.find('svg[class*=indicator-indicator]', {timeout: 50000}).length > 0) {
                cy.get('svg[class*=indicator-indicator]', {timeout: 50000}).should('be.visible').then(() => {

                    cy.get('svg[class*=indicator-indicator]', {timeout: 50000}).should('not.visible').then(() => {

                        cy.get('svg[class*=indicator-indicator]', {timeout: 50000}).should('not.visible').then(() => {

                            cy.fixture('../fixtures/userBillingInfo').then(function (data) {

                                const uuid = () => Cypress._.random(0, 1e6)
                                const id = uuid()
                                testEmail = `${id}${data.addressInfo.email}`

                                AddBillingInfoWithRegion(data, testEmail);
                            });

                        });
                    });

                });
            } else {
                cy.fixture('../fixtures/userBillingInfo').then(function (data) {

                    const uuid = () => Cypress._.random(0, 1e6)
                    const id = uuid()
                    testEmail = `${id}${data.addressInfo.email}`

                    AddBillingInfoWithRegion(data, testEmail);
                });
            }
        });

    });

    it('guest 2> Payment Information ', () => {
        cy.get('svg[class*=indicator-indicator]', {timeout: 50000}).should('be.visible').then(() => {
            cy.get('svg[class*=indicator-indicator]', {timeout: 50000}).should('not.visible').then(() => {
                cy.get('button[data-testid="checkoutPage-reviewOrderBtn"]').click();
            });

        });
    });

    it('guest 3> Place order ', () => {
        cy.get("body").then($body => {
            if ($body.find('svg[class*=indicator-indicator]', {timeout: 50000}).length > 0) {
                cy.get('svg[class*=indicator-indicator]', {timeout: 50000}).should('be.visible').then(() => {
                    cy.get('svg[class*=indicator-indicator]', {timeout: 50000}).should('not.visible').then(() => {
                        cy.get('button[data-testid="checkoutPage-placeOrderBtn"]').click();
                    });
                })
            } else {
                cy.get('button[data-testid="checkoutPage-placeOrderBtn"]').click();
            }
        });

    });

        it('success order page and add password to create account ', () => {
            cy.get("body").then($body => {
                if ($body.find('svg[class*=indicator-indicator]', {timeout: 50000}).length > 0) {
                    cy.get('svg[class*=indicator-indicator]', {timeout: 50000}).should('be.visible').then(() => {
                        cy.get('svg[class*=indicator-indicator]', {timeout: 50000}).should('not.visible').then(() => {
                            orderConfirmMation(testEmail, 'stateForRegion');
                        });
                    })
                } else {
                    orderConfirmMation(testEmail, 'stateForRegion');
                }
            });
        });

        it('Thanks for order confirmation', () => {
            cy.get('div[class*=toast-message]', {timeout: 50000}).should('be.visible').then(() => {

                cy.get('div[class*=toast-message]').contains('Account successfully created.');
            });
        });
});

describe('2> Guest user Purchase "free" product process with country "NZ"',() => {

    const navigateToCheckout = `/checkout`;

    let testEmail;

    guestSignOutProcess();

    it('Open product, confirm price', () => {
        cy.get("body").then($body => {
            if ($body.find('svg[class*=indicator-indicator]', { timeout: 50000}).length > 0) {
                cy.get('svg[class*=indicator-indicator]', { timeout: 50000 }).should('be.visible').then(() => {
                    cy.get('svg[class*=indicator-indicator]', { timeout: 50000 }).should('not.visible').then(() => {
                        freeProductOpenAndConfirmPrice();
                    });
                });
            }
            else freeProductOpenAndConfirmPrice();
        });
    });

    it('add to cart and confirm price on cart', () => {
        freeProductAddToCartAndConfirmPrice();
    });

    it('navigate checkout page and confirm by matching current url',() => {

        cy.get('button[data-testid="miniCart-checkoutBtn"]').click();

        cy.url().should('eq', Cypress.config().baseUrl + navigateToCheckout);
    });

    it('guest 1> billing address with country "NZ"',  () => {

        cy.get("body").then($body => {
            if ($body.find('svg[class*=indicator-indicator]', {timeout: 50000}).length > 0) {
                cy.get('svg[class*=indicator-indicator]', { timeout: 50000 }).should('be.visible').then(() => {

                    cy.get('svg[class*=indicator-indicator]', { timeout: 50000 }).should('not.visible').then(() => {

                        cy.get('svg[class*=indicator-indicator]', { timeout: 50000 }).should('not.visible').then(() => {

                            cy.fixture('../fixtures/userBillingInfo').then(function (data) {

                                const uuid = () => Cypress._.random(0, 1e6)
                                const id = uuid()
                                testEmail = `${id}${data.addressInfo.email}`

                                AddBillingInfoWithNonRegion(data, testEmail);

                            });
                        });
                    });
                });
            }
            else {
                cy.fixture('../fixtures/userBillingInfo').then(function (data) {

                    const uuid = () => Cypress._.random(0, 1e6)
                    const id = uuid()
                    testEmail = `${id}${data.addressInfo.email}`

                    AddBillingInfoWithNonRegion(data, testEmail);

                });
            }
        });

    });

    it('guest 2> Payment Information ',   () => {
        cy.get('svg[class*=indicator-indicator]', { timeout: 50000 }).should('be.visible').then(() => {

            cy.get('svg[class*=indicator-indicator]', { timeout: 50000 }).should('not.visible').then(() => {

                cy.get('button[data-testid="checkoutPage-reviewOrderBtn"]').click();
            });
        });
    });

    it('guest 3> Place order ',() => {
            cy.get("body").then($body => {
                if ($body.find('svg[class*=indicator-indicator]', { timeout: 50000 }).length > 0) {
                    cy.get('svg[class*=indicator-indicator]', { timeout: 50000 }).should('be.visible').then(() => {
                        cy.get('svg[class*=indicator-indicator]', { timeout: 50000 }).should('not.visible').then(() => {
                            cy.get('button[data-testid="checkoutPage-placeOrderBtn"]').click();
                        });
                    })
                }
                else {
                    cy.get('button[data-testid="checkoutPage-placeOrderBtn"]').click();
                }
            });
    });

    it('success order page and add password to create account ',  () => {
        cy.get("body").then($body => {
            if ($body.find('svg[class*=indicator-indicator]', {timeout: 50000}).length > 0) {
                cy.get('svg[class*=indicator-indicator]', { timeout: 50000 }).should('be.visible').then(() => {
                    cy.get('svg[class*=indicator-indicator]', { timeout: 50000 }).should('not.visible').then(() => {

                        orderConfirmMation(testEmail, 'stateForNonRegion');

                    });
                });
            }
            else {
                orderConfirmMation(testEmail, 'stateForNonRegion');
            }
        });
    });

    it('Thanks for order confirmation', () => {
        cy.get('div[class*=toast-message]', { timeout: 50000 }).should('be.visible').then(() => {

            cy.get('div[class*=toast-message]').contains('Account successfully created.');
        });
    });

});
