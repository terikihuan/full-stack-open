describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
    // create here users to backend
    const admin = {
      name: "admin",
      username: "admin",
      password: "root",
    }
    const user = {
      name: "Huan Zhao",
      username: "terikihuan",
      password: "1234",
    }
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, admin)
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user)
    cy.visit("")
  })

  it("Login form is shown", function () {
    cy.get("[data-cy='loginForm']")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      const username = "terikihuan"
      const password = "1234"
      cy.get("[data-cy='username']").type(username)
      cy.get("[data-cy='password']").type(password)
      cy.get("[data-cy='loginForm']").get("button").click()
      cy.contains("login successful")
    })

    it("fails with wrong credentials", function () {
      const username = "terikihuan"
      const password = "wrong"
      cy.get("[data-cy='username']").type(username)
      cy.get("[data-cy='password']").type(password)
      cy.get("[data-cy='loginForm']").get("button").click()
      cy.get("[data-cy='notification']")
        .should("contain", "invalid")
        .and("have.css", "color", "rgb(255, 0, 0)")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      // log in user here
      const username = "admin"
      const password = "root"
      cy.login(username, password)
    })

    it("A blog can be created", function () {
      // ...
      cy.contains("new blog").click()

      const title = "A blog created via Cypress"
      const author = "Cypress"

      cy.get("[data-cy='titleInput']").type(title)
      cy.get("[data-cy='authorInput']").type(author)
      cy.get("[data-cy='urlInput']").type("cypress.com")
      cy.get("[data-cy='createBlogBtn']").click()

      cy.get("[data-cy='blogs']").contains(`${title} by ${author}`)
    })

    describe("and several blogs exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog, most likes",
          author: "admin",
          url: "test.com",
          likes: 10,
        })
        cy.createBlog({
          title: "second blog, no likes",
          author: "admin",
          url: "test.com",
          likes: 0,
        })
        cy.createBlog({
          title: "third blog, second most likes",
          author: "admin",
          url: "test.com",
          likes: 3,
        })
      })

      it("user can like a blog", function () {
        cy.contains("view").first().click()
        cy.get("[data-cy='likes']")
          .first()
          .then(($div) => {
            const like = parseInt($div.contents()[1].textContent)
            cy.get("button").contains("like").click()
            cy.contains(`likes ${like + 1}`)
          })
      })

      it("user who created the blog can delete it", function () {
        cy.contains("logout")
        cy.login("terikihuan", "1234")

        const title = "My blog"
        const author = "Huan"
        cy.createBlog({
          title,
          author,
          url: "huan.com",
        })
        cy.contains(`${title} by ${author}`).contains("view").click()
        cy.contains("delete").click()
        cy.contains(`${title} by ${author}`).should("not.exist")
      })

      it("user cannot see the delete button in others' blog posts", function () {
        cy.contains("logout")
        cy.login("terikihuan", "1234")
        cy.contains("view").click()
        cy.get("button").contains("delete").should("not.exist")
      })

      it.only("blogs are sorted by likes", function () {
        cy.get("[data-cy='blog']").eq(0).should("contain", "most likes")
        cy.get("[data-cy='blog']").eq(1).should("contain", "second most likes")
      })
    })
  })
})
