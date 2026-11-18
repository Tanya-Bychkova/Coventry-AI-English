# Coventry English AI

I’m Tatyana Bychkova. I designed and built Coventry English AI for students at Coventry University Kazakhstan to check their English level and decide what to practise next. The platform is used at the university. For my UI/UX portfolio, I’m sharing a public prototype with sample student records and simulated feedback so visitors can explore the experience for themselves.

[Try the public prototype](https://tanya-bychkova.github.io/Coventry-AI-English/)

## Explore the prototype

Choose **Student → Testing** to take the six-part English practice test and see a sample level estimate. To explore the feedback process, submit written homework as a student, switch to **Teacher** to review it, then return to **Student** to read the comments. The **Administrator** workspace shows sample faculty analytics.

## Open the portfolio demo

Extract the project ZIP and double-click Open-Demo.html. All scripts and styles are included in that file.

## Try locally

With Node.js 22 installed, run `npm ci` followed by `npm run dev` and open http://localhost:5173. For a production build, run `npm run build`. The generated dist folder also opens directly in a desktop browser via index.html.

## Docker

Run `docker compose up --build` and open http://localhost:8080. Run `docker compose down` to stop it.

## GitHub Pages

In repository Settings → Pages, select **GitHub Actions** as the build source. The **Deploy portfolio demo** workflow builds the app and publishes the dist folder on each push to main.

## Demo data

The three roles share one browser’s local storage. Written feedback, speaking prompts and sample analytics run locally without an API key. Scores illustrate the interface and have no academic validity. Use the same browser and URL when switching roles to try the teacher review flow.
