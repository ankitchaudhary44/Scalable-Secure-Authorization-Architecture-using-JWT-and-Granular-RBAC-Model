Scalable & Secure Authorization Architecture

- Granular RBAC Model with JWT & Modern Security Best Practices
 
-  Overview
A production-grade Role-Based Access Control (RBAC) system designed for scalability and security. This project implements a secure login/signup flow, granular permission management, and a robust middleware architecture to protect sensitive endpoints.

 - Key Features
Granular RBAC: Implementation of Admin, Manager, and User roles with specific access levels.

JWT Authentication: Secure stateless authentication using JSON Web Tokens.

Centralized API Management: Uses a unified Axios instance for seamless environment switching (Local vs Production).

Security First: Protected routes, password hashing (Bcrypt), and custom security middlewares.

Real-time Feedback: Integrated react-hot-toast for system status notifications.

- Tech Stack
Frontend: React.js, Tailwind CSS, Lucide React (Icons).

Backend: Node.js, Express.js.

Database: MongoDB Atlas (Cloud).

Deployment: Vercel (Frontend) & Render (Backend).

- Security Implementation (Information Security Focus)
Environment Isolation: Strict use of .env variables for sensitive API URLs.

CORS Configuration: Restrictive CORS policy to allow only trusted origins (Production Vercel Link).

Token Interceptors: Automatic injection of Bearer tokens in outgoing requests for authorized access.

- How to Run Locally
  
Clone the repo.

Setup .env.local in frontend with VITE_API_BASE_URL=http://localhost:5001.

Run npm install in both folders.

Run npm start for Backend and npm run dev for Frontend.
