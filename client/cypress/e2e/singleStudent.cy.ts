describe('single library', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('Open details').click()
    cy.contains('Students').click()
    cy.contains('Open details').click()
  })

  it('edit Library', () => {
    cy.contains('Edit library').click()
    cy.get('input[placeholder="Library name"]').clear().type('Library test')
    cy.get('input[placeholder="Address"]').clear().type('Riazanska 42')
    cy.get('input[placeholder="Phone Number"]').clear().type('0950123456')
    cy.contains('button', 'Submit').click()
    cy.get('h1').should('contain', 'Library test')
  })

  it('edit user and close modal', () => {
    cy.contains('button', 'Edit user').click()
    cy.contains('button', 'Close').click()
  })

  it('edit student', () => {
    cy.contains('Edit user').click()
    cy.get('input[placeholder="First name"]').clear().type('Roman')
    cy.get('input[placeholder="Last name"]').clear().type('Trnka')
    cy.contains('button', 'Submit').click()
    cy.get('h2').should('contain', 'Roman Trnka')
  })

  it('borrow book by student and close', () => {
    cy.contains('button', 'Borrow Book').click()
    cy.contains('button', 'Close').click()
  })
})
