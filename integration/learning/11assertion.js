///// <reference types="cypress" />

//Słowo asercja (ang. assertion) w kontekście testów oznacza sprawdzenie, czy dany warunek jest spełniony.

//Dlaczego expect i should to asercje?
//should() — stosuje asercję do wybranego elementu i automatycznie ponawia sprawdzenie, jeśli element nie spełnia warunku od razu.
//expect() — używane wewnątrz then() do sprawdzenia wartości w sposób bardziej elastyczny.


describe("E2E - Asercje", () => {
    it("Asercje expect and should", () => {
        cy.visit('/')
        //Weryfikacja czy zakladka  zawiera tekst
        cy.get('a[title="Contact uS"]').should("contain", "Contact us")
        cy.get('a[title="Contact uS"]').then(zakladka => {
            expect(zakladka).to.contain("Concact us")
        })

        // Weryfikowanie czy nie zawiera tekstu
        // zakladka zawiera contact us, dlatego wynik będzie negatywny
        cy.get('a[title="Contact uS"])').should("not.contain", "Contact us")
        // wpisanie cokolwiek innego daje wynik pozytywny
        cy.get('a[title="Contact uS"])').should("not.contain", "Cokolwiek")

        // tutaj tez wynik bedzie pozytywny
        cy.get('a[title="Contact uS"])').then(zakladka => {
            expect(zakladka).not.to.contain("asda us")
        })

        // weryfukacja czy znacznik posiada klase
        cy.get("#search_query_top").should("have.class", "form-control")
        cy.get("#search_query_top").then(wyszukiwarka =>
            expect(wyszukiwarka).to.have.class("form-control"))

        // czy element jest widoczny
        cy.get("#search_query_top").should("be.visible");
        
        // czy element nie jest widoczny
        cy.get("#search_query_top").should("not.be.visible");
    // czy element jest widoczny za pomocą expect
        cy.get("#search_query_top").then(wyszukiwarka =>
            expect(wyszukiwarka).to.be.visible)

        //weryfikacja ilość pobranych elementów
        cy.get("ul.sf-menu").find("li").should("have.length", 14)   
        //weryfikacja ilość pobranych elementów
        cy.get("ul.sf-menu").find("li").then(zakladki => {
            expect(zakladki).to.have.length(14)
        })

        // Weryfikacja wartości css danego elementu
        cy.get("#search_query_top").should("have.css", "line-height", "45px")
        cy.get("#search_query_top").then(wyszukiwarka => {
            expect(wyszukiwarka).to.have.css("line-height","45px")
        })

    })
})