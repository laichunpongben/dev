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
