@echo off
echo.
echo ========================================
echo    Killing PsycheView Server Processes
echo ========================================
echo.

REM Kill any Node.js processes running server.js
taskkill /f /im node.exe 2>nul
if %errorlevel% equ 0 (
    echo ✅ Node.js processes terminated
) else (
    echo ℹ️  No Node.js processes found
)

REM Kill any processes using common ports
netstat -ano | findstr :53659 >nul 2>&1
if %errorlevel% equ 0 (
    echo Found process on port 53659, attempting to kill...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :53659') do taskkill /f /pid %%a 2>nul
)

netstat -ano | findstr :51387 >nul 2>&1
if %errorlevel% equ 0 (
    echo Found process on port 51387, attempting to kill...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :51387') do taskkill /f /pid %%a 2>nul
)

echo.
echo ✅ Cleanup complete. You can now run launch.bat
echo.
pause