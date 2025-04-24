/// <referencje types="cypres" />






describe("e2e - Home Page", () => {
//     it("task1 should open home page - automation practice", () => {
//         cy.visit("https://example.cypress.io")
//         cy.title().should('include', 'Cypress')
//         // 1. sposob
//         cy.contains('get').click()
//         // 2. sposob
//         // cy.contains('a', 'get').click()
//         cy.url().should('include', '/commands/querying')
//     })

//     it("task 2 should enter to the login form", () => {
//         cy.visit("http://localhost:3000/login");
//         cy.get('.email').type('John@john.pl');
//         cy.get('.password').type('John');
//         cy.get('#rememberMe').click();
//         cy.get('button[type="submit"]').click();
//         cy.url().should('include', '/dashboard');
//     });

//     it("task 3 enter to the register page", () => {
//         cy.visit("http://localhost:3000/register")
//         cy.get("#register").click()
//         cy.get("#email").type('aa')
//         cy.get("#password").type('aa')
//         cy.get("#register").click()
//         cy.get('#name').type('Hohn doea')
//         cy.get('#email').type('john@doe.com')
//         cy.get('#password').clear().type('12345678A')
//         cy.get('#confirmPassword').clear().type('12345678A')
//         cy.get("#register").click()
//         cy.url("http://localhost:3000/dashboard")
//     })

//     it(" task 4 veryfyin cart page", () => {
//         cy.visit("http://localhost:3000/loginCart")
//         cy.get('.email').type('John@john.pl');
//         cy.get('.password').type('John');
//         cy.get('#rememberMe').click();
//         cy.get('button[type="submit"]').click();
//         cy.get('#1').within(() => {
//             cy.get('.add-to-cart-btn').click();
//           });
//           cy.get('#2').within(() => {
//             cy.get('.add-to-cart-btn').click();
//           });
//           cy.get(".cart-counter").contains('2')
//           cy.visit("http://localhost:3000/cart")
//           cy.get('[data-cy="1"]').should('have.text', '1');
//           cy.get('[data-cy="2"]').should('have.text', '1');
//           cy.get('[data-cy="price-1"]').should('have.text', '49.99 zł');
//           cy.get('[data-cy="price-2"]').should('have.text', '199.99 zł');
//           cy.get('[data-cy="sum"]').should('have.text', 'Suma: 249.98 zł');
//           cy.get('#1').find(`[data-cy="remove-id-1"]`).click();
//           cy.get('[data-cy="sum"]').should('have.text', 'Suma: 199.99 zł');
//     })

//     it('task 5 mockowanie api', () => {
//       cy.intercept("GET","https://fakestoreapi.com/products").as("requestTag");
//       cy.visit("http://localhost:3000/mockApi")
//       cy.wait("@requestTag")
//       cy.get("@requestTag").then( res =>{
//         console.log(res)
//         expect(res.response.statusCode).to.equal(200)
    
    
//         expect(res.response.body).to.be.an("array").that.is.not.empty;
    
//         const firstProduct = res.response.body[0];
//         expect(firstProduct).to.have.property("title");
//         expect(firstProduct).to.have.property("price");
//         expect(firstProduct).to.have.property("category");
    
//         const productTitles = res.response.body.map(p => p.title);
//         expect(productTitles).to.include("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
//       })
//     })
//     it("mockowanie API", () => {
//       // Mockowana lista produktów
//       const mockProducts = [
//         { id: 1, title: "Produkt 1", price: 99.99 },
//         { id: 2, title: "Produkt 2", price: 49.99 },
//         { id: 3, title: "Produkt 3", price: 19.99 },
//       ];
    
//       // Przechwytujemy request i zwracamy mockowane dane
//       cy.intercept("GET", "https://fakestoreapi.com/products", {
//         statusCode: 200,
//         body: mockProducts,
//       }).as("requestTag");
    
//       cy.visit("http://localhost:3000/mockApi");
//       cy.wait("@requestTag");
    
//       // Sprawdzamy, czy produkty zostały poprawnie wyświetlone na stronie
//       cy.get(".product-item").should("have.length", mockProducts.length);
    
//       // Sprawdzamy, czy każdy produkt ma nazwę, cenę i przycisk "Dodaj do koszyka"
//       cy.get(".product-item").each(($el, index) => {
//         cy.wrap($el).find(".product-title").should("contain.text", mockProducts[index].title);
//         cy.wrap($el).find(".product-price").should("contain.text", mockProducts[index].price);
//         cy.wrap($el).find(".add-to-cart-btn").should("exist");
//       });
//     });
    
    
     



//       it("task 7 testing filter and sort", () => {
//         cy.visit("http://localhost:3000/filterAndSort");
//         cy.get('#category-1').click();
    
    

//     cy.get('[data-testid="slider-min"]')
//     .should('exist')
//     .and('be.visible')
//     .then($slider => {

//       cy.wrap($slider)
//         .invoke('attr', 'value', '20')
//         .trigger('input', { force: true })
//         .trigger('change', { force: true })

//       cy.get('[data-testid="slider-min"]')
//         .should('have.value', '20');
    
//         cy.get('[data-testid="slider-max"]')
//         .should('exist')
//         .and('be.visible')
//         .then($slider => {
//           cy.wrap($slider)
//             .invoke('attr', 'value', '200')
//             .trigger('input', { force: true })
//             .trigger('change', { force: true })
//             cy.get('[data-testid="slider-max"]')
//             .should('have.value', '200');
//         });
//         cy.get('#searchButton').click()
//         cy.get('#select').select('priceAsc')
//         cy.get('#searchButton').click()



//         cy.get('[data-testid="list"]')
//         cy.get('#select').select('priceAsc')
//       });

//     });
    
//     it(' Task 7 Sprawdza, czy sortowanie zmienia kolejność elementów', () => {
//       cy.visit("http://localhost:3000/filterAndSort");
//       cy.get('#category-1').click();
  
//       // Przenosimy idsBefore na zewnątrz
//       let idsBefore = [];
  
//       cy.get('[data-test-id="list"]')
//           .find('[data-test-id]')
//           .then(($products) => {
//               $products.each((index, product) => {
//                   const productId = Cypress.$(product).attr('data-test-id').trim();
  
//                   // Sprawdzamy, czy data-test-id różni się od '0'
//                   if (productId !== '0') {
//                       const productIdAsNumber = parseFloat(productId);
  
//                       // Jeśli productIdAsNumber to liczba, dodajemy ją do listy
//                       if (!isNaN(productIdAsNumber)) {
//                           idsBefore.push(productIdAsNumber);
//                       }
//                   }
//               });
  
//               console.log('Przed sortowaniem:', idsBefore);
//           });
  

//           cy.get('#select').select('priceDesc');
  
//           cy.get('[data-test-id="list"]')
//               .find('[data-test-id]')
//               .then(($products) => {
//                   const idsAfterDesc = [];
      
//                   $products.each((index, product) => {
//                       const productId = Cypress.$(product).attr('data-test-id').trim();
      
//                       // Sprawdzamy, czy data-test-id różni się od '0'
//                       if (productId !== '0') {
//                           const productIdAsNumber = parseFloat(productId);
      
//                           // Jeśli productIdAsNumber to liczba, dodajemy ją do listy
//                           if (!isNaN(productIdAsNumber)) {
//                               idsAfterDesc.push(productIdAsNumber);
//                           }
//                       }
//                   });
      
//                   console.log('Po sortowaniu malejącym:', idsAfterDesc);
      
//                   // Porównanie przed i po sortowaniu malejącym
//                   expect(idsAfterDesc).to.deep.equal(idsBefore.sort((a, b) => b - a));
//               });
      

//               cy.get('#category-1').siblings('span').invoke('text').then(categoryText => {
//                 // Pobieramy tekst z <span> wewnątrz labela z id="category-1"
            
//                 cy.get('[data-test-id="list"]').find('[data-test-id="category"]').each(($categoryElement) => {
//                     // Iterujemy po każdym elemencie w liście, który ma data-test-id="category"
            
//                     const categoryTextInList = $categoryElement.text().trim(); // Pobieramy tekst i usuwamy zbędne spacje
            
//                     // Porównujemy tekst z #category-1 z tekstem wewnątrz elementów w liście
//                     expect(categoryTextInList).to.eq(categoryText);
//                 });
//             });

//       // Klikamy na select, aby wybrać opcję sortowania rosnącego
//       cy.get('#select').select('priceAsc');

      
  
//       cy.get('[data-test-id="list"]')
//           .find('[data-test-id]')
//           .then(($products) => {
//               const idsAfterAsc = [];
  
//               $products.each((index, product) => {
//                   const productId = Cypress.$(product).attr('data-test-id').trim();
  
//                   // Sprawdzamy, czy data-test-id różni się od '0'
//                   if (productId !== '0') {
//                       const productIdAsNumber = parseFloat(productId);
  
//                       // Jeśli productIdAsNumber to liczba, dodajemy ją do listy
//                       if (!isNaN(productIdAsNumber)) {
//                           idsAfterAsc.push(productIdAsNumber);
//                       }
//                   }
//               });
  
//               console.log('Po sortowaniu rosnącym:', idsAfterAsc);
  
//               // Porównanie przed i po sortowaniu rosnącym
//               expect(idsAfterAsc).to.deep.equal(idsBefore.sort((a, b) => a - b));
//           });
         

//           let titlesBefore = [];

//           cy.get('[data-test-id="list"]')
//               .find('[data-test-id="title"]')
//               .then(($titles) => {
//                   $titles.each((index, titleElement) => {
//                       const title = Cypress.$(titleElement).text().trim();
//                       if (title) {
//                           titlesBefore.push(title);
//                       }
//                   });
      
//                   console.log('Przed sortowaniem rosnącym:', titlesBefore);
//               });

       
      
//           // Wybieramy opcję sortowania wg tytułu rosnąco
//           cy.get('#select').select('nameAsc');
      
//           cy.get('[data-test-id="list"]')
//               .find('[data-test-id="title"]')
//               .then(($titles) => {
//                   const titlesAfterAsc = [];
      
//                   $titles.each((index, titleElement) => {
//                       const title = Cypress.$(titleElement).text().trim();
//                       if (title) {
//                           titlesAfterAsc.push(title);
//                       }
//                   });
      
//                   console.log('Po sortowaniu rosnącym:', titlesAfterAsc);
      
//                   // Porównanie przed i po sortowaniu rosnącym
//                   expect(titlesAfterAsc).to.deep.equal(titlesBefore.sort());
//               });
//               cy.get('#select').select('nameDesc');

//     cy.get('[data-test-id="list"]')
//     .find('[data-test-id="title"]')
//     .then(($titles) => {
//         const titlesAfterDesc = [];

//         $titles.each((index, titleElement) => {
//             const title = Cypress.$(titleElement).text().trim();
//             if (title) {
//                 titlesAfterDesc.push(title);
//             }
//         });

//         console.log('Po sortowaniu malejącym:', titlesAfterDesc);

//         // Porównanie przed i po sortowaniu malejącym
//         expect(titlesAfterDesc).to.deep.equal(titlesBefore.sort().reverse());
//     });     
//   });
//   describe(' Task 8 Infinite Scroll List', () => {
//     beforeEach(() => {
//       // Ustawiamy mockowanie odpowiedzi API przed każdym testem
//       cy.intercept('GET', 'https://www.reddit.com/r/all/hot.json*', (req) => {
//         // Mockowanie pierwszej strony odpowiedzi
//         if (req.url.includes('page=1')) {
//           req.reply({
//             statusCode: 200,
//             body: {
//               data: {
//                 children: [
//                   { data: { id: '1', title: 'Post 1', author: 'Author 1', subreddit: 'all', score: 10, num_comments: 5, created_utc: 1640995200, url: 'http://example.com', thumbnail: 'http://example.com/image1.jpg' } },
//                   { data: { id: '2', title: 'Post 2', author: 'Author 2', subreddit: 'all', score: 20, num_comments: 10, created_utc: 1640998800, url: 'http://example.com', thumbnail: 'http://example.com/image2.jpg' } }
//                 ],
//                 after: 'nextPageId',
//               }
//             }
//           });
//         }
//         // Mockowanie drugiej strony odpowiedzi
//         else if (req.url.includes('page=2')) {
//           req.reply({
//             statusCode: 200,
//             body: {
//               data: {
//                 children: [
//                   { data: { id: '3', title: 'Post 3', author: 'Author 3', subreddit: 'all', score: 30, num_comments: 15, created_utc: 1641002400, url: 'http://example.com', thumbnail: 'http://example.com/image3.jpg' } },
//                   { data: { id: '4', title: 'Post 4', author: 'Author 4', subreddit: 'all', score: 40, num_comments: 20, created_utc: 1641006000, url: 'http://example.com', thumbnail: 'http://example.com/image4.jpg' } }
//                 ],
//                 after: 'nextPageId2',
//               }
//             }
//           });
//         }
//         // Mockowanie trzeciej strony odpowiedzi
//         else if (req.url.includes('page=3')) {
//           req.reply({
//             statusCode: 200,
//             body: {
//               data: {
//                 children: [
//                   { data: { id: '5', title: 'Post 5', author: 'Author 5', subreddit: 'all', score: 50, num_comments: 25, created_utc: 1641009600, url: 'http://example.com', thumbnail: 'http://example.com/image5.jpg' } },
//                   { data: { id: '6', title: 'Post 6', author: 'Author 6', subreddit: 'all', score: 60, num_comments: 30, created_utc: 1641013200, url: 'http://example.com', thumbnail: 'http://example.com/image6.jpg' } }
//                 ],
//                 after: null, // Brak następnej strony, co oznacza koniec
//               }
//             }
//           });
//         }
//       }).as('getRedditData');
//     });
  
//     it('should load more items on scroll and check conditions', () => {
//       cy.visit('http://localhost:3000/infinite'); // Załaduj stronę z listą postów
  
//       // Symulacja scrollowania do końca strony 3 razy
//       cy.scrollTo('bottom'); // Pierwsze przewinięcie
//       cy.wait('@getRedditData'); // Czekamy na załadowanie danych
  
//       cy.scrollTo('bottom'); // Drugie przewinięcie
//       cy.wait('@getRedditData'); // Czekamy na załadowanie danych
  
//       cy.scrollTo('bottom'); // Trzecie przewinięcie
//       cy.wait('@getRedditData'); // Czekamy na załadowanie danych
  
//       // Sprawdzenie, czy nowe elementy zostały załadowane
//       cy.get('[data-testid="item"]').should('have.length', 6); // Powinna być już 6 elementów
  
//       // Sprawdzenie, czy nie ma duplikatów
//       cy.get('[data-testid="item"]').each((item, index, list) => {
//         const ids = Cypress._.map(list, 'id'); // Mapowanie listy elementów na ich ID
//         expect(ids).to.have.length(ids.length); // Sprawdzenie, że każde ID jest unikalne
//       });
  
//       // Sprawdzenie, czy loader jest wyświetlany podczas ładowania
//       cy.get('[data-testid="loader"]').should('contain.text', 'Przewiń, aby załadować więcej'); // Loader powinien być widoczny
//       cy.scrollTo('bottom');
//       cy.get('[data-testid="loader"]').should('contain.text', 'Ładowanie');
  
//       // cy.get('[data-testid="endList"]').should('contain.text', 'Koniec listy');
  
//     });
//   });
  



//   it(" Task 9 Powinno zaktualizować dane użytkownika, wyświetlić komunikat sukcesu i zachować zmiany po odświeżeniu", () => {
//     cy.visit("http://localhost:3000/loginProfile");
    
//     // Logowanie
//     cy.get('.email').type('John@john.pl');
//     cy.get('.password').type('John');
//     cy.get('#rememberMe').click();
//     cy.get('button[type="submit"]').click();
//     cy.wait(2000);
    
//     // Rozpoczęcie edycji profilu
//     cy.get('[data-testid="edit"]').click();
//     cy.get("#fileUpload").attachFile("../fixtures/dog.png");  
//     cy.get('[data-testid="nameSurname"]').clear().type('Adam Malysz');
//     cy.get('[data-testid="email"]').clear().type('adam@adam.pl');
//     cy.get('[data-testid="password"]').clear().type('123123123');
//     cy.get('[data-testid="checkbox"]').click();
//     cy.get('[data-testid="save"]').click();
    
//     // Sprawdzenie, czy pojawił się komunikat sukcesu
//     cy.contains("Zmiany zapisane pomyślnie!").should("be.visible");
    
//     // Sprawdzenie, czy dane w UI zostały zaktualizowane
//     cy.contains("Adam Malysz").should("be.visible");
//     cy.contains("adam@adam.pl").should("be.visible");
//     cy.contains("123123123").should("be.visible");
    
//     // Odświeżenie strony
//     cy.reload();
    
//     // Sprawdzenie, czy dane nadal są widoczne po odświeżeniu
//     cy.contains("Adam Malysz").should("be.visible");
//     cy.contains("adam@adam.pl").should("be.visible");
//     cy.contains("123123123").should("be.visible");

//   // błąd dla zbyyt krótkiego hasła
//   cy.get('[data-testid="edit"]').click();
//   cy.get('[data-testid="password"]').clear().type('123');
//   cy.get('[data-testid="save"]').click();
//   cy.contains("Hasło jest za krótkie.").should("be.visible");


//   // błąd dla nieprawidloweg formatu email
//    cy.get('[data-testid="edit"]').click();
//   cy.get('[data-testid="email"]').clear().type('adamadam.pl');
//   cy.get('[data-testid="save"]').click();
//   cy.contains("Nieprawidłowy format email.").should("be.visible");

//     // błąd dla nieprawidłwoego formatu zdjęcia
//     cy.get('[data-testid="edit"]').click();
//     cy.get("#fileUpload").attachFile("../fixtures/document1.pdf");  
//     cy.contains("Nieprawidłowy format pliku.").should("be.visible");
//   });






// let sharedPostId;  // Zmienna wspólna do przechowywania ID

// describe('task 10 Blog Post Manager', () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000/blog");

//     // Inicjalizacja zmiennej sharedPostContent
//     const sharedPostContent = 'This is a new blog post';  

//     // Stworzenie nowego posta
//     cy.get('[data-testid="create"]').type(sharedPostContent);
//     cy.get('[data-testid="add"]').click();

//     // Zapisanie ID nowo utworzonego posta
//     cy.get('li').first().then(($post) => {
//       sharedPostId = $post.attr('id').replace('post-', '');  // Wyciągnięcie ID z DOM
//     });
//   });

//   it('should create a new post and save its ID', () => {
//     // Sprawdzenie, czy post został stworzony
//     cy.get(`#post-${sharedPostId}`).should('exist');
//   });

//   it('should edit the created post and save the changes', () => {
//     const editedContent = 'This is an edited blog post';

//     // Użycie zapisanego ID do edycji posta
//     cy.get(`#post-${sharedPostId}`).find('[data-testid="edit-' + sharedPostId + '"]').click();

//     // Wprowadzenie nowych danych do pola edycji
//     cy.get(`[data-testid="posteditinput${sharedPostId}"]`).clear().type(editedContent);

//     // Kliknięcie przycisku "Save"
//     cy.get(`#post-${sharedPostId}`).find('[data-testid="postedit' + sharedPostId + '"]').click();

//     // Zweryfikowanie, czy zmiany zostały zapisane
//     cy.get(`#post-${sharedPostId}`).contains(editedContent).should('be.visible');
//   });

//   it('should delete the created post and verify its removal', () => {
//     // Użycie zapisanego ID do usunięcia posta
//     cy.get(`#post-${sharedPostId}`).find('[data-testid="delete-' + sharedPostId + '"]').click();
  
//     // Potwierdzenie usunięcia posta (jeśli istnieje takie potwierdzenie w aplikacji)
//     // Możesz użyć tego kroku, jeśli w aplikacji pojawia się np. okno potwierdzenia
//     // cy.get('[data-testid="confirm-delete"]').click();  // Jeśli jest takie potwierdzenie
  
//     // Sprawdzamy, czy post został usunięty (czy nie ma go już na stronie)
//     cy.get(`#post-${sharedPostId}`).should('not.exist');
//   });
// });

})