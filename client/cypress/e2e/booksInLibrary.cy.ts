
describe('single library', () => {
  beforeEach(() => {
    cy.visit('/')
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

  it('close edit library', () => {
    cy.contains('Edit library').click()
    cy.contains('button', 'Close').click()
  })

  it('create a new book', () => {
    cy.contains('Create a new book').click()
    cy.get('input[placeholder="Book name"]').clear().type('Harry Potter')
    cy.get('input[placeholder="Description"]')
      .clear()
      .type('book about young wizard')
    cy.contains('button', 'Submit').click()
  })

  it('open details', () => {
    cy.contains('Open details').click()
    cy.go('back')
  })

  it('delete book', () => {
    cy.get("section[data-cy='single-book-section']")
      .last()
      .within(() => {
        cy.contains('button', 'Delete book').click()
      })
  })
})
