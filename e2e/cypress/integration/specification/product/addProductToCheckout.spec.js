describe('Purchase product process',  () => {

    const navigateToCheckout = 'https://fooman-pwa-frontend-ewafz.local.pwadev:8659/checkout';
    let testEmail;

    it('Open product, confirm price, confirm option title, select option, confirm price, add to cart, confirm price on cart', () => {
        cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('not.visible').then(() => {
            cy.fixture('../fixtures/productData').then(function(data) {

                cy.visit(data.freeProductWithOption.url)

                cy.get(`p[data-testid="productFullDetail-productPrice"]`).then( option => {
                    const actualPrice = [...option].map(o => o.innerText );
                    expect(actualPrice).to.deep.eq([data.freeProductWithOption.USD_Price]);
                });

                cy.get(`label[class="radioGroup-radioContainer-3x9"]`).last().then(option => {
                    const actualTitle = [...option].map(o => o.innerText );
                    expect(actualTitle).to.deep.eq([`${data.freeProductWithOption.Option_1_title}+${data.freeProductWithOption.Option_1_usd_price}`])
                });

                cy.get(`input[value=${data.freeProductWithOption.installationOptionValue}]`).check();

                cy.get(`p[data-testid="productFullDetail-productPrice"]`).then( option => {
                    const actualPrice = [...option].map(o => o.innerText );
                    expect(actualPrice).to.deep.eq([data.freeProductWithOption.Option_1_usd_price]);
                });
            });

            cy.get('div[data-testid="productFullDetail-addToCartBtn"]').children().click();

            cy.get('button[aria-label="Toggle mini cart. You have 0 items in your cart."]').first().click();

            cy.fixture('../fixtures/productData').then(function(data) {
                cy.get('span[class="item-price-2Sf"]').then(option => {
                    const cartPrice = [...option].map(o => o.innerText );
                    expect(cartPrice).to.deep.eq([data.freeProductWithOption.Option_1_usd_price]);
                })
            });
        });
    });

    it('navigate checkout page and confirm by matching current url',() => {
        // cy.get('button[class="miniCart-checkoutButton-2XF button-root_highPriority-OdL button-root-3SO"]').click();
        cy.get('div[class="miniCart-footer-rP0"]').children().first().click();

        cy.url().should('eq', navigateToCheckout);
    })

    it('guest 1> billing address with country sholud have region', () => {

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

                cy.get('select[name="region"]').select(data.addressInfo.state);

                cy.get('input[name="postcode"]').type(data.addressInfo.zipCode);

                cy.get('input[name="telephone"]').type(data.addressInfo.phoneNumber);

                cy.get('button[type="submit"]').last().click();
            });
        });

    });

    it('guest 2> Payment Information ',   () => {

        cy.wait(5000);

        cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('not.visible').then(() => {

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
                getIframeBody('braintree-hosted-field-expirationDate').find('#expiration').type(data.creditCardInfo.expirationDate);
                getIframeBody('braintree-hosted-field-cvv').find('#cvv').type(data.creditCardInfo.cvv);

                cy.get('button[data-testid="checkoutPage-reviewOrderBtn"]').click();
            });
        });
    });

    it('guest 3> Place order ',   () => {

        cy.get('svg[class="indicator-indicator-1Xb"]', { timeout: 10000 }).should('not.visible').then(() => {
            cy.get('button[data-testid="checkoutPage-placeOrderBtn"]').click();
        });

    });

})
