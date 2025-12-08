# Backend Project

This is the backend service for the application, built with Node.js and Express.

## Requirements

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)
- MongoDB (Local or Atlas connection)

## Setup Instructions

1.  **Navigate to the Backend directory:**

    ```bash
    cd Backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `Backend` directory and add the following variables:

    ```env
    PORT=3000
    Mentor_Frontend_URL=http://localhost:3001
    Client_Frontend_URL=http://localhost:3000
    Mongo_URL=mongodb://localhost:27017/your_database_name

    # Google OAuth Credentials
    CLIENT_ID=your_google_client_id
    CLIENT_SECRET=your_google_client_secret
    redirectUri=your_redirect_uri
    REFRESH_TOKEN=your_refresh_token

    # Resend API Key (Email Service)
    Resend_API_KEY=your_resend_api_key

    # Razorpay Credentials (Payment Gateway)
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ```

4.  **Run the server:**
    ```bash
    npm start
    ```
    The server will start on the port specified in the `.env` file (default is 3000).

## Scripts

- `npm start`: Starts the server using `nodemon` for development.
- `npm test`: Runs tests (currently not specified).
