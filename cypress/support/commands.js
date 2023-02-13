// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('shippingForm',(number,street,city,country)=>{
    cy.fixture("shipping").then((shipping)=>{ 
        cy.get(shipping.phoneNumber).click().type(number);
        cy.get(shipping.street).click().type(street);
        cy.get(shipping.city).click().type(city);
        cy.get(shipping.country).select(country);
        cy.get(shipping.submitOrderBtn).click();
        cy.get(shipping.successOrderMessage).contains("Congrats!")
    })   
})

Cypress.Commands.add('loginForm',(email,password)=>{
    cy.fixture("index").then((index)=>{ 
        cy.get(index.emailBox).type(email);
        cy.get(index.passBox).type(password);
        cy.get(index.submitBtn).click();
    })
});