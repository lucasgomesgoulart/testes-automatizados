import 'cypress-file-upload'
import { faker } from "@faker-js/faker";

describe('Fluxo completo com doctor', () => {
    beforeEach(() => {
        cy.visit('https://dev.analyticare.com.br/authentication/login')
    })

    it('Cadastrar protocolo - analistateste', () => {
        cy.visit('https://dev.analyticare.com.br/authentication/login')
        //login
        cy.login(Cypress.env('analista'), Cypress.env('password'));

        //clicar em novo protocolo
        cy.get('.bg-white > :nth-child(2) > :nth-child(2)').click();

        // escreve Operadora teste no select
        cy.get('.pb-4 > .card-body > :nth-child(2) > .col-md-3 > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
            .type('Teste', { delay: 100 });

        cy.get('#react-select-2-option-0').should('be.visible').click();

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
        cy.get(':nth-child(1) > .input-checkbox-box').click();
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
        cy.cadastraMaterial();

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
            });
        cy.end()
    });

    it('Pré-Análise(administrativo)', () => {
        cy.login(Cypress.env('administrativo'), Cypress.env('password'));

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
        cy.get('select[name="axt_id"]')
            .should('have.value', '1')

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
        cy.intercept('GET', '/https://dev.api.analyticare.com.br/api/analyticare/product/?ana_id=1185').as('suaRequisicao');
        cy.intercept('GET', '/https://dev.api.analyticare.com.br/api/analyticare/attachment/?ana_id=1185').as('suaRequisicao');


        //selecionar doctor
        cy.get('.medical-request-main-wrapper > .justify-content-end > .btn').click()

        cy.get(':nth-child(5) > :nth-child(1) > .input-checkbox-box').click()

        //verifica se ficou visivel as info do medico
        cy.get('.doctor-care-geral-info-panel').should('be.visible')

        //verifica se o medico eh o correto
        cy.get(':nth-child(1) > .doctor-care-geral-info-wrapper > .doctor-care-geral-info-description')
            .contains('Medico desempatador teste')

        //mensagem para doctor
        cy.get('#doctorCareMessage').type(`Enviado para doctor automáticamente`)

        //solicita parecer doctor
        cy.get('.modal-content > .justify-content-end > .btn').click({ force: true })
        cy.get('.modal-content').should('not.be.visible');

    })
    it('doctorCare', () => {
        cy.visit('https://dev.analyticare.com.br/authentication/login')
        //login
        cy.login(Cypress.env('doctor'), Cypress.env('password'));
        cy.wait(1500)

        // clica no protocolo    
        const protocoloFinal = Cypress.env('protocoloFinal');
        // usa o valor para fazer alguma coisa, como clicar em um elemento que contém esse texto
        cy.get('.rt-tbody').contains(protocoloFinal).click();
        cy.wait(1500)

        //verifica se está sem acesso antes de assumir
        cy.get('.breadcrumb-body').then($breadcrumb => {
            if ($breadcrumb.text().includes('Iniciar ')) {
                cy.contains('Iniciar Análise').click()
            }
        })
        cy.validaProcedimentos()
        cy.wait(2000)
        //envia parecer


        cy.get('.breadcrumb-body').scrollIntoView()
        cy.get('.breadcrumb-body').then($elemento => {
            if ($elemento.text().includes('Enviar Parecer')) {
                cy.get('.d-flex.mr-5 > .d-flex > .btn-primary')
                    .click()
                cy.get('.swal2-popup')
                    .should('be.visible')
                cy.get('.swal2-actions').find('.swal2-confirm.swal2-styled').click({ force: true })
                cy.wait(500)
            }
        })
    })

    it('Análise Ténica analista', () => {

        cy.login(Cypress.env('analista'), Cypress.env('password'));
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

        cy.get('.m-0 > :nth-child(3)')
            .contains('Pedido Médico/Odontológico')
            .click()

        //escreve pedido medico
        cy.get('.editorClassName')
            .type('Alterando... Analise Técnica[automatic]')

        //salva
        cy.get('.medical-request-main-wrapper > .btn')
            .click()

        //clica em Análise Técnica
        cy.get('.m-0 > :nth-child(4)')
            .contains('Análise Técnica')
            .click()

        //analisa os materiais
        cy.analistaMatareial1()
        cy.analistaMatareial2()
        cy.analistaMatareial3()

        //valida se a barra está 100%
        cy.get('.materials-progress-bar').contains('100%')

        //envia para REVISAO
        cy.get('.mr-5 > .d-flex > .btn-primary').contains('Enviar para Revisão').click()
    })

    it('Revisão - supervisor', () => {
        cy.login(Cypress.env('supervisor'), Cypress.env('password'));

        cy.wait(1500)
        cy.get('.rt-tbody').scrollIntoView();

        //seleciona o ultimo protocolo cadastrado
        const protocoloFinal = Cypress.env('protocoloFinal');
        cy.get('.rt-tbody').contains(protocoloFinal).click();

        //clica em revisao
        cy.get('.m-0 > :nth-child(4) > .color-link').click()

        //clica para Iniciar Revisão
        // cy.get('.mr-5 > .d-flex > .btn-primary').click()

        //marca inconformidade no primeiro material
        cy.get('.active > :nth-child(2) > .my-3').scrollIntoView()
        cy.get('#NonConformity').first().click();

        //verifica se o titulo esta Incoformidade e clica
        cy.contains('Inconformidade').click()

        const radioButtons = [
            'Divergência na DUT',
            'Erro Ortográfico',
            'Justificativa de Pertinencia',
            'Literatura Insuficiente',
            'Preço de Referência',
            'Outro'
        ];

        cy.get('.modal-content > .py-1').then(($radioButtonContainer) => {
            radioButtons.forEach((radioButton) => {
                cy.wrap($radioButtonContainer).contains(radioButton);
            });
        });

        //clica em Divergencia na DUT
        cy.get(':nth-child(1) > .form-control-input > .flex-column > :nth-child(1) > .input-checkbox-box').click()
        cy.get(':nth-child(1) > .form-control-input > .flex-column > :nth-child(1) > .input-checkbox-box').should('be.checked')

        //escreve Mensagem de Inconformidade
        cy.get('.mt-3 > .form-control').type('Inconformidade, Divergência no DUT, automatic')

        //devolve para analista
        cy.get('.border-0 > .btn-primary').click()

        //valida status de inconformidade
        cy.get('.status-nonconformity').contains('Inconformidade')


    })

    it('Inconformidade - Analista', () => {
        cy.login(Cypress.env('analista'), Cypress.env('password'));

        // via pro protocolo
        const protocoloFinal = Cypress.env('protocoloFinal');
        cy.get('.rt-tbody').contains(protocoloFinal).click();

        cy.get('.breadcrumb-body').contains('Iniciar Análise Técnica').click()

        //valida modal e informacoes
        cy.get('.modal-content > .py-1').contains('Divergência na DUT')
        cy.get('.font-14 > .input-checkbox-box').should('be.checked')

        cy.get('.mt-3 > .font-medium').contains('Inconformidade, Divergência no DUT, automatic')

        cy.get('.border-0 > .rounded-lg').contains('Acessar Inconformidade').click()

        //vai pra tabela de materiais
        cy.get('.active > :nth-child(2) > .my-3 > .ReactTable > .rt-table > .rt-tbody').scrollIntoView()

        //abre o material
        cy.get('.active > :nth-child(2) > .my-3 > .ReactTable > .rt-table > .rt-tbody > :nth-child(1) > .flex-row > div.w-100 > .w-100 > .rt-tr > .show-pointer')
            .click()

        cy.get('.py-5')
            .should('be.visible')

        //marca nao tem pertinencia
        cy.get('.decisions-container > :nth-child(2) > .input-radio-box').click()
        cy.get('.decisions-container > :nth-child(2) > .input-radio-box').should('be.checked')

        // escreve justitifcativa
        cy.get('.mt-3.pl-0 > .form-control')
            .type('TESTE INCONFORMIDADE')
        cy.get('.mt-3.pl-0 > .form-control')
            .should('have.value', 'TESTE INCONFORMIDADE')

        //salva
        cy.get('.mb-4 > .col-lg-2 > .btn').click()

        cy.get('.breadcrumb-body').scrollIntoView()

        cy.get('.breadcrumb-body')
            .contains('Enviar para Revisão')
            .click()
    })

    it('Consenso', () => {
        cy.login(Cypress.env('supervisor'), Cypress.env('password'));

        // valida status
        cy.get('.status-waiting').contains('Aguardando Consenso')

    })
})
