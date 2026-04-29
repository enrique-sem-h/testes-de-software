describe('Página Inicial - StudyHub', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('deve exibir a navbar corretamente', () => {
        cy.get('.logo-text').should('contain', 'StudyHub');
        cy.contains('a', 'Funcionalidades').should('be.visible');
        cy.contains('a', 'Como Funciona').should('be.visible');
        cy.contains('a', 'Benefícios').should('be.visible');
        cy.contains('a', 'Contato').should('be.visible');
        cy.contains('button', 'Entrar').should('be.visible');
    });

    it('deve exibir a seção hero com título, subtítulo e botões', () => {
        cy.get('.hero-title')
            .should('be.visible')
            .and('contain', 'Colaboração Infinita');

        cy.get('.hero-subtitle')
            .should('be.visible')
            .and('contain', 'Troque materiais digitais');

        cy.contains('button', 'Começar Agora').should('be.visible');
        cy.contains('button', 'Saiba Mais').should('be.visible');
    });

    it('deve exibir os cartões flutuantes', () => {
        cy.get('.floating-card.card-1').should('be.visible');
        cy.get('.floating-card.card-2').should('be.visible');
        cy.get('.floating-card.card-3').should('be.visible');
    });

    it('deve exibir seção "Por que StudyHub?" com problema e solução', () => {
        cy.contains('h2', 'Por que StudyHub?').should('be.visible');
        cy.contains('h3', 'O Problema').should('be.visible');
        cy.contains('h3', 'Nossa Solução').should('be.visible');
    });

    it('deve exibir seção de funcionalidades', () => {
        cy.contains('h2', 'Funcionalidades Principais').should('be.visible');
        cy.get('.features-grid .feature-card').should('have.length', 6);
    });

    it('deve exibir seção "Como Funciona"', () => {
        cy.contains('h2', 'Como Funciona').should('be.visible');
        cy.get('.steps .step').should('have.length', 4);
        cy.contains('h3', 'Crie sua Conta').should('be.visible');
    });

    it('deve exibir seção de perfis', () => {
        cy.contains('h2', 'Perfis do Sistema').should('be.visible');
        cy.get('.profiles-grid .profile-card').should('have.length', 2);
        cy.contains('h3', 'Estudante').should('be.visible');
        cy.contains('h3', 'Administrador').should('be.visible');
    });

    it('deve exibir seção de estatísticas', () => {
        cy.get('.stats .stat-card').should('have.length', 4);
        cy.contains('10K+').should('be.visible');
        cy.contains('50+').should('be.visible');
    });

    it('deve exibir seção de benefícios', () => {
        cy.contains('h2', 'Benefícios para Você').should('be.visible');
        cy.get('.benefits-grid .benefit').should('have.length', 4);
    });

    it('deve exibir CTA corretamente', () => {
        cy.contains('h2', 'Pronto para Transformar seu Aprendizado?').should('be.visible');
        cy.contains('button', 'Começar Gratuitamente').should('be.visible');
    });

    it('deve exibir o footer e seus links', () => {
        cy.get('.footer').should('be.visible');
        cy.contains('h4', 'StudyHub').should('be.visible');
        cy.contains('a', 'Sobre').should('have.attr', 'href');
        cy.contains('a', 'Contato').should('have.attr', 'href');
        cy.contains('a', 'Instagram').should('have.attr', 'href');
    });

    it('deve navegar para o login ao clicar em "Entrar"', () => {
        cy.contains('button', 'Entrar').click();
        cy.url().should('include', '/login');
    });
});