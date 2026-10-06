# RIT Central Event Management Portal - Backend API Server

This directory contains the **Node.js & Express REST API** with **Prisma ORM**, **MongoDB Atlas**, **JWT Authentication**, and **Multer File Uploads** for Rajarambapu Institute of Technology (RIT), Islampur.

---

## 🚀 Quick Start (MongoDB Atlas)

Create a MongoDB Atlas cluster and database user, and allow your development machine/server IP in Atlas **Network Access**.

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure the MongoDB connection

Open the already-created `server/.env` file and replace the `DATABASE_URL` placeholders with the connection string from Atlas:

```env
DATABASE_URL="mongodb+srv://<database-user>:<url-encoded-password>@<cluster-host>/rit_central_event_portal?retryWrites=true&w=majority"
```

URL-encode special characters in the database user's password. Keep `.env` private and never commit Atlas credentials. Use a separate strong `JWT_SECRET` for deployments.

### 3. Generate Prisma Client & Sync the MongoDB schema
```bash
npm run prisma:generate
npm run prisma:push
```

### 4. Seed Initial College Data
Pre-populates all RIT departments (including First Year Engineering), Super Admin, CSE HOD, sample events (Hack-O-Fiesta, CodeDash, ORION 2026), registrations, and audit logs:
```bash
npm run seed
```
**Warning:** seeding deletes the existing portal collections before inserting demo data. Skip this step if you already have records you need to keep.

### 5. Start the Server
```bash
# In development mode (auto-reload on code change)
npm run dev

# Or in standard production mode
npm start
```
The server will boot on `http://localhost:5000`.
- Health Check: `http://localhost:5000/api/health`
- REST API Base: `http://localhost:5000/api`

---

## 🔗 How the Frontend Connects to the Backend

The frontend portal (`index.html`) is equipped with an **Adaptive API Service Layer**:

1. **Auto-Discovery**: Whenever you open `index.html` in your browser, the frontend sends a background health check to `http://localhost:5000/api/health`.
2. **When Backend is Running (`http://localhost:5000`)**:
   - The status badge in the navbar / admin panel displays: `🟢 Backend: Connected (Live REST API)`.
   - All actions (browsing events, registration, login, creating/editing events, file uploads, check-in attendance) communicate directly with the Express REST API and database.
   - JWT tokens are saved in `sessionStorage` and sent via `Authorization: Bearer <TOKEN>` header.
3. **When Backend is Offline**:
   - The status badge displays: `🟡 Standalone Mode (LocalStorage)`.
   - The portal operates completely in offline demo mode using the browser's LocalStorage, ensuring zero interruption during demonstrations or disconnected presentations.

---

## 🗄️ MongoDB notes

- MongoDB ObjectIds are used as internal document keys. Existing numeric `id` fields remain in API responses and continue to be used by the frontend and routes.
- The API connects to MongoDB before listening, so an invalid URI or Atlas network-access rule is reported at startup.
- MongoDB transactions (used by the backup restore endpoint) require a replica set. MongoDB Atlas clusters provide this support.
- Changing the database connection does not import records from an old SQLite database; export/import data separately if you need to retain them.

---

## 🔑 Default Credentials (Seeded)

| Role | Username | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin` | `admin123` | College Administrator (Full access to all departments, approvals, logs, backup) |
| **Dept Admin (CSE)** | `cseadmin` | `cse123` | Department Administrator (Only CSE events, analytics, and coordinators) |

---

## 📡 REST API Endpoint Documentation

### Authentication (`/api/auth`)
- `POST /api/auth/login`: Authenticates username & password. Returns JWT token and role profile.
- `GET /api/auth/me`: Retrieves current authenticated user session.
- `GET /api/auth/users`: Super Admin retrieves list of all coordinator accounts.
- `POST /api/auth/register`: Super Admin creates a new department coordinator account.
- `PUT /api/auth/users/:id`: Edit coordinator details or reset password.
- `DELETE /api/auth/users/:id`: Delete coordinator account.

### Departments (`/api/departments`)
- `GET /api/departments`: Returns all departments with active event counts.
- `GET /api/departments/:id`: Returns department profile, description, banner, and published events.
- `POST /api/departments`: Create new department branch (Super Admin).
- `PUT /api/departments/:id`: Update department title, code, banner, or description.
- `DELETE /api/departments/:id`: Delete department and related data.

### Events (`/api/events`)
- `GET /api/events`: Advanced filter query supporting `search`, `department_id`, `academic_year`, `category`, `status`, `month`, `date`, `sort`.
- `GET /api/events/latest`: Returns top 6 latest uploaded events.
- `GET /api/events/:id`: Returns full event details and increments view tally.
- `POST /api/events`: Add new event (Dept Admin or Super Admin).
- `PUT /api/events/:id`: Edit event details.
- `PATCH /api/events/:id/status`: Super Admin approve or reject event with feedback reason.
- `DELETE /api/events/:id`: Delete event record.
- `POST /api/events/:id/download`: Increments brochure download count.

### Registrations & Certificates (`/api/registrations`)
- `POST /api/registrations`: Public participant registers for an event. Generates unique Ticket ID (`RIT-REG-XXXXXX`).
- `GET /api/registrations/event/:id`: Retrieves participant list for an event.
- `PATCH /api/registrations/:id/checkin`: Toggles attendance check-in status (manual or QR scanner).
- `GET /api/registrations/verify/:query`: Searches ticket ID or email to generate PDF participation certificate.

### Analytics & Statistics (`/api/analytics`)
- `GET /api/analytics/overview`: Overall statistics (Departments, Events, Upcoming, Completed, Total Registrations, Views, Downloads).
- `GET /api/analytics/charts`: Aggregate distributions for Department charts, Academic Year growth, and Monthly velocity.
- `GET /api/analytics/visitors`: Daily visitor trends and traffic source breakdown (Campus Wi-Fi, Social Media, Google Search, Direct, QR Scans).

### Audit Logs & Security (`/api/audit-logs`)
- `GET /api/audit-logs`: Trace operator actions with timestamp, IP, device/browser signature, and before/after states.
- `DELETE /api/audit-logs`: Clear audit history (Super Admin).

### File Uploads (`/api/upload`)
- `POST /api/upload`: Multipart `file` upload using Multer for event posters, payment QR codes, brochures, and rulebooks. Returns static public URL `/uploads/<filename>`.

### Backup & Disaster Recovery (`/api/backup`)
- `GET /api/backup/export`: Exports entire database state as JSON snapshot.
- `POST /api/backup/restore`: Restores database state from JSON snapshot.

---

## 🐳 Deployment (Docker, PM2 & Nginx)

### Deploying the portal and API to Vercel

The repository root contains the static portal and a Vercel serverless adapter for the Express API. Set these environment variables in the Vercel project's **Settings → Environment Variables** before deploying:

- `MONGODB_URI` or `DATABASE_URL`: the MongoDB Atlas connection string for the portal database. If both are set, `DATABASE_URL` takes precedence.
- `JWT_SECRET`: a long, unique random secret. Generate it in your password manager; never paste it into source control or chat.
- `NODE_ENV`: `production`.

In MongoDB Atlas, allow network access from the Vercel deployment. Vercel serverless egress addresses may vary; use a supported static-egress/private-network option where available, or make an informed network-access change for a demo deployment. Use a dedicated database user with the minimum required privileges.

After deployment, check `https://<your-domain>/api/health`. A healthy response reports `"status":"ok"` and `"database":"MongoDB"`. Open the portal on the same domain and confirm its status reads **MongoDB Connected**. Do not run the seed script against a database containing records you need to keep.

GitHub Pages can host the static frontend, but it cannot run the API or safely connect directly to MongoDB. The frontend defaults to the Vercel API at `https://rit-central-event-management-portal.vercel.app/api` when served from `github.io`; both hosting URLs therefore use the same MongoDB data. Keep the API enabled only on the Vercel deployment and confirm its health check before testing admin changes.

Uploaded files use local disk storage in `server/uploads` when self-hosted. On Vercel, uploads are held in memory and returned as data URLs so the portal can store them with the event document in MongoDB; keep demo uploads small because MongoDB documents have a 16 MB limit. For production-scale media, configure durable object storage.

### Running with PM2 (Production Daemon)
```bash
npm install -g pm2
pm2 start server.js --name "rit-backend"
pm2 save
pm2 startup
```

### Nginx Reverse Proxy Configuration Example
```nginx
server {
    listen 80;
    server_name events.ritindia.edu;

    # Serve Frontend Static Assets
    location / {
        root /var/www/rit-event-portal;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API Requests to Node.js Backend
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve Uploaded Files
    location /uploads/ {
        alias /var/www/rit-event-portal/server/uploads/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```
