beforeEach(() => {
    cy.visit('https://dev.analyticare.com.br/authentication/login')
    //login
    cy.get(':nth-child(1) > .mb-3 > .form-control').type(Cypress.env('administrativo'));
    cy.get(':nth-child(2) > .mb-3 > .form-control').type(Cypress.env('password'));
    cy.get('.button-login > .btn').click();
})

it('Revisar protocolo', () => {
    cy.url({ timeout: 100000 }).should('include', '/protocolos/listar');

    // clica no protocolo
    cy.get(':nth-child(1) > .rt-tr > :nth-child(1) > .d-flex > .m-0')
        .click()

    cy.get('.breadcrumb-body').then($breadcrumb => {
        if ($breadcrumb.text().includes('Iniciar Pré-Análise')) {
            cy.contains('Iniciar Pré-Análise').click()
        }
    })

    cy.get(':nth-child(1) > .service-guide-title > :nth-child(2)', { timeout: 5000 })
        .click()

    // CARACTERISTICAS
    // Valida os inputs, edita as informações e valida se salvou
    cy.caracteristicas_alteracao_validacao()
    cy.wait(500)
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
        .should('have.value', '22222')

    //insere prestador e valida
    // cy.cadastraPrestador()// erro TASK CRIADA 
    cy.get('.card-nav-stepper > .m-0 > :nth-child(2)')
        .click()

    // INSERE UM ANEXO
    cy.get('.gutter-x-14 > :nth-child(1) > .custom-file > .custom-file-label')
        .selectFile('cypress/fixtures/teste.pdf');
    cy.wait(500)
    cy.get('.gutter-x-14 > :nth-child(2) > .d-flex > .form-control')
        .select('Exame')
    cy.get('.pt-0 > .gutter-x-14 > .false > .form-control')
        .type('Foi inserido Automático')
    cy.get('.w-50 > .btn')
        .click()

    // VALIDA SE SALVOU O ANEXO
    cy.get('.pt-0 > div.hide-responsive')
        .contains('Foi inserido Automático')

    // vai para pedido medico
    cy.get('.m-0 > :nth-child(3) > .color-link')
        .click()

    // envia para Analise Tecnica
    cy.get('.breadcrumb-body').then($breadcrumb => {
        const $button = $breadcrumb.find('.mr-5 > .d-flex > .btn-primary');

        if ($button.length > 0) {
            cy.get('.mr-5 > .d-flex > .btn-primary')
                .click()
        } else {
            cy.get('.pro-pic > .rounded-circle')
                .click()

            cy.get('.modal-user-button')
                .click()
        }
    });




})

