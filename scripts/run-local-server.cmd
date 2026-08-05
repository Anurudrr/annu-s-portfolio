@echo off
cd /d "%~dp0\.."
set NODE_ENV=production
set PORT=3105
node dist\server.cjs
