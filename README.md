# dev

This repository hosts a small portal under `dev-web` built with React and Vite.
Available links are defined in `dev-web/public/services.json` and displayed as buttons at runtime.

## Overview

The project provides a lightweight launcher for various services. It loads link definitions from `services.json`, checks each URL before opening it, and shows an error message if a link is unavailable.

### Key features

* Animated React interface styled with Material UI
* Service worker for offline support via the Vite PWA plugin
* Custom Docker image that pings warm‑up endpoints on a schedule
* GitHub Actions workflow for building and deploying to Google Cloud Run

### Architecture

1. **Build** – The React app is compiled using Node 22 and Vite.
2. **Runtime** – Static files are served by an Nginx container.
3. **Warm‑up** – `schedule-warmup.sh` runs `ping-endpoints.sh` with cron to keep dependent services warm.

To start the development server:

```bash
cd dev-web
npm install
npm run dev
```

Before committing any changes, run the following inside `dev-web` to ensure
the project lints and builds correctly:

```bash
npm run lint
npm run build
```

The portal reads this file at runtime and shows each enabled entry as a button.

To build a Docker image and deploy the app to Google Cloud Run manually, run the
following commands with the gcloud CLI installed and authenticated:

```bash
docker build -t REGION-docker.pkg.dev/PROJECT_ID/REGISTRY_REPO/dev-web:latest ./dev-web
docker push REGION-docker.pkg.dev/PROJECT_ID/REGISTRY_REPO/dev-web:latest
gcloud run deploy dev-web \
  --image REGION-docker.pkg.dev/PROJECT_ID/REGISTRY_REPO/dev-web:latest \
  --region REGION \
  --platform managed \
  --allow-unauthenticated
```
Replace `REGION`, `PROJECT_ID`, and `REGISTRY_REPO` with your values.

A GitHub Actions workflow is included to automatically build the Docker image
and deploy it to Google Cloud Run whenever changes are pushed to the `main`
branch. The workflow breaks the process into separate steps that build the
container image, push it to Artifact Registry, and deploy the revision to Cloud
Run. It requires the `GCP_PROJECT_ID`, `GCP_REGISTRY_REGION`, `GCP_RUN_REGION`,
`GCP_REGISTRY_REPO`, `GCP_SERVICE_NAME`, and `GCP_SA_KEY` secrets to be configured in your repository.
It authenticates Docker with Artifact Registry using these credentials before
pushing the image, so no extra registry secret is needed.

The workflow now sets up Docker Buildx and caches build layers using the built-in
GitHub Actions cache. A small local cache directory is also preserved between
runs to further speed up Docker builds.
