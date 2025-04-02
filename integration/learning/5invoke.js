/// <reference types="cypress" />

describe("E2E - Metoda Invoke", () => {
    it("Invoke", () => {
        // Otwiera stronę główną testowanej aplikacji
        cy.visit('/')

        // Pobiera element o atrybucie `title="Contact Us"` i wywołuje metodę "text", aby pobrać jego tekst
        cy.get('[title="Contact Us"]').invoke("text").then(tekst => {
            // Wyświetla pobrany tekst w logach testowych Cypressa
            cy.log(tekst)
        })

        // Pobiera wartość atrybutu "href" z elementu `title="Contact Us"`
        cy.get('[title="Contact Us"]').invoke("attr", "href").then(link => {
            // Wyświetla wartość linku w logach testowych
            cy.log(link)
        })

        // Pobiera wartość atrybutu "title" (poprawiona literówka z "tittle")
        cy.get('[title="Contact Us"]').invoke("attr", "title").then(title => {
            // Wyświetla wartość atrybutu "title" w logach testowych
            cy.log(title)
        })

        // Pobiera wartość pola input po ID `#search_query_top`, wpisuje do niego tekst
        cy.get("#search_query_top")
            .type("Przykladowa wartość") // Wpisuje "Przykladowa wartość"
            .invoke("prop", "value") // Pobiera właściwość `value` (czyli wpisany tekst)
            .then(wartosc => {
                // Wyświetla pobraną wartość w logach testowych
                cy.log(wartosc)
            })

        // Pobiera właściwość `checked` (czy pole input jest zaznaczone – np. checkbox)
        cy.get("#search_query_top")
            .invoke("prop", "checked") // Sprawdza, czy input jest zaznaczony
            .then(wartosc => {
                // Wyświetla pobraną wartość w logach testowych
                cy.log(wartosc)
            })
    })
})
