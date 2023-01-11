describe('User lifetime test', () => {
  it('Go to register page throught footer link and register user by filling form', () => {
    // Open home page and go to register page
    cy.visit('http://localhost:8080/');
    cy.get('footer').contains('Register').click();

    // Redirected to register page, fill form and submit
    cy.url().should('include', '/register');
    cy.get('.user__form input[placeholder="First name"]').type(
      'cypress first name'
    );
    cy.get('.user__form input[placeholder="Last name"]').type(
      'cypress last name'
    );
    cy.get('.user__form input[placeholder="Email"]').type('cypress@email.com');
    cy.get('.user__form input[placeholder="Username"]').type(
      'cypress username'
    );
    cy.get('.user__form input[placeholder="Password"]').type(
      'cypress password'
    );
    cy.get('.user__buttons button').click();

    // Redirect to home page
    cy.url().should('include', '/');
    cy.wait(1000);
  });

  it('Go to login page, fill login form with testing user data, add league and game to favourites, add comment and then delete account', () => {
    // Go to login page
    cy.get('header button').click();

    // Redirected to login page and fill login form
    cy.url().should('include', '/login');
    cy.wait(1000);
    cy.get('.user__form input[placeholder="Username"]').type(
      'cypress username'
    );
    cy.get('.user__form input[placeholder="Password"]').type(
      'cypress password'
    );
    cy.get('.user__buttons button').click();

    // Redirected to profile page, click logo in header
    cy.url().should('include', '/profile');
    cy.wait(1000);
    cy.get('.header__logo').click();

    // Redirected to home page, add first league in table to favourites
    cy.url().should('include', '/');
    cy.wait(1000);
    cy.get('.wg-table tr:first-child td:first-child').click();

    // Add first match in table to favourites ang go to this match page
    cy.wait(1000);
    cy.get('.wg-table tr:nth-child(2) td:first-child').click();
    cy.wait(1000);
    cy.get('.wg-table tr:nth-child(2) td:nth-child(2)').click();

    // Redirected to match page, add comment
    cy.url().should('include', '/fixture');
    cy.wait(1000);
    cy.get('.comment__new textarea').type('Cypress comment test');
    cy.get('.comment__new button').click();

    // Reloaded page with added comment, click profile bar in header and go to profile page
    cy.url().should('include', '/fixture');
    cy.wait(1000);
    cy.get('.header__profile').click();
    cy.wait(1000);
    cy.get('.header__profile__dropdown li:first-child a').click();

    // Redirected to profile page, delete account
    cy.url().should('include', '/profile');
    cy.wait(1000);
    cy.get('.main-container button').click();

    // Redirect to home page
    cy.url().should('include', '/');
  });
});

describe('Admin login and delete comment test', () => {
  it('Go to admin login page, fill login form with admin data, go to admin panel and then delete first comment on the list', () => {
    // Open admin login page and go fill login form
    cy.visit('http://localhost:8080/login-admin');
    cy.url().should('include', '/login-admin');
    cy.wait(1000);
    cy.get('.user__form input[placeholder="Username"]').type('admin');
    cy.get('.user__form input[placeholder="Password"]').type('admin');
    cy.get('.user__buttons button').click();

    // Redirected to profile page, click admin panel link in footer
    cy.url().should('include', '/profile');
    cy.wait(1000);
    // cy.get('footer nav:first-child li:last-child').click();
    cy.visit('http://localhost:8080/admin');

    // Redirected to admin panel, delete first comment on the list
    cy.url().should('include', '/admin');
    cy.wait(1000);
    cy.get(
      '.comment__admin__item:first-child .comment__delete__button'
    ).click();

    // Reloaded admin panel, click profile bar and logout
    cy.url().should('include', '/admin');
    cy.wait(1000);
    cy.get('.header__profile').click();
    cy.wait(1000);
    cy.get('.header__profile__dropdown li:last-child').click();

    // // Redirect to home page
    cy.url().should('include', '/login');
  });
});
