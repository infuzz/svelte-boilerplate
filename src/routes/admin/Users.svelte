<script>
  import { onMount, onDestroy } from "svelte";
  import * as api from "../../helpers/api";
  import Message from "../../components/Message.svelte";
  import LoadingSpinner from "../../components/Ui/LoadingSpinner.svelte";
  import ls from "local-storage";
  import { formatDate } from "../../helpers/utils";
  import { Toast } from "../../helpers/toast";
  import defaultImg from "../../assets/images/default-image.jpg";
  import { push } from "svelte-spa-router";
  import { paginate, PaginationNav } from "../../components/Ui/paginate/index.js";

  export let params = {};

  let isLoading = true;
  let memberSince;
  let isAdmin;
  let currentPage;
  let pageSize;
  let totalItems;
  let items = [];
  let users = [];
  let message;
  let messageType = "warning";

  async function getUsers(currentPage) {
    try {
      const token = ls.get("jwt");
      const res = await api.get(`admin/users/${currentPage}`, token);

      if (res && res.message) {
        isLoading = false;
        return message = res.message;
      }

      isLoading = false;
      pageSize = res.perPage;
      items = res.users;
      totalItems = res.totalItems;
      return users = res.users;

  } catch (err) {
      isLoading = false;

      if (err.status === 401) {
        return window.location.replace("/");
      }

      return (message = err);
    }
  }

  onMount(() => {
    currentPage = parseInt(params.page)

    getUsers(parseInt(params.page));

    // if user browse back will send new request to that page
    window.onhashchange = function() {
      currentPage = parseInt(params.page);
      getUsers(currentPage);
    };

  })

  $: paginatedItem = paginate({ items, pageSize, currentPage });


  onDestroy(() => {
    // remove the onhashchange event
    window.onhashchange = null;
  });

  function handleSetPage(e) {
    push(`/admin/users/${e.detail.page}`);
  }

  function closeMessage() {
    message = null;
  }

</script>

<style>
  li.active a {
    color: #00818b;
  }
  .tabs {
    margin: 20px 0;
  }
  .default-img {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .link {
    background: #fdac17;
    padding: 12px;
    float: right;
    color: white;
  }
  .link:hover {
    opacity: 0.9;
  }
</style>

<svelte:head>
  <title>Admin Panel</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="card">
  <header class="card-header">
    <div class="card-header-title">&nbsp;</div>
    <div class="card-header-icon">:::</div>
  </header>
  <div class="card-content">
    {#if isLoading}
      <LoadingSpinner />
    {/if}
    {#if message}
      <Message {message} {messageType} on:closeMessageEvent={closeMessage} />
    {:else}
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>
                <abbr title="Role">Role</abbr>
              </th>
              <th>
                <abbr title="User Porfolio Image">Image</abbr>
              </th>
              <th>
                <abbr title="Email">Email</abbr>
              </th>
              <th>
                <abbr title="User Name">Name</abbr>
              </th>
              <th>
                <abbr title="Gender">Gender</abbr>
              </th>
              <th>
                <abbr title="Website">Website</abbr>
              </th>
              <th>
                <abbr title="Location">Location</abbr>
              </th>
              <th>
                <abbr title="Customer Since">Customer Since</abbr>
              </th>
              <th>
                <abbr title="Action Button">Action</abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            {#each users as user, i}
              <tr>
                <td>{user.role}</td>
                <td>
                  {#if user.avatar}
                    <img
                      class="default-img"
                      src={user.avatar}
                      alt="User Image" />
                  {:else}
                    <img
                      class="default-img"
                      src={defaultImg}
                      alt="User Image" />
                  {/if}
                </td>
                <td>
                  <span data-id={user._id}>{user.email}</span>
                </td>
                <td>{user.profile.name}</td>
                <td>{user.profile.gender}</td>
                <td>{user.profile.website}</td>
                <td>{user.profile.location}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <a href="#/admin/user/{user._id}">
                    <i class="fa fa-link link" aria-hidden="true" />
                  </a>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <PaginationNav
        {totalItems}
        {pageSize}
        {currentPage}
        limit={1}
        showStepOptions={true}
        on:setPage={handleSetPage} />
    {/if}
  </div>
</div>
