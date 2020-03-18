<script>
  import { Chance } from "chance";
  import Cart from "./Cart.svelte";

  const makeFakeItems = (count = 1) => {
    const chance = new Chance();
    const fakeInventoryItems = [];
    const fakeCartItems = [];
    for (let i = 0; i < count; ++i) {
      const name = chance.word();
      const invItem = {
        id: chance.integer({ min: 100000, max: 999999 }),
        name: `${name[0].toUpperCase() + name.slice(1)} ${chance.animal({
          type: "zoo"
        })}`,
        price: chance.integer({ min: 2000, max: 200000 }),
        quantity: chance.integer({ min: 1, max: 10 })
      };
      const cartItem = { ...invItem, hovering: false, warnings: [] };
      cartItem.quantity =
        invItem.quantity - chance.integer({ min: 1, max: invItem.quantity });
      if (i === 1) {
        // show none remaining in inventory (disabled +)
        cartItem.quantity = invItem.quantity;
      }
      if (i === 2) {
        // unrealistic initial state, but show none in cart (disabled -)
        cartItem.quantity = 0;
      }
      if (i === 3) {
        // show downcarted warning (inventory < in cart)
        cartItem.quantity = invItem.quantity + 1;
      }
      if (i === 4) {
        // show pricechange warning since placed in cart
        cartItem.price = invItem.price - 1000;
      }
      fakeInventoryItems.push(invItem);
      fakeCartItems.push(cartItem);
    }

    return { fakeInventoryItems, fakeCartItems };
  };

  const { fakeInventoryItems, fakeCartItems } = makeFakeItems(6);
  // Fake API
  const shoppingData = {
    store: {
      name: "The Pet Store",
      taxRate: 0.15
    },
    inventory: {
      inventoryItems: fakeInventoryItems
    },
    cart: {
      cartItems: fakeCartItems,
      cartData: {}
    }
  };
</script>

<style>
  #cart{
    margin-bottom: 80px;
  }
</style>

<div class="card" id="cart">
  <div class="card-content">
    <Cart shoppingData={shoppingData} makeFakeItems={makeFakeItems}/>
  </div>
  </div>
