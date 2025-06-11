# dev

This repository contains a simple React portal in the `dev-web` directory.
The list of links shown on the portal is defined in `dev-web/public/subdomains.json`.

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
