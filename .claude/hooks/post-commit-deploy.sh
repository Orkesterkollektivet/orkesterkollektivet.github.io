#!/bin/bash

# Read the hook input from stdin
hook_input=$(cat)

# Extract the command that was run
command=$(echo "$hook_input" | jq -r '.tool_input.command // ""')

# Check if it's a git commit command
if [[ "$command" =~ ^git\ commit ]]; then
  # Check if we're on the staging branch
  branch=$(git branch --show-current 2>/dev/null)

  if [ "$branch" = "staging" ]; then
    # Auto-deploy to staging server
    rsync -av --exclude='.git' "$CLAUDE_PROJECT_DIR/" welcome.amundsen.pro:/var/www/staging.orkesterkollektivet.no/ >/dev/null 2>&1
    echo "Auto-deployed to staging.orkesterkollektivet.no"
  fi
fi

exit 0
