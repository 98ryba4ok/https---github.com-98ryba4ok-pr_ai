#!/bin/bash

echo "📦 Pulling latest changes..."
git pull

echo "🔨 Rebuilding containers..."
sudo docker compose -f ./docker-compose.prod.yml up --build -d

echo "✅ Release complete!"
docker compose -f ./docker-compose.prod.yml ps