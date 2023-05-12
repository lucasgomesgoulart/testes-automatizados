export const cadastraProcedimento = () => {
    cy.get('.d-flex.mb-5 > .flex-column > :nth-child(1) > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('TESTE CADASTRI DE MATERIAL')
    cy.get('#react-select-7-option-0').click();
    cy.get('.procedures-button-insert').click();

    cy.get('.d-flex.mb-5 > .flex-column > :nth-child(1) > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('123')
    cy.get('#react-select-7-option-0').click();
    cy.get('.procedures-button-insert').click();

    cy.get('.d-flex.mb-5 > .flex-column > :nth-child(1) > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('1234')
    cy.get('#react-select-7-option-0').click();
    cy.get('.procedures-button-insert').click();

    cy.get('.d-flex.mb-5 > .flex-column > :nth-child(1) > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('412')
    cy.get('#react-select-7-option-0').click();
    cy.get('.procedures-button-insert').click();

    cy.get('.d-flex.mb-5 > .flex-column > :nth-child(1) > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('414')
    cy.get('#react-select-7-option-0').click();
    cy.get('.procedures-button-insert').click();

    cy.get('.d-flex.mb-5 > .flex-column > :nth-child(1) > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('544')
    cy.get('#react-select-7-option-0').click();
    cy.get('.procedures-button-insert').click();

    cy.get('.d-flex.mb-5 > .flex-column > :nth-child(1) > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('4142')
    cy.get('#react-select-7-option-1').click();
    cy.get('.procedures-button-insert').click();

    cy.get('.d-flex.mb-5 > .flex-column > :nth-child(1) > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('1414')
    cy.get('#react-select-7-option-0').click();
    cy.get('.procedures-button-insert').click();

    cy.get('.d-flex.mb-5 > .flex-column > :nth-child(1) > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('1212')
    cy.get('#react-select-7-option-0').click();
    cy.get('.procedures-button-insert').click();
}
