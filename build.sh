#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: bash build.sh yourdomain.com"
  exit 1
fi

DOMAIN=$1

echo "🚀 Deploying to $DOMAIN"

# Replace domain in nginx.conf.prod
sed -i "s/<INSERT_DOMAIN>/$DOMAIN/g" ./nginx.conf.prod

# Replace domain in certbot config
sed -i "s/<INSERT_DOMAIN>/$DOMAIN/g" ./docker-compose.https.yml

# Generate SSL certificates
echo "🔒 Generating SSL certificates..."
sudo docker compose -f ./docker-compose.https.yml run --rm certbot

# Stop certificate generation containers
sudo docker compose -f ./docker-compose.https.yml down

# Start production environment
echo "🔧 Starting production containers..."
sudo docker compose -f ./docker-compose.prod.yml up -d

echo "✅ Deployment complete!"
echo "   Frontend: https://$DOMAIN"
echo "   API: https://$DOMAIN/api"
echo "   Admin: https://$DOMAIN/admin"