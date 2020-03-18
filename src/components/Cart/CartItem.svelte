<script>
  export let item;
  export let inventoryItems;
  import { formatPrice } from "./utils.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const invItem = inventoryItems.find(invItem => invItem.id === item.id);

  let displayQuantity = item.quantity;
  let displayPrice = item.price;
  let warnings = [];
  if (item.quantity > invItem.quantity) {
    warnings.push(
      `Note quantity of requested ${item.name}s was reduced by ${item.quantity -
        invItem.quantity} due to sold inventory since it was placed in cart.`
    );
    displayQuantity = invItem.quantity;
    //console.log("downcart", invItem.quantity, item.quantity, displayQuantity);
  }
  if (item.price !== invItem.price) {
    warnings.push(
      `Note price for ${item.name} has changed since it was placed in cart (${
        invItem.price > item.price ? "+ " : ""
      } ${formatPrice(invItem.price - item.price)}).`
    );
    displayPrice = invItem.price;
    //console.log("downprice", invItem.price, item.price, displayPrice);
  }
  // console.log(
  //   invItem.quantity,
  //   displayQuantity,
  //   invItem.quantity - displayQuantity
  // );
</script>
<style>
  .warning {
    font-style: italic;
    font-size: 0.7rem;
    text-align: center;
  }

  .item {
    padding: 5px 5px;
  }

</style>

<tr class={item.hovering ? "item hovering" : "item"}>
  <td align="center">{item.id}</td>
  <td>{item.name}</td>
  <td align="center">{formatPrice(displayPrice)}</td>
  <td align="center">
    <button
      on:click="{() => dispatch('updateCartItem', {item, changes: {quantity: displayQuantity - 1}} )}"
      disabled={displayQuantity <= 0}
    >
      -
    </button>
      <span class="quantity">{displayQuantity}</span>
    <button
      on:click="{() => dispatch('updateCartItem', {item, changes: {quantity: displayQuantity + 1}} )}"
      disabled={displayQuantity >= invItem.quantity}
    >
      +
    </button>
    ({invItem.quantity - displayQuantity ? invItem.quantity - displayQuantity + " in Stock" : "Sold Out"})
  </td>
  <td align="right">{formatPrice(displayPrice * displayQuantity)}</td>
  <td align="center">
    <button 
    on:click="{() => dispatch('deleteCartItem', item)}"
    on:mouseenter="{() => dispatch('updateCartItem', {item, changes: {hovering: true}} )}"
    on:mouseout="{() => dispatch('updateCartItem', {item, changes: {hovering: false}} )}"
    >X</button>
  </td>
</tr>
{#if warnings}
  <tr>
    <td class="warning" colSpan="7">
      {#each warnings as warning (warning)}
        {warning}
      {/each}
    </td>
  </tr>
{/if}

