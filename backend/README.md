# HiveSQL Dashboard Backend

## Setup

1. Copy `.env.example` to `.env` and fill in your HiveSQL credentials.
2. (Optionally) Place a root CA cert in `certs/hivesql-root-ca.crt` and set `trustServerCertificate` to `false`.
3. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API

- **GET /api/daily-posts?days=N**: Returns JSON array of `{ date, posts }` for last N days (from Comments table).
