@echo off
title Push Enlyst Website to GitHub
color 0b
echo ================================================================
echo       ENLYST WEBSITE - AUTOMATIC GITHUB UPLOADER
echo ================================================================
echo.
echo Target Repository: https://github.com/mtaseer3137/enlyst-.git
echo.
echo Connecting to GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/mtaseer3137/enlyst-.git

echo.
echo Uploading all files to GitHub...
echo (If a browser window pops up asking to sign in, simply click Authorize)
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo   CONGRATULATIONS! All your files are now uploaded to GitHub!
    echo ================================================================
    echo.
    echo Next Step to Make it Live:
    echo 1. Open your browser and go to: https://github.com/mtaseer3137/enlyst-/settings/pages
    echo 2. Under "Branch", select "main" and click "Save".
    echo 3. In 60 seconds, your website is LIVE at:
    echo    https://mtaseer3137.github.io/enlyst-/
    echo.
) else (
    echo.
    echo Upload stopped. If you prefer, you can also drag and drop the
    echo files directly onto https://github.com/mtaseer3137/enlyst-
)

echo.
pause
