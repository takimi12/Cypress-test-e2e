///// <reference types="cypress" />

describe("E2E - Akcje kliknięcia checkbox", () => {
    it("kliknięcie na element", () => {
        // przechodzimy do podstrony women
        cy.visit('/index.php?id_category=3&controller=category')
        // pobrane zostają inputy będące wewnątrz tego id, a następnie
        // pobrane inputy chcemy je rozbić i działać na nich osobno
        cy.get('#ul_layered_category_o').find("input").then(checkbox => {
            // chcemy sie odwolac od inputa pod indeksem 0
            // check posiada force ktory przyjmuje true i false
            // jesli ustawimy go na true, to jesli jakis element bedzie nam przyslaniac tego checkboxa
            // to i tak ten checkbox sie zaznaczy, a jesli tego nie zrobimy to nam tego checkboxa nie zaznaczy 
            cy.get(checkbox).eq(1).check({force:true})
            // mozemy sobie zrobic na ktoryms z checkboxow metode invoke i okreslic ze bedziemy chcieli wydobyc z checkboxa
            // wlasciwosc 
            cy.get(checkbox).eq(0).check().invoke("prop", "checked").then(zaznaczony => {
                cy.log(zaznaczony)
            });

        })
        // wykonanie check na kazdym inpucie z osobna
        cy.get("#ul_layered_id_attribute_group_1").find("input").check()
    })
})
