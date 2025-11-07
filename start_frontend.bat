@echo off
echo Starting React Frontend Server...
echo.

if not exist "frontend\node_modules" (
    echo Error: Node modules not found!
    echo Please run setup_frontend.bat first.
    pause
    exit /b 1
)

cd frontend
call npm start

