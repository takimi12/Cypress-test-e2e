///// <reference types="cypress" />

import AlertPage from "../../support/page-object/alertPage"


describe("E2E - Akcje kliknięcia", () => {
    it("kliknięcie na element", () => {
        cy.visit('https://testowanie-oprogramowania.pl/lekcje/alerty/')
        cy.get("#alert").click()
        // do pracy na alertach zawsze wykonujemy metodę on
        cy.on("window:alert", tresc => {
            expect(tresc).to.equal("Przykładowa treść alertu")
        })
    })
    it("Alert confirm", () => {
        cy.get("#alert-confirm").click();
        cy.on("window:confirm", tresc =>{
            expect(tresc).to.equal("Zaakceptuj aby kontynouwac")
        })
        cy.on("widnow:confirm", () =>false)
    })
})


