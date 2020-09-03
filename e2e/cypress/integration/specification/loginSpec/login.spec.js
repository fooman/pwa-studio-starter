describe('LoginTest', function() {
    // const login = new Login()

    beforeEach(function() {
        cy.log('It should open Login Page')
        cy.visit('/')
    })

    it('should render error message if email is not put.', function() {
        cy.get('button[class="accountTrigger-trigger-2wI clickable-root-2gB"]').click()
    })

    it('sign in with valid credentials.', function() {
        cy.get('button[class="accountTrigger-trigger-2wI clickable-root-2gB"]').click()

        cy.fixture('../fixtures/loginData').then(function(data) {
            cy.get('input[name="email"]').last().type(data.user.email)
            cy.get('input[name="password"]').last().type(data.user.password)
        });
        cy.get('button[class="button-root_highPriority-OdL button-root-3SO"]').first().click()
    })

})
