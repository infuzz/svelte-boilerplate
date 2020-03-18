<script>
    export let errors;

    function removeError() {
        errors = null;
    }
</script>

{#if errors }
    <ul class="error-messages notification is-danger">
      {#each Object.values(errors) as key}
           <li>{key.message}</li>
        {/each}
        <button class="delete" on:click={removeError}></button>
    </ul>
{/if}

<style>
    ul.error-messages {
        margin: 40px 0;
    }

    .error-messages li {
        list-style: none;
    }

</style>
