@echo off

REM Iniciar el backend
start cmd /k "cd backend && npm install && node server.js"

REM Iniciar el frontend
start cmd /k "cd frontend && npm install && npm start"

REM Fin del script
echo Servidores iniciados. Puedes cerrar esta ventana.
pause
exit
