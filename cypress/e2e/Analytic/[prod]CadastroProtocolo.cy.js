import 'cypress-file-upload';


describe('Cadastra Protocolo e armazena dados', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('cadastro', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
        // Login
        cy.loginAnalyticHML(Cypress.env('analistaProd'), Cypress.env('password'));
        cy.CadastroInicio()
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

    it('Valida/Edita/Valida Beneficiário', () => {

        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.wait(1500)
        cy.loginAnalyticHML(Cypress.env('analistaProd'), Cypress.env('password'));

        //Busca pelo protocolo na tabela, e clica
        cy.get('.rt-tbody').contains(Cypress.env('protocoloFinal')).click()
        // cy.get('.rt-tbody').contains('202307AC00027').click()

        //Inicia análise
        cy.get('.breadcrumb-body').then($breadcrumb => {
            if ($breadcrumb.text().includes('Iniciar Pré-Análise')) {
                cy.contains('Iniciar Pré-Análise').click()
            }
        })

        cy.RevisacaracteristicasProtocolo()
        cy.RevisaBeneficiario()
        cy.editaBeneficiario()
    })
});