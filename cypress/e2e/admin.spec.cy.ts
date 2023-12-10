describe('admin spec', () => {
  it('renders successfully when authorized', function () {
    cy.login('test@example.com', 'admin123')

    cy.visit('/admin')
    cy.get('a').contains('Test Admin')

    cy.get('h3').contains('Manage Users')
    cy.get('h3').contains('Manage Contacts')
  })

  it('redirects when unauthorized', function () {
    cy.visit('/admin')

    cy.url().should('include', '/login')
  })

  it('redirects when unauthorized user', function () {
    cy.login('testuser@example.com', 'user123')

    cy.visit('/admin')

    cy.url().should('include', '/home')
  })
})
