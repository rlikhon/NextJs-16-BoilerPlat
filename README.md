# DriveFlow

A modern full-stack web application built with **Next.js**, **TypeScript**, **Tailwind CSS**, **MongoDB**, and **NextAuth.js**.

## Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Framework   | [Next.js 16](https://nextjs.org)        |
| Language    | [TypeScript](https://www.typescriptlang.org) |
| UI          | [Tailwind CSS v4](https://tailwindcss.com) |
| Database    | [MongoDB](https://mongodb.com) + [Mongoose](https://mongoosejs.com) |
| Auth        | [NextAuth.js v5](https://next-auth.js.org) (Google OAuth) |
| Password    | [bcryptjs](https://www.npmjs.com/package/bcryptjs) |
| Motion      | [motion](https://motion.dev/docs/react) |
| Lucide icon | [lucide](https://lucide.dev/guide/installation) |
| Axios       | [axios](https://www.npmjs.com/package/axios) |
| Nodemailer  | [nodemailer](https://nodemailer.com/) |
| Package Mgr | npm                                     |

## Prerequisites

Before getting started, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [MongoDB](https://www.mongodb.com/) database (local or free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Google OAuth](https://console.cloud.google.com/) client ID and secret

## Install Packages

Install all dependencies with one command:

```bash
npx create-next-app@latest
```

This installs the following packages (as defined in `package.json`):

**Runtime dependencies:**
```bash
npm i bcryptjs mongoose axios
```

**Animation dependencies:**
```bash
npm install motion
```

**Development dependencies:**
```bash
npm install next-auth@beta
```

**Lucide icon library dependencies:**
```bash
npm install lucide-react
```
**Mail sender dependencies:**
```bash
npm install nodemailer
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB Connection
MONGODB_USERNAME="your_mongodb_username"
MONGODB_PASSWORD="your_mongodb_password"
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.r8tp84b.mongodb.net/DriveFlow"

# NextAuth Credentials
AUTH_SECRET="your-random-secret-string"
AUTH_GOOGLE_ID="your-google-client-id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

## Admin DB Setup

1. Create a MongoDB database (Atlas or local) named `DRIVEFLOW`.
2. Create an admin user with read/write permissions on the database:
   ```bash
   # In MongoDB shell
   use admin
   db.createUser({
     user: "admin",
     pwd: "your-admin-password",
     roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
   })
   ```
3. Update `MONGODB_URI` in `.env.local` with the admin credentials:
   ```
   MONGODB_URI="mongodb+srv://admin:<password>@cluster0.r8tp84b.mongodb.net/DRIVEFLOW"
   ```

## Authentication (NextAuth.js)

This project uses **NextAuth.js v5** with Two Provider 
1. **Google OAuth** for authentication.
2. **Credentials** for authentication.

### Setup Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project → Enable the **Google People API**.
3. Create OAuth 2.0 credentials → Copy the **Client ID** and **Client Secret**.
4. Add them to `.env.local`:
   ```
   AUTH_GOOGLE_ID=your-client-id
   AUTH_GOOGLE_SECRET=your-client-secret
   ```

### Auth Flow
- `GET /api/auth/[...nextauth]` — handles sign-in, sign-out, session
- Google OAuth redirects to `/api/auth/callback/google`
- `AUTH_SECRET` is used to encrypt JWT tokens (generate with `openssl rand -base64 32`)

## API Routes

| Route                        | Method | Description           |
|------------------------------|--------|-----------------------|
| `/api/auth/[...nextauth]`    | GET    | NextAuth handler      |

Additional API routes can be added under `src/app/api/`.

## Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Start the development server             |
| `npm run build` | Create an optimized production build     |
| `npm run start` | Start the production server              |
| `npm run lint`  | Run ESLint to check for code issues      |

## Project Structure

```
driceflow/
├── src/            # Application source code
├── public/         # Static assets
├── app/            # Next.js App Router pages & layouts
├── .env.local      # Local environment variables
├── next.config.ts  # Next.js configuration
├── postcss.config.mjs # PostCSS / Tailwind config
├── tsconfig.json   # TypeScript configuration
└── package.json    # Project dependencies & scripts
```

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
