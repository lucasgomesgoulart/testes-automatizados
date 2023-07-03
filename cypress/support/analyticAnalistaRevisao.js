Cypress.Commands.add('RevisacaracteristicasProtocolo', () => {
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(1)')
        .contains('SADT')

    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(2)')
        .contains('Pré-Operatório')

    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(3) > .flex-column')
        .contains('Análise de Código')

    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(3) > .flex-column')
        .contains('Negociação')

    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(4)')
        .contains('Não realizar')

    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(5)')
        .contains('Direto (Fornecedor)')

    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(6)')
        .contains('Eletivo')
})

Cypress.Commands.add('RevisaBeneficiario', () => {
    const BNF = Cypress.env('beneficiario')
    console.log(BNF)
    // cy.get('#carteiraNumber').contains(numeroCarteirinha);
});

