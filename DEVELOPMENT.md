# Development Guide for n8n-nodes-pyats-ro-api

This guide covers how to develop and test this custom n8n node locally.

## Prerequisites

- Node.js v20.19.0 or compatible version
- Docker Desktop installed and running
- Git

## Initial Setup

### 1. Clone n8n Repository (Optional - for reference)

If you want to reference n8n's source code or contribute to n8n itself:

```powershell
cd C:\Users\JeromeMassey\builds
git clone https://github.com/n8n-io/n8n.git
```

**Note:** You don't need the full n8n repository for basic node development. We use Docker instead.

### 2. Install Node Dependencies

In your node package directory:

```powershell
cd C:\Users\JeromeMassey\builds\n8n-nodes-pyats-ro-api
npm install
```

### 3. Build Your Node

```powershell
npm run build
```

This compiles TypeScript and copies static files to the `dist/` directory.

## Running n8n with Your Custom Node

### Docker Setup (Recommended)

We use Docker to run n8n with your custom node mounted. This avoids dependency conflicts and permission issues.

#### docker-compose.yml Configuration

The `docker-compose.yml` file in your node package directory contains:

```yaml
services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n-pyats
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - N8N_CUSTOM_EXTENSIONS=/home/node/n8n/custom-nodes
    volumes:
      - ./dist:/home/node/n8n/custom-nodes
      - n8n_data:/home/node/.n8n
    restart: unless-stopped

volumes:
  n8n_data:
```

**Key Points:**
- Mounts your `dist/` folder to n8n's custom nodes directory
- Persists n8n data (workflows, credentials, etc.) in a Docker volume
- Exposes n8n on http://localhost:5678

#### Start n8n

```powershell
cd C:\Users\JeromeMassey\builds\n8n-nodes-pyats-ro-api
docker-compose up
```

Wait for the message: `Editor is now accessible via: http://localhost:5678`

#### Stop n8n

Press `Ctrl+C` in the terminal, or:

```powershell
docker-compose down
```

## Development Workflow

### Making Changes to Your Node

1. **Edit TypeScript Files**
   - Modify files in `nodes/`, `credentials/`, etc.

2. **Rebuild**
   ```powershell
   npm run build
   ```

3. **Restart n8n Container**
   ```powershell
   docker-compose restart
   ```
   
   Or if you stopped it:
   ```powershell
   docker-compose up
   ```

4. **Refresh Browser**
   - Reload http://localhost:5678
   - The updated node will be available

### Watch Mode (Recommended for Active Development)

For faster iteration, use watch mode to automatically rebuild on file changes:

```powershell
# In one terminal - start watch mode
cd C:\Users\JeromeMassey\builds\n8n-nodes-pyats-ro-api
npm run build:watch
```

```powershell
# In another terminal - run n8n
docker-compose up
```

When you save a TypeScript file:
1. Watch mode automatically rebuilds to `dist/`
2. Run `docker-compose restart` in another terminal
3. Refresh your browser

## Testing Your Node

### 1. Access n8n UI

Open http://localhost:5678 in your browser.

### 2. First-Time Setup

- Create a local account (stored in Docker volume)
- This is only for local development

### 3. Create a Test Workflow

1. Click **"Create Workflow"** or **"+"**
2. Click **"+"** to add a node
3. Search for **"PyATS"** or **"pyats"**
4. Select your **PyATS RO API** node

### 4. Configure Credentials

1. Click on the credential field in the node
2. Click **"Create New Credential"**
3. Fill in:
   - API URL (your PyATS API endpoint)
   - Authentication details (username/password, token, etc.)
4. Click **"Save"**

### 5. Configure the Node

1. Select a **Resource** (Command, Health, Info, or Jumphost)
2. Select an **Operation** for that resource
3. Fill in any required parameters
4. Click **"Execute Node"** to test

### 6. Debug Output

- Check the node's output in the n8n UI
- Check Docker logs for errors:
  ```powershell
  docker-compose logs -f
  ```

## Project Structure

```
n8n-nodes-pyats-ro-api/
├── credentials/
│   └── PyatsRoApi.credentials.ts    # Credential definition
├── nodes/
│   └── PyatsRoApi/
│       ├── PyatsRoApi.node.ts       # Main node logic
│       ├── PyatsRoApi.node.json     # Node metadata
│       └── resources/               # Resource operations
│           ├── command/
│           ├── health/
│           ├── info/
│           └── jumphost/
├── dist/                            # Compiled output (gitignored)
├── package.json                     # Node package configuration
├── tsconfig.json                    # TypeScript configuration
└── docker-compose.yml               # Local testing setup
```

## Common Tasks

### Linting

```powershell
npm run lint
```

### Fix Linting Issues

```powershell
npm run lint:fix
```

### Clean Build

```powershell
Remove-Item -Recurse -Force dist
npm run build
```

### View n8n Logs

```powershell
docker-compose logs -f
```

### Access n8n Container Shell

```powershell
docker exec -it n8n-pyats sh
```

### Reset n8n Data (Clear all workflows/credentials)

```powershell
docker-compose down -v
docker-compose up
```

**Warning:** This deletes all workflows, credentials, and settings!

## Publishing Your Node

When ready to publish to npm:

### 1. Update Version

```powershell
npm version patch  # or minor, major
```

### 2. Build

```powershell
npm run build
```

### 3. Publish

```powershell
npm publish
```

Or use the release script:

```powershell
npm run release
```

## Troubleshooting

### Node Doesn't Appear in n8n UI

1. **Check build output:**
   ```powershell
   ls dist
   ```
   Should contain `credentials/` and `nodes/` folders

2. **Check Docker logs:**
   ```powershell
   docker-compose logs | Select-String -Pattern "pyats"
   ```

3. **Verify dist folder is mounted:**
   ```powershell
   docker exec -it n8n-pyats ls -la /home/node/n8n/custom-nodes
   ```

### Changes Not Reflected

1. **Ensure build completed:**
   - Check for TypeScript errors
   - Verify `dist/` was updated

2. **Restart container:**
   ```powershell
   docker-compose restart
   ```

3. **Hard refresh browser:**
   - Press `Ctrl+Shift+R` (Windows)
   - Or clear browser cache

### Docker Issues

**Port already in use:**
```powershell
# Find what's using port 5678
Get-NetTCPConnection -LocalPort 5678

# Stop other n8n instances
docker ps
docker stop <container-id>
```

**Container won't start:**
```powershell
# Remove old container
docker-compose down
docker-compose up --force-recreate
```

### Path Length Issues on Windows

If you encounter path length errors:

1. Enable long path support:
   - Run as Administrator:
   ```powershell
   New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
   ```

2. Or use shorter directory names

## Best Practices

### 1. Version Control

- Commit working changes frequently
- Use meaningful commit messages
- Don't commit `node_modules/` or `dist/`

### 2. Testing

- Test each resource/operation thoroughly
- Test with real API endpoints when possible
- Test error handling scenarios

### 3. Code Quality

- Run linter before committing: `npm run lint:fix`
- Follow n8n node development guidelines
- Add JSDoc comments to complex functions

### 4. Documentation

- Update README.md with new features
- Document API requirements
- Include example configurations

## Resources

- [n8n Node Development Docs](https://docs.n8n.io/integrations/creating-nodes/)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)
- [n8n Node Starter](https://github.com/n8n-io/n8n-nodes-starter)
- [PyATS Documentation](https://developer.cisco.com/docs/pyats/)

## Quick Reference

### Daily Development Commands

```powershell
# Start development
cd C:\Users\JeromeMassey\builds\n8n-nodes-pyats-ro-api
npm run build:watch                 # Terminal 1
docker-compose up                   # Terminal 2

# Make changes, save files
# Then in Terminal 3:
docker-compose restart

# Stop development
# Terminal 2: Ctrl+C
# Terminal 1: Ctrl+C
docker-compose down
```

### One-Time Testing

```powershell
npm run build
docker-compose up
# Test in browser at http://localhost:5678
# Ctrl+C when done
docker-compose down
```
