import { faker } from "@faker-js/faker";
var fakerBr = require('faker-br');

// Função auxiliar para validar um campo
function validaCampo(seletor, valorEsperado, formatacao) {
    cy.get(seletor)
        .invoke('val')
        .then((valorObtido) => {
            if (formatacao) {
                // Aplica a função de formatação nos valores
                valorObtido = formatacao(valorObtido);
                valorEsperado = formatacao(valorEsperado);
            }
            // Compara os valores usando to.equal
            expect(valorObtido).to.equal(valorEsperado);
        });
}

function gerarDataAleatoria(dataInicial, dataFinal) {
    const dataAleatoria = faker.date.between(dataInicial, dataFinal);
    const dataFormatada = dataAleatoria.toISOString().split('T')[0];
    return dataFormatada;
}

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
    const beneficiario = Cypress.env('beneficiario')[0];
    console.log(beneficiario);
    //clica para editar BNF
    cy.get(':nth-child(2) > .service-guide-title > :nth-child(2)').click();

    // Valida nome
    validaCampo(':nth-child(6) > .form-control-input > .form-control', beneficiario.nome);

    // Valida número da carteira
    validaCampo('#carteiraNumber', beneficiario.numeroCarteira.toString());

    // Valida CPF
    validaCampo(
        '.service-guide-wrapper-grid-5-col > :nth-child(3) > .form-control-input > .form-control',
        beneficiario.cpf,
        (valor) => valor.replace(/\D/g, '') // Função de formatação para remover pontos e traço
    );

    // Valida data de nascimento
    validaCampo(
        ':nth-child(4) > #beneficiaryBirthDate',
        beneficiario.dataNascimento,
        (valor) => valor.replace(/-/g, '/') // Função de formatação para trocar hífen por barra
    );

    // Valida validade da carteira
    validaCampo(
        '#validityCard',
        beneficiario.validadeCarteira,
        (valor) => valor.replace(/-/g, '/') // Função de formatação para trocar hífen por barra
    );

    // Valida celular
    validaCampo(
        ':nth-child(9) > .form-control-input > .form-control',
        beneficiario.celular,
        (valor) => valor.replace(/\D/g, '') // Função de formatação para remover caracteres não numéricos
    );

    // Valida telefone
    validaCampo(
        ':nth-child(10) > .form-control-input > .form-control',
        beneficiario.telefone,
        (valor) => valor.replace(/\D/g, '') // Função de formatação para remover caracteres não numéricos
    );

    //fecha o campo
    cy.get('.service-guide-grid-item-5-col > .justify-content-end > .align-items-center').click()
    cy.wait(500)

});

Cypress.Commands.add('editaBeneficiario', () => {
    const bnfEditado = {};

    // clica pra abrir o bnf
    cy.get(':nth-child(2) > .service-guide-title > :nth-child(2)').click();

    // edita o número da carteirinha
    cy.get('#carteiraNumber')
        .invoke('val')
        .then((numeroCarteiraAntes) => {
            bnfEditado.numeroCarteira = faker.datatype.number({ min: 999, max: 99999 });
            cy.get('#carteiraNumber').clear().type(bnfEditado.numeroCarteira);
            cy.wrap(numeroCarteiraAntes).as('numeroCarteiraAntes');
        });

    // edita a validade da carteira
    cy.get('#validityCard')
        .invoke('val')
        .then((validadeCarteiraAntes) => {
            bnfEditado.validadeCarteira = gerarDataAleatoria('2022-01-01', '2023-06-1');
            cy.get('#validityCard').clear().type(bnfEditado.validadeCarteira);
            cy.wrap(validadeCarteiraAntes).as('validadeCarteiraAntes');
        });

    // edita o CPF
    cy.get('.service-guide-wrapper-grid-5-col > :nth-child(3) > .form-control-input > .form-control')
        .invoke('val')
        .then((cpfAntes) => {
            bnfEditado.cpf = fakerBr.br.cpf();
            cy.get('.service-guide-wrapper-grid-5-col > :nth-child(3) > .form-control-input > .form-control').clear().type(bnfEditado.cpf);
            cy.wrap(cpfAntes).as('cpfAntes');
        });

    // edita a data de nascimento
    cy.get(':nth-child(4) > #beneficiaryBirthDate')
        .invoke('val')
        .then((dataNascimentoAntes) => {
            bnfEditado.dataNascimento = gerarDataAleatoria('1930-01-01', '2023-06-01');
            cy.get(':nth-child(4) > #beneficiaryBirthDate').clear().type(bnfEditado.dataNascimento);
            cy.wrap(dataNascimentoAntes).as('dataNascimentoAntes');
        });

    // edita o nome
    cy.get(':nth-child(6) > .form-control-input > .form-control')
        .invoke('val')
        .then((nomeAntes) => {
            bnfEditado.nome = fakerBr.name.findName();
            cy.get(':nth-child(6) > .form-control-input > .form-control').clear().type(bnfEditado.nome);
            cy.wrap(nomeAntes).as('nomeAntes');
        });

    // edita o email
    cy.get(':nth-child(8) > #emailBnf')
        .invoke('val')
        .then((emailAntes) => {
            bnfEditado.email = faker.internet.email();
            cy.get(':nth-child(8) > #emailBnf').clear().type(bnfEditado.email);
            cy.wrap(emailAntes).as('emailAntes');
        });

    // edita o celular
    cy.get(':nth-child(9) > .form-control-input > .form-control')
        .invoke('val')
        .then((celularAntes) => {
            bnfEditado.celular = faker.phone.number('+48 #########');
            cy.get(':nth-child(9) > .form-control-input > .form-control').clear().type(bnfEditado.celular);
            cy.wrap(celularAntes).as('celularAntes');
        });

    // edita o telefone
    cy.get(':nth-child(10) > .form-control-input > .form-control')
        .invoke('val')
        .then((telefoneAntes) => {
            bnfEditado.telefone = faker.phone.number('+48 #########');
            cy.get(':nth-child(10) > .form-control-input > .form-control').clear().type(bnfEditado.telefone);
            cy.wrap(telefoneAntes).as('telefoneAntes');
        });

    // fecha o campo
    cy.get('.service-guide-grid-item-5-col > .justify-content-end > .align-items-center').click();

    // armazena o objeto bnfEditado em um alias
    cy.wrap(bnfEditado).as('bnfEditado');
});

Cypress.Commands.add('validaEditBnf', () => {
    cy.get('@bnfEditado').then((bnfEditado) => {
        // Validações usando a função validaCampo
        validaCampo(':nth-child(6) > .form-control-input > .form-control', bnfEditado.nome);
        validaCampo('#carteiraNumber', bnfEditado.numeroCarteira.toString());
        validaCampo('.service-guide-wrapper-grid-5-col > :nth-child(3) > .form-control-input > .form-control', bnfEditado.cpf, (valor) => valor.replace(/\D/g, ''));
        validaCampo(':nth-child(4) > #beneficiaryBirthDate', bnfEditado.dataNascimento, (valor) => valor.replace(/-/g, '/'));
        validaCampo('#validityCard', bnfEditado.validadeCarteira, (valor) => valor.replace(/-/g, '/'));
        validaCampo(':nth-child(9) > .form-control-input > .form-control', bnfEditado.celular, (valor) => valor.replace(/\D/g, ''));
        validaCampo(':nth-child(10) > .form-control-input > .form-control', bnfEditado.telefone, (valor) => valor.replace(/\D/g, ''));
    });
});
