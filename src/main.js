
import App from "./App.svelte"
import prerender from "prerender-node"

const app = new App({
  target: document.body,
});

// prerender.set('forwardHeaders', true)

export default app
