describe('Purchase product process',  () => {

    const navigateToCheckout = '/checkout';
    let testEmail;

    let featureExpirationDate = new Date();

    featureExpirationDate = featureExpirationDate.setDate(new Date().getDate() + 10);
    featureExpirationDate = new Date(featureExpirationDate);

    let mm = featureExpirationDate.getMonth() + 1;
    let yyyy = featureExpirationDate.getFullYear();

    featureExpirationDate = `${mm}/${yyyy}`;

    const openProductAndConfirmPrice = () => {
        cy.fixture('../fixtures/productData').then(function(data) {

            cy.visit(data.freeProductWithOption.url)

            cy.get(`p[data-testid="productFullDetail-productPrice"]`).then( option => {
                const actualPrice = [...option].map(o => o.innerText );
                expect(actualPrice).to.deep.eq([data.freeProductWithOption.NZD_Price]);
            });

            cy.get(`label[class*=radioGroup-radioContainer]`).last().then(option => {
                const actualTitle = [...option].map(o => o.innerText );
                expect(actualTitle).to.deep.eq([`${data.freeProductWithOption.Option_1_title}+${data.freeProductWithOption.Option_1_nzd_price.replace('NZ', '')}`])
            });
        });
    }

    const addBillingAddress = () => {
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
    }

    const addPaymentInfo = () => {
        cy.fixture('../fixtures/userBillingInfo').then(  function(data) {
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
    }

    it('Open product and confirm price', () => {

        cy.get("body").then($body => {
            if ($body.find('svg[class*=indicator-indicator]').length > 0) {
                cy.get('svg[class*=indicator-indicator]', { timeout: 40000 }).should('not.visible').then(() => {
                    openProductAndConfirmPrice();
                });
            }
            else {
                openProductAndConfirmPrice();
            }
        });
    });

    it('confirm option title, select option, confirm price, add to cart, confirm price on cart', () => {
        cy.fixture('../fixtures/productData').then(function(data) {

            cy.get(`input[value=${data.freeProductWithOption.installationOptionValue}]`).check();

            cy.get(`p[data-testid="productFullDetail-productPrice"]`).then( option => {
                const actualPrice = [...option].map(o => o.innerText );
                expect(actualPrice).to.deep.eq([data.freeProductWithOption.Option_1_nzd_price]);
            });

            cy.get('button[data-testid="productFullDetail-addToCartBtn"]').click();

            cy.get('button[data-testid="miniCart-shoppingBtn"]').click();

            cy.wait(5000);

            cy.get('span[class*=item-price]').then(option => {
                const cartPrice = [...option].map(o => o.innerText );
                expect(cartPrice).to.deep.eq([data.freeProductWithOption.Option_1_nzd_price]);
            });
        });
    });

    it('navigate checkout page and confirm by matching current url',() => {

        cy.get('button[data-testid="miniCart-checkoutBtn"]').click();

        cy.url().should('eq', Cypress.config().baseUrl + navigateToCheckout);
    })

    it('guest 1> billing address with country sholud have region', () => {

        cy.get("body").then($body => {
            if ($body.find('svg[class*=indicator-indicator]').length > 0) {
                cy.get('svg[class*=indicator-indicator]', { timeout: 40000 }).should('not.visible').then(() => {
                    addBillingAddress();
                });
            }
            else {
                addBillingAddress();
            }
        });

    });

    it('guest 2> Payment Information ',   () => {

        cy.wait(5000);

        cy.get("body").then($body => {
            if ($body.find('svg[class*=indicator-indicator]').length > 0) {
                cy.get('svg[class*=indicator-indicator]', { timeout: 50000 }).should('be.visible').then(() => {
                    cy.get('svg[class*=indicator-indicator]', { timeout: 50000 }).should('not.visible').then(() => {
                        addPaymentInfo();
                    });
                });
            }
        });
    });

    it('guest 3> Place order ',() => {

        cy.get("body").then($body => {
            if ($body.find('svg[class*=indicator-indicator]').length > 0) {
                cy.get('svg[class*=indicator-indicator]', { timeout: 40000 }).should('be.visible').then(() => {

                    cy.get('svg[class*=indicator-indicator]', { timeout: 40000 }).should('not.visible').then(() => {
                        cy.get('button[data-testid="checkoutPage-placeOrderBtn"]').click();
                    });
                })
            }
            else cy.get('button[data-testid="checkoutPage-placeOrderBtn"]').click();
        });
        cy.wait(5000);
    });
});
