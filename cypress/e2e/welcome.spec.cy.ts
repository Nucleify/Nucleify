describe('welcome spec', () => {
  it('renders successfully when unauthorized', function () {
    cy.visit('/')

    cy.contains('Log in')
    cy.contains('Register')
  })

  it('renders successfully when authorized', function () {
    cy.login('test@example.com', 'admin123')

    cy.visit('/')

    cy.contains('Home')
  })
})
