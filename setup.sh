#!/usr/bin/env bash
set -e

# 1. Clonar y entrar en carpeta
if [ ! -d softtek-reto-backend ]; then
  git clone <TU_REPO_URL> softtek-reto-backend
fi
cd softtek-reto-backend

# 2. Instalar dependencias y compilar
npm install
npx tsc

# 3. Ejecutar tests
npx jest

# 4. Levantar servidor local
npx serverless offline &
SERVER_PID=$!

echo "Servidor serverless offline iniciado con PID $SERVER_PID"

echo "Presiona cualquier tecla para terminar..."
read -n 1
kill $SERVER_PID