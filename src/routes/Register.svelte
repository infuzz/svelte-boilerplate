
<script>
    import Register from "../components/User/Register.svelte";

</script>

<svelte:head>
    <title>Register</title>
    <meta name="robots" content="noindex, nofollow">
</svelte:head>

<div class="column is-8 is-offset-2">
    <div class="card la-card">
        <div class="card-content clearfix">
            <h2 class="la-headline">SIGN UP</h2>
            <p class="is-centered">We're happy you're here!</p>
            <div class="la-divider">
                <hr class="la-divider-left">
                <p class="la-divider-text">
                    &nbsp;
                </p>
                <hr class="ua-divider-right">
            </div>
            <Register/>
            <p class="help">Password minimum length 8, must have 1 capital letter, 1 number and 1 special character.</p>
            <br>
            <p>By creating an account you agree to our <a href="#/privacy">privacy policy</a></p>
        </div>
        <footer class="card-footer">
            <a href="#/login" class="card-footer-item">Already have an account?</a>
        </footer>
    </div>
</div>

<style>
    .card-footer{
        background: #00818b;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    .card-footer a{
        color: white;
    }
    .la-divider{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: "Brandon Text","Asap",Verdana,Arial,sans-serif;
        color: #5c5c5c;
        font-weight: bold;
        width: 90%;
        margin: 0 auto;
    }
    .la-divider hr{
        flex-grow: 3;
        height: 2px;
        border: none;
        background-color: #f2f2f2;
    }
    .la-divider .la-divider-text{
        flex-grow: 1;
        text-align: center;
    }
    .is-centered{
        margin: 20px 0;
        text-align: center;
    }
    .la-card{
        border-radius: 4px;
        box-shadow: 0 4px 16px 0 rgba(0,0,0,0.16);
    }
    .la-headline{
        font-weight: bold;
        text-align: center;
        font-size: 30px;
        color: #00828C;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
    .clearfix:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }
</style>
