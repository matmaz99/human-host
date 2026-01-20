# 🌐 Local Domain Skill for Claude Code

A Claude Code skill that automatically configures `http://projectname.localhost` URLs when starting development servers.

**No more remembering ports!**

## Installation

Run in your project directory:

```bash
npx @matmaz99/human-host
```

This installs the skill to `.claude/skills/human-host/`.

## One-Time Machine Setup

Install Hotel globally (only once per machine):

```bash
npm install -g hotel
hotel start
```

## How It Works

Once installed, whenever you ask Claude Code to:
- "Start the dev server"
- "Run the project"
- "Launch the app"

Claude will automatically:
1. Ensure Hotel is running
2. Register your project with Hotel
3. Start the dev server
4. Tell you the URL: `http://projectname.localhost`

## Example

**You:** Start the dev server

**Claude:**
```bash
pgrep -f "hotel" || hotel start
hotel add "npm run dev" --name myproject --port 3000
npm run dev
```

> 🌐 Server running at: **http://myproject.localhost**
> (Also available at: localhost:3000)

## Before & After

| Before | After |
|--------|-------|
| localhost:3000 | http://timelapse.localhost |
| localhost:3001 | http://stockdeporte.localhost |
| localhost:3002 | http://christaud.localhost |

## Project Configuration (Optional)

Create a `.hotel` file in your project root to customize:

```json
{
  "name": "myproject",
  "port": 3000,
  "cmd": "npm run dev"
}
```

## File Structure

After installation:

```
your-project/
├── .claude/
│   └── skills/
│       └── human-host/
│           ├── SKILL.md
│           └── scripts/
│               └── setup.sh
└── ...
```

## Commands Reference

| Command | Description |
|---------|-------------|
| `hotel start` | Start Hotel daemon |
| `hotel stop` | Stop Hotel daemon |
| `hotel ls` | List registered projects |
| `hotel rm name` | Remove a project |

## Requirements

- Node.js >= 16
- Claude Code
- Hotel (installed automatically by Claude when needed)

## License

MIT

---

Made with ❤️ by Tinkso
