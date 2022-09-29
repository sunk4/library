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

  it('go to students and add student to library ', () => {
    cy.contains('Students').click()
    cy.contains('button', 'Add Student to library').click()
    cy.get('input[placeholder="First name"]').clear().type('Roman')
    cy.get('input[placeholder="Last name"]').clear().type('Trnka')
    cy.contains('button', 'Submit').click()
  })

  it('open details about student', () => {
    cy.contains('Open details').click()
    cy.go('back')
    cy.contains('Students').click()
  })

  it('delete student', () => {
      cy.contains('Students').click()
      cy.get("div[data-cy='section-user']")
        .last()
        .within(() => {
          cy.contains('button', 'Delete student').click()
        })
    })
})
