<script>
  import * as api from "../../helpers/api";
  import Message from "../../components/Message.svelte";
  import LoadingSpinner from "../../components/Ui/LoadingSpinner.svelte";
  import ls from "local-storage";

  export let params = {};
  let userEmail = "";
  let userAvatar = "";
  let userName = "";
  let userRole = "";
  let userWebsite = "";
  let userLocation = "";
  let userGender = "";
  let isLoading = true;
  let message
  let messageType = 'warning'

  const token = ls.get("jwt");

  (async () => {

    try {
      const res = await api.get(`admin/user/${params.id}`, token);
      
      if (res.message) {
        isLoading = false
        return message = res.message;
      }

      isLoading = false;
      userEmail = res.email;
      userAvatar = res.avatar;
      userRole = res.role;
      userName = res.profile.name;
      userWebsite = res.profile.website;
      userLocation = res.profile.location;
      userGender = res.profile.gender;

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

  <div class="card profile">
    <div class="card-header">
          <h1 class="card-header-title">User Profile Info</h1>
          <div class="card-header-icon">:::</div>
    </div>
    <div class="card-content">
      {#if userName}<p><b>Name: </b> <span>{userName}</span></p>{/if}
      <p><b>Email: </b> <span>{userEmail}</span></p>
      {#if userGender}<p><b>Gender: </b> <span>{userGender}</span></p>{/if}
      {#if userLocation}<p><b>Location: </b> <span>{userLocation}</span></p>{/if}
      <p><b>Role: </b> <span class="capitalize">{userRole}</span></p>
      {#if userWebsite}<p><b>Website: </b> <span>{userWebsite}</span></p>{/if}
      <br>
      <img class="center" src={userAvatar} alt="user image" />
    </div>
  </div>
</section>

<style>
  .capitalize{
    text-transform: capitalize;
  }
  .center{
    margin: 20px auto;
    display: block;
  }
  .card-content p{
    clear: both;
  }
  .card-content b{
    text-align: left;
    float: left;
  }
  .card-content span{
    text-align: left;
    float: right;
  }
  .profile {
    width: 100%;
    max-width: 360px;
    margin: auto;
  }
</style>