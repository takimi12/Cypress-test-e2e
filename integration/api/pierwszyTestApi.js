// ///// <reference types="cypress" />


//1. wchodzimy w headers i patrzymy na fetch/xmr i klikamy tego, ktory dostarcza nam dane
//1.1 potem przechodzimy do zakladki header i kopiujemy wartość z requestURL

describe("E2E- Test Api", ()=> {
    it("Weryfikacja tagów API", () => {
        // podajemy metodę jakiej chcemy uzyc do przechwytywania, a nastepnie adres
        // nastepnie dodajemy alias, która bedzie przechowywac tego requesta pod tą nazwą
        cy.intercept("GET", "https://api.realwordl.io/api/tags").as("requestTag")
        cy.visit("https://angular.realworld")
        // CZEKAMY AZ REQUEST SIE WYKONA
        cy.wait("@requestTag")
            cy.get("@requestTag").then(res => {
            // sprawdzamy w konsoli, co zwraca res i odwolujemy się do response, a następnie statusCode i chcemy sprawdzic
            // czy jest status 500
            expect(res.response.statusCode).to.equal(200)
            // sprawdzamy w konsoli, co zwraca res i odwolujemy się do response, a następnie body i tags
            expect(res.response.body.tags).to.contain("welcome").and.to.contain("implementations")
        })
    })
    it("Niepoprawne logowanie", () =>{
        cy.intercept("POST", "https://api.realworlds.io").as("requestLogin")
        cy.get("a.nav-link").contains("Sign in").click()

        // metoda login jest dodana do command
        cy.login("test123@test.pl","12345@")
        cy.wait("@requestLogin")
        cy.get("@requestLogin").then(res => {
            console.log(res)
            expect(res.response.statusCode).to.equal(403)
        // cypres domyślnie wie, ze nasze zasoby sa w folderze fixtures,
        // wiec nie musimy tego podawac i podajemy bezposrednia nazwe skad to ma byc brane
        // po pobraniu danych z examplu nastepnie zapisujemy je do zmiennej data
        // jesli pobierzesz example, nastepnie wykonaj then, zapisz do zmiennej data
        // nastepnie podstaw tę zmienną
            cy.fixture("example").then(data => {
                expect(res.response.statusMessage).to.equal(data.statusMessage403)
            })
        })
    })



})




describe("E2E - Testy API", () => {
    // chcąć uzywac fiztures w kilku miejscach bedziemy korzystać z hooka beforeEach
    // ktory przed wszystkimi testami zapisze nam dane do jakiejś zmiennej

    // chcąc uzywac beforeEach globalnie, to w zadnym przypadku nie mozemy uzywac funkcji strzlakowej
    beforeEach(function() {
        cy.fixture("example").then(data => {
            this.daneApi = data;
        })
    })


    // #1.
    it("Weryfikacaj tagów API", () => {
        // metoda intercept słuzy do przechwytywnia requestow
        // pierwszy argument to wybranie metody do przechwytywania
        // drugi argument do adres requesta z zakladki network
        // dodatkowo dodajemy alias
        // alias to zmienna która będzie nam przechowywać tego requesta
        cy.intercept("GET", "https://api.realworld.io/api/tags").as("requestTag")
        // ale ten request wykona się dopiero na konkretnej stronie apliakcji
        cy.visit("https://angular.realworld.io/")
        // jeśli otworzymy tę stronę z angularem, to następnie czekamy, az ten request sie wykona podając jego alias
        cy.wait("@requestTag")
        // pobieramy request na podstawie jego aliasu
        cy.get("@requestTag").then(res => {
            // sprawdzamy w konsoli, co zwraca res i odwolujemy się do response, a następnie statusCode i chcemy sprawdzic
            // czy jest status 500
            expect(res.response.statusCode).to.equal(200)
            // sprawdzamy w konsoli, co zwraca res i odwolujemy się do response, a następnie body i tags
            expect(res.response.body.tags).to.contain("welcome").and.to.contain("implementations")
        })
    })

    it("Niepoprawne logowanie", () =>{
        cy.intercept("POST", "https://api.realworlds.io").as("requestLogin")
        cy.get("a.nav-link").contains("Sign in").click()
        // metoda login jest dodana do command
        cy.login("test123@test.pl","12345@")
        cy.wait("@requestLogin")
        cy.get("@requestLogin").then(res => {
            console.log(res)
            expect(res.response.statusCode).to.equal(403)
        // cypres domyślnie wie, ze nasze zasoby sa w folderze fixtures,
        // wiec nie musimy tego podawac i podajemy bezposrednia nazwe skad to ma byc brane
        // po pobraniu danych z examplu nastepnie zapisujemy je do zmiennej data
        // jesli pobierzesz example, nastepnie wykonaj then, zapisz do zmiennej data
        // nastepnie podstaw tę zmienną
            cy.fixture("example").then(data => {
                expect(res.response.statusMessage).to.equal(data.statusMessage403)
            })
        })
    })

    /// niepoprawne logowanie w przypadku ze skorzystania z beforeAll
    // wewnatrz testu ktory korzysta z before each tez mmusi byc funkcja zwykla

    it("Niepoprawne logowanie", function(){
        cy.intercept("POST", "https://api.realworlds.io").as("requestLogin")
        cy.get("a.nav-link").contains("Sign in").click()
        cy.login("test123@test.pl","12345@")
        cy.wait("@requestLogin")
        cy.get("@requestLogin").then(res => {
            console.log(res)
            expect(res.response.statusCode).to.equal(403)
        // cypres domyślnie wie, ze nasze zasoby sa w folderze fixtures,
        // wiec nie musimy tego podawac i podajemy bezposrednia nazwe skad to ma byc brane
        // po pobraniu danych z examplu nastepnie zapisujemy je do zmiennej data
        // jesli pobierzesz example, nastepnie wykonaj then, zapisz do zmiennej data
        // nastepnie podstaw tę zmienną
        expect(res.response.statusCode).to.equal(403)
        expect(res.response.statusMessage).to.equal(this.daneApi.statusMessage403)

        })
    })


    // Mockowanie


    // tutaj otrzymujemy te tagi, które płyną  z serwera
    it("Poprawne logowanie", function() {
        cy.intercept("GET", "https://api.realworld.io/api/tags").as("requestTag")

        // na podstawie poprzedniego ita jestesmy juz na stronie logowania
        // wiec nie musimt klikac w zakladke

        // wykorzystujemy naszą globalną metodę logowania, którą stowrzyliśmy w pliku commands

        cy.login("rafal-podraza@test.pl", "rafalpodraza@")
        cy.wait("@requestTag")
    })

     // tutaj  mockujemy tagi
     // w folderze fixtures, tworzymy plik tags.json i wstawiamy tam nasze wlasne tagi

     it("Poprawne logowanie", function() {
        // jak ju uzyjemy metody get na podanym adresie to chcemy zmockowac
        // i po wykorzystaniu tych metod w miejscu domyslnych tagow na stronie, bedzimemy podstawiac pod requesta 
        // dane z fixture
        cy.intercept("GET", "https://api.realworld.io/api/tags", {fixture:'tags.json'}).as("requestTag")

        // na podstawie poprzedniego ita jestesmy juz na stronie logowania
        // wiec nie musimt klikac w zakladke

        // wykorzystujemy naszą globalną metodę logowania, którą stowrzyliśmy w pliku commands

        cy.login("rafal-podraza@test.pl", "rafalpodraza@")
        cy.wait("@requestTag")
    })
})

