describe("Logowanie przez API w NextAuth", () => {
    it("Loguje użytkownika i zapisuje ciasteczka", () => {
      const login = {
        email: "tomasztam@op.pl",
        password: "123123"
      };
      
      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/auth/callback/credentials",
        body: login,
        followRedirect: false
      }).then((response) => {
        expect(response.status).to.eq(302); // bo NextAuth przekierowuje po loginie
        const cookies = response.headers["set-cookie"];
        cy.log("Cookies:", cookies);
        // Tu można np. zapisać token do dalszego użytku
        cy.request({
            method: "POST",
            url: "http://localhost:3000/api/topics",
            body:{
                
                    "title": "aaa",
                    "subtitle": "aaa3",
                    "description": "postman test",
                    "categories": [
                        "testind postman"
                    ],
                    "price": "1231"
                
            }
        })
      });
    });
  });
  