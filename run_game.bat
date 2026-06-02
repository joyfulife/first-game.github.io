@echo off
echo Starting Tic Tac Toe Game...
echo.
echo Options:
echo 1. Open index.html directly in your browser
echo 2. Start a local HTTP server (requires Python)
echo.
set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="1" (
    echo Opening game in default browser...
    start index.html
) else if "%choice%"=="2" (
    echo Starting HTTP server...
    python serve.py
) else (
    echo Invalid choice. Please run again and enter 1 or 2.
    pause
)