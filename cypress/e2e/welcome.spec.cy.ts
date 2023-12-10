describe('welcome spec', () => {
  it('renders successfully when unauthorized', function () {
    cy.visit('/')

    cy.contains('Log in')
    cy.contains('Register')
  })

  it('redirects when authorized', function () {
    cy.login('test@example.com', 'admin123')

    cy.visit('/')

    cy.url().should('include', '/')
  })
})
