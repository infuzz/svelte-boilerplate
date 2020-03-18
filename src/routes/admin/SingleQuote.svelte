<script>
  import * as api from "../../helpers/api";
  import Message from "../../components/Message.svelte";
  import LoadingSpinner from "../../components/Ui/LoadingSpinner.svelte";
  import ls from "local-storage";

  export let params = {};
  
  let name = "";
  let email = "";
  let tel = "";
  let site = "";
  let msg = "";
  let isLoading = true;
  let message
  let messageType = 'warning'

  const token = ls.get("jwt");

  (async () => {
    try {
      const res = await api.get(`admin/quote/${params.id}`, token);
      
      if (res.message) {
        isLoading = false
        return message = res.message;
      }

      isLoading = false;

      name = res.name;
      email = res.email;
      tel = res.tel;
      site = res.site;
      msg = res.msg;

    } catch (err) {
      isLoading = false;
      return message = err;
    }
  })();

  function closeMessage() {
    message = null;
  }

</script>

{#if isLoading}
  <LoadingSpinner />  
{/if}

<section>
    {#if message}
    <Message
      message={message}
      on:closeMessageEvent={closeMessage}
      messageType={messageType} />
    {/if}

  <div class="card">
    <div class="card-header">
          <h1 class="card-header-title">Quote Info</h1>
          <div class="card-header-icon">:::</div>
    </div>
    <div class="card-content">
      <p><b>Name: </b> <span>{name}</span></p>
      <p><b>Email: </b> <span>{email}</span></p>
      {#if tel}<p><b>Tel: </b> <span>{tel}</span></p>{/if}
      <p><b>Website: </b> <span>{site}</span></p>
      <p><b>Message: </b> <span>{msg}</span></p>
      <br>
    </div>
  </div>
</section>

<style>

</style>