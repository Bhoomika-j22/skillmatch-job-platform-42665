#!/bin/bash
cd /home/kavia/workspace/code-generation/skillmatch-job-platform-42665/talenvia_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

