<script>
    import {createEventDispatcher, onMount} from "svelte";
    import TextInput from "../Ui/TextInput.svelte";
    import {validateRequired, validateEmail, validatePassword} from "../../helpers/validate.js";
    import * as api from '../../helpers/api.js';
    import ls from 'local-storage';
    import userStore from "../../stores/userStore";
    import Message from "../../components/Message.svelte";
    import {replace} from 'svelte-spa-router'

    let email = "";
    let password = "";
    let passwordConfirmation = "";
    let message;
    let messageType = "warning"

    const dispatch = createEventDispatcher();

    $: emailValid = validateEmail(email);
    $: passwordValid = validatePassword(password);
    $: passwordConfirmValid = (password === passwordConfirmation);
    $: formIsValid = passwordValid && emailValid && passwordConfirmValid;

    async function submitForm(e) {
        e.preventDefault();
        try {
            const userData = {
                email: email,
                password: password,
                passwordConfirmation: passwordConfirmation
            };
            const res = await api.post('user/signup', userData);
            if (res && res.message ) {
                message = res.message;
            } else {
                ls.set('jwt', res.token);
                userStore.setUser(res.user);
                replace(`/user/profile`);
            }
        } catch (err) {
            if(err){
                return message = err
            }
        }
    }

    function handleKeyDown(event) {
        if(event.keyCode === 13 && formIsValid){
            submitForm(event);
        }
    }
    
    function closeThisMessage(){
        thisMessage = null;
    }

</script>

<style>

</style>

<svelte:window on:keydown={handleKeyDown}/>

{#if message}
<Message message="{message}" on:closeMessageEvent={closeThisMessage} messageType={messageType} />
{/if}

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
            validityMessage="Password minimum length 8, must have 1 capital letter, 1 number and 1 special character."
            value={password}
            className="is-large"
            on:input={event => (password = event.target.value)} />
    <TextInput
            id="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            valid={passwordConfirmValid}
            validityMessage="Passwords did not match"
            value={passwordConfirmation}
            className="is-large"
            on:input={event => (passwordConfirmation = event.target.value)} />
            <button class="button is-primary is-pulled-right" on:click={submitForm} disabled={!formIsValid}>Register</button>

</form>
