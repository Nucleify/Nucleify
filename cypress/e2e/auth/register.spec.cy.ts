describe('render tests', (): void => {
  it('renders successfully when unauthorized', (): void => {
    cy.visit('/register')

    cy.contains('Log In').click()
    cy.contains('Register').click()

    cy.contains('Name')
    cy.contains('Email Address')
    cy.contains('Password')
    cy.contains('Confirm Password')
  })
})

it('redirects when authorized', (): void => {
  cy.login('test_admin')

  cy.visit('/register')

  cy.url().should('include', '/')
})
