///// <reference types="cypress" />

import selectPage from "../../support/page-object/selectPage"

describe("E2E - Akcje wybrania opcji selekt", () => {
    it("Wybranie opcji", () => {
        cy.visit('/index.php/iD_category=3&controller=category#/')
        // wybieranie opcji w selekcie po nazwie
        cy.get("#selectProductSort").select("In stock")
        // po value
        cy.get("#selectProductSort").select("price:asc")
        // po indeksach
        cy.get("#selectProductSort").select(7)
    })
    
    it.only("Wybieranie wszystkich opcji", () =>{
        cy.visit('/index.php/iD_category=3&controller=category#/')
      // wybieranie opcji w selekcie po nazwie
      cy.get("#selectProductSort").then(select => {
        // znalezienie w selekcie wszystkich znaczników z tagiem option
       
        cy.wrap(select).find("option").each(opcja => {
        // do znajdowania innych znacznikow wewnatrz rodzica
        // na kazdym option (each rozbija na kazda osobna opcje)
            cy.wrap(select).select(opcja.text())
                // nastąpenie jak będziemy mieć tę opcję,
                // następnie wybieramy (select) , a nastepnie wykonujemy na niej
                // metode text z jquery
          
        })
      })
    })

    /// to samo co wyzej tylko z importem i uzyciem klasy
    
    it.only("Wybieranie wszystkich opcji", () =>{
        cy.visit('/index.php/iD_category=3&controller=category#/')
        selectPage.selectAllOption();
    })



    
})