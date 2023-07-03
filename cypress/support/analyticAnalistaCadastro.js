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
let dadosAnexos

Cypress.Commands.add('loginAnalyticHML', (username, password) => {
    cy.get('input[name="username_or_email"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('.button-login > .btn').click();
    // Esperar a página carregar
    cy.wait(1500)

    cy.get('input[name="username_or_email"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('.button-login > .btn').click();
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
                'ACUPUNTURA', 'ALERGIA E IMUNOLOGIA', 'ANESTESIOLOGIA', 'ANGIOLOGIA', 'ANGIOLOGIA E CIRURGIA VASCULAR', 'CARDIOLOGIA', 'CIRURGIA CARDIOVASCULAR',
                'CIRURGIA DA MAO', 'CIRURGIA DE CABEÇA E PESCOÇO', 'CIRURGIA DO APARELHO DIGESTIVO', 'CIRURGIA E TRAUMATOLOGIA BUCO-MAXILO-FACIAIS',
                'CIRURGIA GERAL', 'CIRURGIA ONCOLOGICA', 'CIRURGIA PLASTICA', 'CIRURGIA TORACICA', 'CIRURGIA VASCULAR', 'CIRURGIAO DENTISTA',
                'CLINICA MEDICA', 'COLOPROCTOLOGIA', 'DERMATOLOGIA', 'DIAGNÓSTICO POR IMAGEM', 'ENDOCRINOLOGIA E METABOLOGIA', 'GASTROENTEROLOGIA',
                'GENETICA MEDICA', 'GERIATRIA', 'GINECOLOGIA E OBSTETRICIA', 'HEMATOLOGIA E HEMOTERAPIA', 'INFECTOLOGIA', 'MASTOLOGIA',
                'MEDICINA DE FAMILIA E COMUNIDADE', 'MEDICINA DE TRAFEGO', 'MEDICINA DE URGENCIA', 'MEDICINA DO TRABALHO', 'ORTOPEDIA E TRAUMATOLOGIA',
                'MEDICINA INTENSIVA', 'MEDICINA LEGAL E PERICIA MEDICA', 'MEDICINA PREVENTIVA E SOCIAL', 'NEFROLOGIA', 'PNEUMOLOGIA',
                'NEUROCIRURGIA', 'NEUROLOGIA', 'NUTROLOGIA', 'OBSTETRICIA', 'OFTALMOLOGIA', 'ONCOLOGIA CLINICA', 'OTORRINOLARINGOLOGIA',
                'PSIQUIATRIA', 'RADIOLOGIA E DIAGNOSTICO POR IMAGEM', 'RADIOTERAPIA', 'REUMATOLOGIA', 'UROLOGIA', 'CANCEROLOGIA', 'PEDIATRIA',
                'CANCEROLOGIA/CANCEROLOGIA CIRURGICA', 'CANCEROLOGIA/CANCEROLOGIA PEDIATRICA', 'CIRURGIA PEDIATRICA', 'DISFUNCAO TEMPOROMANDIBULAR E DOR OROFACIAL (ODONTOLOGIA)',
                'HABILITACAO EM ANALGESIA RELATIVA OU SEDACAO CONSCIENTE COM OXIDO NITROSO', 'HABILITACAO EM ODONTOLOGIA HOSPITALAR', 'MEDICINA FISICA E REABILITACAO', 'MEDICINA NUCLEAR',
                'MEDICO SEM ESPECIALIDADE REGISTRADA', 'NEUROLOGIA PEDIATRICA', 'RADIOLOGIA', 'Ortopedia e traumatologia- joelho', 'Cirurgia bucomaxilo facial',
            ];

            const indiceAleatorio = Math.floor(Math.random() * especialidades.length);
            dadosGuia.especialidade = especialidades[indiceAleatorio].toUpperCase();
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

    Cypress.env('guia', Cypress.env('guia') || []);
    Cypress.env('guia').push(dadosInformacoesGuia);
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

    Cypress.env('beneficiario', Cypress.env('beneficiario') || []);
    Cypress.env('beneficiario').push(dadosBeneficiario);
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

    cy.get('.input-textarea').type(textoMedico)

    dadosProfAssistente = profAssistente;

    Cypress.env('profAssistente', Cypress.env('profAssistente') || []);
    Cypress.env('profAssistente').push(dadosProfAssistente);
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

    cy.get('.py-5 > :nth-child(2) > .form-control-input > .d-flex > .form-control').children().eq(1).then((option) => {
        prestador.cidade = option.val()
        cy.get('.py-5 > :nth-child(2) > .form-control-input > .d-flex > .form-control').select(option.val())
    })

    dadosPrestador = prestador;

    Cypress.env('prestador', Cypress.env('prestador') || []);
    Cypress.env('prestador').push(dadosPrestador);
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

    dadosAnexos = dadosAnexo

    Cypress.env('anexo', Cypress.env('anexo') || []);
    Cypress.env('anexo').push(dadosAnexos);
})

Cypress.Commands.add('cadastraProcedimento', () => {
    let dadosProcedimentos = {}

    const procedimentos = ['10101012', '10101020', '10101039', '10102019', '10103015', '10103023', '10103031', '10104011', '10104020', '10105034', '10105042', '10105050', '10105069',
        '10105077', '10106014', '10106030', '10106049', '10106065', '10106073', '10106090', '10106103', '10106111', '10106120', '10106138', '10106146', '20101015', '20101023', '20101074',
        '20101082', '20101090', '20101104', '20101112', '20101120', '20101139', '20101155', '20101171', '20101198', '20101210', '20101228', '20101236', '20102011', '20102020', '20102038',
        '20102062', '20102070', '20102089', '20102097', '20102100', '20102119', '20102127', '20102135', '20102143', '20103018', '20103026', '20103034', '20103042', '20103050', '20103069',
        '20103077', '20103093', '20103107', '20103115', '20103123', '20103131', '20103140', '20103158', '20103166', '20103174', '20103182', '20103190', '20103204', '20103212', '20103220',
        '20103239', '20103247', '20103255', '20103263', '20103271', '20103280', '20103298', '20103301', '20103310', '20103328', '20103336', '20103344', '20103360', '20103379', '20103387',
        '20103395', '20103409', '20103417', '20103425', '20103433', '20103441', '20103450', '20103468', '20103476', '20103484', '20103492', '20103506', '20103514', '20103522', '20103530',
        '20103549', '20103557', '20103565', '20103573', '20103581', '20103590', '20103603', '20103611', '20103620', '20103638', '20103646', '20103654', '20103662', '20103670', '20103689',
        '20103697', '20103700', '20103719', '20103743', '20103751', '20104014', '20104022', '20104049', '20104057', '20104065', '20104073', '20104081', '20104090', '20104103', '20104111',
        '20104120', '20104138', '20104146', '20104154', '20104170', '20104189', '20104197', '20104200', '20104219', '20104227', '20104235', '20104243', '20104260', '20104278', '20104294',
        '20104316', '20104324', '20104332', '20104340', '20104359', '20104367', '20104375', '20104383', '20104391', '20104405', '20104413', '20104421', '20104430', '20105010', '20105029',
        '20105037', '20201010', '20201028', '20201036', '20201044', '20201052', '20201060', '20201079', '20201087', '20201095', '20201109', '20201117', '20201125', '20201133', '20202016',
        '20202024', '20202032', '20202040', '20202059', '20202067', '20203012', '20203020', '20203047', '20203063', '20203071', '20204027', '20204035', '20204043', '20204086', '20204159',
        '20204167', '20204175', '30101018', '30101026', '30101034', '30101042', '30101050'];

    const indiceAleatorio = Math.floor(Math.random() * procedimentos.length);
    dadosProcedimentos.procedimento = procedimentos[indiceAleatorio];

    // Seleciona o procedimento
    cy.get('.d-flex.mb-5 > .flex-column > :nth-child(1) > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3').type(dadosProcedimentos.procedimento);

    cy.get('#react-select-6-option-0').should('be.visible').click();

    // Inserir
    cy.get('.procedures-button-insert').click();

    Cypress.env('procedimentos', Cypress.env('procedimentos') || []);
    Cypress.env('procedimentos').push(dadosProcedimentos);
});

Cypress.Commands.add('cadastroMateriais', () => {

    let dadosMateriais = {}
    dadosMateriais.anvisa = faker.datatype.number({ min: 10000000000 })
    cy.get(':nth-child(1) > .col-md-4 > .form-control-input > .form-control').type(dadosMateriais.anvisa)

    dadosMateriais.descricaoAnvisa = faker.commerce.productAdjective()
    cy.get('.col-md-8 > .form-control-input > .form-control').type(dadosMateriais.descricaoAnvisa)

    dadosMateriais.descricaoMaterial = faker.commerce.productDescription()
    cy.get('.col-md-6 > .form-control-input > .form-control').type(dadosMateriais.descricaoMaterial)

    dadosMateriais.valorUnitarioInicial = faker.datatype.number({ min: 99, max: 9999 })
    cy.get('.mt-4.align-items-start > :nth-child(3) > .form-control-input > .form-control').type(dadosMateriais.valorUnitarioInicial)

    cy.get('#add-material').click()

    Cypress.env('materiais', Cypress.env('materiais') || []);
    Cypress.env('materiais').push(dadosMateriais);
})

Cypress.Commands.add('FinalizaProtocolo', () => {
    cy.get('.MuiList-root > .pt-0').contains('Com Análise de Código')
    cy.get('.MuiList-root > :nth-child(2)').contains('Sem Tentativa de Consenso')
    cy.get('.MuiList-root > :nth-child(3)').contains('Com Negociação')

    let protocolo = ''
    cy.get('.modal-title > b')
        .invoke('text')
        .then((text) => {
            Cypress.env('protocoloFinal', text);
            protocolo = text
            console.log(protocolo)
            cy.get('.modal-content > .modal-footer', { timeout: 5000 }).contains('Confirmar').click();
            cy.url({ timeout: 10000 }).should('include', '/protocolos/listar')
        });
})

Cypress.Commands.add('buscaDados', () => {
    console.log(Cypress.env('materiais'))
    console.log(Cypress.env('prestador'))
    console.log(Cypress.env('guia'))
    console.log(Cypress.env('procedimentos'))
    console.log(Cypress.env('protocoloFinal'))
    console.log(Cypress.env('beneficiario'))
    console.log(Cypress.env('anexo'))
})