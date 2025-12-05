# Class Scheduler Backend

This is the **backend server** for the Class Scheduler project. It uses **Node.js (Express)** and **PostgreSQL** to manage courses, users, and schedules.

---

## Prerequisites
Make sure you have installed:

- [Node.js (LTS)](https://nodejs.org)  
- [PostgreSQL](https://www.postgresql.org/download/)  

---

## Setup the Database

1. **Make sure PostgreSQL is running**  
     - PostgreSQL runs on **port 5432** by default.  
     - You should connect using:  
          ```
          psql -U postgres
          ```

2. **Create the database**  
     ```
     CREATE DATABASE class_scheduler;
     ```

3. **Load the Schema**
     - From the project root:
          ```
          psql -U postgres -d class_scheduler -f code/database/schema.sql
          ```

4. **Seed the database with simple data**
     ```bash
     psql -U postgres -d class_scheduler -f code/database/seed.sql
     ```

5. **Verify tables exist**
     ```
     psql -U postgres -d class_scheduler
     \dt
     ```

# Backend Setup

1. Go to the backend folder:
     ```
     cd code/backend
     ```

2. Install dependencies
     ```
     npm install
     ```

3. Update the .env file in the backend folder with your databas settings

4. Start the backend server
     ```basj
     npm start
     ```

# Test the API
http://localhost:3001/api/hello
http://localhost:3001/api/courses
