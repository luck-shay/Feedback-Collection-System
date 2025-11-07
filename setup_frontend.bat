@echo off
echo Setting up React Frontend...
echo.

if not exist "frontend" (
    echo Error: frontend directory not found!
    pause
    exit /b 1
)

cd frontend

echo Step 1: Installing Node.js dependencies...
call npm install
if errorlevel 1 (
    echo Error: Failed to install dependencies
    cd ..
    pause
    exit /b 1
)

echo.
echo ========================================
echo Frontend setup complete!
echo ========================================
echo.
echo To start the React development server, run:
echo   cd frontend
echo   npm start
echo.
cd ..
pause

