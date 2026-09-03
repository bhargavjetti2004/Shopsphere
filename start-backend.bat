@echo off
title ShopSphere Backend (Spring Boot)
echo ====================================================
echo Starting ShopSphere Spring Boot Backend on Port 8080
echo ====================================================
cd /d "%~dp0backend"
mvn spring-boot:run
pause
