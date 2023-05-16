import { faker } from "@faker-js/faker"
var fakerBr = require('faker-br');
import '@shelex/cypress-allure-plugin';


Cypress.Commands.add('login', (username, password) => {
    {
        cy.visit('/https://dev.analyticare.com.br/authentication/login')
        cy.get(':nth-child(1) > .mb-3 > .form-control').type(username);
        cy.get(':nth-child(2) > .mb-3 > .form-control').type(password);
        cy.get('.button-login > .btn').click();
        cy.wait(3000)
    }
})


Cypress.Commands.add('cadastraBenef', () => {
    //nome
    cy.get(':nth-child(3) > .card-body > :nth-child(3) > .col-md-4 > .form-control-input > .form-control')
        .type(fakerBr.name.findName())
    //cpf
    cy.get('.card-body > :nth-child(3) > :nth-child(2) > .form-control-input > .form-control')
        .type(fakerBr.br.cpf())
    // sexo
    cy.get(':nth-child(3) > .form-control-input > .d-flex > .form-control')
        .select('Masculino')
    //data nasc
    cy.get(':nth-child(3) > :nth-child(4) > .form-control-input > .form-control')
        .type('1997-08-05')
    //numeroo carteira
    cy.get(':nth-child(3) > .card-body > :nth-child(4) > .col-md-4 > .form-control-input > .form-control')
        .type('123456789')
    //validade da carteira
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    cy.get(':nth-child(3) > .card-body > :nth-child(4) > .col-md-2 > .form-control-input > .form-control')
        .type(formattedDate)
    //email
    cy.get(':nth-child(5) > .col-md-4 > .form-control-input > .form-control')
        .type(faker.internet.email())
    //celular
    cy.get(':nth-child(5) > :nth-child(2) > .form-control-input > .form-control')
        .type(fakerBr.phone.phoneNumber())

    //telefone
    cy.get(':nth-child(5) > :nth-child(3) > .form-control-input > .form-control')
        .type(fakerBr.phone.phoneNumber())

})

Cypress.Commands.add('preencherFormulario', () => {
    cy.wrap(Array(5).fill(null)).each(() => {
        cy.get(':nth-child(1) > .col-md-4 > .form-control-input > .form-control')
            .type(faker.finance.creditCardNumber(),);

        cy.get('.col-md-6 > .form-control-input > .form-control')
            .type(faker.commerce.product());

        cy.get('.mt-4.align-items-start > :nth-child(3) > .form-control-input > .form-control')
            .type('1500',);

        cy.get('#add-material').click();
    });
});

Cypress.Commands.add('EditaEValidaBenef', () => {
    //beneficiario altera e valida se salvou
    cy.get(':nth-child(2) > .service-guide-title > :nth-child(2) > svg > path')
        .click()

    cy.get('#carteiraNumber')
        .clear()
        .type('9988776655')

    cy.get('#validityCard')
        .clear()
        .type('2024-12-12')

    cy.get('.d-flex.w-100 > :nth-child(2) > .service-guide-wrapper-grid-5-col > :nth-child(3) > .form-control-input > .form-control')
        .clear()
        .type('08535376521')

    cy.get(':nth-child(4) > #beneficiaryBirthDate')
        .clear()
        .type('1990-12-12')

    cy.get(':nth-child(6) > .form-control-input > .form-control')
        .clear()
        .type('Teste alteracao automatizado')

    cy.get(':nth-child(8) > #emailBnf')
        .clear()
        .type('teste@automatico.com.br')

    cy.get(':nth-child(9) > .form-control-input > .form-control')
        .clear()
        .type('22222222222')

    cy.get(':nth-child(10) > .form-control-input > .form-control')
        .clear()
        .type('(33) 33333-3333')

    cy.get('.service-guide-grid-item-5-col > .justify-content-end > .align-items-center')
        .click()

    // Verifica se o número da carteira foi salvo corretamente
    cy.get('#carteiraNumber')
        .should('have.value', '9988776655');

    // Verifica se a validade do cartão foi salva corretamente
    cy.get('#validityCard')
        .should('have.value', '2024-12-12');

    // Verifica se o CPF foi salvo corretamente
    cy.get('.d-flex.w-100 > :nth-child(2) > .service-guide-wrapper-grid-5-col > :nth-child(3) > .form-control-input > .input-default-editable')
        .should('have.value', '085.353.765-21');

    // Verifica se a data de nascimento do beneficiário foi salva corretamente
    cy.get(':nth-child(4) > #beneficiaryBirthDate')
        .should('have.value', '1990-12-12');

    // Verifica se o campo de alteração automatizada foi salvo corretamente
    cy.get(':nth-child(6) > .form-control-input > .form-control')
        .should('have.value', 'Teste alteracao automatizado');

    // Verifica se o e-mail foi salvo corretamente
    cy.get(':nth-child(8) > #emailBnf')
        .should('have.value', 'teste@automatico.com.br');

    // Verifica se o CPF foi salvo corretamente
    cy.get(':nth-child(9) > .form-control-input > .input-default-editable')
        .should('have.value', '(22) 22222-2222');

    // Verifica se o número de telefone foi salvo corretamente
    cy.get(':nth-child(10) > .form-control-input > .input-default-editable')
        .should('have.value', '(33) 33333-3333');
})

Cypress.Commands.add('caracteristicas_alteracao_validacao', () => {

    ///valida se todos estão ali
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(1)').contains('SADT')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(1)').contains('Internação')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(6)').contains('Eletivo')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(6)').contains('Urgente')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(2)').contains('Pré-Operatório')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(2)').contains('Pós-Operatório')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(3)').contains('Análise de Código')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(3)').contains('Negociação')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(4)').contains('Não realizar')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(4)').contains('Tentativa de Consenso')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(5) > .d-flex').contains('Direto')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(5) > .d-flex').contains('Prestador')

    //preenche os campos
    cy.get('#guia_sadt')
        .click()
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(5) > .d-flex')
        .click()
    cy.get('#consenso_tentativa')
        .click()
    cy.get('#carater_urgente')
        .click()
    cy.get('.mt-3 > .flex-column > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('Geral')
    cy.get('#react-select-2-option-0')
        .click()
    cy.get('.d-flex.w-100 > :nth-child(1) > form > .justify-content-end > .align-items-center')
        .click()

    //valida os campos
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(1) > .d-flex')
        .contains('SADT')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(2)')
        .contains('Pré-Operatório')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(3)')
        .contains('Negociação')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(4)')
        .contains('Tentativa de Consenso')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(5)')
        .contains('Direto (Fornecedor)')
    cy.get('.service-guide-wrapper-grid-6-col > :nth-child(6)')
        .contains('Urgente')
});


Cypress.Commands.add('cadastraPrestador', () => {
    //clica pra editar
    cy.get(':nth-child(4) > .service-guide-title > :nth-child(2) > svg > path')
        .click()

    cy.get('.service-guide-wrapper-grid-5-col > :nth-child(2) > .form-control-input > .form-control')
        .type(fakerBr.name.findName())

    const nomeEmpresa = fakerBr.company.companyName()
    cy.get('.service-guide-wrapper-grid-5-col > :nth-child(3) > .form-control-input > .form-control')
        .type(nomeEmpresa);

    // Gera um CNPJ fictício
    const cnpj = fakerBr.br.cnpj();
    cy.get('.service-guide-wrapper-grid-5-col > :nth-child(3) > .form-control-input > .form-control')
        .type(cnpj);

    // Gera um estado (sigla) fictício

    cy.get('.service-guide-wrapper-grid-5-col > :nth-child(3) > .form-control-input > .form-control')
        .select('Santa Catarina');

    // Gera uma cidade fictícia com base no estado

    cy.get(':nth-child(6) > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control')
        .type('Florianopolis')
        .should('have.text', 'Florianópolis')
        .click()
})
