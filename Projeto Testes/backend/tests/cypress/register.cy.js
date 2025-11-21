describe('Página de Cadastro', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register');
    });

    it('deve exibir todos os campos do formulário', () => {
        cy.get('#name').should('be.visible');
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('#confirmPassword').should('be.visible');
        cy.contains('button', 'Cadastrar').should('be.visible');
        cy.contains('a', 'Entrar').should('have.attr', 'href', '/login');
    });

    it('deve exibir erro quando as senhas não coincidem', () => {
        cy.get('#name').type('Usuário');
        cy.get('#email').type('teste@example.com');
        cy.get('#password').type('123456');
        cy.get('#confirmPassword').type('654321');
        cy.get('button[type="submit"]').click();

        cy.get('#mensagem .error')
            .should('be.visible')
            .and('contain', 'senha');
    });

    it('deve simular criação de conta com sucesso', () => {
        cy.intercept('POST', '/auth/register', {
            statusCode: 200,
            body: { success: true }
        }).as('register'); // <-- alias

        cy.get('#name').type('usuario');
        cy.get('#email').type('test@teste.com');
        cy.get('#password').type('123456');
        cy.get('#confirmPassword').type('123456');
        cy.get('button[type="submit"]').click();

        cy.wait('@register').its('response.statusCode').should('eq', 200);
    });

});