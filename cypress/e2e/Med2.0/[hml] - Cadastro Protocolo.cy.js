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
        cy.gerarDadosGuia()
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

        cy.get(':nth-child(1) > .rt-tr > [style="flex: 120 0 auto; width: 120px; max-width: 120px;"] > .text-info > u')
            .invoke('text')
            .then((text) => {
                const protocolo = text
                Cypress.env('protocolo', protocolo)
                console.log(`Protocolo: ${protocolo}`)
            });
    })

    it('administrativo', () => {
        cy.loginMed(Cypress.env('administrativoProducao'), Cypress.env('password'))

        const protocolo = Cypress.env('protocolo'); // recupera o numero de protocolo

        cy.on('uncaught:exception', (err, runnable) => {
            // Retorne false para ignorar o erro
            return false;
        });

        //entra no protocolo
        cy.get('.card-body').contains(protocolo).click()
        cy.url({ timeout: 10000 }).should('include', '/process/register');

        cy.get('.situation-card').then(($element) => {
            const text = $element.text();
            if (text.includes('Em Análise Administrativa')) {
                // O texto "Em Análise Administrativa" está presente
                // Não é necessário clicar no botão "Assumir"
            } else {
                // O texto "Em Análise Administrativa" não está presente
                cy.get('.d-flex > :nth-child(3) > .btn').contains('Assumir').click();
                cy.get('.modal-footer > .btn-primary').click()
            }
        });

        cy.intercept('GET', 'https://hml.api.advicemed.com.br/api/operadora-prestador-hospitais/', {
            // Não faça nada com a requisição
        }).as('REQ quebrada, pes_id incorreto.');

        cy.validaCaracteristicas()
    })
})