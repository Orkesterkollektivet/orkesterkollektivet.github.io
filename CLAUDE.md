# Claude Code Instructions for Orkesterkollektivet

*Last updated: 2026-01-11*

## Project Overview
Static website for Orkesterkollektivet, a project-based orchestra in Norway.

## Deployment Architecture

### Production (orkesterkollektivet.no)
- **Hosted on**: GitHub Pages
- **Deploys from**: `main` branch (automatic on push)
- **DNS**: Points to GitHub Pages

### Staging (staging.orkesterkollektivet.no)
- **Hosted on**: Self-hosted Caddy server at `welcome.amundsen.pro`
- **Files location**: `/var/www/staging.orkesterkollektivet.no/`
- **Deploy command**:
  ```bash
  rsync -av --exclude='.git' ./ welcome.amundsen.pro:/var/www/staging.orkesterkollektivet.no/
  ```

## Important Rules

### NEVER do these without explicit user request:
- Commit to `main` branch
- Merge any branch into `main`
- Push to `main` branch
- Create pull requests to `main`

### Auto-deploy to staging:
When working on the `staging` branch, automatically deploy after making changes using the rsync command above.

## SSH Configuration
When using SSH to the server, set the SSH_AUTH_SOCK to the user's agent:
```bash
export SSH_AUTH_SOCK=/tmp/ssh-XXXXX/agent.XXXXX  # Get from user if needed
```

## Workflow

1. **For staging changes**: Work on `staging` branch, deploy to staging server
2. **For production**: Only when user explicitly requests, merge staging to main and push
