#!/bin/bash
cd /home/kavia/workspace/code-generation/cryptolearn-interactive-28074-d1fee950/cryptolearn_interactive
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

