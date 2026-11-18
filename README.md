# Coventry English AI
An independent university English-learning portfolio demo. Start with the vocabulary deck, enter a student workspace, submit written homework, then switch to Teacher to review it. Return to Student to see the feedback. Administrator opens sample faculty analytics.

## Open the portfolio demo
Extract the project ZIP and double-click Open-Demo.html. All scripts and styles are included in that file.

## Try locally
With Node.js 22 installed, run `npm ci` followed by `npm run dev` and open http://localhost:5173. For a production build, run `npm run build`. The generated dist folder also opens directly in a desktop browser via index.html.

## Docker
Run `docker compose up --build` and open http://localhost:8080. Run `docker compose down` to stop it.

## GitHub Pages
In repository Settings → Pages, select **GitHub Actions** as the build source. The workflow on main installs the pinned dependencies, type-checks and builds the app, starts the Docker image, requests the compiled application, then publishes dist. For the first deployment, run **Verify and deploy portfolio demo** in Actions if needed.

## Demo data
The three roles share one browser’s local storage. Written feedback, speaking prompts and sample analytics run locally without an API key. Scores illustrate the interface and have no academic validity. Use the same browser and URL when switching roles to try the teacher review flow.
