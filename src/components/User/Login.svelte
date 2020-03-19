
<script>
  import userStore from "../../stores/userStore"
  import TextInput from "../Ui/TextInput.svelte"
  import * as api from "../../helpers/api.js"
  import {
    validateEmail,
    validatePassword,
    validateRequired
  } from "../../helpers/validate.js"
  import ls from "local-storage"
  import Message from "../../components/Message.svelte"

  let email = ""
  let password = ""
  let key
  let keyCode
  let error
  let strategy = "local"
  let thisMessage

  $: emailValid = validateEmail(email);
  $: passwordValid = validatePassword(password)
  $: formIsValid = emailValid && passwordValid

  async function submitForm() {
    error = null
    try {
      const res = await api.post("user/login", { email, password, strategy })
       if (res && res.message) {
        return error = res.message
      }
      ls.set("jwt", res.token)
      userStore.setUser(res.user)
      window.location.replace('/');
      
    } catch (err) {
      return error = err;
    }
  }
  function closeMessage(){
    error = null
  }
  function handleKeyDown(event) {
    if (event.keyCode === 13 && formIsValid) {
      submitForm()
    }
  }
</script>

<style>
  .is-center {
    text-align: center;
    display: block;
    margin: 20px 0;
  }
  button {
    padding-right: 60px;
    padding-left: 60px;
  }
</style>

<svelte:window on:keydown={handleKeyDown} />

<form>
  <TextInput
    id="email"
    label="Email"
    valid={emailValid}
    validityMessage="Please enter a valid email."
    value={email}
    className="is-large"
    on:input={event => (email = event.target.value)} />

  <TextInput
    id="password"
    label="Password"
    type="password"
    valid={passwordValid}
    validityMessage="Please enter a valid password."
    value={password}
    className="is-large"
    on:input={event => (password = event.target.value)} />
</form>
<p class="help">Password minimum length 8, must have 1 capital letter, 1 number and 1 special character.</p>
{#if error}
  <Message message={error} messageType="warning" on:closeMessageEvent={closeMessage}/>
{/if}
<div class="clearfix is-center">
  <a href="#/forgot">Forgot Password?</a>
</div>

<button
  class="button is-primary is-pulled-right"
  on:click|preventDefault={submitForm}
  disabled={!formIsValid}>
  Login
</button>
