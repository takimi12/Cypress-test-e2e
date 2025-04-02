///// <reference types="cypress" />

describe("E2E - Zmienne", () => {
    it("Zmienne środowiskowe", () => {
        cy.visit(Cypress.env("url"))
    })
})