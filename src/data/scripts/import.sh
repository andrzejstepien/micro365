#!/bin/bash
cd ..
timestamp=$(date +%s)
sqlite3 database ".backup db-backups/backup"$timestamp".db"
node importJSON.js