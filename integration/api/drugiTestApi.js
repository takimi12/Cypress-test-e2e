///// <reference types="cypress" />

/// mozeny przetestować endpointa do wysylania danych poprzez wyslanie na niego okreslonych danych z postmana
/// w odpowiedzi dostaniemy błąd, bo nie dalismy tokenu
/// trzeba w postmanie przejść do authorization, wkleić flagę authorization i wkleić token, który mamy  w headers, request headers
// token jest unikalnie generowany przy kazdym logowaniu





describe("Wykonywanie zapytania bezpośrednio do APi", () => {
  
    beforeEach(function() {
        cy.fixture("example").then(data => {
            this.daneApi = data;
        })
    })

    it("Autoryzacja + Dodawanie nowego artykułu", () => {
       
       ///////
       // KROK2
       
        const daneAutoryzacja = {
            "user": {
                    "email": "rafal-podraza@test.pl",
                    "password":"rafalpodraza@"
                
            }
        }

        /// KONIEC KROKU 2
        /////


        /// W KROKU 3
        const daneArtykul = {
            "article":{
                "tagList":[],
                "title":"test tytul bezposrendio z API",
                "description":"test",
                "body":"test"
            }
        }
        ///
        
        //////
        // KROK 1
        
        // przygotowanie requesta do logowania
        // jesli chcemy coś robić po stronie backendu bez uzycia frontendu
        // nie bedziemy uzywac intercept
        // intercept słuzy do przechwytywania requestow ktore sa na froncie naszym
        // a jak chcemy bezposrednio do api, to uzywamy
        cy.request("POST", "https://api.realworld.io/api/users/login")
        /// KONIEC KROKU 1
        /////////

        //// KROK3 
        
        .its("body").then(res =>{
          const authToken = res.user.token;
        
          cy.request({
            method:"POST",
            url:"https://api.realworld.io/api/articles/",
            body:daneArtykul,
            headers:{
                'Authorization':'Token ' + authToken
            }
          }).then(res =>{
            expect(res.status).to.equal(200)
          })
        })
    })

})


