describe('App e2e test', () => {
  it('should test App', () => {
    cy.visit('/');
    cy.get('input').should('have.value', '');
    cy.get('button').should('have.text', 'Submit');
  });

  it('should test task', () => {
    cy.get('input[type="text"]').type('Learn React')
      .should('have.value', 'Learn React');
    cy.contains('Submit').click()

    cy.get('li:last span')
      .should('have.text', 'Learn React')

    cy.get('input[type="text"]').should('have.value', '')
      .should('have.attr', 'placeholder', 'Add todo...');

    cy.get('li span:first')
      .should('have.text', 'delectus aut autem');

  })

  it('should test delete task', () => {
    cy.get('li').should('have.length', 31)
    cy.get('li:last button:last').should('have.text', 'Delete')
    cy.get('li button:last').click()
    cy.get('li:last span')
      .should('not.have.value', "Learn React")
    cy.get('li').should('have.length', 30)
  });

  it('should test toggle status', () => {
    cy.get('li:first input')
      .should('not.have.checked').click().should('have.checked', true)
  })

});
