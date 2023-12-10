describe('home spec', () => {
  it('renders successfully when authorized', function () {
    cy.login('test@example.com', 'admin123')

    cy.get('a').contains('Test Admin')
    cy.contains('You are logged in!')
  })

  it('can go to Admin Panel', function () {
    cy.login('test@example.com', 'admin123')

    cy.get('.dropdown-toggle')
        .contains('Test Admin')
        .click({ multiple: true })
    cy.get('.dropdown-menu')
        .should('be.visible')
        .contains('Admin Panel')
        .click();
  })
})
