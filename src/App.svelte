<script>
  import Router from "svelte-spa-router";
  import Nav from "/src/components/Nav.svelte";
  import routes from "./routes";
  import { replace } from "svelte-spa-router";
  import config from "/src/helpers/config";

  const d = new Date();
  let year = d.getFullYear();
  let companyName = config.global.companyName;

  // Handles the "conditionsFailed" event dispatched by the router when a component can't be loaded because one of its pre-condition failed
  function conditionsFailed(event) {
    console.log(event.detail);
    // Perform any action, for example replacing the current route
    if (
      event.detail.location === "/login" ||
      event.detail.location === "/register" ||
      event.detail.name === "Profile" ||
      event.detail.name === "Users" ||
      event.detail.name === "UserPage" ||
      event.detail.name === "Settings" ||
      event.detail.name === "Quotes" ||
      event.detail.name === "SingleQuote" ||
      event.detail.name === "Dashboard" ||
      event.detail.name === "AddListing" || 
      event.detail.name === "EditListing" ||
      event.detail.name === "Listings"
    ) {
      return window.location.replace("/");
    }
  }
</script>

<style>
  footer {
    padding: 100px 0;
  }

  footer p {
    text-align: center;
  }
</style>

<Nav />

<div class="body-content">
  <div class="container">
    <Router {routes} on:conditionsFailed={conditionsFailed} />
  </div>
</div>

<footer>
  <p>
    © {year} {companyName}, All Rights Reserved &nbsp; | &nbsp;
    <a href="#/privacy">privacy policy</a>
  </p>
</footer>
