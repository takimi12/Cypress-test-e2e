# Cypress-test-e2e
# Konfiguracja środowiska do testów

## 1. Inicjalizacja projektu
```sh
npm init
```
- `enter` (przy nazwie)
- `enter` (przy wersji)
- `description` (testy automatyczne Cypress)
- `enter` (entry point)
- `enter` (test command)
- `enter` (git repository)
- `cypress, kurs` (keywords)
- `tom` (author)
- `enter` (license)

## 2. Instalacja Cypress
```sh
npm install cypress@9.5.1 --save-dev
```
Po tym kroku tworzą się pliki:
- `node_modules`
- `package-lock.json`
- `package.json`

## 3. Uruchomienie Cypress
```sh
npx cypress open
```
- Określa przeglądarkę, na której otwiera się nowa przeglądarka.
- Tworzy nowy folder `cypress`.

## 4. Tworzenie skryptu w `package.json`
```json
"scripts": {
  "open": "npx cypress open"
}
```
Dzięki temu możemy uruchomić Cypress za pomocą:
```sh
npm run open
```

## 5. Podstawowa konfiguracja w `cypress.json`
```json
{
  "baseUrl": "http://automationpractise.com",
  "includeShadowDom": true,
  "chromeWebSecurity": true,
  "viewportHeight": 1080,
  "viewportWidth": 1920
}
```
- `baseUrl` – podstawowy adres testowanej strony.
- `includeShadowDom` – pozwala wyszukiwać elementy w standardowym i Shadow DOM.
- `chromeWebSecurity` – umożliwia przechodzenie między stronami spoza naszej domeny.
- `viewportHeight` i `viewportWidth` – określają wysokość i szerokość przeglądarki dla testów.

Możemy ustawić:
- jakie testy będą wykluczone,
- w jakiej kolejności będą wykonywane.

## 6. Struktura folderów
- `fixtures/example.json` – plik zawierający dane stałe (np. email, hasło).
- `integration/` – foldery z podziałem na komponenty i określonymi testami.
- `plugins/` – miejsce na dodatkowe wtyczki do Cypress.
- `support/commands.js` – deklaracja globalnych komend dostępnych w testach.

---

# Uruchamianie pojedynczych testów

## 1. Usuwanie wszystkich folderów wewnątrz `integration`

## 2. Tworzenie pierwszego testu `first.js`
Na górze pliku dodajemy referencję:
```js
/// <reference types="cypress" />
```

## 3. Poprawienie `package.json`
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "cypress:open": "cypress open"
}
```

## 4. Uruchamianie testów
```sh
npm run cypress:open
```

---

# Lokalizatory
Najlepiej pobierać elementy po:
- `id`
- atrybucie `data-cy`

## 1. Struktura testów
- `describe` – grupuje testy.
- `it` – definiuje pojedynczy test.

## 2. Metody interakcji
- `cy.visit(URL)` – odwiedza stronę.
- `cy.get(selector)` – wyszukuje element po selektorze CSS.
- `cy.contains(text)` – znajduje element zawierający określony tekst.
- `cy.click()` – symuluje kliknięcie.
- `cy.type("Przykładowy produkt {enter}")` – wpisuje tekst w pole.

## 3. Metoda `.invoke()`
- `cy.get("#search_query_top").invoke("val")` – pobiera wartość pola input.
- `cy.get("#search_query_top").invoke("val").then((val) => { console.log(val) })` – pobiera wartość i umożliwia jej dalszą manipulację.

| Użycie                 | Jak działa?                                                | Kiedy stosować?                                 |
|------------------------|----------------------------------------------------------|------------------------------------------------|
| `invoke()` samodzielnie | Pobiera wartość i używa jej bezpośrednio (np. w `should`). | Gdy chcemy od razu porównać wynik.            |
| `invoke()` z `then()`   | Pobiera wartość i pozwala na manipulację.                | Gdy wynik ma być użyty do dalszej logiki.     |

---



| Metoda                                                        | Co robi?                                                                 | Kiedy używać?                                                       |
|---------------------------------------------------------------|--------------------------------------------------------------------------|--------------------------------------------------------------------|
| `.find("input")`                                              | Pobiera wszystkie `<input>` wewnątrz wskazanego elementu.               | Gdy chcesz manipulować dziećmi danego elementu.                    |
| `.find("input").then(checkbox => { ... })`                     | Pobiera wszystkie `<input>` i przekazuje je do funkcji strzałkowej dla dalszych operacji. | Gdy chcesz wykonać kilka operacji na wielu checkboxach.            |
| `.eq(1).check({ force: true })`                                | Pobiera drugi checkbox i zaznacza go, nawet jeśli jest ukryty.          | Gdy musisz zaznaczyć konkretny checkbox, który może być zasłonięty. |
| `.eq(0).check().invoke("prop", "checked").then(...)`           | Pobiera pierwszy checkbox, zaznacza go, a potem sprawdza czy jest faktycznie zaznaczony. | Gdy chcesz potwierdzić, że operacja `check()` rzeczywiście zadziałała. |





# Jak działa `.select()`?

## Podstawowe użycie
Metoda `.select()` wybiera opcję w liście rozwijanej `<select>`, wskazując jej wartość (czy to przez tekst, czy przez wartość `value`).

---

## Metoda `cy.wrap()`
W Cypressie metoda `cy.wrap()` jest używana do "owijania" obiektu, który nie jest jeszcze obiektem Cypressa (np. zwykły element DOM lub obiekt zwrócony z innej metody) w obiekt Cypress. Dzięki temu możemy manipulować nim, używając metod Cypressa.

---

## Kluczowe cechy `.then()`
- **Dostęp do wyników poprzednich komend**: `.then()` pozwala uzyskać dostęp do wyniku, który został zwrócony przez poprzednią komendę Cypressa. Może to być obiekt DOM, tekst, tablica czy inne dane.
- **Przetwarzanie asynchroniczne**: `.then()` pozwala kontynuować operacje po zakończeniu wcześniejszych akcji, co umożliwia łańcuchowanie operacji.
- **Wykonywanie niestandardowego kodu**: `.then()` pozwala na wykonanie niestandardowego kodu JavaScript operującego na obiekcie zwróconym przez poprzednią komendę.

---

## Metoda `cy.on()`
`cy.on()` pozwala nasłuchiwać zdarzeń w oknie przeglądarki, takich jak alerty i okna potwierdzenia. Możemy przechwytywać te zdarzenia i reagować na nie.

```js
cy.on("window:confirm", tresc => {
    expect(tresc).to.equal("Zaakceptuj aby kontynuować")
})
```
Powyższy kod nasłuchuje zdarzenie `window:confirm`, czyli pojawienie się okna potwierdzenia (`confirm()`) w przeglądarce.

---

## Przesyłanie plików
```js
// Wybiera input do przesyłania plików i załącza plik "dog.png" z katalogu "fixtures"
cy.get("#fileUpload").attachFile("../fixtures/dog.png")  

// Sprawdza, czy wyświetla się nazwa załączonego pliku "dog.png"
cy.get("span.filename").should("contain", "dog.png") 
```

---

## Najechanie na element
Aby skupić uwagę na elemencie, używa się metody `trigger()`, wywołując np. `mouseenter`, `focus` lub `scroll`.

```js
cy.get(`a[title="Dresses"]`).eq(1).trigger("focus")
```

---

## Skrolowanie do elementu
```js
it("skrolowanie do boxa specials", () => {
    // Przesuwa widok do pierwszego elementu z atrybutem title='specials'
    cy.get("a[title='specials']").first().scrollIntoView();
})
```

---

## Asercje
### Dlaczego `expect()` i `should()` to asercje?
- **`should()`** — stosuje asercję do wybranego elementu i automatycznie ponawia sprawdzenie, jeśli element nie spełnia warunku od razu.
- **`expect()`** — używane wewnątrz `.then()` do sprawdzenia wartości w sposób bardziej elastyczny.



--------------------------------------------
# PAGE OBJECT MODEL

## 1. Co to jest Page Object Model?

Page Object Model (POM) to sposób pisania testów, w którym każdy test aplikacji przedstawiamy jako Page Object. 

Pozwala to na przechowywanie deklaracji selektorów w jednym miejscu, co ułatwia zarządzanie zmianami w interfejsie użytkownika. 
Jeśli np. selektor ID przycisku zmieni się z `buttonId` na `buttonNewId`, dzięki wykorzystaniu POM zmiana selektora odbywa się w jednym miejscu, co ułatwia utrzymanie testów.

## 2. Przykład zastosowania

Załóżmy, że pobraliśmy lokalizator związany z polem input do logowania, a dostęp do aplikacji jest możliwy tylko po zalogowaniu się. Implementując testy, które weryfikują wyświetlanie danej frazy w panelu użytkownika, musimy wcześniej zalogować się do systemu.

Bez użycia POM w każdym teście musielibyśmy ponownie pobierać ten sam lokalizator i wywoływać metodę wpisywania wartości (np. loginu lub hasła). Problem pojawia się, gdy programista zmienia lokalizator inputa – wówczas wszystkie testy przestają działać, dopóki ręcznie nie poprawimy ich w każdym miejscu.

Jest to bardzo czasochłonne, szczególnie gdy mamy wiele testów zależnych od logowania. Stosowanie Page Object Model pozwala na umieszczenie wszystkich selektorów w jednym pliku, co sprawia, że zmiany dokonujemy tylko w jednym miejscu, a wszystkie testy automatycznie używają zaktualizowanego lokalizatora.

---------------------------------------------
# Opis użycia Page Object Model (POM)

## Tworzenie Page Object Model

Wszystkie pliki znajdują się w folderze `support`.

### 1. Struktura folderów i plików

1. W folderze `support` tworzymy folder `page-object` oraz pliki:
   - `selectPage.js`
   - `select.js`
2. Plik `selectPage.js` powstaje na podstawie `select.js`.
3. Page Object Model będzie implementowany jako klasa.

### 2. Implementacja klasy `SelectPage`

Klasa `SelectPage` będzie zawarta w pliku `selectPage.js`. 
Na początku przechowujemy identyfikator pobierany w `select.js` za pomocą `get`.

```javascript
class SelectPage {
    get select() {
        return cy.get("#selectProductSort");
    }

    selectAllOption() {
        this.select.then(select => {
            cy.wrap(select).find("option").each(opcja => {
                cy.wrap(select).select(opcja.text());
            });
        });
    }
}
export default SelectPage;
```

### 3. Wykorzystanie w `select.js`

W pliku `select.js` wykorzystujemy klasę `SelectPage`.

```javascript
import SelectPage from '../support/page-object/selectPage';

const selectPage = new SelectPage();
selectPage.selectAllOption();
```

### 4. Korzyści z użycia klasy

1. Zamknięcie metod wewnątrz klasy znacząco zmniejsza ilość kodu.
2. W przypadku zmiany nazwy selektora nie ma potrzeby modyfikowania wielu plików.
3. Page Object Model przyspiesza pracę w sytuacji zmiany lokalizatora przez programistę.

---

## Inne miejsce wykorzystania POM

### 1. Klasa `AlertPage`

Tworzymy plik `alertPage.js` w folderze:

```
support/page-object/alertPage.js
```

### 2. Porównanie metod w `alerty.js`

Plik `integration/PageObjectModel/alerty.js` zawiera porównanie:
- Implementacji funkcjonalnej
- Implementacji opartej na klasach w `alertPage.js`

Zmiana kodu w `alerty.js` na użycie klas w `alertPage.js` zwiększa czytelność i reużywalność kodu.

---

## Custom Commands

Zalecaną praktyką oprócz POM jest korzystanie z **custom commands**. 
Custom commands pozwalają wykonywać określone czynności, takie jak logowanie na konto testowe. 
Mają one dostęp do wszystkich testów w aplikacji.

### 1. Definicja Custom Command w `support/command.js`

W pliku `command.js` możemy dodawać własne komendy oraz nadpisywać istniejące komendy Cypressa.

```javascript
Cypress.Commands.add("openTshirtsTab", () => {
    cy.visit("http://automationpractise.com");
});
```

### 2. Wykorzystanie komend

1. Komenda `openTshirtsTab` będzie wykorzystywana w pliku:
   - `integration/CustomCommands/customCommands.js`
2. Możemy również tworzyć kolejne komendy w `command.js` i wykorzystywać je w:
   - `integration/CustomCommands/putandclear.js`
---------------------------------------------
# Automatyzacja API

## Rodzaje interfejsów API:

### 1. REST API
REST (Representational State Transfer) jest stylem architektury, który opiera się na komunikacji przez protokół HTTP. Wykorzystuje standardowe metody HTTP (GET, POST, PUT, DELETE) do wymiany danych w formatach takich jak JSON czy XML.

### 2. SOAP API
SOAP (Simple Object Access Protocol) to protokół, który trzyma się ściśle określonych standardów. SOAP jest zależny od systemów i języków programowania opartych na XML. Zwykle wymaga większej ilości danych do prawidłowego funkcjonowania. API SOAP zapewnia wysoki poziom bezpieczeństwa, dlatego jest często wykorzystywane w aplikacjach przeznaczonych dla instytucji finansowych.

### 3. RPC API
RPC (Remote Procedure Call) to mechanizm umożliwiający wykonywanie bloków kodu na zdalnych serwerach. RPC API były jedną z najwcześniejszych form API, wykorzystywanych do zdalnego wywoływania procedur na serwerach.

## Struktura projektu:

1. Tworzymy folder `integration/api`, który będzie zawierał pliki odpowiedzialne za integrację z API.

2. W pliku `pierwszyTestApi.js` znajduje się cała logika związana z wykonywaniem zapytań do API i testowaniem integracji.

## Przykład testowania API (Backend – Publikowanie artykułu):

### Symulowanie dodania artykułu:

1. Otwieramy stronę, na której możemy dodać artykuł.
2. Używamy zakładki **Network** w narzędziach developerskich (w przeglądarkach Chrome, Firefox itp.) i sprawdzamy, co jest wysyłane w **Headers**.
3. W zakładce **Payload** możemy zobaczyć dane, które są wysyłane do serwera w żądaniu API.
4. W **Preview** znajduje się obiekt w formacie JSON, który zawiera dane związane z artykułem.
5. W **Headers** znajdziemy m.in. token, który jest unikalnie generowany przy logowaniu i wykorzystywany do autoryzacji zapytań.
6. Otwieramy **Postmana** i konfigurujemy zapytanie do API, aby wysłać te same dane (znalezione w **Payload**) w formie JSON w **body** zapytania.
7. **Request URL** pobieramy z **Headers**, aby wiedzieć, dokąd wysłać zapytanie.

## Zastosowanie:

- **`integration/api/pierwszyTestApi.js`** – mockowanie odpowiedzi API, testowanie, jak API reaguje na zapytania.
- **`integration/api/pierwszyTestApi.js`** – wykonywanie zapytania POST w formie przesyłania danych w **body** w formacie JSON.

--------------------------------

Zaawansowane zagadnienia

Cypres domyślnie uywa przeglądarki elektron
1. uruchamianie wszystkich testow:    "all": "npx cypress run",
po egzekucji testów, wszystkie nagrania z przebiegu testów, otrzymujemy w folderze videos
chcąć nie nagrywać testów trzebac zmienić w pliku cypress.json "videos:false"
2.     "spec": "npx cypres run --spec 'cypress/integration/click.js' --headed",
chcemy uruchomic stricte jeden skrypt, parametr headed nie beda wykonywane w tle, tylko uruchomi sie przegladarka
trwa to 5 razy dluzej niz tryb headless
3.     "chrome": "npx cypres run --browser chrome --spec 'cypres/integration/klikniecie.js --headed",
chcemy wykonywac testy tylko na przegladarce chrome
4.     "firefox": "npm run spec -- --browser firefox",
to samo robimy z firefoxem
5.     "browser": "npm run spec -- --browser firefox & --browser edge",
dwie przeglądarki na raz
-----------------------------------
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "open": "npx cypress open",
    "all": "npx cypress run"
    },
1.npm run open odpali nam wszystkie tety
2.w folderze videos będą nagrania ze wszystkich testów
dodanie 
    "video":false
w cypres.json wyłączy nagrywanie
3."spec": "npx cypres run --spec 'cypress/integration/click.js'"
4.    "spec": "npx cypres run --spec 'cypress/integration/click.js' --headed" dodanie headed powoduje, ze testy nie beda sie odpalac
w trybie headless tylko odpali sie przegladarka, tryb headless jest prawie 5 razy szybszy
5.     "chrome":"npx cypres run --browser chrome --spec 'cypres/integration/klikniecie.js --headed"
chcemy uruchomic testy na chromie, a nie domyślnym elektronie
6.     "firefox": "npm run spec -- --browser firefox",
    "browser": "npm run spec -- --browser firefox & npm run spec -- --browser edge"
  odpalenie testów na samym firefox 
  odpalenie testów na firefox, a następnie na edge
---------------------------------------------
Pluginy
1. npm install --save-dev cypress-dark  
2. dodanie import 'cypress-dark' w support/index.js
3.     "theme": "dark" w cypress.json
4. npm install --save-dev @cypress-audit/lighthouse

dodanie 
const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse(), // calling the function is important
    pa11y: pa11y(), // calling the function is important
  });
};
w plugins/index.js
5. dodanie import "cypress-audit/commands"; w support/command.js
w integration/plugins/lighthouse - mamy test, który będzie to mierzyc
 6. w kolejnym kroku mozemy juz tego uzywac w testach
 ---------------------------------------------
 Env
1. w cypres.json

  "env":{
        "productionUrl": "https://gogle.com",
        "devUrl": "https://testowanie-oprogramowania.pl"
    }
wykorzystanie w testach w pliku integration/env/variables.js

2. tworzymy folder config i robimy podzial na dwa srodowiska i w tym pliku tworzymy konfiguracje produukcyjną, jednoczesnie usuwamy env z cypres.json
config/production.json
development.json

3. tworzymy pliki development.json i production.json
4. to nam tworzy podział na dwa środowiska
5. do pliku plugins/index.js trzeba dodać
// promisified fs module
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('..', 'config', `${file}.json`)

  return fs.readJson(pathToConfigFile)
}

a w module exports

 const file = config.env.configFile || 'development'

  return getConfigurationByFile(file)
  
  6. uruchamiamy
  npx cypress open --env configFile=production - srodowisko produkcyjne
  npx cypress open --env configFile=development - srodowisko deweloperskie
---------------------------------------------
https://docs.cypress.io/app/tooling/reporters
1. npm install cypress-multi-reporters mocha-junit-reporter --save-dev
2. w kolejnym kroku w cypres.json
 "reporter": "cypress-multi-reporters",
    "reporterOptions": {
      "configFile": "reporter-config.json",
    }
3. w pliku reporter-config.json
{
    "reporterEnabled": "mocha-junit-reporter",
    "mochaJunitReporterReporterOptions": {
      "mochaFile": "cypress/results/junit/results-[hash].xml"
    }
  }
  4. do package.json dodajemy
   "delete:reports": "rm cypress/results/* || true",
    "prereport": "npm run delete:reports",
  5. po uruchomieniu npm run chrome, pojawi się folder results/junit
  i tu bedą pliki w formacie xml
  6. npm install mochawesome mochawesome-merge mochawesome-report-generator 
  7. zmieniamy reporter-config.json
{
    "reporterEnabled": "mocha-junit-reporter, mochawesome",
    "mochaJunitReporterReporterOptions": {
      "mochaFile": "cypress/results/junit/results-[hash].xml"
    },
    "reporterOptions":{
        "reporterDir": "cypress/results/mochawesome",
        "overwrite":false,
        "html":false,
        "json":true
    }
  }
  8. odpalamy npm run chrome i w folderze results powinien się zrobić folder mochawesome
  9. dodajemy skrypt w scripts     "mochawesome:merge": "npx mochawesome-merge \"cypress/results/*.json\" > mochawesome.json"
  10. po uruchomieniu skryptu z plików w folderze mochawesome powstał jeden mochawesome.json
  11. kolejnym krokiem jest npx merge mochawesome.json, ktory wszystko przedstawi w formacie html
  do package.json dodajemy     "mochawesome:html": "npx marge mochawesome.json"
  12. tworzymy skrypt , aby po kazdej egzekucji testu robic to wszystko automatycznie    
  "full:test": "npm run delete:reports && npm run chrome && npm run mochawesome:merge && npm run mochawesome:html"
---------------------------------------------
  shadow dom
  1. Shadow dom pozwala tworzyć poddrzewa DOM stron internetowych z dodaatkowymi elementami.
  Mogą nimi być obrazki,przyciski, odtwarzacze, inputy.
  2. Zaletą shadow dom, jest niezaleznosc elementów w shadow dom od czesci DOM. 
  3. W rezultacie daje to niezaleznosci styli css czy wykonywanego kodu js
4. Chcąc odwołać sie do shadow domu, trzeba najpierw znaleźć shadow-root i odwolowac sie do pierwszego elementu przed nim
  5. 
  w cypress.json
  mozemy ustawic
  "includesShadowDom": false,
- jesli jest na false, oznacza to, ze w testach musimy uzywac metody shadow

test do tego segmentu znajduje się w integration/shadowDom/shadoDom.js
---------------------------------------------
Cypres dashboard 
1. zwiększa szybkość wykonywania naszych testów zapewniajac jednoczesnie pelny wglad w testy
2. Dzięki równoległemu wykonywaniu testów, mozemy przyspieszyc czas egzekucji
3. cypress dashobard daje dostęp do video z testow
4. mamy latwy sposob integracji z continous integrations $ continous deployment jenkins, travis, docker
--------------------
1. zakladamy konto na cypress
2. po aktywacji konta wprowadzamy informacje w cypress dashboard
3. nastepnie trzeb to podpiąć z naszym projektem
4. przechodzimy do terminala i wpisujemy npm run open, otwiera się okno konfiguracji i klikamy zakladkę runs
6. bedziemy sie musieli zalogowac
7. w okienku od cypressa pojawiwa sie widok, ktory pozwala stworzyc projekt
8. jesli to poprawnie sie zrealizuje bedziemy miec automatycznie dodane productid do cypress.json
9. trzeba skopiowac parametry uruchomieniowie w record do skryptow uruchomieniowych
---------------------
Wirtualna regresja (virtual regression) w Cypress to technika testowania, która pozwala na symulowanie i testowanie różnych scenariuszy bez konieczności
 rzeczywistego wywołania lub zmiany stanu aplikacji.

Kluczowe cechy wirtualnej regresji w Cypress to:

Symulacja żądań sieciowych


Przechwytywanie żądań HTTP/API
Podawanie sztucznych odpowiedzi bez rzeczywistego wywołania serwera
Kontrola nad scenariuszami odpowiedzi


Zalety tej techniki


Możliwość testowania różnych scenariuszy bez zależności od backend
Szybsze i bardziej przewidywalne testy
Symulacja błędów i nietypowych sytuacji
Eliminacja wpływu środowiska produkcyjnego


Główne metody


cy.intercept() do przechwytywania żądań
Definiowanie sztucznych odpowiedzi
Dynamiczne modelowanie zachowań systemu

Wirtualna regresja pozwala testerom na kompleksowe sprawdzenie aplikacji w izolacji, symulując różne warunki bez ingerencji w rzeczywisty system.
Kluczowe korzyści obejmują:

Niezależność testów od zewnętrznych systemów
Możliwość symulacji różnych scenariuszy, w tym skrajnych przypadków
Większa przewidywalność i powtarzalność testów
Szybsze przeprowadzanie testów bez czekania na rzeczywiste odpowiedzi serwera
---------------------
Implementujac testy czasami sytuacja bedzie wymagac specjalnegp proxy, które pozwoli ograniczyc ruch plynacy z jednego adresu ip

W konfiguracji proxy przy użyciu Cypress chodzi o to, jak skonfigurować środowisko testowe, aby Cypress mógł przekazywać żądania HTTP przez serwer proxy. Jest to szczególnie przydatne, 
jeśli twoje testy muszą być przeprowadzane w środowisku, które jest za zaporą lub w którym dostęp do internetu jest kontrolowany przez serwer proxy.

W konfiguracji proxy dla Cypress można ustawić różne opcje, które umożliwiają kontrolowanie, jak Cypress komunikuje się z zewnętrznymi usługami. Istnieje kilka podejść:

1. Konfiguracja w cypress.json
Możesz dodać ustawienia proxy w pliku konfiguracyjnym cypress.json. Jednak sam Cypress nie ma wbudowanego wsparcia do ustawiania proxy bezpośrednio w cypress.json, więc musisz wykorzystać zewnętrzne narzędzia lub środowisko, aby ustawić proxy.

2. Ustawienie zmiennych środowiskowych
Możesz skonfigurować zmienne środowiskowe w systemie lub w skryptach, aby określić proxy. Dla większości aplikacji używających Node.js (tak jak Cypress), możesz ustawić zmienne środowiskowe dla proxy:



---------------------------------------------
Test retries
1. ile razy test negatywny, ma się razy powtórzyć
2. jest przydatny w przypadku róznych nieprzewidzianych zdarzeń
np. brak internetu
w cypress.json ustawiamy
    "retries":{
      "runMode":2,
      "openMode":0
    }
- run mode określa nam jak liczba powtórzeń danego negatywnego testu, który jest 
uruchamiany za pomocą polecenie cypress run 
- open mode ilosc powtorzen negatywnego testu, uruchamianego za pomoca cypres open
---------------------------------------------
Wzorzec singleton
1. 1 klasa będzia miała tylko jedną instancję, a dostęp do niej będzie globalny w obrębie programu
2. Czasami istenieje potrzeba aby ograniczyć liczbę instancji danej klasy w programie, na przykład gdy chcemy
kontrolować dostep do zasobow
3. Singleton zapewnia globalny punkt dostępu do danej instancji, eliminujac potrzebę wielokrotnego tworzenia obiektó∑
4. Zapewnia spójność danych, gdyz odpowiada za zarządzanie współdzielonymi danymi
5. Poprawi architekture aplikacji poprzez kontrolowanie dostępu do instancji klasy oraz zminimalizowanie
duplikowanych niepotrzebnych obiektów i to moze sie przycznic do bardziej skalowanej i latwiejszej w utrzymaniu
architektury aplikacji
6. Klasa Singleton
-prywatny konstruktor, aby uniemoliwić tworzenie instancji klasy przez inne klasy
-prywatne statyczne pole przechowujące jedyną instancję klasy
-publiczna statyczna metoda zwracająca instancję klasy. Jeśli instancja jeszce nie istnieje, zostanie utworzona
7. Zastowania
- dostęp do zasobów współdzielonych. Singleton moze byc uzywany do zarzadzania dostepem do wspolnych zasobow,
takich jak polaczenia baz danych czy obiekty konfiguracyjne
- klasy narzędziowe. Często uzywane narzedzia, takie jak logger czy menedzer sesji, moga byc zaimplementowane  jako singletony
- kontrola nad instacjami, gdy potrzebujemy ograniczyc liczbe instancji danej klasy w aplikacji, singleton jest dobrym wyborrem
------------------------------------
do ponownego sprawdzenia w dzialaniu z otwieraniem okna cypresa:
1.invoke
2.checkbox
3.putandclear
6.alerty
8.trigger  i zobaczyć co realnie mozna tu zrobić
9.page object model i pisanie klas vs funkcje i zobaczyc jak to dziala na alertach i  i selekcie
10. zobaczyć jak sie pisze wlasne komendy w custom commands i jak sie tego uzywa w customcommands i putandclear - mozna
uzywac bez importow w systemie
 
ogarnąć działanie this, na przykladzie             this.daneApi = data;
,z pliku  integration/api/pierwszytestyapi i porównać działanie niepoprawne logowanie 2 przyklady

11. mockowanie tagów
12. wykonywanie zapytania post i mockowanie danych na backendzie
--------------------------------------------

# Zadania praktyczne - Cypress

## Zadanie 1: Podstawowa nawigacja i asercje 

Napisz test e2e, który:

1. Wejdzie na stronę "https://example.cypress.io"
2. Sprawdzi czy tytuł strony zawiera słowo "Cypress"
3. Znajdzie link zawierający tekst "get" i kliknie go
4. Zweryfikuje czy URL zawiera "/commands/querying"




## Zadanie 2: Testowanie formularza logowania 

Stwórz test e2e dla formularza logowania, który:

1. Wejdzie na stronę logowania
2. Wypełni pole email (input z klasą '.email')
3. Wypełni pole hasło (input z klasą '.password')
4. Zaznaczy checkbox "Zapamiętaj mnie"
5. Kliknie przycisk submit
6. Sprawdzi czy użytkownik został przekierowany na dashboard ('/dashboard' w URL)
7. Zweryfikuje czy na stronie pojawił się element z klasą '.welcome-message'

Przykładowa struktura HTML formularza:

```html
<form class="login-form">
  <input type="email" class="email" placeholder="Email" />
  <input type="password" class="password" placeholder="Hasło" />
  <label>
    <input type="checkbox" class="remember-me" />
    Zapamiętaj mnie
  </label>
  <button type="submit">Zaloguj</button>
</form>
```

## Zadanie 3: Testowanie formularza rejestracji z walidacją  

Napisz test e2e dla formularza rejestracji, który:

1. Wejdzie na stronę rejestracji
2. Spróbuje wysłać pusty formularz i sprawdzi komunikaty błędów
3. Wypełni formularz nieprawidłowymi danymi (np. za krótkie hasło) i sprawdzi komunikaty
4. Wypełni formularz prawidłowymi danymi:
   - Imię i nazwisko
   - Email
   - Hasło (min. 8 znaków)
   - Potwierdzenie hasła
5. Sprawdzi czy rejestracja się powiodła (przekierowanie na stronę sukcesu)

## Zadanie 4: Testowanie koszyka zakupowego 

Stwórz test e2e dla koszyka zakupowego, który:

1. Zaloguje użytkownika do sklepu
2. Przejdzie do kategorii produktów
3. Doda 2 różne produkty do koszyka
4. Sprawdzi czy licznik produktów w koszyku się zaktualizował
5. Przejdzie do koszyka
6. Zweryfikuje:
   - Czy dodane produkty są w koszyku
   - Czy ceny są prawidłowe
   - Czy suma jest poprawnie obliczona
7. Usunie jeden produkt i sprawdzi aktualizację sumy


## Zadanie 5: Testowanie z mockowaniem API 

Napisz test e2e, który będzie testował listę produktów z mockowaniem odpowiedzi API:

1. Przygotuj mock odpowiedzi API z listą produktów
2. Nasłuchuj na request do API produktów 
3. Zwróć przygotowanego mocka
4. Sprawdź czy:
   - Lista produktów się wyświetliła
   - Każdy produkt ma nazwę, cenę i przycisk "Dodaj do koszyka"
   - Liczba wyświetlonych produktów zgadza się z mockiem

# moje - przechwytywanie requesta

1. Przechwyc odpowiedź  z api z listą produktów
2. Nasłuchuj na request do API produktów
3. Odbierz rzeczywistą odpowiedź API
4. Sprawdź czy:
   - Lista produktów się wyświetliła
   - Każdy produkt ma nazwę, cenę i przycisk "Dodaj do koszyka"
   - Liczba wyświetlonych produktów zgadza się z mockiem


# moje - niepoprawne logowanie
1. Napisz testy, który poda niepoprawne dane do logowania i kliknie zaloguj się
2.  w custom command dodaj metodę, która będziee słuzyła do logowania się 
3. przechwyć request związany z logowaniem
4. zweryfikuj czy status błędu wynosi 403
5. zwryfikuj czy status message === forbidden
6. w fixtures stwórz zmienną, którą podstawisz do której  status message, a następnie wykorzystaj ją
w teście zapisująć ją w zmiennej wspoldzielonej


Przykład mockowania odpowiedzi:

```typescript
cy.intercept("GET", "/api/products", {
  statusCode: 200,
  body: {
    products: [
      { id: 1, name: "Produkt 1", price: 99.99 },
      { id: 2, name: "Produkt 2", price: 149.99 },
    ],
  },
}).as("getProducts");
```

## Zadanie 6: Testowanie procesu rezerwacji hotelu

Stwórz test e2e dla procesu rezerwacji hotelu, który został zrobiony w poprzednich zestawach zadań



## Zadanie 7: Testowanie filtrowania i sortowania 

Napisz test e2e dla listy produktów z funkcjami filtrowania i sortowania, który:

1. Wejdzie na stronę z listą produktów
2. Przetestuje filtry:
   - Wybierze kategorię  
   - Ustawi zakres cenowy używając dwóch suwaków 
   - Zaznaczy checkbox "Tylko dostępne" 
   - kilknie na wyszukaj 
   - wybierze cenę rosnąco 
3. Zweryfikuje czy:
   - Lista produktów została odfiltrowana
   - Wszystkie wyświetlone produkty spełniają kryteria filtrowania
4. Przetestuje sortowanie:
   - Po cenie (rosnąco i malejąco)
   - Po nazwie (alfabetycznie)
   - Po popularności
5. Sprawdzi czy kolejność produktów jest prawidłowa po każdym sortowaniu




## Zadanie 8: Testowanie infinite scroll [front zrobiony]

Stwórz test e2e dla listy z infinite scroll, który:

1. Wejdzie na stronę z listą elementów
2. Zamockuje trzy różne odpowiedzi API dla kolejnych stron

```typescript
cy.intercept("GET", "/api/items?page=1", { fixture: "page1.json" }).as(
  "getPage1"
);
cy.intercept("GET", "/api/items?page=2", { fixture: "page2.json" }).as(
  "getPage2"
);
cy.intercept("GET", "/api/items?page=3", { fixture: "page3.json" }).as(
  "getPage3"
);
```
1. Wejdzie na stronę z listą elementów
2. Zamockuje trzy różne odpowiedzi API dla kolejnych stron
3. Zasymuluje scroll do końca strony trzy razy
4. Sprawdzi czy:
   - Nowe elementy zostały załadowane
   - Nie ma duplikatów
   - Loader jest wyświetlany podczas ładowania
   - Po załadowaniu wszystkich elementów pojawia się komunikat "Koniec listy"

## Zadanie 9: Testowanie edycji profilu użytkownika 

Napisz test e2e dla funkcjonalności edycji profilu, który:

1. Zaloguje użytkownika 
2. Przejdzie do strony edycji profilu 
3. Przetestuje:
   - Zmianę avatara (upload pliku) 
   - Edycję danych osobowych 
   - Zmianę preferencji powiadomień 
   - Zmianę hasła  
4. Zweryfikuje czy:
   - Dane zostały zaktualizowane w UI 
   - Odpowiednie komunikaty sukcesu są wyświetlane 
   - Po odświeżeniu strony zmiany są nadal widoczne 
5. Przetestuje walidację:
   - Próba zapisu nieprawidłowego formatu zdjęcia 
   - Próba zmiany hasła na za krótkie 
   - Próba użycia nieprawidłowego formatu email 

## Zadanie 10: Testowanie współdzielenia danych między testami 

Stwórz zestaw testów wykorzystujących współdzielenie danych, który:

1. W pierwszym teście:
   - Stworzy nowy post na blogu 
   - Zapisze ID posta do zmiennej współdzielonej

2. W drugim teście:
   - Użyje zapisanego ID do edycji posta 
   - Zweryfikuje czy zmiany zostały zapisane 

3. W trzecim teście:
   - Użyje zapisanego ID do usunięcia posta
   - Sprawdzi czy post został usunięty
4. Na koniec:
   - Wyczyści wszystkie utworzone dane testowe 
   - Zweryfikuje czy cleanup się powiódł 
----------------------------------------------------
Zadania dla siebie na przyszłość do lepszego poprawienia znajomości cypres

1. mockowanie odpowiedzi z API
2. przechwytywanie requesta
3. tworzenie własnych custom command
4. tworzenia własnych custom commands z ucyiem klas
5. Wykorzystanie zmiennych środowiskowych Cypressa do współdzielenia danych między testami
6. Wykorzystanie `cy.fixture()` do przygotowania danych testowych
7. Cleanup po testach używając `after()` lub `afterEach()`

