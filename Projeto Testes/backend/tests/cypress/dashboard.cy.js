describe('Página Inicial - StudyHub', () => {
    beforeEach(() => {
        cy.setCookie('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjYXJ2YWxob2VucmlxdWUzM0BnbWFpbC5jb20iLCJpYXQiOjE3NjM3NDU2OTcsImV4cCI6MTc2MzgzMjA5N30.blsIB_Lbvvefk3egTHAj45RVg8unaMgf_RJGvf412qk');
        cy.visit('http://localhost:3000/dashboard');
    });

    // HEADER
    it('deve exibir o header corretamente', () => {
        cy.get('header.app-header').first().within(() => {
            cy.contains('StudyHub').should('be.visible');
            cy.contains('Troca colaborativa de materiais').should('be.visible');

            cy.contains('Início').should('have.attr', 'href', '#home');
            cy.contains('Compartilhar').should('have.attr', 'href', '#upload');
            cy.contains('Trocar').should('have.attr', 'href', '#exchange');

            cy.get('.auth a').should('be.visible');
        });
    });

    // HERO PRINCIPAL
    it('deve exibir o hero principal com conteúdos principais', () => {
        cy.get('#home').within(() => {
            cy.contains('Compartilhe materiais e aprenda rápido!').should('be.visible');
            cy.contains('Plataforma pensada para estudantes').should('be.visible');

            cy.get('.stats .stat').should('have.length', 4);
            cy.contains('10K+').should('be.visible');
        });
    });

    // MATERIAIS EM DESTAQUE
    it('deve exibir a seção de materiais em destaque', () => {
        cy.contains('Materiais em destaque').should('be.visible');
        cy.contains('Ver Mais').should('be.visible');

        cy.get('section.section .grid').first().within(() => {
            cy.get('article.material').should('have.length.at.least', 4);
        });
    });

    it('cada material em destaque deve ter título, autor, tags e botão', () => {
        cy.get('section.section .grid article.material').each(($el) => {
            cy.wrap($el).within(() => {
                cy.get('h4').should('be.visible');
                cy.get('.meta').should('be.visible');
                cy.get('.tags').should('exist');
                cy.contains('Solicitar').should('have.attr', 'href', '#exchange');
            });
        });
    });

    // SEÇÃO DE COMPARTILHAR MATERIAL (UPLOAD)
    it('deve exibir o formulário de upload com todos os campos', () => {
        cy.get('#upload').within(() => {
            cy.get('#uploadForm').should('exist');

            cy.get('input[name="title"]').should('be.visible');
            cy.get('textarea[name="description"]').should('be.visible');
            cy.get('input[name="subject"]').should('be.visible');

            cy.get('select[name="level"]').should('be.visible');
            cy.get('select[name="type"]').should('be.visible');

            cy.get('input[type="file"]').should('be.visible');

            cy.contains('button', 'Enviar').should('be.visible');
        });
    });

    it('deve impedir envio se campos obrigatórios estiverem vazios', () => {
        cy.get('#uploadForm button[type="submit"]').click();

        // O browser deve impedir por required
        cy.get('input[name="title"]:invalid').should('exist');
        cy.get('input[name="subject"]:invalid').should('exist');
    });

    it('deve simular envio de arquivo com sucesso', () => {
        cy.intercept('POST', '/api/upload', {
            statusCode: 200,
            body: { success: true }
        }).as('upload');

        cy.get('input[name="title"]').type('Material Teste');
        cy.get('textarea[name="description"]').type('Descrição breve');
        cy.get('input[name="subject"]').type('Física');
        cy.get('select[name="level"]').select('Ensino Médio');
        cy.get('select[name="type"]').select('Apostila');

        cy.get('input[type="file"]').selectFile({
            contents: Cypress.Buffer.from('conteúdo teste'),
            fileName: 'material.pdf',
            mimeType: 'application/pdf'
        });

        cy.get('#uploadForm button[type="submit"]').click();
        cy.wait('@upload').its('response.statusCode').should('eq', 200);
    });

    // LISTA DE MATERIAIS RENDERIZADOS VIA MUSTACHE
    it('deve exibir a seção de materiais disponíveis', () => {
        cy.contains('Materiais Disponíveis').should('be.visible');
    });

    it('cada material renderizado deve conter título, autor e botão de solicitar', () => {
        cy.get('#materials article.material').each(($el) => {
            cy.wrap($el).within(() => {
                cy.get('h4').should('be.visible');
                cy.get('.meta').should('be.visible');
                cy.contains('Solicitar').should('have.attr', 'href', '#exchange');
            });
        });
    });

    it('deve exibir o footer corretamente', () => {
        cy.get('footer.site-footer')
            .should('be.visible')
            .and('contain', 'StudyHub');
    });

});