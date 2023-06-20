import { faker } from "@faker-js/faker"
var fakerBr = require('faker-br');
import '@shelex/cypress-allure-plugin';
import { format } from 'date-fns';

Cypress.Commands.add('loginMed', (username, password) => {
    cy.get('input[name="username_or_email"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('.button-login').find('button').click();
    //esperar a pagina carregar
    cy.wait(1500)
});

Cypress.Commands.add('gerarDadosGuia', () => {
    const dataAtendimento = faker.date.recent(1);
    const dadosGuia = {
        numeroGuia: faker.datatype.number({ min: 1, max: 99999 }),
        dataAtendimento: dataAtendimento.toISOString().slice(0, 10),
        senha: faker.datatype.number({ min: 100, max: 9999 }),
        especialidade: 'Geral',
    };

    Cypress.env('dadosGuia', dadosGuia);

    cy.wrap(dadosGuia).as('dadosGuia'); // Armazena os dadosGuia como um alias

    cy.get('[style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > :nth-child(1) > :nth-child(3) > :nth-child(2) > .form-control')
        .type(dadosGuia.numeroGuia);
    cy.get('[style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > :nth-child(1) > :nth-child(3) > :nth-child(3) > .form-control')
        .type(dadosGuia.dataAtendimento);
    cy.get('[style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > :nth-child(1) > :nth-child(3) > :nth-child(4) > .form-control')
        .type(dadosGuia.senha);
    cy.get('.col-md-4 > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3')
        .type(dadosGuia.especialidade);
    cy.get('#react-select-2-option-0').should('be.visible').click();
});

Cypress.Commands.add('cadastraBeneficiarioMed', () => {
    function gerarDadosAleatorios() {
        const dadosBeneficiario = {};

        dadosBeneficiario.numero = faker.datatype.number({ min: 10000, max: 50000 });
        dadosBeneficiario.dataCarteirinha = faker.date.between('2023-01-01', '2023-04-30').toISOString().slice(0, 10);
        dadosBeneficiario.cpf = fakerBr.br.cpf();
        dadosBeneficiario.dataNasc = faker.date.between('1980-01-01', '2023-04-30').toISOString().slice(0, 10);
        dadosBeneficiario.nome = fakerBr.name.findName();
        dadosBeneficiario.genero = 'FEMININO';
        dadosBeneficiario.email = faker.internet.email().toLowerCase();
        dadosBeneficiario.telefone = faker.datatype.number({ min: 1, max: 9 }) + fakerBr.phone.phoneNumber();

        return dadosBeneficiario;
    }

    const dadosAleatorios = gerarDadosAleatorios();
    Cypress.env('dadosBeneficiario', dadosAleatorios);
    // salva os dados na variável global do Cypress

    cy.get('[style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > :nth-child(1) > :nth-child(5) > .row > :nth-child(3) > .form-control')
        .type(dadosAleatorios.cpf);

    cy.get('[style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > :nth-child(1) > :nth-child(5) > .row > :nth-child(1) > .form-control')
        .type(dadosAleatorios.numero);

    cy.get('[style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > :nth-child(1) > :nth-child(5) > .row > :nth-child(2) > .form-control')
        .type(dadosAleatorios.dataCarteirinha);

    cy.get(':nth-child(5) > .row > :nth-child(4) > .form-control')
        .type(dadosAleatorios.dataNasc);

    cy.get(':nth-child(6) > .row > .col-md-5 > .form-control')
        .type(dadosAleatorios.nome);

    cy.get(':nth-child(6) > .row > :nth-child(2) > .form-control')
        .select(dadosAleatorios.genero);

    cy.get(':nth-child(7) > .row > :nth-child(1) > .form-control')
        .type(dadosAleatorios.email);

    cy.get(':nth-child(7) > .row > :nth-child(3) > .form-control')
        .type(dadosAleatorios.telefone);

    cy.get(':nth-child(7) > .row > :nth-child(2) > .mt-4 > .ml-2 > .control-label')
        .click();

    cy.get('.modal-body')
        .should('be.visible');

    cy.get('.col > .form-control').type(dadosAleatorios.email);
    cy.get('.mb-4 > .col > .mt-2').contains('Adicionar Email').click();
    cy.get('.modal-footer > .btn').contains('Fechar').click();
    cy.get('.modal-body')
        .should('not.be.visible');
});

Cypress.Commands.add('cadastraProfAssistente', () => {
    cy.get(':nth-child(11) > .mt-4 > :nth-child(1) > .form-control')
        .select('CRM')

    cy.get(':nth-child(11) > .mt-4 > :nth-child(2) > .form-control').type('121322')
    cy.get(':nth-child(11) > .mt-4 > .col-md-1 > .form-control').select('SC')

    cy.get(':nth-child(11) > .mt-4 > .col-md-7 > .form-control').should('have.value', 'teste')
    cy.get(':nth-child(12) > .mt-2 > :nth-child(1) > .form-control').should('have.value', 'teste2@teste.com')
    cy.get(':nth-child(12) > .mt-2 > :nth-child(3) > .form-control').should('have.value', '(48) 99999-9999')
})

Cypress.Commands.add('cadastraProfAuditor', () => {
    cy.get(':nth-child(16) > .mt-4 > :nth-child(1) > .form-control')
        .select('CRM')

    cy.get(':nth-child(16) > .mt-4 > :nth-child(2) > .form-control')
        .type(faker.datatype.number({ min: 100000, max: 999999 }))

    cy.get(':nth-child(16) > .mt-4 > .col-md-1 > .form-control')
        .select('SC')

    cy.get(':nth-child(16) > .mt-4 > .col-md-7 > .form-control')
        .type(fakerBr.name.findName())

    cy.get(':nth-child(17) > .mt-2 > :nth-child(1) > .form-control')
        .type(faker.internet.email().toLowerCase())

    cy.get(':nth-child(17) > .mt-2 > .col-md-1 > .mt-4 > .ml-2 > .control-label').click()

    cy.get('.modal-body').should('be.visible')

    cy.get('.col > .form-control')
        .type(faker.internet.email().toLowerCase())

    cy.get('.mb-4 > .col > .mt-2')
        .contains('Adicionar Email').click()

    cy.get('.modal-footer > .btn')
        .contains('Fechar').click()

    cy.get(':nth-child(17) > .mt-2 > :nth-child(3) > .form-control')
        .type(faker.datatype.number({ min: 1, max: 9 }) + fakerBr.phone.phoneNumber())
})

Cypress.Commands.add('cadastraPrestadorMed', () => {
    cy.get(':nth-child(20) > .mt-4 > .row > :nth-child(1) > .form-control')
        .type(faker.company.companyName())

    cy.get('.input-border-color > .css-yk16xz-control > .css-1hwfws3')
        .type('Florianópolis')

    cy.get('#react-select-4-option-0').contains('FLORIANÓPOLIS').click()
})

Cypress.Commands.add('anexaArquivosMed', () => {
    cy.get(':nth-child(2) > .tab-pane > .p-4 > :nth-child(1) > [style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > .col-md-12 > .page-subtitle')
        .contains('Enviar Anexos')

    cy.get('.custom-file-label').selectFile('cypress/fixtures/teste.pdf');

    cy.get('[style="pointer-events: auto; opacity: 1;"] > .form-group > .row > :nth-child(2) > .form-control')
        .select('Exame')

    cy.get('[style="pointer-events: auto; opacity: 1;"] > .form-group > .row > .col-md-4 > .form-control')
        .type('Anexo automático')

    cy.get('.col-md-2 > .btn').click()

    cy.wait(1500)

    cy.get('.font-12 > .mt-2').contains('Anexo automático')

    cy.get('[style="pointer-events: auto; opacity: 1;"] > .card-body > .mt-4 > :nth-child(2) > .btn')
        .click()
})

Cypress.Commands.add('cadastraProcedimentosMed', () => {
    cy.get(':nth-child(3) > .tab-pane > .p-4 > .card-body > [style="pointer-events: auto; opacity: 1;"] > :nth-child(1) > .col-md-12 > .page-subtitle')
        .contains('Cadastro de Procedimentos')

    cy.get('.col-md-6 > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3')
        .type('123')
    cy.get('#react-select-8-option-0').should('be.visible').click()
    cy.get(':nth-child(3) > .tab-pane > .p-4 > .card-body > [style="pointer-events: auto; opacity: 1;"] > .mb-4.row > :nth-child(2) > .form-control')
        .type('1')
    cy.get(':nth-child(3) > .tab-pane > .p-4 > .card-body > [style="pointer-events: auto; opacity: 1;"] > .mb-4.row > :nth-child(3) > .form-control')
        .type('0')
    cy.get(':nth-child(3) > .mb-5 > .checkbox-x > :nth-child(1) > :nth-child(1) > :nth-child(2) > .checkbox-component > .checkbox')
        .click()
    //envia procedimento
    cy.get(':nth-child(3) > .mb-4 > .btn-primary')
        .click()

    // 2 procedimento
    cy.get('.col-md-6 > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3')
        .type('1234')
    cy.get('#react-select-8-option-0').should('be.visible').click()
    cy.get(':nth-child(3) > .tab-pane > .p-4 > .card-body > [style="pointer-events: auto; opacity: 1;"] > .mb-4.row > :nth-child(2) > .form-control')
        .type('1')
    cy.get(':nth-child(3) > .tab-pane > .p-4 > .card-body > [style="pointer-events: auto; opacity: 1;"] > .mb-4.row > :nth-child(3) > .form-control')
        .type('0')
    cy.get(':nth-child(3) > .mb-5 > .checkbox-x > :nth-child(1) > :nth-child(1) > :nth-child(2) > .checkbox-component > .checkbox')
        .click()
    //envia procedimento
    cy.get(':nth-child(3) > .mb-4 > .btn-primary')
        .click()

    // 3 procedimento
    cy.get('.col-md-6 > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3')
        .type('512')
    cy.get('#react-select-8-option-0').should('be.visible').click()
    cy.get(':nth-child(3) > .tab-pane > .p-4 > .card-body > [style="pointer-events: auto; opacity: 1;"] > .mb-4.row > :nth-child(2) > .form-control')
        .type('1')
    cy.get(':nth-child(3) > .tab-pane > .p-4 > .card-body > [style="pointer-events: auto; opacity: 1;"] > .mb-4.row > :nth-child(3) > .form-control')
        .type('0')
    cy.get(':nth-child(3) > .mb-5 > .checkbox-x > :nth-child(1) > :nth-child(1) > :nth-child(2) > .checkbox-component > .checkbox')
        .click()
    //envia procedimento
    cy.get(':nth-child(3) > .mb-4 > .btn-primary')
        .click()

    // 4 procedimento
    cy.get('.col-md-6 > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3')
        .type('651')
    cy.get('#react-select-8-option-0').should('be.visible').click()
    cy.get(':nth-child(3) > .tab-pane > .p-4 > .card-body > [style="pointer-events: auto; opacity: 1;"] > .mb-4.row > :nth-child(2) > .form-control')
        .type('1')
    cy.get(':nth-child(3) > .tab-pane > .p-4 > .card-body > [style="pointer-events: auto; opacity: 1;"] > .mb-4.row > :nth-child(3) > .form-control')
        .type('0')
    cy.get(':nth-child(3) > .mb-5 > .checkbox-x > :nth-child(1) > :nth-child(1) > :nth-child(2) > .checkbox-component > .checkbox')
        .click()
    //envia procedimento
    cy.get(':nth-child(3) > .mb-4 > .btn-primary')
        .click()
})

Cypress.Commands.add('cadastroMateriaisMed', () => {
    cy.get(':nth-child(3) > .col-md-5 > .form-control')
        .type(faker.random.words(2))
    cy.get('.card-body > :nth-child(1) > :nth-child(3) > :nth-child(2) > .form-control')
        .type('1')
    cy.get('.card-body > :nth-child(1) > :nth-child(3) > :nth-child(3) > .form-control')
        .type('0')
    cy.get(':nth-child(1) > :nth-child(4) > .mb-3 > .checkbox-x > :nth-child(3) > .checkbox')
        .should('be.checked')
    cy.get(':nth-child(3) > .col-md-3 > .form-control')
        .type(faker.datatype.number({ 'min': 1, 'max': 9999 }))
    cy.get(':nth-child(1) > :nth-child(4) > .mb-5 > .checkbox-x > :nth-child(1) > :nth-child(1) > :nth-child(3) > .checkbox-component > .checkbox')
        .click()
    cy.get(':nth-child(1) > :nth-child(4) > .mb-4 > .btn-primary > svg')
        .click()

    // segundo material
    cy.get(':nth-child(3) > .col-md-5 > .form-control')
        .type(faker.random.words(2))
    cy.get('.card-body > :nth-child(1) > :nth-child(3) > :nth-child(2) > .form-control')
        .type('1')
    cy.get('.card-body > :nth-child(1) > :nth-child(3) > :nth-child(3) > .form-control')
        .type('0')
    cy.get(':nth-child(1) > :nth-child(4) > .mb-3 > .checkbox-x > :nth-child(3) > .checkbox')
        .should('be.checked')
    cy.get(':nth-child(3) > .col-md-3 > .form-control')
        .type(faker.datatype.number({ 'min': 1, 'max': 9999 }))
    cy.get(':nth-child(1) > :nth-child(4) > .mb-5 > .checkbox-x > :nth-child(1) > :nth-child(1) > :nth-child(3) > .checkbox-component > .checkbox')
        .click()
    cy.get(':nth-child(1) > :nth-child(4) > .mb-4 > .btn-primary > svg')
        .click()

    // terceiro material
    cy.get(':nth-child(3) > .col-md-5 > .form-control')
        .type(faker.random.words(2))
    cy.get('.card-body > :nth-child(1) > :nth-child(3) > :nth-child(2) > .form-control')
        .type('1')
    cy.get('.card-body > :nth-child(1) > :nth-child(3) > :nth-child(3) > .form-control')
        .type('0')
    cy.get(':nth-child(1) > :nth-child(4) > .mb-3 > .checkbox-x > :nth-child(3) > .checkbox')
        .should('be.checked')
    cy.get(':nth-child(3) > .col-md-3 > .form-control')
        .type(faker.datatype.number({ 'min': 1, 'max': 9999 }))
    cy.get(':nth-child(1) > :nth-child(4) > .mb-5 > .checkbox-x > :nth-child(1) > :nth-child(1) > :nth-child(3) > .checkbox-component > .checkbox')
        .click()
    cy.get(':nth-child(1) > :nth-child(4) > .mb-4 > .btn-primary > svg')
        .click()
})

Cypress.Commands.add('cadastraMedicamentoMed', () => {
    cy.get(':nth-child(3) > .col-md-4 > .form-control')
        .type(faker.random.words(2))

    cy.get('.card-body > :nth-child(1) > [style="pointer-events: auto; opacity: 1;"] > :nth-child(3) > :nth-child(2) > .form-control')
        .type('1')

    cy.get('.card-body > :nth-child(1) > [style="pointer-events: auto; opacity: 1;"] > :nth-child(3) > :nth-child(3) > .form-control')
        .type('0')

    cy.get('.card-body > :nth-child(1) > [style="pointer-events: auto; opacity: 1;"] > :nth-child(3) > :nth-child(3) > .form-control')
        .type(faker.datatype.number({ 'min': 1, 'max': 9999 }))

    cy.get('.card-body > :nth-child(1) > [style="pointer-events: auto; opacity: 1;"] > :nth-child(4) > .mb-5 > .checkbox-x > :nth-child(1) > :nth-child(1) > :nth-child(2) > .checkbox-component > .checkbox')
        .click()

    cy.get('.card-body > :nth-child(1) > [style="pointer-events: auto; opacity: 1;"] > :nth-child(4) > .mb-4 > .btn-primary')
        .click()
})

Cypress.Commands.add('validaCaracteristicas', () => {
    cy.get('.col-md-10 > :nth-child(1) > .col > .form-group')
        .contains('SADT')

    cy.get('.col-md-10 > :nth-child(1) > .col > .form-group')
        .contains('Eletiva')

    cy.get('.col > .form-group > .ml-3 > .mt-4 > :nth-child(3)').contains('Junta Médica')
})

Cypress.Commands.add('validaGuia', () => {
    
})
