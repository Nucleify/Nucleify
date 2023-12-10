describe('login spec', () => {
  it('login successfully with example data for tests', function () {
    cy.login('test@example.com', 'admin123')
  })

  it('renders successfully when unauthorized', function () {
    cy.visit('/login')

    cy.contains('Login')
    cy.contains('Register')

    cy.contains('Email Address')
    cy.contains('Password')
    cy.contains('Remember Me')
    cy.contains('Forgot Your Password?')
  })

  it('redirects when authorized', function () {
    cy.login('test@example.com', 'admin123')

    cy.visit('/')

    cy.url().should('include', '/')
  })
})
