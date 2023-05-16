beforeEach(() => {
    cy.visit('https://app.analyticare.com.br')
    //login
    cy.get(':nth-child(1) > .mb-3 > .form-control').type(Cypress.env('administrativoProducao'));
    cy.get(':nth-child(2) > .mb-3 > .form-control').type(Cypress.env('password'));
    cy.get('.button-login > .btn').click();
})

it('Revisar protocolo', () => {
    cy.url().should('include', '/protocolos/listar');

    // clica no protocolo
    cy.get(':nth-child(1) > .rt-tr > :nth-child(1) > .d-flex > .m-0')
        .click()

    cy.get('.breadcrumb-body').then($breadcrumb => {
        if ($breadcrumb.text().includes('Iniciar Pré-Análise')) {
            cy.contains('Iniciar Pré-Análise').click()
        }
    })

    cy.get(':nth-child(1) > .service-guide-title > :nth-child(2)')
        .click()

    // CARACTERISTICAS
    // Valida os inputs, edita as informações e valida se salvou
    cy.caracteristicas_alteracao_validacao()

    //edita e valida o beneficiario
    cy.EditaEValidaBenef()


    cy.get(':nth-child(3) > .service-guide-title > :nth-child(2) > svg > path')
        .click()

    //TROCA O MÉDICO BUSCANDO POR MÉDICO E SELECIONA E VALIDA SE SALVOU.
    cy.get(':nth-child(1) > .flex-column > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('Médico')

    cy.get('#react-select-5-option-1')
        .click()

    cy.get('.pt-2 > .justify-content-end > .align-items-center')
        .click()

    // valida se é o médico pelo CRM
    cy.get('#registroClasse')
        .should('have.value', '121322')


    //insere prestador e valida
    // cy.cadastraPrestador()// erro TASK CRIADA 


})
// })

