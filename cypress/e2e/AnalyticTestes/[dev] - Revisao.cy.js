beforeEach(() => {
    cy.visit('https://dev.analyticare.com.br/authentication/login')
    //login
    cy.get(':nth-child(1) > .mb-3 > .form-control').type(Cypress.env('supervisor'));
    cy.get(':nth-child(2) > .mb-3 > .form-control').type(Cypress.env('password'));
    cy.get('.button-login > .btn').click();
})

it('Análise Ténica ANALISA', () => {
    cy.url({ timeout: 100000 }).should('include', '/protocolos/listar');
    cy.wait(1500)
    cy.get('.rt-tbody').scrollIntoView();

    //seleciona o ultimo protocolo cadastrado
    cy.get(':nth-child(1) > .rt-tr > :nth-child(1) > .d-flex > .m-0')
        .click()

    //clica em iniciar revisão
    cy.get('.breadcrumb-body').then($breadcrumb => {
        if ($breadcrumb.text().includes('Iniciar Revisão')) {
            cy.get('.mr-5 > .d-flex > .btn-primary')
                .click()
        }
    })

    //valida status
    cy.get('.status-waiting')
        .contains('Aguardando Consenso')

    //clica no consenso
    cy.get('.m-0 > :nth-child(4) > .color-link')
        .click()



})