
<script>
    import Login from "../components/User/Login.svelte";
    import config from "../helpers/config";

    let companyName = config.global.companyName;
</script>

<svelte:head>
    <title>Login</title>
    <meta name="robots" content="noindex, nofollow">
</svelte:head>

<div class="column is-8 is-offset-2">
    <div class="card la-card">
        <div class="card-content clearfix">
            <h2 class="la-headline">HI, THERE</h2>
            <p class="is-centered">You can log in to your {companyName} account here.</p>
            <div class="la-divider">
                <hr class="la-divider-left">
                <p class="la-divider-text">
                    &nbsp;
                </p>
                <hr class="ua-divider-right">
            </div>
            
            <Login />
        </div>
        <footer class="card-footer">
            <a href="#/register" class="card-footer-item">Don't have an account?</a>
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
