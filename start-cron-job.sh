#!/bin/bash

# Démarrer le projet avec PM2
sudo pm2 start index.js --name "geotracking-cron-job"

# Optionnel : journalisation
echo "geotracking-cron-job started successfully!" >> /var/log/geotracking_cron_log.txt

# Garder le terminal ouvert (optionnel - utile si tu exécutes manuellement)
read -p "Press [Enter] to continue..."
