<script>
  import * as api from "/src/helpers/api";
  import Message from "/src/components/Message.svelte";
  import LoadingSpinner from "/src/components/Ui/LoadingSpinner.svelte";
  import { paginate, PaginationNav } from "/src/components/Ui/paginate/index.js";
  import { onMount, onDestroy } from "svelte";
  import { push } from 'svelte-spa-router';

  export let params = {};

  let message;
  let messageType = "warning";
  let listings = [];
  let items = listings;
  let isLodaing = true;
  let currentPage;
  let pageSize;
  let totalItems;

  async function getListings(currentPage) {
    try {
      const res = await api.get(`listings/${currentPage}`);

      pageSize = res.perPage;
      totalItems = res.totalItems;
      listings = res.listings;

      isLodaing = false;

      if (res.message) {
        isLodaing = false;
        return message = res.message;
      }
    } catch (error) {
      isLodaing = false;
      message = error.message;
    }
  }

  onMount(() => {
    currentPage = parseInt(params.page);
    getListings(currentPage);

    window.onhashchange = function() {
      currentPage = parseInt(params.page);
      getListings(currentPage);
    };
  });

  $: paginatedItem = paginate({ items, pageSize, currentPage });

  onDestroy(() => {
    // remove onhashchange event
    window.onhashchange = null;
  });

  function handleSetPage(e) {
    push(`/shop/${e.detail.page}`);
  }

  function closeMessage() {
    message = null;
  }
</script>

<style>
  .item {
    position: relative;
    width: 25%;
    float: left;
    padding: 10px;
  }
  .img {
    height: 200px;
    overflow: hidden;
    resize: none;
    width: 100%
  }
  .img img {
    object-fit: contain;
    height: 100%;
    width: 100%;
    background-color: rgb(255, 255, 255);
  }
  .desc {
    background-color: rgb(255, 255, 255);
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    overflow: visible;
  }
  .price-wrapper {
    display: flex;
    height: 20px;
    display: flex;
    height: 20px;
  }
  .price-inner {
    display: flex;
    -moz-box-align: center;
    align-items: center;
    -moz-box-flex: 1;
    flex-grow: 1;
    overflow: hidden;
  }
  .price {
    color: rgb(25, 42, 50);
    font-size: 16px;
    font-weight: 400;
    margin-right: 6px;
    flex-shrink: 0;
  }
  .info {
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgb(126, 154, 166);
    margin-top: 6px;
    text-transform: capitalize;
  }

  .listings {
    width: 100%;
    max-width: 100%;
    float: left;
    padding: 5px;
    clear: both;
  }

  .free-shipping {
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 12px;
    font-weight: 400;
    padding: 4px 6px;
    background-color: rgb(25, 42, 50);
    color: rgb(248, 250, 251);
  }
  .link {
    box-sizing: border-box;
    position: relative;
    text-align: left;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0.05) 0px 2px 20px 0px;
    display: block;
    transition: transform 0.3s ease 0s;
    cursor: pointer;
    width: 100%;
    line-height: 1;
  }
  .link:hover {
    transform: scale(1.05);
    overflow: visible;
  }
  .sale {
    position: absolute;
    right: 0px;
    bottom: 0px;
    font-size: 12px;
    font-weight: 400;
    padding: 4px 6px;
    background-color: rgb(25, 42, 50);
    color: rgb(248, 250, 251);
  }
  a.disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
</style>

<section>
  {#if isLodaing}
    <LoadingSpinner />
  {/if}

  {#if message}
    <Message {message} {messageType} on:closeMessage={closeMessage} />
  {/if}

  <div class="listings">
    {#each listings as listing, i}
      <div class="item">
        <a class="link {listing.qty === 0 ? 'disabled' : '' }" href="/#/shop/listing-detail/{listing._id}" >
          <div class="img">
            {#if listing.galleryId} 
            <img src="http://localhost:8000/{listing.galleryId._id}/md/{listing.defaultImg}" alt="Listing Image" />
            {:else}
            <img src="http://localhost:8000/default-img.jpg" alt="Listing Image" />
            {/if}
            {#if listing.freeShipping}
              <div class="free-shipping">Free Shipping</div>
            {/if}

            {#if listing.originalPrice}
              <div class="sale">On Sale</div>
            {/if}

          </div>
          <div class="desc">
            <div class="price-wrapper">
              <div class="price-inner">
                <div class="price">${listing.price}</div>
              </div>
            </div>
            {#if listing.qty === 0}
              <div class="info"><b style="color: red;">SOLD OUT</b></div>
              {:else}
              <div class="info">{listing.qty} in stock</div>
            {/if}  
  
          
          </div>
        </a>
      </div>
      <!-- item -->
    {/each}
  </div>

  <PaginationNav
    {totalItems}
    {pageSize}
    {currentPage}
    limit={1}
    showStepOptions={true}
    on:setPage={handleSetPage} />

</section>
