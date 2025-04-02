class SelectPage{
    get select() {
        return cy.get("#selectProductSort")
    }
    selectAllOption() {
        this.select.then(select => {
            cy.wrap(select).find("option").each(opcja => {
                cy.wrap(select).select(opcja.text())
            })
          })
    }
}

export default new SelectPage

// const selectAllOptions = () => {
//     cy.get("#selectProductSort").then(select => {
//         cy.wrap(select).find("option").each(option => {
//             cy.wrap(select).select(option.text());
//         });
//     });
// };

// export default selectAllOptions;


