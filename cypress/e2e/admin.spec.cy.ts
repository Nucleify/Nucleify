describe('render tests', (): void => {
    it('renders successfully when authorized admin', (): void => {
        cy.login('test_admin')

        cy.visit('/admin')

        cy.get('h3').contains('Manage Articles')
        cy.get('h3').contains('Manage Contacts')
        cy.get('h3').contains('Manage Users')
    })

    it('redirects when unauthorized', (): void => {
        cy.visit('/admin')

        cy.url().should('include', '/login')
    })

    it('redirects and renders successfully when authorized user', (): void => {
        cy.login('test_user')

        cy.visit('/admin')

        cy.url().should('include', '/home')
    })
})
