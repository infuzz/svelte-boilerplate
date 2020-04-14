<script>
  import { onMount, onDestroy } from "svelte";
  import active from "svelte-spa-router/active";
  import { link } from "svelte-spa-router";
  import userStore from "../../src/stores/userStore";
  import ls from "local-storage";
  import * as api from "../../src/helpers/api.js";

  let unsubscribe;
  let currentUser;
  let isAdmin = false;
  let isActive = false;
  let userName = "";
  let avatar = "";
  let isOpen = false;

  onMount(() => {
    unsubscribe = userStore.subscribe(userData => {
      currentUser = userData;
      if (currentUser) {
        isAdmin = currentUser.role === "admin";
        avatar = userData.avatar;
        if (currentUser.profile.name) {
          userName = currentUser.profile.name;
        } else {
          userName = currentUser.email;
        }
      }
    });
  });

  async function logOut() {
    await api.post("user/logout");
    ls.remove("jwt");
    isAdmin = false;
    window.location.replace("/");
  }

  function navAction(e) {
    isActive = !isActive;
  }

  function bodyClicked(e) {
    e.stopPropagation();
    if (isActive) {
      isActive = false;
    }
    if (isOpen) {
      isOpen = false;
    }
  }

  function dpAction() {
    isOpen = !isOpen;
  }

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
</script>

<svelte:body on:click={bodyClicked} />

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/brand" use:link>
      <i class="fa fa-superpowers" aria-hidden="true" />
    </a>
    <a
      href="#/"
      role="button"
      class="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
      on:click|stopPropagation|preventDefault={navAction}>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>
  <div
    id="navbarBasicExample"
    class="navbar-menu {isActive ? 'is-active' : ''}">

    <div class="navbar-start">
      {#if isAdmin}
        <a class="navbar-item" href="/admin/dashboard" use:link use:active>
          Dashboard
        </a>
        <a
          class="navbar-item"
          href="/admin/users/1"
          use:link
          use:active={{ path: '/admin/users/*', className: 'active' }}>
          Users
        </a>
        <a
          class="navbar-item"
          href="/admin/quotes/1"
          use:link
          use:active={{ path: '/admin/quotes/*', className: 'active' }}>
          Quotes
        </a>
        <a class="navbar-item" href="/admin/settings" use:link use:active>
          Settings
        </a>
       
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="/shop/1" use:link use:active={{ path: '/admin/shop/*', className: 'active' }}>
          Shop
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item" href="/admin/shop/add-listing" use:link use:active>
            Add Listing
          </a>
          <a class="navbar-item" href="#/admin/shop/listings">
            Listings
          </a>
          <a class="navbar-item">
            Orders
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
  
      {:else}
        <a class="navbar-item" href="/" use:link use:active>Home</a>
        <a class="navbar-item" href="/shop/1" use:link use:active>Shop</a>
      {/if}
    </div>

    <div class="navbar-end">
      {#if !currentUser}
        <a class="navbar-item" href="/login" use:link use:active>Log in</a>
      {:else}
        <!-- drop down click action -->
        <div
          class="navbar-item has-dropdown"
          on:click|stopPropagation={dpAction}>
          {#if avatar}
            <span class="avatar navbar-item">
              <img src={avatar} alt="Profile Image" />
            </span>
          {/if}
          <span class="navbar-link">{userName}</span>
          <!-- show drop down -->
          <div class="navbar-dropdown is-right {isOpen ? 'dp-show' : ''}">
            {#if isAdmin}
              <a class="navbar-item" href="/admin/users/1" use:link use:active>
                Admin
              </a>
            {/if}
            <a class="navbar-item" href="/user/profile" use:link use:active>
              Profile
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item" on:click={logOut} href="#0">Logout</a>
          </div>
        </div>
      {/if}
    </div>
  </div>
</nav>


<style>
  .avatar.navbar-item img {
    min-height: 40px;
    border-radius: 100%;
  }
  .avatar img {
    display: block;
    width: 40px;
    height: 40px;
  }
  #navbarBasicExample.is-active {
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 12px 0px;
  }
  .navbar {
    margin-bottom: 4em;
    min-height: 80px;
  }

  .navbar-link:not(.is-arrowless)::after {
    border-color: inherit;
  }

  .navbar-link:not(.is-arrowless)::after:hover {
    border-color: #00818b;
  }

  a.navbar-item:focus,
  a.navbar-item:focus-within,
  a.navbar-item:hover,
  a.navbar-item.is-active,
  .navbar-link:focus,
  .navbar-link:focus-within,
  .navbar-link:hover,
  .navbar-link.is-active {
    background-color: #fafafa;
    color: #00818b;
  }

  .fa-superpowers {
    color: #00818b;
    font-weight: bold;
  }

  nav {
    font-family: "Montserrat", sans-serif;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 12px 0px;
    font-weight: bold;
    height: 80px;
    min-height: 80px;
    margin-bottom: 2.5rem;
  }

  :global(.navbar-dropdown a.navbar-item.active::before){
    background-color: transparent !important;
    display: none;

  }

  /* Style for "active" links; need to mark this :global because the router adds the class directly */
  :global(a.active::before) {
    position: absolute;
    content: "";
    width: calc(100% - 1.5em);
    height: 2px;
    background-color: #00818b;
    display: block;
    bottom: -1px;
  }

  :global(.active) {
    position: relative;
    color: #00818b;
  }

  a.navbar-item:hover {
    color: #00818b;
    background: #fafafa;
  }

  .navbar-brand a {
    padding: 1em 1.5em;
  }
  .dp-show {
    display: block;
  }

  @media screen and (max-width: 1023px) {
    .navbar-brand {
      padding: 1em;
    }
    .navbar-menu {
      box-shadow: none;
    }
  }
</style>
