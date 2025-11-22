describe('Página de Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    });

    it('deve exibir todos os elementos da interface', () => {
        cy.contains('h2', 'Entrar').should('be.visible');
        cy.get('#email').should('be.visible');
        cy.get('#senha').should('be.visible');
        cy.contains('button', 'Entrar').should('be.visible');
        cy.contains('a', 'Cadastre-se')
            .should('have.attr', 'href', '/register');
    });

    it('deve exibir erro caso o usuário tente enviar o formulário vazio', () => {
        cy.get('button[type="submit"]').click();

        cy.get('#mensagem')
            .should('exist');
    });

    it('deve simular login bem-sucedido', () => {
        cy.intercept('POST', '/auth/login', {
            statusCode: 200,
            body: { token: 'token-mockado' }
        }).as('loginSuccess');

        cy.get('#email').type('usuario@teste.com');
        cy.get('#senha').type('123456');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginSuccess')
            .its('response.statusCode')
            .should('eq', 200);
    });

    it('deve redirecionar para /register ao clicar em "Cadastre-se"', () => {
        cy.contains('a', 'Cadastre-se').click();
        cy.url().should('include', '/register');
    });
});