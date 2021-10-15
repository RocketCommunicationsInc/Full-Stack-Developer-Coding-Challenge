# Full-Stack-Developer-Coding-Challenge
As the next step in the interview process, we’d like you to complete a coding challenge.

## The Project

You will be building a basic version of a Ground Resources Management (GRM) Dashboard. There are two JSON files in this repository, *contacts.json* and *alerts.json*. Contacts (satellites) is a list of satellites in orbit and includes pertinent information about each device. Alerts is a list of unrelated status alerts with varying levels of severity. You will need to take this JSON data and persist it in a backend database. You will then develop a backend API, to be called upon by your frontend, which will display the data. This dashboard should allow registration and login of a user, requiring a password, and the user's credentials should also be persisted in your database.

The result should be a dashboard with two pages (the application can be single-page (SPA), or multiple pages):

* A registration/login page
* A main page that displays contact and alert information in a clean, user-friendly format

Because this position requires familiarity with web components, we would like you to use a web component library either of your own choice or Astro’s own web component library (https://github.com/RocketCommunicationsInc/astro/blob/main/packages/web-components/README.md). We recommend reviewing the Astro UX Design site (https://astrouxds.com/) for this project particularly if you opt to use another web component library.

Refer to the section *Astro Storybook and Sample Apps* at this link to get more details about Astro components, and to see several sample apps that may provide you with inspiration (https://astro-stencil.netlify.app/?path=/story/astro-uxds-welcome-start-here--page).

## Requirements

**Backend**
* The backend of this project can be done in the language of your choice. You are permitted to use generators such as Ruby on Rails, Flask, Express, etc …
* *contacts.json*, *alerts.json*, and *user credentials* data is persisted in a database. 
  * Each data point should have a corresponding column in the database.
  * You may use any databse tool of your choice, such as PostgresQL, MongoDB, SQLite, etc.
* API provides frontend with *contacts.json*, *alerts.json*, and *verified user credentials*.

**Frontend**
* The frontend of this project can be done in React, Vue, Svelte, Angular or native JavaScript. You are permitted to use any of these frameworks CLI generators to quickly start a project (npx create-react-app, ng new my-app, etc.)
* The application utilizes either Astro UXDS components, or Astro UXDS styling
* Login Page Reuirements
  * Authentication is required to access the application
  * User must register for a new account, or login with an existing account, to proceed to the dashboard
* Main Page/Dashboard Requirements
  * The dashboard page cleanly displays the data from *contacts.json*, *alerts.json* in two separate tables
  * The following should be displayed in the Contacts pane:
    * Display the total number of Contacts.
    * Display the total different Contact states (*contactState*).
    * For each Contact, display Name (*contactName*), Status (*contactStatus*), and Begin/End timestamp (*contactBeginTimestamp/contactEndTimestamp*).
    * Allow sorting on the name.
  * The following should be displayed in the Alerts pane:
    * Display each Alert message (*errorMessage*).
    * Display each Alert category (*errorCategory*).
    * Display each Alert time (*errorTime*).
    * Allow sorting on the category.

## Additional Information
* You are free to use any third-party libraries.
* Have fun and be as creative as you like!
* Please feel free to reach out to ask any questions (duncan@rocketcom.com).

## How to submit this challenge:
1. Fork this repository
2. Work on your solution
3. Deploy the frontend and backend of your application using free services (Netlify, Heroku, etc).
4. Create a pull request with @github/markacianfrani as the reviewer.

## Timeframe

We would like the take home challenge to be completed within 5 days. If you need more time, please reach out to us. You will not be judged on how quickly you complete the challenge.
