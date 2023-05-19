import 'cypress-file-upload';

it('Cadastrar protocolo - analistateste', () => {
    cy.visit('https://dev.analyticare.com.br/authentication/login')
    //login
    cy.get(':nth-child(1) > .mb-3 > .form-control').type(Cypress.env('analista'));
    cy.get(':nth-child(2) > .mb-3 > .form-control').type(Cypress.env('password'));
    cy.get('.button-login > .btn').click();
    //esperar a pagina carregar
    cy.url({ timeout: 10000 }).should('include', '/protocolos/listar');

    //clicar em novo protocolo
    cy.get('.bg-white > :nth-child(2) > :nth-child(2)').click();

    // escreve Operadora teste no select
    cy.get('.pb-4 > .card-body > :nth-child(2) > .col-md-3 > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('Teste', { delay: 100 });

    cy.get('#react-select-2-option-0').click();

    //seleciona o plano para Regulamentado e valida o select
    cy.get(':nth-child(2) > .col-md-2 > .form-control-input > .d-flex > .form-control').select('Regulamentado')
    cy.get(':nth-child(2) > .col-md-2 > .form-control-input > .d-flex > .form-control').contains('Regulamentado')
    cy.get(':nth-child(2) > .col-md-2 > .form-control-input > .d-flex > .form-control').contains('Não Regulamentado')

    //clica em SADT
    cy.get(':nth-child(1) > .form-control-input > .flex-column > :nth-child(2) > .input-radio-box').click();

    //valida se existem todos os campos
    cy.get('.pb-4 > .card-body > .pt-5 > :nth-child(1)').contains('SADT')
    cy.get('.pb-4 > .card-body > .pt-5 > :nth-child(1)').contains('Internação')

    cy.get('.pb-4 > .card-body > .pt-5').within(() => {
        cy.contains('Eletivo')
        cy.contains('Urgente')
        cy.contains('Pré-Operatório')
        cy.contains('Pós-Operatório')
        cy.contains('Análise de Código')
        cy.contains('Negociação')
        cy.contains('Não realizar')
        cy.contains('Tentativa de Consenso')
    })

    //seleciona análise de código e negociação e valida se apareceu as opções de faturamento
    cy.get(':nth-child(1) > .input-checkbox-box')
    cy.get(':nth-child(2) > .input-checkbox-box').click();
    cy.get('.pt-5 > :nth-child(6)').contains('Direto')
    cy.get('.pt-5 > :nth-child(6)').contains('Prestador')


    // Inforamções da guia, valida os campos e preenche corretamente com a data do dia atual.
    cy.get('.active > :nth-child(2) > .card-body > :nth-child(2)')
        .should('contain', 'Número da Guia*')
        .should('contain', 'Data de Atendimento*')
        .should('contain', 'Senha')
        .should('contain', 'Prazo ANS')
        .should('contain', 'Especialidade');


    cy.get('.card-body > :nth-child(2) > :nth-child(1) > .form-control-input > .form-control')
        .type('123456');

    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    cy.get('.card-body > :nth-child(2) > :nth-child(2) > .form-control-input > .form-control').type(formattedDate);

    cy.get('.card-body > :nth-child(2) > :nth-child(3) > .form-control-input > .form-control')
        .type('123');
    cy.get(':nth-child(2) > .card-body > :nth-child(2) > .col-md-3 > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control')
        .type('Cardiologia');

    cy.get('#react-select-3-option-0')
        .contains('CARDIOLOGIA')
        .click();


    //Dados do BEN
    // cy.cadastraBenef()
    //preenche o cpf com 123 e clica no cpf teste
    cy.get('.active > :nth-child(3) > .card-body > .mb-5 > .flex-column > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('1')

    cy.get('#react-select-4-option-0')
        .should('have.text', 'teste aaaaaaaa aaa (086.340.169-43)')
        .click()


    //seleciona o MA 
    cy.get(':nth-child(4) > .card-body > :nth-child(2) > .flex-column > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('1')

    cy.get('#react-select-5-option-0')
        .should('have.text', 'Felipe Goulart (CRO/SC - 197612)')
        .click()
    // cy.get('#react-select-5-option-0').click();

    //escreve algo na solicitação:
    cy.get('.textarea-input').type('!@#$%¨&*()_+{}`^?:><|\*+-/')
    cy.get('.switch-box-checked').click();

    // insere o pdf teste
    cy.get('.col-md-12 > .w-100 > .d-flex > :nth-child(2)').click();

    cy.get('.custom-file-label').selectFile('cypress/fixtures/teste.pdf');

    //seleciona o tipo
    cy.get(':nth-child(2) > .d-flex > .form-control').contains('Exame')
    cy.get(':nth-child(2) > .d-flex > .form-control').contains('Orçamento')
    cy.get(':nth-child(2) > .d-flex > .form-control').contains('Pedido do Procedimento')
    cy.get(':nth-child(2) > .d-flex > .form-control').contains('Relatório do Profissional Assistente')
    cy.get(':nth-child(2) > .d-flex > .form-control').contains('Outros')
    cy.get(':nth-child(2) > .d-flex > .form-control').select('Outros')
    cy.get('.pt-0 > .gutter-x-14 > .false > .form-control').type('Teste !@#$%¨&*()`^{}')

    //clicar em enviar anexo
    cy.get('.w-50 > .btn').click();

    //sai da pagina de anexo
    cy.get('.active > .pt-0 > .justify-content-center > .d-flex > :nth-child(2)').click();

    //cadastra procedimento
    cy.cadastrarProcedimento()

    //avança proxima aba
    cy.get('.active > .pt-0 > .w-100.justify-content-center > .d-flex > :nth-child(2)').click();

    // preenche o campo de materiais
    cy.preencherFormulario();

    //fecha botao de editar material
    cy.get(':nth-child(2) > .rt-tr > [style="justify-content: center; flex: 35 0 auto; width: 35px;"] > .d-flex > .action-buttons > :nth-child(1) > .btn')
        .click();

    //  concluir
    cy.get('.active > .pt-0 > .w-100.row > .d-flex > :nth-child(2)', { timeout: 5000 })
        .click();


    cy.wait(2000)

    let protocolo = ''
    cy.get('.modal-title > b')
        .invoke('text')
        .then((text) => {
            Cypress.env('protocoloFinal', text);
            protocolo = text
            console.log(protocolo)
            cy.get('.modal-content > .modal-footer', { timeout: 5000 }).contains('Confirmar').click();
            cy.url({ timeout: 10000 }).should('include', '/protocolos/listar')
            cy.get('.rt-tbody')
                .contains(protocolo)
                .click()
            cy.get('.pro-pic > .rounded-circle')
                .click()
        });
    cy.end()
});
it('Pré-Análise(administrativo)', () => {
    cy.visit('https://dev.analyticare.com.br/authentication/login')
    //login
    cy.get(':nth-child(1) > .mb-3 > .form-control').type(Cypress.env('administrativo'));
    cy.get(':nth-child(2) > .mb-3 > .form-control').type(Cypress.env('password'));
    cy.get('.button-login > .btn').click();
    cy.url({ timeout: 100000 }).should('include', '/protocolos/listar');

    // clica no protocolo    
    const protocoloFinal = Cypress.env('protocoloFinal');
    // usa o valor para fazer alguma coisa, como clicar em um elemento que contém esse texto
    cy.get('.rt-tbody').contains(protocoloFinal).click();

    cy.get('.breadcrumb-body').then($breadcrumb => {
        if ($breadcrumb.text().includes('Iniciar Pré-Análise')) {
            cy.contains('Iniciar Pré-Análise').click()
        }
    })

    cy.get(':nth-child(1) > .service-guide-title > :nth-child(2)')
        .click()

    cy.caracteristicas_alteracao_validacao()
    cy.wait(500)

    //edita e valida o beneficiario
    cy.EditaEValidaBenef()


    cy.get(':nth-child(3) > .service-guide-title > :nth-child(2) > svg > path')
        .click()

    //TROCA O MÉDICO BUSCANDO POR MÉDICO E SELECIONA E VALIDA SE SALVOU.
    cy.get(':nth-child(1) > .flex-column > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
        .type('Médico')

    cy.get('#react-select-5-option-1')
        .click()

    cy.get('.pt-2 > .justify-content-end > .align-items-center')
        .click()

    // valida se é o médico pelo CRM
    cy.get('#registroClasse')
        .should('have.value', '22222')

    //insere prestador e valida
    // cy.cadastraPrestador()// erro TASK CRIADA 
    cy.get('.card-nav-stepper > .m-0 > :nth-child(2)')
        .click()

    // INSERE UM ANEXO
    cy.get('.gutter-x-14 > :nth-child(1) > .custom-file > .custom-file-label')
        .selectFile('cypress/fixtures/teste.pdf');
    cy.wait(500)
    cy.get('.gutter-x-14 > :nth-child(2) > .d-flex > .form-control')
        .select('Exame')
    cy.get('.pt-0 > .gutter-x-14 > .false > .form-control')
        .type('Foi inserido Automático')
    cy.get('.w-50 > .btn')
        .click()

    // VALIDA SE SALVOU O ANEXO
    cy.get('.pt-0 > div.hide-responsive')
        .contains('Foi inserido Automático')

    // vai para pedido medico
    cy.get('.m-0 > :nth-child(3) > .color-link')
        .click()

    // envia para Analise Tecnica
    cy.get('.breadcrumb-body').then($breadcrumb => {
        const $button = $breadcrumb.find('.mr-5 > .d-flex > .btn-primary');

        if ($button.length > 0) {
            cy.get('.mr-5 > .d-flex > .btn-primary')
                .click()
            cy.get('.pro-pic > .rounded-circle')
                .click()

        } else {

            cy.get('.pro-pic > .rounded-circle')
                .click()

            cy.get('.modal-user-button')
                .click()
        }
    });
})

it('Análise Ténica analista', () => {

    cy.visit('https://dev.analyticare.com.br/authentication/login')
    //login
    cy.get(':nth-child(1) > .mb-3 > .form-control').type(Cypress.env('analista'));
    cy.get(':nth-child(2) > .mb-3 > .form-control').type(Cypress.env('password'));
    cy.get('.button-login > .btn').click();

    cy.url({ timeout: 100000 }).should('include', '/protocolos/listar');
    cy.wait(1500)
    cy.get('.rt-tbody').scrollIntoView();

    //seleciona o ultimo protocolo cadastrado
    const protocoloFinal = Cypress.env('protocoloFinal');
    cy.get('.rt-tbody').contains(protocoloFinal).click();

    cy.get('.breadcrumb-body').then($breadcrumb => {
        if ($breadcrumb.text().includes('Iniciar Análise Técnica')) {
            cy.get('.mr-5 > .d-flex > .btn-primary')
                .click()
        }
    })
    //clica em Análise Técnica
    cy.get('.m-0 > :nth-child(4)')
        .contains('Análise Técnica')
        .click()

    cy.get('.active > :nth-child(1) > :nth-child(3) > .btn')
        .click()

    cy.get('.editorClassName')
        .find('.public-DraftStyleDefault-block span')
        .invoke('text', '123');

    cy.wait(3000)
    //analisa os materiais
    cy.Analisa_materiais()

    cy.get('.breadcrumb-body').then($breadcrumb => {
        if ($breadcrumb.text().includes('Enviar para Revisão')) {
            cy.get('.mr-5 > .d-flex > .btn-primary')
                .click()
        }
    })
})
