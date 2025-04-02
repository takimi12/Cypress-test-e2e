/// <reference types="cypress" />

describe("E2E - Akcja wpisywania", () => {
    it("Wpisywanie wartości w pole", () => {
        cy.visit('/')

        // Metoda type służy do wpisywania danego tekstu, tutaj "enter" będzie wpisanym tekstem
        cy.get('#search_query_top').type("Przykładowy produkt enter")

        // Dodanie {} do entera spowoduje naciśnięcie klawisza Enter
        cy.get('#search_query_top').type("Przykładowy produkt {enter}")

        // Wpisze "Przykładowy produkt" i usunie literę "t" (ostatnią literę)
        cy.get('#search_query_top').type("Przykładowy produkt{backspace}")

        // Dodanie opóźnienia - po każdej literze będzie 500ms przerwy
        cy.get('#search_query_top').type("Przykładowy produkt{backspace}", { delay: 500 })
    })

    it("Czyszczenie wartości z pola input", () => {
        // Metoda clear() usuwa cały tekst z pola input
        cy.get("#search_query_top").clear();
    })
})

/// **Używanie metod z commands.js**
describe("E2E - Akcja wpisywania z commands.js", () => {
    it("Wpisywanie wartości w pole", () => {
        cy.visit("/")
        cy.searchPhrase("Nowy tekst{backspace}",1200)
        })

    it("Czyszczenie wartości z pola input", () => {
        cy.get("#search_query_top").clear();
    })
})
