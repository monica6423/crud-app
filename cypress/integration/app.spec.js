describe('Participant app', function() {

  beforeEach(function () {
    cy.fixture('participants').then(function (participants) {
        this.participants = participants
    })
  })

  it('should open the page and read 20 participants', function() {
    cy.visit('http://localhost:3001')
    cy.contains('Nord Software')
    cy.get('tr[class="list"]').should('have.length', 20)

  })

  it('can create a new participant', function() {
    cy.get('input[name="name"]').type(this.participants[0].name)
    cy.get('input[name="email"]').type(this.participants[0].email)
    cy.get('input[name="phone"]').type(this.participants[0].phone)
    cy.contains('Add new').click()
    cy.get('tbody>tr>td>div').eq(0).should('contain', this.participants[0].name)
    cy.get('tbody>tr>td>div').eq(1).should('contain', this.participants[0].email)
    cy.get('tbody>tr>td>div').eq(2).should('contain', this.participants[0].phone)
  })

  it('should show error message when submit with empty field', function() {
    cy.get('input[name="name"]').type(this.participants[0].name)
    cy.get('input[name="phone"]').type(this.participants[0].phone)
    cy.contains('Add new').click()
    cy.contains('This is a required field.')
  })

  it('can delete a participant by clicking delete button', function() {
    cy.get('tr[class="list"]').should('have.length', 21)
    cy.get('tbody>tr[class="list"]').eq(3).invoke('text').then(text => {
      const participant = text;
      cy.log(participant);
      cy.get('button[id="trash"]').eq(3).click()
      cy.get('tbody>tr[class="list"]').eq(3).invoke('text').should((text2) => {
        expect(participant).not.to.eq(text2);
      })
    });
    cy.get('tr[class="list"]').should('have.length', 20)
  })

  it('can edit a participant by clicking edit button', function() {
    let nameId
    cy.get('tbody>tr[class="list"]').eq(3).find('td').eq(0).find('div')
      .invoke('attr', 'id').then(id => {
        cy.get('button[id="pen"]').eq(3).click()
        nameId = id;
        cy.log('nameId2',nameId)
        cy.get(`input[id=${nameId}]`).clear().type(this.participants[1].name)
        cy.get('button[class="button save-button"]').click()
      });
      cy.contains(this.participants[1].name)
  })
})