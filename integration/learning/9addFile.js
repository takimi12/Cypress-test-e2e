///// <reference types="cypress" />

// Opisuje grupę testów dla wgrywania pliku
describe("E2E - Wgrywanie pliku", () => {  
    // Definiuje pojedynczy test wgrywania pliku w sekcji "Contact Us"
    it("Wgrywanie pliku do inputa w contact us", () => {  
        // Otwiera stronę kontaktową aplikacji
        cy.visit("/index.php?controller=contact")  

        // Wybiera input do przesyłania plików i załącza plik "dog.png" z katalogu "fixtures"
        cy.get("#fileUpload").attachFile("../fixtures/dog.png")  

        // Sprawdza, czy wyświetla się nazwa załączonego pliku "dog.png"
        cy.get("span.filename").should("contain", "dog.png")  
    })  
})
