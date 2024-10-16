describe('login on different users', (): void => {
  it('login successfully on super admin', (): void => {
    cy.login('super_admin')
  })

  it('login successfully on admin', (): void => {
    cy.login('admin')
  })

  it('login successfully on test admin', (): void => {
    cy.login('test_admin')
  })

  it('login successfully on test admin 2', (): void => {
    cy.login('test_admin_2')
  })

  it('login successfully on test tech', (): void => {
    cy.login('test_tech')
  })

  it('login successfully on test user', (): void => {
    cy.login('test_user')
  })
})

describe('render tests', (): void => {
  it('renders successfully when unauthorized', (): void => {
    cy.visit('/login')

    cy.contains('Register').click()
    cy.contains('Log In').click()

    cy.contains('Email Address')
    cy.contains('Password')
    // cy.contains('Remember Me')
    // cy.contains('Forgot Your Password?')
  })
})

it('redirects when authorized', (): void => {
  cy.login('test_admin')

  cy.visit('/login')

  cy.url().should('include', '/home')
})
