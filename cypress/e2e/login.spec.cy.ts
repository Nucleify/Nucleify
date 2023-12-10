describe('login spec', () => {
  it('login successfully with example data for tests', function () {
    cy.login('test@example.com', 'admin123')
  })

  it('renders successfully when unauthorized', function () {
    cy.visit('/login')

    cy.contains('Register').click()
    cy.contains('Login').click()

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

  it('retrieves forgotten password', function () {
    cy.visit('/login')

    cy.contains('Forgot Your Password?').click()

    cy.get('input[name=email]').type('test@example.com')

    cy.contains('Send Password Reset Link').click()
  })
})
