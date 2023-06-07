import { faker } from "@faker-js/faker"
var fakerBr = require('faker-br');
import '@shelex/cypress-allure-plugin';



Cypress.Commands.add('validaCampos',()=>{
    cy.get('.col-md-10 > :nth-child(1) > .col > .form-group')
    .contains('SADT')

    cy.get('.col-md-10 > :nth-child(1) > .col > .form-group')
    .contains('Eletiva')
})
