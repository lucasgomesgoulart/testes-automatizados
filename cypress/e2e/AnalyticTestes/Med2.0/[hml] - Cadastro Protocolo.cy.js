import { faker } from "@faker-js/faker"
var fakerBr = require('faker-br');

describe('OperadoraTeste - Cadastro', () => {
    beforeEach(() => {
        cy.visit('https://hml.advicemed.com.br/authentication/login')
    })

    it('Operadora Teste - Cadastro', () => {
        cy.loginMed(Cypress.env('operadoraTeste'), Cypress.env('password'))

        // clica em novo protocolo
        cy.get('.left-sidebar').contains('Novo Cadastro').click()

        // adiciona o comando para ignorar o erro
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('Cannot convert undefined or null to object')) {
                console.log('Application Error Cannot convert undefined or null to object')
                return false;
            }
            return true
        })

        cy.get('.col-md-4 > .checkbox-x > :nth-child(1) > :nth-child(1) > .checkbox-component > .input-radio-box').click()

        // CARACTERÍSTICAS DO PROTOCOLO
        // valida e marca SADT Normal E JM
        cy.get('[style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2)').contains('Prioritário')
        cy.get('[style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2)').contains('Normal (Eletivo)')
        cy.get('[style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > :nth-child(1) > :nth-child(2)').contains('SADT')
        cy.get('[style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > :nth-child(1) > :nth-child(2)').contains('Internação')
        cy.get('[style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > :nth-child(1) > :nth-child(2)').contains('Junta Médica')
        cy.get('[style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > :nth-child(1) > :nth-child(2)').contains('Segunda Opinião')
        cy.get('[style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > :nth-child(1) > :nth-child(2)').contains('Baixa Complexidade')
        //
        cy.InformaçõesMED()
        cy.cadastraBeneficiarioMed()
        cy.cadastraProfAssistente()
        cy.cadastraProfAuditor()
        cy.cadastraPrestadorMed()

        //Pagina seguinte
        cy.get('[style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > :nth-child(1) > .card-body > .mt-4 > :nth-child(2) > .btn')
            .contains('Seguinte').click()
        cy.anexaArquivosMed()
        cy.cadastraProcedimentosMed()

        //Pagina seguinte
        cy.get(':nth-child(3) > .tab-pane > .p-4 > .card-body > .mt-4 > :nth-child(2) > .btn')
            .click()

        cy.cadastroMateriaisMed()
        cy.cadastraMedicamentoMed()

        // Pagina seguinte
        cy.get(':nth-child(4) > .tab-pane > .p-4 > .card-body > .mt-4 > :nth-child(2) > .btn')
            .click()

        cy.get('.checkbox-container-divergente > :nth-child(2) > .checkbox')
            .click()

        cy.get('.editorClassName').type('Teste automatizado pelo lucas =)')

        cy.get('.card-body > .float-right').click()

        //concluir
        cy.get('.p-3 > :nth-child(1) > .mt-4 > :nth-child(2) > .btn').click()
    })
})
