require('cypress-plugin-tab')
describe('Purchase product process', async () => {

    it('Open product, confirm price, confirm option title, select option, confirm price, add to cart, confirm price on cart', () => {
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

        cy.fixture('../fixtures/productData').then(function(data) {
            cy.get('span[class="item-price-2Sf"]').then(option => {
                const cartPrice = [...option].map(o => o.innerText );
                expect(cartPrice).to.deep.eq([data.freeProductWithOption.Option_1_usd_price]);
            })
        });
    });

    it('navigate checkout page and confirm by matching current url',() => {
        cy.get('button[class="miniCart-checkoutButton-2XF button-root_highPriority-OdL button-root-3SO"]').click();

        cy.url().should('eq', 'https://fooman-pwa-frontend-ewafz.local.pwadev:8659/checkout')
    })

    it('guest 1> billing address with country sholud have region', () => {
        cy.fixture('../fixtures/userBillingInfo').then(function(data) {

            cy.get('input[name="firstname"]').type(data.addressInfo.firstName);

            cy.get('input[name="lastname"]').type(data.addressInfo.lastName);

            const uuid = () => Cypress._.random(0, 1e6)
            const id = uuid()
            const testEmail = `${id}${data.addressInfo.email}`
            cy.get('input[name="email"]').last().type(testEmail);

            cy.get('select[name="country"]').select(data.addressInfo.country.countryShouldRegion);

            cy.get('input[name="street[0]"]').type(data.addressInfo.streetAddress);

            cy.get('input[name="city"]').type(data.addressInfo.city);

            cy.get('select[name="region"]').select(data.addressInfo.state);

            cy.get('input[name="postcode"]').type(data.addressInfo.zipCode);

            cy.get('input[name="telephone"]').type(data.addressInfo.phoneNumber);

            cy.get('button[class="button-root_normalPriority-2SA button-root-3SO"]').click();
        });
    });

    it('guest 2> Payment Information ',   () => {

        cy.fixture('../fixtures/userBillingInfo').then( function(data) {

            cy.wait(5000);

            cy.get('input[placeholder="Cardholder Name"]').type(data.creditCardInfo.cardHolderName);
            /*work ongoing
             Need to investigate on find "Card Number" input field to add card numbar
             */
            cy.get('input[placeholder="Cardholder Name"]: second').type('4111 1111 1111 1111');

        });
    });

})
