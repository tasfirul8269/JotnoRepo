# Jotno

## Node.js Version Requirement

This project requires Node.js version >=16.0.0 <19.0.0. You are currently using Node.js v22.14.0, which is not compatible with some dependencies in this project.

### Error: Unknown file extension ".ts"

If you're seeing the following error:

```
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for E:\Frooxi\JotnoRepo\node_modules\expo-modules-core\src\index.ts
```

This is due to a compatibility issue between Node.js v22+ and the way TypeScript files are handled in the Expo modules.

### How to Fix

#### Option 1: Use nvm (Node Version Manager)

1. Install nvm if you don't have it already:
   - Windows: [nvm-windows](https://github.com/coreybutler/nvm-windows)
   - macOS/Linux: [nvm](https://github.com/nvm-sh/nvm)

2. Install and use Node.js v18 LTS:
   ```bash
   nvm install 18.18.0
   nvm use 18.18.0
   ```

3. Verify the Node.js version:
   ```bash
   node --version
   # Should output v18.18.0
   ```

#### Option 2: Direct Installation

1. Download and install Node.js v18.18.0 from the [official Node.js website](https://nodejs.org/download/release/v18.18.0/).

2. Uninstall your current Node.js v22 installation if necessary.

#### After Changing Node.js Version

1. Clear node_modules and reinstall dependencies:
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

2. Start the application:
   ```bash
   npm run dev
   ```

## Project Structure

- `/server`: Backend server code
- `/app`: Frontend Expo application

## Available Scripts

- `npm run dev`: Start both server and Expo app
- `npm run server`: Start only the server
- `npm start`: Start only the Expo app