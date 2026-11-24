@echo off
title AgriAI - Onion Disease Detection System
echo ========================================================
echo   Starting AgriAI Onion Disease Detection System
echo ========================================================
echo.

echo Starting FastAPI Backend with Trained Deep Learning Model...
start "AgriAI Backend (Port 8000)" cmd /k "cd /d "%~dp0backend" && "C:\Users\BASANAGOUDA\AppData\Local\Microsoft\WindowsApps\PythonSoftwareFoundation.Python.3.12_qbz5n2kfra8p0\python.exe" -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 2 /nobreak >nul

echo Starting Vite React Frontend (Port 5173)...
start "AgriAI Frontend (Port 5173)" cmd /k "cd /d "%~dp0frontend" && npm run dev -- --host"

echo.
echo ========================================================
echo   System running!
echo   Frontend: http://localhost:5173/
echo   Backend:  http://localhost:8000/
echo ========================================================
pause
