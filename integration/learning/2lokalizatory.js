/// <reference types="cypress" />

describe("e2e - Home Page", () => {
    it("should open home page - automationpractise", () => {
        cy.visit("/")
        
        // pobieranie po znaczniku anchor
        cy.get("a")

        // pobieranie po identyfikatorze id z htmla
        cy.get("#search_query_top")

        // po klasie
        cy.get(".form-control")

        // po atrybutach
        cy.get('[name="search_query"]')
        cy.get('[placeholder="search"]')

        // dokładniejszy atrybut wraz z podaniem znacznika
        cy.get('input[placeholder="Search"]')

        // pobranie elementów po kilku atrybutach
        cy.get('img[src="http://automationpractise.com/modules/themeconfigurator/img/banner-img6.jpg"][width="381"]')

        // zalecana praktyka pobierania elementów 
        cy.get('[data-cy="wyszukiwarka"]')
    })

    // Wykona się tylko ten test, bo użyto `.only`
    it.only("Lokalizatory część", () => {
        cy.visit("/")

        // pozwala pobrać po tekście
        cy.contains("Shop now")

        // pobieranie po tytule elementu, gdy na stronie jest więcej takich samych elementów
        cy.contains('[title="Contact us"]', 'Contact us')

        // znajdowanie `li`, którego rodzic to `#home-page-tabs`, a następnie wybór konkretnego `li`
        cy.get("li").parents("#home-page-tabs").find("li").eq(1)

        // alternatywnie można wykorzystać metodę first()
        cy.get("li").parents("#home-page-tabs").find("li").first()

        // pozwoli pobrać konkretnie drugi element po tekście
        cy.get("li").parents("#home-page-tabs").find("li").contains("Best Seller")
    })
})


