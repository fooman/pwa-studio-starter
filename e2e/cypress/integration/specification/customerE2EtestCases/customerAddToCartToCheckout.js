describe('User sign in process', () => {
    beforeEach(function() {
        cy.log('It should open Login Page')
        cy.visit('/')
    })

    it('sign in with valid credentials.', function() {
        cy.get('button[aria-label="Toggle My Account Menu"]').click()

        cy.fixture('../fixtures/loginData').then(function(data) {
            cy.get('input[name="email"]').last().type(data.user.email)
            cy.get('input[name="password"]').last().type(data.user.password)
        });
        cy.get('[data-testid="signIn-form"]').within(() => {
            cy.get('button[type="submit"]').first().click()
        });
    });
});

describe('1> Sign in user Purchase "paid" product process with country "US"',  () => {

    const baseUrl = 'https://fooman-pwa-frontend-ewafz.local.pwadev:8659';

    const navigateToCheckout = `${baseUrl}/checkout`;
    const usdTag = "US$";
    const floatValue = ".00";

    let testEmail;
    let priceWithInstallation;

    let featureExpirationDate = new Date();

    featureExpirationDate = featureExpirationDate.setDate(new Date().getDate() + 10);
    featureExpirationDate = new Date(featureExpirationDate);

    let mm = featureExpirationDate.getMonth() + 1;
    let yyyy = featureExpirationDate.getFullYear();

    featureExpirationDate = `${mm}/${yyyy}`;


    it('Open product, confirm price, add url, select option, add to cart, confirm price on cart', () => {
        cy.get('.accountChip-loader-ICF', {timeout: 10000}).should('be.visible').then(() => {

            cy.get('.accountChip-loader-ICF', {timeout: 10000}).should('not.visible').then(() => {

                cy.fixture('../fixtures/productData').then(function (data) {

                    cy.visit(data.paidProductWithOption.url)

                    cy.get(`p[data-testid="productFullDetail-productPrice"]`).then(option => {
                        const actualPrice = [...option].map(o => o.innerText);
                        expect(actualPrice).to.deep.eq([data.paidProductWithOption.USD_Price]);
                    });

                    cy.get(`label[class="radioGroup-radioContainer-3x9"]`).last().then(option => {
                        const actualTitle = [...option].map(o => o.innerText);
                        expect(actualTitle).to.deep.eq([`${data.paidProductWithOption.Option_1_title}+${data.paidProductWithOption.Option_1_usd_price}`])
                    });

                    cy.get(`input[name="options"]`).type(data.paidProductWithOption.urlInputValue);

                    cy.get(`input[name="options"]`).should('have.value', data.paidProductWithOption.urlInputValue);

                    cy.get(`input[value=${data.paidProductWithOption.installationOptionValue}]`).check();

                    cy.get(`p[data-testid="productFullDetail-productPrice"]`).then(option => {
                        const actualPrice = [...option].map(o => o.innerText);
                        const actualPriceValue = (data.paidProductWithOption.USD_Price).split('$');
                        const optionPriceValue = (data.paidProductWithOption.Option_1_usd_price).split('$');
                        priceWithInstallation = (parseFloat(actualPriceValue[1]) + parseFloat(optionPriceValue[1])).toString();
                        priceWithInstallation = usdTag + priceWithInstallation + floatValue;
                        expect(actualPrice).to.deep.eq([priceWithInstallation]);
                    });

                    cy.get('button[data-testid="productFullDetail-addToCartBtn"]').click();


                    cy.get('button[data-testid="miniCart-shoppingBtn"]').click();

                    cy.get('span[class="item-price-2Sf"]').should('be.visible').then(option => {
                        const cartPrice = [...option].map(o => o.innerText);
                        expect(cartPrice).to.deep.eq([priceWithInstallation]);
                    });
                });
            });
        });
    });


    it('navigate checkout page and confirm by matching current url',() => {

        cy.get('button[data-testid="miniCart-checkoutBtn"]', {timeout: 10000}).should('be.visible').then(() => {
            cy.get('button[data-testid="miniCart-checkoutBtn"]').click();
        });

    });
});
