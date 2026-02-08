# HR Management Backend

## Setup Instructions

1. **Clone the repository**  
   Run the following command to clone the repository:

   ```bash
   git clone https://github.com/iqbalhossen0483/hr-management-backend.git
   cd hr-management-backend
   ```

2. **Install Dependencies**  
   Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**  
   Create a `.env` file in the root directory and add the required environment variables:

   ```env
    NODE_ENV=development
    PORT=8080
    API_PREFIX=api
    ORIGINS=http://localhost:3000,http://localhost:8080


    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USERNAME=postgres
    DATABASE_PASSWORD=postgres
    DATABASE_NAME=hr_management_db


    JWT_SECRET=your_jwt_secret_key
    JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
    JWT_EXPIRES_IN=1h
    JWT_REFRESH_EXPIRES_IN=7d
   ```

4. **Run the Application**  
   To start the application, use:
   ```bash
   npm run start:dev
   ```

## Features

- **User Authentication:** Secure user login and registration.
- **Role Management:** Manage user roles and permissions.
- **Employee Management:** Add, update, and delete employee records.
- **Time Tracking:** Monitor employee work hours.

---
