describe('Testing Login', () => {
  it('Logs in and out successfully', () => {
    cy.visit('http://localhost:3000')

    cy.get('.intro-fs .dark-fs')
      .click({ force: true })

    cy.get('.login-icon-container')
      .click({ force: true })

    cy.get('.login-container [name=email]')
      .type('anna@mail.com')

    cy.get('.login-container [name=pwd]')
      .type('123')
    
    cy.get('.login-container [type=submit]')
      .click()
    
    cy.get('.login-container .success', {timeout:50000})
    .should('exist')

    cy.get('.login-icon-container')
      .children()
      .first()
      .contains('Anna')
  })

  it('Does not log in successfully', () => {
    cy.visit('http://localhost:3000')

    cy.get('.login-icon-container')
      .click({ force: true })

    cy.get('.login-container [name=email]')
      .type('anna@mail.com', { force: true })

    cy.get('.login-container [name=pwd]')
      .type('1234', { force: true })
    
    cy.get('.login-container [type=submit]')
      .click({ force: true })
    
    cy.get('.login-container .error')
    .should('have.text', 'Password and email do not match.')

    cy.get('.login-container')
      .should('exist')

  })

})