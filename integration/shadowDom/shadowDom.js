///// <reference types="cypress" />

describe("E2E - Shadow Dom", () => {
    it("Wykorzystanie metody shadow", () => {
        cy.visit('https://www.htmlelements.com/demos/menu/shadow-dom/index.htm')

        // dla porowniania zrobienie testu bez uzycia metody shadow
        //cy.contains("file").click()

        cy.get(".smart-ui-component").shadow().contains("file").click()

    })
})