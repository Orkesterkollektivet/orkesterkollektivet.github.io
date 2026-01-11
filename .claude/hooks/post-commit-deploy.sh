#!/bin/bash
# Auto-deploy hook for staging branch

# Read the hook input from stdin
hook_input=$(cat)

# Extract the command that was run
command=$(echo "$hook_input" | jq -r '.tool_input.command // ""')

# Check if it's a git commit command
if [[ "$command" =~ ^git\ commit ]] || [[ "$command" =~ git\ commit ]]; then
  # Check if we're on the staging branch
  cd "$CLAUDE_PROJECT_DIR" || exit 0
  branch=$(git branch --show-current 2>/dev/null)

  if [ "$branch" = "staging" ]; then
    # Find SSH agent socket (try common locations)
    if [ -z "$SSH_AUTH_SOCK" ]; then
      for sock in /tmp/ssh-*/agent.*; do
        if [ -S "$sock" ]; then
          export SSH_AUTH_SOCK="$sock"
          break
        fi
      done
    fi

    # Auto-deploy to staging server
    if rsync -av --exclude='.git' "$CLAUDE_PROJECT_DIR/" welcome.amundsen.pro:/var/www/staging.orkesterkollektivet.no/ >/dev/null 2>&1; then
      echo "Auto-deployed to staging.orkesterkollektivet.no"
    fi
  fi
fi

exit 0
