import { faker } from "@faker-js/faker";
var fakerBr = require('faker-br');
import 'cypress-file-upload'

function gerarDataAleatoria(dataInicial, dataFinal) {
    const dataAleatoria = faker.date.between(dataInicial, dataFinal);
    const dataFormatada = dataAleatoria.toISOString().split('T')[0];
    return dataFormatada;
}

let dadosPrestador;
let dadosInformacoesGuia;
let dadosBeneficiario;
let dadosProfAssistente;
let dadosAnexo

Cypress.Commands.add('loginAnalyticHML', (username, password) => {
    cy.get('input[name="username_or_email"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('.button-login > .btn').click();
    // Esperar a página carregar
    cy.url({ timeout: 10000 }).should('include', '/protocolos/listar');
});

Cypress.Commands.add('CaracterísticasProtocolo', () => {
    cy.get('.pb-4 > .card-body > .pt-5')
    cy.contains('SADT');
    cy.contains('Internação');
    cy.contains('Eletivo');
    cy.contains('Urgente');
    cy.contains('Pré-Operatório');
    cy.contains('Pós-Operatório');
    cy.contains('Análise de Código')
    cy.contains('Negociação')
    cy.contains('Não realizar');
    cy.contains('Tentativa de Consenso');
    cy.get(':nth-child(1) > .input-checkbox-box').click()
    cy.get(':nth-child(2) > .input-checkbox-box').click()
});

Cypress.Commands.add('InformacoesGuia', () => {
    function geraDadosGuia() {
        const dadosGuia = {};
        dadosGuia.numero = faker.datatype.number({ min: 1000, max: 5000 });
        cy.get('.card-body > :nth-child(2) > :nth-child(1) > .form-control-input > .form-control').type(dadosGuia.numero);

        dadosGuia.dataAtendimento = gerarDataAleatoria('2023-01-01', '2023-06-01');
        cy.get('.card-body > :nth-child(2) > :nth-child(2) > .form-control-input > .form-control').type(dadosGuia.dataAtendimento);

        dadosGuia.senha = faker.datatype.number({ min: 999, max: 9999 });
        cy.get('.card-body > :nth-child(2) > :nth-child(3) > .form-control-input > .form-control').type(dadosGuia.senha);

        function preencherEspecialidadeAleatoria() {
            const especialidades = [
                'Neurocirurgia', 'Cirurgia geral', 'Cirurgia plástica', 'Geriatria',
                'Bucomaxilo', 'Angiologia', 'Cardiologia', 'Cirurgia da mão',
                'Cirurgia cardiovascular', 'Cirurgia torácica', 'Dermatologia',
                'Cirurgia vascular'
            ];

            const indiceAleatorio = Math.floor(Math.random() * especialidades.length);
            dadosGuia.especialidade = especialidades[indiceAleatorio];
            cy.get('.col-md-3 > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3 > .css-1wa3eu0-placeholder').type(dadosGuia.especialidade);
            cy.get('#react-select-3-option-0').contains(dadosGuia.especialidade).click();
        }
        // Preenche uma especialidade aleatória pré definida
        preencherEspecialidadeAleatoria();

        // Retorna os dados da guia
        return dadosGuia;
    }

    // Gera os dados da guia e armazena na variável dadosInformacoesGuia
    dadosInformacoesGuia = geraDadosGuia();
});


Cypress.Commands.add('Beneficiario', () => {
    const beneficiario = {}

    beneficiario.nome = fakerBr.name.findName();
    cy.get(':nth-child(3) > .card-body > :nth-child(3) > .col-md-4 > .form-control-input > .form-control').type(beneficiario.nome)

    beneficiario.cpf = fakerBr.br.cpf();
    cy.get('.card-body > :nth-child(3) > :nth-child(2) > .form-control-input > .form-control').type(beneficiario.cpf)

    beneficiario.sexo = 'Masculino'
    cy.get(':nth-child(3) > :nth-child(3) > .form-control-input > .d-flex > .form-control').select('Masculino')

    beneficiario.dataNascimento = gerarDataAleatoria('1930-01-01', '2023-06-01')
    cy.get(':nth-child(3) > :nth-child(4) > .form-control-input > .form-control').type(beneficiario.dataNascimento)

    beneficiario.numeroCarteira = faker.datatype.number({ min: 999, max: 99999 })
    cy.get(':nth-child(3) > .card-body > :nth-child(4) > .col-md-4 > .form-control-input > .form-control').type(beneficiario.numeroCarteira)

    beneficiario.validadeCarteira = gerarDataAleatoria('2022-01-01', '2023-06-1')
    cy.get(':nth-child(3) > .card-body > :nth-child(4) > .col-md-2 > .form-control-input > .form-control').type(beneficiario.validadeCarteira)

    beneficiario.email = faker.internet.email()
    cy.get(':nth-child(3) > .card-body > :nth-child(5) > .col-md-4 > .form-control-input > .form-control').type(beneficiario.email)

    beneficiario.celular = faker.phone.phoneNumber('+91 ##########')
    cy.get(':nth-child(3) > .card-body > :nth-child(5) > :nth-child(2) > .form-control-input > .form-control').type(beneficiario.celular)

    beneficiario.telefone = faker.phone.phoneNumber('+91 ##########')
    cy.get(':nth-child(3) > .card-body > :nth-child(5) > :nth-child(3) > .form-control-input > .form-control').type(beneficiario.telefone)

    dadosBeneficiario = beneficiario;
})

Cypress.Commands.add('ProfissionalAssistente', () => {
    const profAssistente = {};

    const selecionaEstadoAleatorio = () => {
        const estadosBrasileiros = [
            "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo",
            "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará",
            "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte",
            "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
        ];

        const indiceAleatorio = Math.floor(Math.random() * estadosBrasileiros.length);
        profAssistente.estado = estadosBrasileiros[indiceAleatorio];
    }

    selecionaEstadoAleatorio();

    profAssistente.nome = fakerBr.name.findName();
    cy.get(':nth-child(4) > .card-body > :nth-child(3) > .col-md-4 > .form-control-input > .form-control').type(profAssistente.nome);

    cy.get(':nth-child(3) > :nth-child(2) > .form-control-input > .d-flex > .form-control').select('CRM');

    profAssistente.registroCRM = faker.datatype.number({ min: 999, max: 999999 });
    cy.get('.card-body > :nth-child(3) > :nth-child(3) > .form-control-input > .form-control').type(profAssistente.registroCRM);

    // UF
    cy.get(':nth-child(4) > .form-control-input > .d-flex > .form-control').select(profAssistente.estado);

    profAssistente.email = faker.internet.email()
    cy.get(':nth-child(4) > .card-body > :nth-child(4) > .col-md-4 > .form-control-input > .form-control').type(profAssistente.email)

    profAssistente.celular = faker.phone.phoneNumber('+91 ##########')
    cy.get(':nth-child(4) > .card-body > :nth-child(4) > :nth-child(2) > .form-control-input > .form-control').type(profAssistente.celular)

    profAssistente.telefone = faker.phone.phoneNumber('+91 ##########')
    cy.get(':nth-child(4) > :nth-child(3) > .form-control-input > .form-control').type(profAssistente.telefone)

    const geraTexto = () => {
        return faker.lorem.paragraphs(4);
    }

    const textoMedico = faker.lorem.paragraphs(4)

    cy.get('.textarea-input').type(textoMedico)

    dadosProfAssistente = profAssistente;
});


Cypress.Commands.add('Prestador', () => {
    const prestador = {}
    prestador.cnpj = fakerBr.br.cnpj()

    cy.get(':nth-child(5) > .card-body > :nth-child(5) > :nth-child(1) > .form-control-input > .form-control')
        .type(prestador.cnpj);

    prestador.razaoSocial = faker.company.name()
    cy.get(':nth-child(5) > .card-body > :nth-child(5) > :nth-child(2) > .form-control-input > .form-control').type(prestador.razaoSocial)

    prestador.nomeFantasia = faker.company.name()
    cy.get(':nth-child(5) > .card-body > :nth-child(5) > :nth-child(3) > .form-control-input > .form-control').type(prestador.nomeFantasia)

    const selecionaEstadoAleatorio = () => {
        const estadosBrasileiros = [
            "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo",
            "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará",
            "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte",
            "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
        ];
        const indiceAleatorio = Math.floor(Math.random() * estadosBrasileiros.length);
        const estadoSelecionado = estadosBrasileiros[indiceAleatorio];
        return estadoSelecionado;
    };

    prestador.estado = selecionaEstadoAleatorio();
    cy.wait(1000)

    cy.get(':nth-child(1) > .form-control-input > .d-flex > .form-control').select(prestador.estado);
    cy.wait(1000)
    // seleciona a cidade

    cy.get('.py-5 > :nth-child(2) > .form-control-input > .d-flex > .form-control').children().eq(3).then((option) => {
        prestador.cidade = option.val()
        cy.get('.py-5 > :nth-child(2) > .form-control-input > .d-flex > .form-control').select(option.val())
    })

    dadosPrestador = prestador;
});


Cypress.Commands.add('EnviarAnexo', () => {
    let dadosAnexo = {}
    //Anexa o arquivo
    cy.get('.custom-file-label').selectFile('cypress/fixtures/teste.pdf');

    // Seleciona o tipo do anexo
    const tiposAnexos = ['Outros', 'Exame', 'Orçamento', 'Pedido do Procedimento', 'Relatório do Profissional Assistente', 'Ata do processo']
    const indiceAleatorio = Math.floor(Math.random() * tiposAnexos.length);
    dadosAnexo.tipo = (tiposAnexos[indiceAleatorio]);
    cy.get(':nth-child(2) > .d-flex > .form-control').select(tiposAnexos[indiceAleatorio])


    // Descrição
    let sentencia = faker.lorem.sentence()
    dadosAnexo.descricao = (sentencia)
    cy.get('.pt-0 > .gutter-x-14 > .false > .form-control').type(sentencia)
    cy.get('.w-50 > .btn').click()
})

Cypress.Commands.add('recuperaDados', () => {
    console.log(JSON.stringify(dadosBeneficiario))
    console.log(JSON.stringify(dadosInformacoesGuia))
    console.log(JSON.stringify(dadosProfAssistente))
    console.log(JSON.stringify(dadosAnexo))
});