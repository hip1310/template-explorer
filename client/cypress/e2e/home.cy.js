describe("Home page", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000");
  });

  it("assert header is available", () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert header is available,
    cy.get("header").should("be.visible");
  });

  it("previous page navigation disabled", () => {
    cy.get(".previous").should("have.class", "disabled");
  });

  it("next page navigation disabled on last page", () => {
    //clicked three times because we have 15 records which will be divided by 4. So there will be 4 thumbnails in first 3 page and for 3 thumbnails in 4th page.
    cy.get(".next").click();
    cy.get(".next").click();
    cy.get(".next").click();
    cy.get(".active").invoke("attr", "title").should("eq", "7160");
    cy.get(".next").should("have.class", "disabled");
  });

  it("Click on thumbnail and show details",()=>{
    cy.get('[title="7112"]').click();
    cy.get('[id="7112"]').should("have.text","ID # 7112")
    
  })

  it("go to last page", () => {
    //clicked three times because we have 15 records which will be divided by 4. So there will be 4 thumbnails in first 3 page and for 3 thumbnails in 4th page.
    cy.get(".next").click();
    cy.get(".next").click();
    cy.get(".next").click();
    cy.get(".active").invoke("attr", "title").should("eq", "7160");
  });
});
