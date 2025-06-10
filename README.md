# dev

This repository contains a simple React portal in the `dev-web` directory.

To start the development server:

```bash
cd dev-web
npm install
npm run dev
```

The site reads a list of available subdomain links from `public/subdomains.json` and displays them as a simple portal.

To build a Docker image and deploy the app to Google Cloud Run, use the
`deploy_cloud_run.sh` script in the repository root. Ensure the gcloud CLI is
installed and authenticated for your project.

```
./deploy_cloud_run.sh
```

A GitHub Actions workflow is included to automatically build the Docker image
and deploy it to Google Cloud Run whenever changes are pushed to the `main`
branch. The workflow requires the `GCP_PROJECT_ID`, `GCP_REGISTRY_REGION`,
`GCP_RUN_REGION`, `GCP_SERVICE_NAME`, and `GCP_SA_KEY` secrets to be configured in your repository.
