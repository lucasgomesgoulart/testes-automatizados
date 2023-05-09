import 'cypress-file-upload';

describe('Analytic Care', () => {
    beforeEach(() => {
        cy.visit('https://dev.analyticare.com.br/authentication/login')
    })

    it('fazer login', () => {

        //login
        cy.get(':nth-child(1) > .mb-3 > .form-control').type('analistateste');
        cy.get(':nth-child(2) > .mb-3 > .form-control').type('Teste@123');
        cy.get('.button-login > .btn').click();

        //esperar a pagina carregar
        cy.url().should('include', '/protocolos/listar');

        //clicar em novo protocolo
        cy.get('.bg-white > :nth-child(2) > :nth-child(2)').click();

        // escreve Operadora teste no select
        cy.get('.pb-4 > .card-body > :nth-child(2) > .col-md-3 > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3')
            .type('Operadora Teste');

        //Seleciona a operadora teste
        cy.get('.css-26l3qy-menu')
            .contains('Operadora Teste')
            .click();

        //seleciona o plano para Regulamentado e valida o select
        cy.get(':nth-child(2) > .col-md-2 > .form-control-input > .d-flex > .form-control').select('Regulamentado')
        cy.get(':nth-child(2) > .col-md-2 > .form-control-input > .d-flex > .form-control').contains('Regulamentado')
        cy.get(':nth-child(2) > .col-md-2 > .form-control-input > .d-flex > .form-control').contains('Não Regulamentado')


        //clica em SADT
        cy.get(':nth-child(1) > .form-control-input > .flex-column > :nth-child(2) > .input-radio-box').click();

        //valida se existem todos os campos
        cy.get('.pb-4 > .card-body > .pt-5 > :nth-child(1)').contains('SADT')
        cy.get('.pb-4 > .card-body > .pt-5 > :nth-child(1)').contains('Internação')
        cy.get('.pb-4 > .card-body > .pt-5').contains('Eletivo')
        cy.get('.pb-4 > .card-body > .pt-5').contains('Urgente')
        cy.get('.pb-4 > .card-body > .pt-5').contains('Pré-Operatório')
        cy.get('.pb-4 > .card-body > .pt-5').contains('Pós-Operatório')
        cy.get('.pb-4 > .card-body > .pt-5').contains('Análise de Código')
        cy.get('.pb-4 > .card-body > .pt-5').contains('Negociação')
        cy.get('.pb-4 > .card-body > .pt-5').contains('Não realizar')
        cy.get('.pb-4 > .card-body > .pt-5').contains('Tentativa de Consenso')

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
        //preenche o cpf com 123 e clica no cpf teste
        cy.get('.active > :nth-child(3) > .card-body > .mb-5 > .flex-column > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3').type('123')
        cy.get('#react-select-4-option-0').click();

        //seleciona o MA 
        cy.get(':nth-child(4) > .card-body > :nth-child(2) > .flex-column > .form-control-input > .align-items-center > .w-100 > .css-yk16xz-control > .css-1hwfws3').type('121322')
        cy.get('#react-select-5-option-0').click();


        //escreve algo na solicitação:
        cy.get('.textarea-input').type('!@#$%¨&*()_+{}`^?:><|\*+-/')


        //adiciona prestador

        const getNum = () => {
            const randomNumber = Math.floor(Math.random() * Math.pow(10, 14));
            return randomNumber
        }


        cy.get('.collapse > :nth-child(3) > :nth-child(1) > .form-control-input > .form-control').click();
        cy.get('.collapse > :nth-child(3) > :nth-child(1) > .form-control-input > .form-control').type(getNum())
        cy.get('.collapse > :nth-child(3) > :nth-child(2) > .form-control-input > .form-control').type('Teste razao social')
        cy.get('.collapse > :nth-child(3) > :nth-child(3) > .form-control-input > .form-control').type('teste nome fantasia')

        //cadastrar
        cy.get('.col-md-12 > .w-100 > .d-flex > :nth-child(2)').click();

        cy.get(':nth-child(1) > .d-flex > .form-control').attachFile('alegre.jpg');        
    });
})