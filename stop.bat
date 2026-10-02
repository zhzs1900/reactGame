@echo off
setlocal enabledelayedexpansion

echo Finding and stopping game process...

for /f "tokens=5" %%a in ('netstat -ano ^| findstr /r ":300[0-9].*LISTENING"') do (
    echo Stopping PID %%a listening on port 300x
    taskkill /F /T /PID %%a >nul 2>&1
)

echo Stopping node processes...
taskkill /F /IM node.exe >nul 2>&1

echo Game process stopped successfully.
pause
