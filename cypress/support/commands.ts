/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import { UserRoleType } from 'atomic/bosons/types'

Cypress.Commands.add('login', (role: UserRoleType): void => {
    const fixtureName: string =
        role === 'super_admin' || role === 'admin' ? 'secret_users' : 'users'

    cy.fixture(fixtureName).then((userCredentials): void => {
        const { email, password } = userCredentials[role]

        cy.visit('/login')

        cy.get('input[id=email]').type(email)
        cy.get('input[id=password]').type(`${password}{enter}`)

        cy.url().should('include', '/home')
    })
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

export {}
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            login(role: UserRoleType): Chainable<void>
        }
    }
}
