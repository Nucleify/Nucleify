import TestLoginButton from '../../resources/ts/components/Support/TestLoginButton.vue'

describe('TestLoginButton.cy.tsx', (): void => {
  it('renders successfully', function (): void {
    cy.mount(TestLoginButton)
    cy.get('button').should('contains.text', 'Test Login')
  })
})
