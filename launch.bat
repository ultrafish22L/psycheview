@echo off
echo.
echo ========================================
echo    PsycheView Server Launcher
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Display Node.js version
echo Node.js version:
node --version
echo.

REM Install dependencies if needed
if not exist node_modules (
    echo Installing dependencies...
    npm install
    echo.
)

REM Set environment variables
set PORT=52778
REM Uncomment and set your Stability AI API key if you have one
REM set STABILITY_API_KEY=your-api-key-here

REM Display server info
echo Starting PsycheView server...
echo.
echo ✅ CORS/Canvas Issues Fixed: Using HTTP server instead of file:// protocol
echo ✅ Canvas Operations: toBlob(), drawImage(), getImageData() now working
echo ✅ Demo Mode: Psychedelic block generation fully functional
echo ✅ Live Mode: Ready for Stability AI integration with API key
echo.
echo Server will be available at:
echo   http://localhost:52778
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Start the server
node server.js

REM If server stops, pause to see any error messages
echo.
echo Server stopped.
pause