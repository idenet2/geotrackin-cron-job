@echo off

:: Start the project with PM2
pm2 start index.js --name "geotracking-cron-job"

:: Optional: Logging
echo geotracking-cron-job started successfully! >> C:\geotracking_cron_log.txt

:: Keep the window open (optional, for debugging)
pause
