///// <reference types="cypress" />

describe("E2E - Skrolowanie / Najechanie", () => {
    it("Najechanie na element", () => {
        cy.visit('/')
        // najechanie na element skofusowania elementu uzywa sie trigger, a przy wywolaniu tej metody
        // uzywa sie np. mouseEnter, focus, scroll
        cy.get(`a[tittle="Dresses"]`).eq(1).trigger("focus")
        cy.get(`li.sfHover a[title="Summer Dresses]`).click()
    })

    it(("skrolowanie do boxa specials"), () => {
        // znacznik a ma atrybut tittle specials
        // chodzi o znacznik a ktory ma atrybut title specials i chodzi nam o 1 element i chcemy zeby skrypt automatycznie zescrolowal do tego elemetnu
        // chcemy zeby test nam zeskrolowal do tego elementu titlespecials
        cy.get("a[title='specials']").first().scrollIntoView();

    })
})