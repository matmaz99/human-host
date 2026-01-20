#!/bin/bash
# ===========================================
# Local Domain Setup Helper Script
# ===========================================
# Usage: ./setup.sh [project-name] [port] [command]
# Example: ./setup.sh timelapse 3000 "npm run dev"
# ===========================================

set -e

PROJECT_NAME="${1:-$(basename "$PWD" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')}"
PORT="${2:-3000}"
CMD="${3:-npm run dev}"

# Check if Hotel is installed
if ! command -v hotel &> /dev/null; then
    echo "📦 Installing Hotel..."
    npm install -g hotel
fi

# Start Hotel if not running
if ! pgrep -f "hotel" > /dev/null; then
    echo "🏨 Starting Hotel daemon..."
    hotel start
    sleep 2
fi

# Register project
echo "📝 Registering: $PROJECT_NAME on port $PORT"
hotel rm "$PROJECT_NAME" 2>/dev/null || true
hotel add "$CMD" --name "$PROJECT_NAME" --port "$PORT"

echo ""
echo "✅ Setup complete!"
echo ""
echo "🌐 Access your project at: http://${PROJECT_NAME}.localhost"
echo "   (Also available at: localhost:${PORT})"
echo ""
