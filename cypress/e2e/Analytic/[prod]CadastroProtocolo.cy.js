import 'cypress-file-upload';


describe('Cadastro protocolo fluxo completo', () => {
    beforeEach(() => {
        cy.visit('https://app.analyticare.com.br/authentication/login');
    });

    it('cadastro', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
        // Login
        cy.loginAnalyticHML(Cypress.env('analistaProd'), Cypress.env('password'));

        cy.get('.bg-white > :nth-child(2) > .btn-primary').contains('Novo Cadastro').click({ force: true })

        // Seleciona a operadora teste 1
        cy.get('.pb-4 > .card-body > :nth-child(2) > .col-md-3 > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3').type('Operadora')
        cy.get('#react-select-2-option-1').should('be.visible').contains('Operadora Teste 2').click()

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

        // cy.recuperaDados()  RECUPERA OS DADOS DE INPUTS DO PROTOCOLO

        Array.from({ length: 4 }).forEach(() => {
            cy.cadastraProcedimento()
        })

        //Avança para tela de Materiais
        cy.get('.active > .pt-0 > .w-100.justify-content-center > .d-flex > :nth-child(2)').click()

        Array.from({ length: 4 }).forEach(() => {
            cy.cadastroMateriais()
        })

        //Clica em Concluir
        cy.get('.active > .pt-0 > .w-100.row > .d-flex > :nth-child(2)').click()

        cy.FinalizaProtocolo()
        cy.buscaDados();
    });

    it.only('Revisao', () => {

        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.loginAnalyticHML(Cypress.env('analistaProd'), Cypress.env('password'));

        //Busca pelo protocolo na tabela, e clica
        cy.get('.rt-tbody').contains('202307AC00011').click()

        //Inicia análise
        cy.get('.breadcrumb-body').then($breadcrumb => {
            if ($breadcrumb.text().includes('Iniciar Pré-Análise')) {
                cy.contains('Iniciar Pré-Análise').click()
            }
        })

        cy.RevisacaracteristicasProtocolo()
        cy.RevisaBeneficiario()

    })
});