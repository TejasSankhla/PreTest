# Backend Technical Documentation

This document outlines the structure, responsibilities, and roles of the various modules and files in the Backend codebase.

## Project Structure

The project follows a standard MVC (Model-View-Controller) architecture, with an added Repository layer for database interactions.

### `src/` Directory

The source code is organized into the following directories:

- **`config/`**: Configuration files.
- **`controllers/`**: Request handling logic.
- **`middlewares/`**: Request processing middleware.
- **`models/`**: Database schemas.
- **`repository/`**: Database access layer.
- **`routes/`**: API route definitions.
- **`utils/`**: Utility functions and helpers.

---

## Modules & Responsibilities

### 1. Configuration (`src/config/`)

- **`server-config.js`**: Loads environment variables using `dotenv` and exports them for use throughout the application. Includes keys for database, OAuth, payment gateways, etc.
- **`database.js`**: Handles the connection to the MongoDB database using Mongoose.
- **`payment-gateway.js`**: Configures and exports the Razorpay instance for payment processing.

### 2. Controllers (`src/controllers/`)

Controllers handle incoming HTTP requests, interact with the service/repository layer, and send responses.

- **`user-controller.js`**: Manages user-related operations (signup, login, profile).
- **`mentor-controller.js`**: Manages mentor-related operations.
- **`booking-controller.js`**: Handles booking creation, fetching, and updates.
- **`order-controller.js`**: Manages payment orders and transactions.

### 3. Middlewares (`src/middlewares/`)

- **`guard.js`**: Authentication middleware. Verifies JWT tokens from the request header. It distinguishes between 'user' and 'mentor' roles and attaches the corresponding entity to the request object (`req.user` or `req.mentor`).

### 4. Models (`src/models/`)

Defines the data structure and schema for MongoDB collections.

- **`user.js`**: Schema for User entities.
- **`mentor.js`**: Schema for Mentor entities.
- **`booking.js`**: Schema for Booking entities, linking users and mentors.

### 5. Repository (`src/repository/`)

Abstracts database operations, providing a clean API for the controllers to interact with the data.

- **`crud-repository.js`**: Base repository providing generic CRUD operations (create, destroy, get, getAll, update).
- **`user-repository.js`**: Extends CrudRepository for User-specific database operations.
- **`mentor-repository.js`**: Extends CrudRepository for Mentor-specific database operations.
- **`booking-repository.js`**: Extends CrudRepository for Booking-specific database operations.

### 6. Routes (`src/routes/`)

Defines the API endpoints and maps them to the appropriate controllers.

- **`index.js`**: Main router that aggregates all sub-routes (`/user`, `/mentor`, `/booking`, `/order`).
- **`user/`**: Routes for user authentication and management.
- **`mentor/`**: Routes for mentor authentication and management.
- **`booking/`**: Routes for booking operations.
- **`order/`**: Routes for order and payment operations.

### 7. Utilities (`src/utils/`)

Helper functions and external service integrations.

- **`calendar-event.js`**: Integrates with Google Calendar API to create Google Meet events for bookings.
- **`send-email.js`**: Uses the `resend` library to send confirmation emails to both clients and mentors upon successful booking.
- **`cron-job.js`**: Sets up scheduled tasks (cron jobs), likely for server health checks or cleanup.
- **`constants.js`**: Defines application-wide constants (e.g., JWT secret).
- **`helper.js`**: General utility functions.

---

## Key Workflows

1.  **Authentication**:

    - Users/Mentors login via routes in `user/` or `mentor/`.
    - Controllers use Repositories to verify credentials.
    - JWT token is generated and returned.
    - Subsequent requests use `authGuard` middleware to verify the token.

2.  **Booking Flow**:

    - User initiates a booking via `booking-controller`.
    - `booking-repository` saves the booking.
    - `calendar-event.js` creates a Google Meet link.
    - `send-email.js` sends confirmation emails with the meeting link to both parties.

3.  **Payments**:
    - `order-controller` interacts with Razorpay via `payment-gateway.js` config to create and verify orders.
