---
name: human-host
description: ALWAYS use this skill when starting ANY development server. This skill is MANDATORY for all dev server starts.
---

# 🌐 Human Host - Local Domain Routing (ALWAYS ACTIVE)

**CRITICAL: This skill MUST be used for ALL development server starts, including:**
- npm run dev / yarn dev / pnpm dev / bun dev
- npm start / yarn start
- Any command that starts a local server
- When user says: "start server", "run server", "start dev", "run the project", "launch app"

## MANDATORY Workflow (Follow EVERY Time)

**YOU MUST follow these steps EVERY SINGLE TIME you start a dev server:**

### Step 1: Ensure Hotel is Running

BEFORE doing anything else, run:

```bash
which hotel || npm install -g hotel
pgrep -f "hotel" || hotel start
```

### Step 2: Determine Project Name

Get the project name from (in priority order):
1. `.hotel` file in project root (if exists)
2. `name` field in `package.json`
3. Current directory name

Sanitize the name: lowercase, replace spaces/special chars with `-`.

### Step 3: Determine Port

Get the port from (in priority order):
1. `.hotel` file in project root (if exists)
2. Framework defaults:
   - Next.js: 3000
   - Vite: 5173
   - Create React App: 3000
   - Remix: 3000
   - Nuxt: 3000
   - SvelteKit: 5173
   - Astro: 4321
   - Express: 3000
3. Ask user if ambiguous

### Step 4: Register with Hotel (REQUIRED!)

```bash
hotel add "npm run dev" --name PROJECTNAME --port PORT
```

Replace `PROJECTNAME` and `PORT` with actual values.

### Step 5: Start the Server

Run the dev command normally:
```bash
npm run dev
```

### Step 6: ALWAYS Inform the User

You MUST tell the user the .localhost URL:

```
🌐 Server running at: http://PROJECTNAME.localhost
   (Also available at: localhost:PORT)
```

**DO NOT skip this message! The .localhost URL is the whole point!**

## Example Interaction

**User:** Start the dev server

**Claude does:**
```bash
# Ensure Hotel is running
pgrep -f "hotel" || hotel start

# Register project (e.g., "timelapse" on port 3000)
hotel add "npm run dev" --name timelapse --port 3000

# Start server
npm run dev
```

**Claude says:**
> 🌐 Server running at: **http://timelapse.localhost**
> (Also available at: localhost:3000)

## Project Configuration File

If a `.hotel` file exists in the project root, use its values:

```json
{
  "name": "myproject",
  "port": 3000,
  "cmd": "npm run dev"
}
```

## Troubleshooting Commands

If domains aren't working:

```bash
# Restart Hotel
hotel stop && hotel start

# List registered projects
hotel ls

# Remove and re-add project
hotel rm PROJECTNAME
hotel add "npm run dev" --name PROJECTNAME --port PORT
```

## Port Conventions (Tinkso Projects)

| Port | Project |
|------|---------|
| 3000 | timelapse |
| 3001 | stockdeporte |
| 3002 | christaud |
| 4000 | API servers |

## Important Notes

- **Always** mention the `.localhost` URL to the user, not just `localhost:port`
- Hotel daemon runs in background and persists across terminal sessions
- Multiple projects can be registered simultaneously
- Hotel dashboard available at http://localhost:2000
