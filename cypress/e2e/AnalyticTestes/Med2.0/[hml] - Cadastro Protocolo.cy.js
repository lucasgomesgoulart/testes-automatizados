describe('OperadoraTeste - Cadastro', () => {
    beforeEach(() => {
        cy.visit('https://hml.advicemed.com.br/authentication/login')
    })

    it('Operadora Teste - Cadastro', () => {
        cy.loginMed(Cypress.env('operadoraTeste'), Cypress.env('password'))

        // clica em novo protocolo
        cy.get('.left-sidebar').contains('Novo Cadastro').click()

        // adiciona o comando para ignorar o erro
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('Cannot convert undefined or null to object')) {
                console.log('Application Error Cannot convert undefined or null to object')
                return false;
            }
            return true
        })

        cy.get('.col-md-4 > .checkbox-x > :nth-child(1) > :nth-child(1) > .checkbox-component > .input-radio-box').click()
        cy.get('col-md-2').contains('SADT')
        cy.get('col-md-2').contains('Internação')
    })
})