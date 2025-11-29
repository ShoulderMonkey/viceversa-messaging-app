# Viceversa | Software Engineer Interview Challenge


# Viceversa Messaging App

This is a simple real-time messaging application built with Angular and NestJS.

## Features

*   User registration and authentication
*   Real-time messaging
*   Message history

## Tech Stack

*   **Frontend:** Angular
*   **Backend:** NestJS
*   **Monorepo:** Nx

## Prerequisites

*   Node.js (v20.x or higher)
*   npm (v10.x or higher)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Application

*   **Backend (API):**
    ```bash
    npm run api:dev
    ```
    The API will be running on `http://localhost:3000`.

*   **Frontend (Web):**
    ```bash
    npm run web:dev
    ```
    The frontend will be running on `http://localhost:4200`.

## Running Tests

*   **API Tests:**
    ```bash
    npm run api:test
    ```

## Architectural Choices

*   **Authentication Mechanism:** An existing, proven authentication module was integrated to expedite development. For enhanced testability and ease of demonstration, the conventional password-based authentication flow has been temporarily adjusted. It is important to note that, for the convenience of evaluation, cryptographic key files (e.g., PEM files) are included in this repository, a practice that would typically be avoided in a production environment due to security considerations.
*   **In-memory Data Store:** The application utilizes a custom, abstract repository pattern for in-memory data storage. This design choice provides a clean separation of concerns and a consistent interface for CRUD operations. It is complemented by a generic and extendable filtering class, allowing for tailored and entity-specific filtering logic while maintaining a common structure.

## Testing Strategy for Abstract Classes

*   **Abstract Repository Testing:** A dedicated abstract testing class has been implemented for abstract repositories. This approach minimizes redundant test code for common CRUD operations and facilitates extensibility with specific imports, providers, and supplementary tests as required by concrete repository implementations.
*   **Abstract Filter Testing:** The testing methodology for abstract filters focuses on validating their fundamental functionalities, including the comprehensive `matches` method, to ensure robust and accurate filtering logic across all implementations.

# Test Track
*Please read instructions carefully*

Use this file as part of the `README.md` in your repository, and invite su on github (@go-viceversa) when you're done!

## General pointers
We are looking for an experienced engineer who found the sweet spot between pragmatism and idealism.
Your challenge will be evaluated on:
 * Architectural decisions (also implied ones)
 * Test coverage 
 * Adherence to instructions  
 * Cost of further upgrades
 * Cost of maintenance
 * Readability
 * Commit history
 

**Please #1:** make it easy for us to try your project on our machines 🙏  
**Please #2:** if you start with a boilerplate/starter project make it the first commit separated from your contributions 🙏

> **Note:** To balance the need to best show what you can do and the precious time you are dedicating to us: if you want to add something that you would have included it in a real project but you can't do it in the test time constraints, feel free to mock it instead. Beats not letting us know you know 😁


## Requirements

You're building a simple messenger service.

We would like you to implement:

- a POST endpoint `/add-message` with body as follows, that adds this information to an in-memory store.  
As a **side effect**, when a message is successfully added, an event should be triggered that sends an email
 > you can mock the email sending by adding a console log "email sent to \${user} with \${message}" with a timeout of 1 second.  
You have freedom to design the `Message` object however you see fit.

**Bonus:** Generally we would like to prevent duplicate sending, but sometimes it makes sense to send a message with the same text to the same user. How can you handle this situation?

```javascript
{
    user: string,
    message: string,
}
```
example:
```javascript
{
    user: "123@email.com"
    message: "Lorem Ipsum"
}
```

- a GET endpoint `/messages` that returns the full list of user/messages, with filters by user, message body and pagination  

Note: In the future we expect more events to be triggered, of different kind (ex. event that sends an sms)! think about it

- add any kind of API authentication, explaining your choice 

- don't forget the tests!

- Please include a postman export in the repo to try your project

The requirements are very purposefully very easy so you can space and prove your competence however you see fit. Good luck! 😄