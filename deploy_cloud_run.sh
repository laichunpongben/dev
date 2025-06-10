#!/usr/bin/env bash
# Build the Docker image and deploy dev-web to Google Cloud Run
# Requires: gcloud CLI and Docker configured with access to Artifact Registry.

set -euo pipefail

PROJECT_ID=${PROJECT_ID:-your-gcp-project}
REGISTRY_REGION=${REGISTRY_REGION:-us-central1}
RUN_REGION=${RUN_REGION:-us-central1}
SERVICE_NAME=${SERVICE_NAME:-dev-web}
IMAGE_NAME=${REGISTRY_REGION}-docker.pkg.dev/${PROJECT_ID}/dev-images/${SERVICE_NAME}:latest

# Build the container image from the dev-web directory

docker build -t "$IMAGE_NAME" ./dev-web

# Push the image to Artifact Registry

gcloud auth configure-docker "${REGISTRY_REGION}-docker.pkg.dev" --quiet
docker push "$IMAGE_NAME"

# Deploy the image to Cloud Run

gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE_NAME" \
  --platform=managed \
  --region "$RUN_REGION" \
  --allow-unauthenticated

