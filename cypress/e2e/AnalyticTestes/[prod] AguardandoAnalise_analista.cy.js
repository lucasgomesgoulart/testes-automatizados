beforeEach(() => {
    cy.visit('https://dev.analyticare.com.br/authentication/login')
    //login
    cy.get(':nth-child(1) > .mb-3 > .form-control').type(Cypress.env('analista'));
    cy.get(':nth-child(2) > .mb-3 > .form-control').type(Cypress.env('password'));
    cy.get('.button-login > .btn').click();
})


it('Análise Ténica ANALISA', () => {
    cy.url({timeout: 100000}).should('include', '/protocolos/listar');
    cy.wait(1500)
    cy.get('.rt-tbody').scrollIntoView();

    //seleciona o ultimo protocolo cadastrado
    cy.get(':nth-child(1) > .rt-tr > :nth-child(1) > .d-flex > .m-0')
        .click()
    //clica em Pedido Medico
    cy.get('.m-0 > :nth-child(3)')
        .click()
    cy.wait(3000)
    //analisa os materiais
    cy.Analisa_materiais()
})


