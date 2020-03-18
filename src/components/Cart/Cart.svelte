<script>
	// this is surprising, we are exporting the prop reference to its parent,
	// not importing the prop like in react
	export let shoppingData;
	export let makeFakeItems;
	import CartItem from "./CartItem.svelte";
	import { formatPrice, discounts } from "./utils.js";

	// TODO: warnings :After:: content
	// TODO: reactivity
	// TODO: sold out in. interim, specialcase of downcart
	// TODO: create item accepts real data
	// TODO: TESTING, and remove test buttons
	// TODO: line up buttons
	// TODO: UNDO/REDO
	// TODO: th margin transparent
	// TODO: footer spaced to bottom and sticky
	// TODO: sumite alrt error

	const { store } = shoppingData;
	$: inventoryItems = shoppingData.inventory.inventoryItems;
	$: cartItems = shoppingData.cart.cartItems;

	const Item0IventorySoldBackground = () => {
	  const updatedInventory0 = inventoryItems[0];
	  updatedInventory0.quantity = updatedInventory0.quantity - 1;
	  inventoryItems.splice(0, 1, updatedInventory0);
	  //console.log("sold0", updatedInventory0);
	};

	const Item0PriceRiseBackground = () => {
	  const updatedInventory0 = inventoryItems[0];
	  updatedInventory0.price = updatedInventory0.price + 10000;
	  inventoryItems.splice(0, 1, updatedInventory0);
	  //console.log("pricerise0", updatedInventory0);
	};

	const createCartItem = () => {
	  // Crud
	  // handle if real item sent typOf == Object?
	  const {
	    fakeInventoryItems: inventoryItem,
	    fakeCartItems: item
	  } = makeFakeItems(1);
	  inventoryItems = [...inventoryItems, ...inventoryItem];
	  cartItems = [...cartItems, ...item];
	  //console.log("created", cartItems);
	};

	const updateCartItem = ({ detail: { item, changes } }) => {
	  const updatedItem = { ...item, ...changes };
	  const updatedItems = [...cartItems];
	  const index = updatedItems.findIndex(
	    eachItem => eachItem.id === updatedItem.id
	  );
	  updatedItems.splice(index, 1, updatedItem);
	  cartItems = [...updatedItems];
	  //console.log(updatedItem);
	};

	// cruD
	const deleteCartItem = ({ detail: item }) => {
	  // cruD
	  const updated = cartItems.filter(eachItem => eachItem.id !== item.id);
	  cartItems = [...updated];
	  //console.log("removed", updated);
	};

	$: subtotal = cartItems.reduce((t, item) => {
	  const inventoryItem = inventoryItems.find(
	    eachItem => eachItem.id === item.id
	  );
	  return t + inventoryItem.price * (inventoryItem.quantity ? item.quantity : 0);
	}, 0);
	$: tax = subtotal * store.taxRate;
	$: shipping = subtotal * 0.05;
	$: discountText = "";
	$: discount = discounts[discountText]
	  ? -discounts[discountText](subtotal, shipping)
	  : 0;
	$: total = subtotal - discount + tax + shipping;
</script>

<h1>{store.name} Cart</h1>
{#if !cartItems}
	<p align="center">
		Your Cart is Empty and Lonely, Why don't we fix that?
	</p>
{:else}
	<div>
		<button class="button" on:click={createCartItem}>Add Something to Cart</button>
		<button title="inventory change in. bckground" class="button" on:click={Item0IventorySoldBackground}>TEST: Drop Inventory Item #1</button>	
		<button title="price change in background" class="button" on:click={Item0PriceRiseBackground}>TEST: Increase Price Inventory Item #1</button>	
	</div>
	<div class="cart">
		<table class="table">
			<thead>
				<tr>
					<th>ID#</th>
					<th>Item</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>Cost</th>
					<th>Remove</th>
				</tr>
			</thead>
			<tbody>
				{#each cartItems as item (item.id)}
					<CartItem on:updateCartItem="{updateCartItem}" on:deleteCartItem="{deleteCartItem}" item={item} inventoryItems={inventoryItems}/>
				{/each}
			</tbody>
			<tfoot class="tfoot">
			<tr>
				<td colSpan="3" />
				<td align="right">Sub-Total:</td>
				<td align="right">{formatPrice(subtotal)}</td>
			</tr>
			<tr>
				<td align="right">Discount Code:&nbsp; </td>
				<td>
					<input
						value={discountText}
						on:input={() => discountText = this.value.toUpperCase()}
						maxLength="15"
						type="text"
						class={!discountText ? 'discount-base' : discount ? 'discount-true' : 'discount-false'}
					/>
				</td>
				<td />
				<td align="right">
					{#if discount}
					✅
					{/if}
						Discount:
				</td>
				<td align="right">{formatPrice(discount)}</td>
			</tr>
			<tr>
				<td colSpan="3" />
				<td align="right">Tax ({store.taxRate * 100}%):</td>
				<td align="right">+{formatPrice(tax)}</td>
			</tr>
			<tr>
				<td colSpan="3" />
				<td align="right">Shipping:</td>
				<td align="right">+{formatPrice(shipping)}</td>
			</tr>
			<tr>
				<td colSpan="3" />
				<td align="right">Total:</td>
				<td align="right">{formatPrice(total)}</td>
				<td align="center">
					<button class="button" on:click={() => alert(`${store.name} thanks you for your purchase of ${cartItems.length} item${cartItems.length > 0 ? 's' : ''}, your card has been charged ${formatPrice(total)}.`)}>
						Purchase
					</button>
				</td>
			</tr>
			</tfoot>
		</table>
	</div>
	<br />
	<br />
	<div>
		Discount Codes to Try....{Object.keys(discounts).join(", ")}
	</div>
{/if}

<style>
  .cart {
    display: flex;
    justify-content: center;
    margin: 10px 20px 0 20px;
    padding: 5px;
    overflow: auto;
  }

  .discount-base {
    background: black;
    color: white;
    text-align: center;
  }

  .discount-true {
    background: green;
    color: white;
    text-align: center;
  }

  .discount-false {
    background: red;
    color: white;
    text-align: center;
  }
</style>