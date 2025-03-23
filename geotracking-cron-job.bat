@echo off
:: Set the path to Node.js (ensure that Node.js is installed and the path is correct)
SET PATH=C:\Program Files\nodejs;%PATH%

:: Navigate to the geotracking-cron-job project directory
cd /d "C:\path\to\geotracking-cron-job"

:: Start the project with PM2
pm2 start index.js --name "geotracking-cron-job"

:: Optional: Logging
echo geotracking-cron-job started successfully! >> C:\geotracking_cron_log.txt

:: Keep the window open (optional, for debugging)
pause
