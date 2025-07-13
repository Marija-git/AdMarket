# AdMarket

AdMarket is a full-stack classifieds app that allows users to view, add, and manage ads in various categories. The project is built using Spring Boot for the backend and React for the frontend.

---

**Backend**:

- Java
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven

**Frontend**:

- React
- Redux Toolkit
- React Router
- Bootstrap
- Toast notifications

---

## Running the application

### Backend

1. Clone the repository
2. Navigate to the `backend` folder inside the project.
3. In the path `src/main`, create a folder named `resources` (if it doesn’t exist) and inside it create a file called `application.properties` with the following content:

```properties
  spring.application.name=task

  # PostgreSQL konekcija
  spring.datasource.url=jdbc:postgresql://localhost:5432/AdMarketDb
  spring.datasource.username=your_db_username
  spring.datasource.password=your_db_password

  # Hibernate (JPA) postavke
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.show-sql=true
  spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

  server.error.include-message=always

  # JWT secret (primer vrednosti)
  jwt.secret=rqXJEDqZ1vW4KN1OIgk1P2tE4lA7vQdI5XHfaSmfW1A=
```

4. Open a terminal (CMD) at the backend folder path and run: mvnw spring-boot:run. The application will be available at: http://localhost:8080
5. You can also access Swagger at http://localhost:8080/swagger-ui/index.htm
6. Or simply open the project in IntelliJ Community Edition and click Run.

### Frontend

1. Go to the location where the frontend app is located
2. Open CMD and type: code .
3. In the VS Code terminal, run: npm install
4. To start the application: npm start
5. The app will run at: http://localhost:3000

### Notes

- A local PostgreSQL database named AdMarketDb must exist.
- The application.properties file is not included in the repository and must be added manually (instructions above).
- The jwt.secret value in the application.properties file is just a sample and can be changed as needed.
- When the application starts for the first time, seed data will automatically be inserted into the database using the SeedData configuration. This data will only be inserted if the database has no users or ads.
- Seed data includes 10 users and 100 ads. Each user's password is the same as their username (e.g. username: marko, password: marko).

## How to test the application

### Login

When the application starts, a login form is displayed. A link to register (signup) is also available on the same page.

- To log in, you can use one of the pre-seeded users, for example:

  - `username: marko`
  - `password: marko`

- After successful login, the user is redirected to /Homepage.

#### Signup

Clicking the signup link opens a form where you must enter:

- `username` (mora biti jedinstven)
- `password`
- `phone`

After successful registration, the user is automatically redirected to /homepage.

---

### Homepage

On the /homepage page, you'll find:

- **Navbar** that shows:

  - the logged-in user's username
  - a button to add a new ad
  - a logout button

- Clicking Add new ad opens a modal dialog with a form:

  - All fields are required except description and imageUrl.

- Clicking Logout logs the user out and returns them to the login screen.

---

### Ads display

- Below the navigation bar, all ads are displayed with filtering options.
- Pagination is shown at the bottom — 20 ads per page.

#### Editing and deleting ads

- The table contains Edit and Delete buttons, but they are only shown for ads created by the currently logged-in user.
- Clicking on an ad title opens a detail modal:

  - If the ad belongs to the user:
    - the modal shows Edit and Delete buttons
  - If not:
    - buttons are hidden

#### Edit ad

- Clicking Edit opens a form with the ad's existing data.
- After editing, clicking save updates the ad.

#### Delete ad

- Clicking Delete opens a confirmation dialog.
- After confirmation, the ad is deleted.

---

### What still needs to be improved / fixed

- [ ] **Build frontend** – npm run build needs to be tested.
- [ ] **Reset filters** – especially after adding a new ad, all filters (including category) should reset.
- [ ] **Error display on frontend** – use Toast to display errors returned by the backend for better user experience.
- [ ] **Improve backend error handling** – more detailed messages, status codes, and validation to support proper frontend display.
- [ ] **Console errors and warnings** – remove all warnings and errors from the frontend console.
