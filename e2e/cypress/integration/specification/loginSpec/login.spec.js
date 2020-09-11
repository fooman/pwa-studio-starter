describe('LoginTest', function() {
    // const login = new Login()

    beforeEach(function() {
        cy.log('It should open Login Page')
        cy.visit('/')
    })

    it('should render error message if email is not put.', function() {
        cy.get('button[aria-label="Toggle My Account Menu"]').click()
    })

    it('sign in with valid credentials.', function() {
        cy.get('button[aria-label="Toggle My Account Menu"]').click()

        cy.fixture('../fixtures/loginData').then(function(data) {
            cy.get('input[name="email"]').last().type(data.user.email)
            cy.get('input[name="password"]').last().type(data.user.password)
        });
        cy.get('[data-testid="signIn-form"]').within(() => {
            cy.get('button[type="submit"]').first().click()
        })
    })

})
