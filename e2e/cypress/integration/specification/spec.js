/// <reference types="cypress" />

describe('HomePage', () => {
    it('works', () => {
        cy.wrap(1).should('equal', 1)
    })
    it('should open home page', () => {
        cy.visit('/')
    })
})
