# 🗳️ E-Vote IPM

A modern, secure, and transparent electronic voting system built for **Ikatan Pelajar Muhammadiyah (IPM)**. This application digitizes the election process, providing a seamless experience for both voters and administrators.

## 🚀 The Edge
What sets **E-Vote IPM** apart:
- **Token-Based Security**: Unique, one-time-use tokens ensure that each voter can only cast their ballot once, maintaining the integrity of the election.
- **Real-Time Analytics**: Administrators get instant access to voting statistics and live results through a sleek dashboard.
- **Modern User Experience**: Built with Vue 3 and Tailwind CSS, featuring a responsive, dark-mode-ready interface with smooth transitions.
- **Flexible Election Management**: Support for multiple active elections, customizable candidate limits, and comprehensive voter management.

## 🛠️ Features
- **Public Voting Flow**:
  - Secure token verification.
  - Interactive digital ballot with candidate selection.
  - Immediate confirmation of vote submission.
- **Admin Dashboard**:
  - **Dashboard Overview**: Monitor total elections, active sessions, and participation rates.
  - **Election Management**: Create and manage multiple elections with custom rules.
  - **Candidate Registry**: Add candidates with profiles and management tools.
  - **Voter Management**: Import and manage voter lists with secure token generation.
  - **Live Recap**: View real-time vote counts and statistical breakdowns.

## 💻 Tech Stack
- **Frontend**: Vue 3 (Composition API + `<script setup>`)
- **State Management**: Pinia
- **Styling**: Tailwind CSS + PostCSS
- **Build Tool**: Vite
- **Networking**: Axios with centralized interceptors
- **Icons**: SVG-based system for performance and scalability

## 🚦 Getting Started
1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment**
This project uses environment variables to configure the connection between the frontend and the backend API.

    - Step 1: Create `.env` File Copy the example environment file provided in the repository:

    ```bash
    cp .env.example .env
    ```
    - Step 2: Configure Endpoint. Open the `.env` file and set the backend API URL
    Example for local development:
    ```env
    API_URL=http://localhost:8000
    ```
    Example if your backend runs on different port:
    ```
    VITE_API_URL=http://localhost:8081
    ```
    Example for production deployment:
    ```env
    API_URL=https://your-domain.com/api
    ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 🔐 Security Note
This system implements token hashing and secure session handling via local/session storage. For production deployment, ensure your backend implementation provides robust authentication and data encryption.
