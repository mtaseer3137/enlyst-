@echo off
title Enlyst Website Launcher
echo ======================================================
echo    Launching Enlyst Recruitment Platform
echo ======================================================
echo Starting local web server and opening in your browser...
python server.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Python was not found in PATH or encountered an error.
    echo Opening index.html directly in your default browser...
    start "" index.html
)
pause
