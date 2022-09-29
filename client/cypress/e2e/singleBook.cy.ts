describe('single library', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('Open details').click()
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

  it("edit book and close modal", () => {
    cy.contains('button', 'Edit book').click()
     cy.contains('button', 'Close').click()
  })
  
  
  it("edit book", () => {
    cy.contains("button", "Edit book").click()
    cy.get('input[placeholder="Book name"]').clear().type('Harry potter')
    cy.get('input[placeholder="Description"]').clear().type('book about young wizard')
    cy.contains("button", "Submit").click()
    cy.get("p").contains('book about young wizard')
  })
  
})
