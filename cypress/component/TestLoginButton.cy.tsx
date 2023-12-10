import TestLoginButton from "../../resources/js/components/User/TestLoginButton.vue";

describe('TestLoginButton.cy.tsx', () => {
  it('renders successfully', function () {
    cy.mount(TestLoginButton)
    cy.get('button').should('contains.text', 'Test Login')
  })
})
