# HiveSQL Dashboard

This repository contains both the backend and frontend for a Hive blockchain posts dashboard.

## Setup

### Backend

1. Navigate to `backend/`
2. Copy `.env.example` → `.env`, fill in creds
3. (Optional) Place `certs/hivesql-root-ca.crt`
4. Run:
   ```
   npm install
   npm start
   ```
Backend runs on `http://localhost:3000`.

### Frontend

The frontend is served by the backend at `/`. Simply open `http://localhost:3000/` in your browser to view the dashboard.
