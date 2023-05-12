beforeEach(() => {
    //login
    cy.login('analistateste', 'Teste@123')
})

it('cadastrar protocolo', () => {
    cy.wait(3000)
    cy.visit('https://dev.analyticare.com.br/')
    //esperar a pagina carregar
    cy.url().should('include', '/protocolos/listar');

    //clicar em novo protocolo
    cy.get('.bg-white > :nth-child(2) > :nth-child(2)').click();

    // escreve Operadora teste no select
    const text = 'Operadora Teste';

    cy.get('.pb-4 > .card-body > :nth-child(2) > .col-md-3 > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type(text, { delay: 100 });

    cy.wait(2000)
    cy.get('#react-select-2-option-0')
        .click();
})