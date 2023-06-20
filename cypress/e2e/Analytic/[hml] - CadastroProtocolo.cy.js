import 'cypress-file-upload';


describe('Cadastro protocolo', () => {
    beforeEach(() => {
        cy.visit('https://hml.analyticare.com.br/authentication/login');
    });

    it('cadastro', () => {
        // Login
        cy.loginAnalyticHML(Cypress.env('analista'), Cypress.env('password'));

        cy.get('.bg-white > :nth-child(2) > .btn-primary').contains('Novo Cadastro').click({ force: true })

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
    });
});