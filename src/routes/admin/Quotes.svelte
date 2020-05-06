<script>
  import * as api from "../../helpers/api.js";
  import Message from "../../components/Message.svelte";
  import ls from "local-storage";
  import LoadingSpinner from "../../components/Ui/LoadingSpinner.svelte";
  import { paginate, PaginationNav } from "../../components/Ui/paginate/index.js";
  import { formatDate } from "../../helpers/utils.js";
  import { onMount, onDestroy } from "svelte";
  import path from 'path';
  import { push } from 'svelte-spa-router';

  export let params = {}

  let isLoading = true;
  let message = null;
  let messageType = "warning";
  let items = [];
  let quotes = [];
  let email = "";
  let name = "";
  let conatent = "";
  let currentPage;
  let pageSize;
  let totalItems;
  let dateCreated;

  async function getQuotes(currentPage) {
    try {
      const token = ls.get("jwt");
      const res = await api.get(`admin/quotes/${currentPage}`, token);

      if (res && res.message) {
        isLoading = false;
        return message = res.message;
      }

      isLoading = false;
      pageSize = res.perPage;
      items = res.quotes;
      totalItems = res.totalItems;
      return quotes = res.quotes;

    } catch (error) {
      isLoading = false;
      
      if (err.status === 401) {
        return window.location.replace("/");
      }
      
      return message = error;
    }
  }

  onMount(() => {
    currentPage = parseInt(params.page)
    
    getQuotes(parseInt(params.page));

    window.onhashchange = function() {
      currentPage = parseInt(params.page);
      getQuotes(currentPage);
    }; 
  
  });

  $: paginatedItem = paginate({ items, pageSize, currentPage });

  onDestroy(() => {
    //Remove the onhashchange event
    window.onhashchange = null
  });

  function handleSetPage(e) {
    push(`/admin/quotes/${e.detail.page}`);
  }

  function closeMessage() {
    message = null;
  }

</script>

<div class="card" on:loadQuotes={handleSetPage}>
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
    {/if}

    {#if quotes.length !== 0}
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Date Created</th>
              <th>Name</th>
              <th>Email</th>
              <th>Tel</th>
              <th>Website</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {#each quotes as quote, i}
              <tr>
                <td>{formatDate(quote.createdAt)}</td>
                <td>{quote.name}</td>
                <td>{quote.email}</td>
                <td>{quote.tel}</td>
                <td>{quote.site}</td>
                <td>
                  <div class="module">
                    <div class="line-clamp line-clamp-1">{quote.msg}</div>
                  </div>
                </td>
                <td>
                  <a href="#/admin/quote/{quote._id}">
                    <i class="fa fa-link link" aria-hidden="true" />
                  </a>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    <PaginationNav
      {totalItems}
      {pageSize}
      {currentPage}
      limit={1}
      showStepOptions={true}
      on:setPage={handleSetPage} />
  </div>
</div>

<style>
  .module {
    max-width: 150px;
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
