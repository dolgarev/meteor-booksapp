[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

# BooksApp (meteor-booksapp)

A simple book management application built with Meteor and React (Meteor 1.4 / React / Sematic UI React / Griddle).

## Features

*   **User Accounts:** User authentication and management.
*   **Book Management:** Add, update, remove, and display books.
*   **ISBN Lookup:** Utilizes `node-isbn` for retrieving book information based on ISBN.
*   **Responsive UI:** Built with Semantic UI React for a modern and responsive user interface.
*   **Logging:** Integrates Winston for server-side logging.

## Technologies Used

*   **Framework:** Meteor
*   **Frontend:** React, Semantic UI React
*   **Database:** MongoDB (default for Meteor)
*   **Authentication:** bcrypt
*   **ISBN Integration:** `node-isbn`
*   **Logging:** Winston

## Getting Started

To run the application, ensure you have Meteor installed.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd meteor-booksapp
    ```
2.  **Install dependencies:**
    ```bash
    meteor npm install
    ```
3.  **Start the application in development mode:**
    ```bash
    npm run startd
    ```
    or for production settings:
    ```bash
    npm start
    ```

The application will typically run on `http://localhost:3000`.
