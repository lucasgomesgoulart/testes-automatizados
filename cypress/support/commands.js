import { faker } from "@faker-js/faker"

Cypress.Commands.add('login', (username, password) => {
    {
        cy.visit('/https://dev.analyticare.com.br/authentication/login')
        cy.get(':nth-child(1) > .mb-3 > .form-control').type(username);
        cy.get(':nth-child(2) > .mb-3 > .form-control').type(password);
        cy.get('.button-login > .btn').click();
        cy.wait(3000)
    }
})


Cypress.Commands.add('preencherFormulario', () => {
    cy.wrap(Array(5).fill(null)).each(() => {
        cy.get(':nth-child(1) > .col-md-4 > .form-control-input > .form-control')
            .type(faker.finance.creditCardNumber(), { delay: 100 });

        cy.get('.col-md-8 > .form-control-input > .form-control')
            .type(faker.name.findName(), { delay: 100 });

        cy.get('.col-md-6 > .form-control-input > .form-control')
            .type(faker.commerce.product());

        cy.get('.mt-4.align-items-start > :nth-child(3) > .form-control-input > .form-control')
            .type('1500', { delay: 100 });

        cy.get('#add-material').click();
    });
});


/**
 * Simula a colagem de dados no elemento especificado.
 * @param {Object} subject - O objeto Cypress que representa o elemento.
 * @param {string} pastePayload - O conteúdo a ser colado.
 */
Cypress.Commands.add('simulatePaste', { prevSubject: true }, (subject, pastePayload) => {
    try {
        cy.wrap(subject).then($destination => {
            const pasteEvent = new Event('paste', { bubbles: true, cancelable: true });
            pasteEvent.clipboardData = {
                setData: (type, data) => {
                    if (type === 'text/plain') {
                        pastePayload = data;
                    }
                },
                getData: (type) => {
                    if (type === 'text/plain') {
                        return pastePayload;
                    }
                }
            };
            $destination.dispatchEvent(pasteEvent);
        });
    } catch (error) {
        console.error('Erro ao simular a colagem de dados:', error);
    }
});
