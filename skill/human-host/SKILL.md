---
name: human-host
description: Automatically configure local domain routing when starting development servers. Use this skill whenever starting a dev server (npm run dev, yarn dev, pnpm dev), running a project locally, or when the user asks to start/run/launch the application. This skill registers projects with Hotel so they're accessible via http://projectname.localhost instead of localhost:port.
---

# Local Domain Routing

This skill configures automatic local domain routing for development servers using Hotel.

## When to Use

Use this skill when:
- Starting a development server (`npm run dev`, `yarn dev`, `pnpm dev`)
- User asks to "start the server", "run the project", "launch the app"
- User asks about accessing the project locally
- Setting up a new project for the first time

## Prerequisites Check

Before starting any dev server, run this check:

```bash
# Check if Hotel is installed, install if missing
which hotel || npm install -g hotel

# Ensure Hotel daemon is running
pgrep -f "hotel" || hotel start
```

## Automatic Workflow

When starting a dev server, **always** follow these steps:

### Step 1: Determine Project Name

Get the project name from (in priority order):
1. `.hotel` file in project root (if exists)
2. `name` field in `package.json`
3. Current directory name

Sanitize the name: lowercase, replace spaces/special chars with `-`.

### Step 2: Determine Port

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

### Step 3: Register with Hotel

```bash
hotel add "npm run dev" --name PROJECTNAME --port PORT
```

Replace `PROJECTNAME` and `PORT` with actual values.

### Step 4: Start the Server

Run the dev command normally:
```bash
npm run dev
```

### Step 5: Inform the User

Always tell the user both URLs:

```
🌐 Server running at: http://PROJECTNAME.localhost
   (Also available at: localhost:PORT)
```

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
