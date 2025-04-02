class AlertPage{
get btnAlert1() {
    return cy.get("#alert")
}

get btnAlert2() {
    return cy.get("#alert-confirm")
}
clickOnBtnAlert1(){
    this.btnAlert1.click();
}
clickOnBtnAllert2(){
    this.btnAlert2.click()
}

verifyAlertText(tekst){
    cy.on("window:alert", tresc => {
        expect(tresc).to.equal(tekst)
    })
}


verifyAlertConfirmText(){
    cy.on("window:confirm", tresc =>{
        expect(tresc).to.equal("Zaakceptuj aby kontynouwac")
    })
}

rejectAlert(){
    cy.on("window:confirm", () => false)
}

acceptAlert(){
    cy.on("window:confirm", () => true)
}



}


export default AlertPage


