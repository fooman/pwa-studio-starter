describe('LoginTest', function() {
    // const login = new Login()

    const pressMyAccountBtn = () => {
        cy.get('button[aria-label="Toggle My Account Menu"]').click();
    }

    const processForSignUp = () => {
        pressMyAccountBtn();
        cy.fixture('../fixtures/loginData').then(function(data) {
            cy.get('input[name="email"]').last().type(data.user.email)
            cy.get('input[name="password"]').last().type(data.user.password)
        });

        cy.get('[data-testid="signIn-form"]').within(() => {
            cy.get('button[type="submit"]').first().click()
        })
    }

    beforeEach(function() {
        cy.log('It should open Login Page')
        cy.visit('/')
    });

    it('should render error message if email is not put.', function() {
        cy.get("body").then($body => {
            if ($body.find('svg[class*=indicator-indicator]').length > 0) {
                cy.get('svg[class*=indicator-indicator]', { timeout: 40000 }).should('not.visible').then(() => {
                    pressMyAccountBtn();
                });
            }
            else pressMyAccountBtn();
        });

    })

    it('sign in with valid credentials.', function() {
        cy.get("body").then($body => {
            if ($body.find('svg[class*=indicator-indicator]').length > 0) {
                cy.get('svg[class*=indicator-indicator]', { timeout: 40000 }).should('not.visible').then(() => {
                    processForSignUp();
                });
            }
            else {
                processForSignUp();
            }
        });

    })

})
