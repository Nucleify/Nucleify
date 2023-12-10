describe('home spec', () => {
  it('renders successfully when authorized', function () {
    cy.login('test@example.com', 'admin123')

    cy.contains('You are logged in!')
  })
})
