describe('home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('create a new library', () => {
    cy.contains('button', 'Create a library').should('be.visible').click()
    cy.contains('h2', 'Create a new library').should('be.visible')
    cy.get('input[placeholder="Library name"]').type('Library test')
    cy.get('input[placeholder="Address"]').type('Riazanska 42')
    cy.get('input[placeholder="Phone Number"]').type('0950123456')
    cy.contains('button', 'Submit').click()
    cy.contains('h2', 'Library test').should('be.visible')
  })

  it("check if library was created and deleted it", () => {
    cy.get("div[class='library-section']").contains('h2','Library test').parent().within(() => {
      cy.get("button").click()
    })
    cy.contains('h2', 'Library test').should('not.exist')

  })

  it("visit single library and go back", () => {
    cy.contains("Open details").click()
    cy.go('back') 
  })

})


