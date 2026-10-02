@echo off
cd /d "%~dp0"

set "SHARED_DEP=E:\playPlace2026\ruanzhuGameStorage\yilai697\node_modules"

if not exist "%SHARED_DEP%" (
    echo Shared dependency folder not found: %SHARED_DEP%
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Linking shared node_modules...
    mklink /J "node_modules" "%SHARED_DEP%"
)

set "MISSING=0"
if not exist "node_modules\react" set "MISSING=1"
if not exist "node_modules\vite" set "MISSING=1"
if not exist "node_modules\lucide-react" set "MISSING=1"
if not exist "node_modules\@tailwindcss\vite" set "MISSING=1"

if "%MISSING%"=="1" (
    echo Dependencies incomplete, installing...
    call npm install
) else (
    echo Dependencies verified.
)

echo Starting game dev server...
call npm run dev
pause
