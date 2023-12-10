describe('admin spec', () => {
  it('renders successfully when authorized', function () {
    cy.login('test@example.com', 'admin123')

    cy.visit('/admin')
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
