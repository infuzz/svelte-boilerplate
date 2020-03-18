<script>
  import { slide } from "svelte/transition";
</script>

<style>
  span {
    position: absolute;
    right: 2px;
    top: 7px;
    display: inline-block;
    margin: 0 0.25rem;
    border-radius: 3px;
    border: 1px solid #c95f73;
    background: #dd5f87;
    color: white;
    padding: 0 0.5rem;
    font-family: "Lato", sans-serif;
    font-size: 0.8rem;
    z-index: 2;
  }
</style>

<span transition:slide>
  <slot />
</span>
