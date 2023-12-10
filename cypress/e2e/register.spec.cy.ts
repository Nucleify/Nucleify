describe('login spec', () => {
  it('renders successfully when unauthorized', function () {
    cy.visit('/register')

    cy.contains('Login')
    cy.contains('Register')

    cy.contains('Name')
    cy.contains('Email Address')
    cy.contains('Password')
    cy.contains('Confirm Password')
  })

  it('redirects when authorized', function () {
    cy.login('test@example.com', 'admin123')

    cy.visit('/register')

    cy.url().should('include', '/')
  })
})
