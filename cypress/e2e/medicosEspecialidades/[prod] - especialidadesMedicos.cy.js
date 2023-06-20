describe('ValidaEspecialidade', () => {
    beforeEach(() => {
        cy.visit('https://app.advicemed.com.br/process/list')
    })

    it('login', () => {
        cy.loginMed(('lucas.goulart@advicehealth.com.br'), (Cypress.env('senhaMed')))
        cy.wait(1500)
        cy.visit('https://manager.advicehealth.com.br/dashboards/dashboard2')
        
    })
})