import 'cypress-file-upload';


describe('Cadastro protocolo fluxo completo', () => {
    beforeEach(() => {
        cy.visit('https://hml.analyticare.com.br/authentication/login');
    });

    it('cadastro', () => {
        // Login
        // cy.loginAnalyticHML(Cypress.env('analista'), Cypress.env('password'));

        cy.get(':nth-child(1) > .mb-3 > .form-control').type('analista.teste');
        cy.get(':nth-child(2) > .mb-3 > .form-control').type('Teste@123');
        cy.get('.button-login > .btn').click()

        cy.get('.bg-white > :nth-child(2) > .btn-primary').contains('Novo Cadastro').click()

        // Seleciona a operadora teste 1
        cy.get('.pb-4 > .card-body > :nth-child(2) > .col-md-3 > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3').type('Operadora teste 1')
        cy.get('.css-11unzgr').should('be.visible').contains('Operadora teste 1').click()

        cy.get('.card-body > :nth-child(2) > :nth-child(2) > .form-control-input > .d-flex > .form-control').select('Regulamentado')
        cy.get(':nth-child(2) > :nth-child(3) > .form-control-input > .d-flex > .form-control').select('Local')

        //Valida e preenche: Caracteristicas do Protocolo
        cy.CaracterísticasProtocolo()
        cy.InformacoesGuia()
        cy.Beneficiario()
        cy.ProfissionalAssistente()
        cy.Prestador()

        // Clica em Cadastrar
        cy.get('.col-md-12 > .w-100 > .d-flex > :nth-child(2)').contains('Cadastrar').click()

        Array.from({ length: 7 }).forEach(() => {
            cy.EnviarAnexo()
        })

        //Proxima página
        cy.get('.active > .pt-0 > .justify-content-center > .d-flex > :nth-child(2)').click()

        Array.from({ length: 7 }).forEach(() => {
            cy.cadastraProcedimento()
        })

        //Avança para tela de Materiais
        cy.get('.active > .pt-0 > .w-100.justify-content-center > .d-flex > :nth-child(2)').click()

        Array.from({ length: 3 }).forEach(() => {
            cy.cadastroMateriais()
        })

        // Conclui o protocolo
        cy.get('.active > .pt-0 > .w-100.row > .d-flex > :nth-child(2)').click()

        cy.finalizaProtocolo()
        cy.recuperaDados()
    });
});