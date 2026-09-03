@echo off
title Launch ShopSphere Full Stack
echo Starting ShopSphere Backend and Frontend...
start "ShopSphere Backend" cmd /k "call "%~dp0start-backend.bat""
timeout /t 3 /nobreak >nul
start "ShopSphere Frontend" cmd /k "call "%~dp0start-frontend.bat""
echo Both servers are launching in separate windows!
echo Frontend will be available at: http://localhost:5173
echo Backend will be available at: http://localhost:8080
