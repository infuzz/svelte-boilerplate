<script>
  import { onMount, onDestroy } from "svelte";
  import { formatDate } from "../../helpers/utils";
  import userStore from "../../stores/userStore";
  import ls from "local-storage";
  import * as api from "../../helpers/api.js";
  import Message from "../../components/Message.svelte";
  import {
    validateRequired,
    validateEmail,
    validatePassword
  } from "../../helpers/validate";
  import TextInput from "../../components/Ui/TextInput.svelte";
  import { replace } from "svelte-spa-router";
  import defaultImg from "../../assets/images/default-image.jpg";
  import LoadingSpinner from "../../components/Ui/LoadingSpinner.svelte";

  let isLoading = true;
  let unsubscribe;
  let memberSince;
  let currentUser;
  let token;
  let userId;
  let message;
  let messageType = "warning";
  let email = "";
  let name = "";
  let location = "";
  let website = "";
  let gender = "";
  let password = "";
  let passwordConfirmation = "";

  token = ls.get("jwt");

  onMount(() => {
    unsubscribe = userStore.subscribe(userData => {
      currentUser = userData;

      userId = currentUser._id;
      if (userId) {
        email = currentUser.email;
        name = currentUser.profile.name || "";
        gender = currentUser.profile.gender || "";
        website = currentUser.profile.website || "";
        location = currentUser.profile.location || "";
        memberSince = formatDate(currentUser.memberSince);
        isLoading = false;
      }
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  $: emailValid = validateEmail(email);
  $: formIsValid = emailValid;

  $: passwordValid = validatePassword(password);
  $: passwordConfirmValid = password === passwordConfirmation;
  $: passwordFormIsValid = passwordValid && passwordConfirmValid;

  async function updateUser() {
    try {
      const userObject = {
        profile: {
          name: name,
          website: website,
          location: location,
          gender: gender
        },
        email: email,
        id: userId
      };
      const res = await api.patch(`user/account`, userObject, token);
      if (res.message) {
        return (message = res.message);
      }

      messageType = "success";
      userStore.setUser(res.user);
      message = "User profile was updated successfully!";
      window.scrollTo(0, 0);
    } catch (err) {
      if (err) {
        return (message = err);
      }
    }
  }

  async function deleteUser() {
    const result = confirm("Are you sure you want to delete your account?");
    if (result) {
      const res = await api.post(`user/delete`, {id: userId}, token);
      if (res && res.message) {
        return message = res.message;
      }
      ls.remove("jwt");
      messageType = "success";
      message = res;

      setTimeout(function() {
        window.location.replace("/");
      }, 1500);
      
    }
  }

  async function updatePasswrod() {
    const passwordForm = document.getElementById("password-reset-form");
    const userObject = {
      id: userId,
      password: password,
      passwordConfirmation: passwordConfirmation
    };
    const res = await api.post(`user/update-password`, userObject, token);
    if (res && res.message) {
      return (message = res.message);
    }
    window.scrollTo(0, 0);
    passwordForm.reset();
    messageType = "success";
    message = res;
  }

  function closeMessage() {
    message = null;
  }
</script>

<style>
  .capitalize {
    text-transform: capitalize;
  }
  .card .field-label {
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 1rem;
    text-align: left;
  }
  .member-since {
    color: gray;
    font-size: 12px;
    margin-top: 2em;
  }
  .member-since strong {
    color: gray;
  }
  .center-form {
    max-width: 600px;
  }

  .center-form form {
    padding: 2em 2em 5em 2em;
  }

  .profile {
    max-width: 360px;
    width: 360px;
    margin: auto;
  }

  img.default-img {
    width: 150px;
    height: 150px;
    margin: auto;
  }
  .edit-user-form{
    margin-bottom: 60px;
  }

</style>

<svelte:head>
  <title>Profile Page</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section>
    {#if isLoading}
      <LoadingSpinner />
    {/if}

    {#if currentUser}
      <div class="columns">

        <div class="column is-half">

          <div class="card profile is-clearfix">
            <header class="card-header">
              <div class="card-header-title">Profile Information</div>
              <div class="card-header-icon">:::</div>
            </header>

            <div class="card-image">
              <figure class="image is-4by3">
                {#if currentUser.avatar}
                  <img
                    class="default-img"
                    src={currentUser.avatar}
                    alt="User Image" />
                {:else}
                  <img class="default-img" src={defaultImg} alt="User Image" />
                {/if}
              </figure>
            </div>

            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  {#if name}
                    <p class="is-4">
                      <strong>Name:</strong>
                      {name}
                    </p>
                  {/if}
                  <p class="is-6">
                    <strong>Email:</strong>
                    {currentUser.email}
                  </p>
                  {#if website}
                    <p class="is-4">
                      <strong>Website:</strong>
                      {website}
                    </p>
                  {/if}
                  {#if location}
                    <p class="is-4">
                      <strong>Location:</strong>
                      {location}
                    </p>
                  {/if}
                  {#if gender}
                    <p class="is-4">
                      <strong>Gender:</strong>
                      {gender}
                    </p>
                  {/if}
                  <div class="member-since">
                    <strong>Member Since:</strong>
                    <time>{memberSince}</time>
                    <br />
                    <strong>Role:</strong>
                    <span class="capitalize">{currentUser.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-half">       
            {#if message}
              <Message
                {message}
                {messageType}
                on:closeMessageEvent={closeMessage} />
            {/if}
            <div class="content center-form">
              <form class="card edit-user-form">
                <TextInput
                  id="name"
                  label="User Name"
                  value={name}
                  on:input={event => (name = event.target.value)} />
                <TextInput
                  id="email"
                  label="Email"
                  valid={emailValid}
                  validityMessage="Please enter a valid email."
                  value={email}
                  on:input={event => (email = event.target.value)} />
                <TextInput
                  id="website"
                  label="Website"
                  value={website}
                  on:input={event => (website = event.target.value)} />
                <TextInput
                  id="location"
                  label="Location"
                  value={location}
                  on:input={event => (location = event.target.value)} />

                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label">Gender</label>
                  </div>
                  <div class="field-body">
                    <div class="field is-narrow">
                      <div class="control">
                        <label class="radio">
                          <input type="radio" bind:group={gender} value="Male" />
                          Male
                        </label>
                        <label class="radio">
                          <input type="radio" bind:group={gender} value="Female" />
                          Female
                        </label>
                        <label class="radio">
                          <input type="radio" bind:group={gender} value="Other" />
                          Other
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  class="button is-pulled-right is-primary"
                  on:click|preventDefault={updateUser}
                  disabled={!formIsValid}>
                  Save
                </button>
              </form>

              <form class="card" id="password-reset-form">
                <TextInput
                  id="password"
                  label="Password"
                  type="password"
                  valid={passwordValid}
                  validityMessage="Please enter a valid password."
                  value={password}
                  on:input={event => (password = event.target.value)} />
                <TextInput
                  id="passwordConfirmation"
                  label="Password Confirmation"
                  type="password"
                  valid={passwordConfirmValid}
                  validityMessage="Passwords did not match"
                  value={passwordConfirmation}
                  on:input={event => (passwordConfirmation = event.target.value)} />

                <button
                  class="button is-pulled-right is-primary"
                  on:click|preventDefault={updatePasswrod}
                  disabled={!passwordFormIsValid}>
                  Update Password
                </button>

              </form>
              <form>
                <div class="control is-clearfix">
                  <button
                    class="button is-danger is-pulled-right"
                    on:click|preventDefault={deleteUser}>
                    Delete Account
                  </button>
                </div>
                <br>
                <p class="help is-pulled-right">
                <span class="tag is-warning">
                    Warning! Deleting your account is irreversible.
                </span>

                </p>
              </form>
            </div>     
        </div>

      </div>
    {/if}

</section>
