<script>
  import active from "svelte-spa-router/active"
  import { link } from "svelte-spa-router"

    let dashboard = true
    let addProduct = false

</script>

<div class="container">
  <div class="columns">


    <div class="column is-12">
        <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li>
                <a href="../">Dashboard</a>
            </li>
            <li class="is-active">
                <a href="/" aria-current="page">Add Listing</a>
            </li>
        </ul>
        </nav>

        {#if dashboard}
        <section class="info-tiles">
            <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
                <article class="tile is-child box">
                <p class="title">439k</p>
                <p class="subtitle">Users</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                <p class="title">59k</p>
                <p class="subtitle">Products</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                <p class="title">3.4k</p>
                <p class="subtitle">Open Orders</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                <p class="title">19</p>
                <p class="subtitle">Exceptions</p>
                </article>
            </div>
            </div>
        </section>
        <div class="columns">
            <div class="column is-6">
            <div class="card events-card">
                <header class="card-header">
                <p class="card-header-title">Events</p>
                <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                    <i class="fa fa-angle-down" aria-hidden="true" />
                    </span>
                </a>
                </header>
                <div class="card-table">
                <div class="content">
                    <table class="table is-fullwidth is-striped">
                    <tbody>
                        <tr>
                        <td width="5%">
                            <i class="fa fa-bell-o" />
                        </td>
                        <td>Lorum ipsum dolem aire</td>
                        <td class="level-right">
                            <a class="button is-small is-primary" href="#">
                            Action
                            </a>
                        </td>
                        </tr>
                        <tr>
                        <td width="5%">
                            <i class="fa fa-bell-o" />
                        </td>
                        <td>Lorum ipsum dolem aire</td>
                        <td class="level-right">
                            <a class="button is-small is-primary" href="#">
                            Action
                            </a>
                        </td>
                        </tr>
                        <tr>
                        <td width="5%">
                            <i class="fa fa-bell-o" />
                        </td>
                        <td>Lorum ipsum dolem aire</td>
                        <td class="level-right">
                            <a class="button is-small is-primary" href="#">
                            Action
                            </a>
                        </td>
                        </tr>
                        <tr>
                        <td width="5%">
                            <i class="fa fa-bell-o" />
                        </td>
                        <td>Lorum ipsum dolem aire</td>
                        <td class="level-right">
                            <a class="button is-small is-primary" href="#">
                            Action
                            </a>
                        </td>
                        </tr>
                        <tr>
                        <td width="5%">
                            <i class="fa fa-bell-o" />
                        </td>
                        <td>Lorum ipsum dolem aire</td>
                        <td class="level-right">
                            <a class="button is-small is-primary" href="#">
                            Action
                            </a>
                        </td>
                        </tr>
                        <tr>
                        <td width="5%">
                            <i class="fa fa-bell-o" />
                        </td>
                        <td>Lorum ipsum dolem aire</td>
                        <td class="level-right">
                            <a class="button is-small is-primary" href="#">
                            Action
                            </a>
                        </td>
                        </tr>
                        <tr>
                        <td width="5%">
                            <i class="fa fa-bell-o" />
                        </td>
                        <td>Lorum ipsum dolem aire</td>
                        <td class="level-right">
                            <a class="button is-small is-primary" href="#">
                            Action
                            </a>
                        </td>
                        </tr>
                        <tr>
                        <td width="5%">
                            <i class="fa fa-bell-o" />
                        </td>
                        <td>Lorum ipsum dolem aire</td>
                        <td class="level-right">
                            <a class="button is-small is-primary" href="#">
                            Action
                            </a>
                        </td>
                        </tr>
                        <tr>
                        <td width="5%">
                            <i class="fa fa-bell-o" />
                        </td>
                        <td>Lorum ipsum dolem aire</td>
                        <td class="level-right">
                            <a class="button is-small is-primary" href="#">
                            Action
                            </a>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
                <footer class="card-footer">
                <a href="#" class="card-footer-item">View All</a>
                </footer>
            </div>
            </div>
            <div class="column is-6">
            <div class="card">
                <header class="card-header">
                <p class="card-header-title">Inventory Search</p>
                <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                    <i class="fa fa-angle-down" aria-hidden="true" />
                    </span>
                </a>
                </header>
                <div class="card-content">
                <div class="content">
                    <div class="control has-icons-left has-icons-right">
                    <input class="input is-large" type="text" placeholder="" />
                    <span class="icon is-medium is-left">
                        <i class="fa fa-search" />
                    </span>
                    <span class="icon is-medium is-right">
                        <i class="fa fa-check" />
                    </span>
                    </div>
                </div>
                </div>
            </div>
            <div class="card">
                <header class="card-header">
                <p class="card-header-title">User Search</p>
                <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                    <i class="fa fa-angle-down" aria-hidden="true" />
                    </span>
                </a>
                </header>
                <div class="card-content">
                <div class="content">
                    <div class="control has-icons-left has-icons-right">
                    <input class="input is-large" type="text" placeholder="" />
                    <span class="icon is-medium is-left">
                        <i class="fa fa-search" />
                    </span>
                    <span class="icon is-medium is-right">
                        <i class="fa fa-check" />
                    </span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        {/if}

        {#if addProduct}
            <h1>Add Product</h1>
        {/if}

    </div>
  </div>
</div>

<style>
    .breadcrumb li.is-active a {
        color: #00818b;
    }
  .columns {
    width: 100%;
    height: 100%;
    margin-left: 0;
  }
  .card {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
    margin-bottom: 2rem;
  }
  .card-header-title {
    color: #8f99a3;
    font-weight: 400;
  }
  .info-tiles {
    margin: 1rem 0;
  }
  .info-tiles .subtitle {
    font-weight: 300;
    color: #8f99a3;
  }
  .card .content {
    font-size: 14px;
  }
  .card-footer-item {
    font-size: 14px;
    font-weight: 700;
    color: #8f99a3;
  }

  .card-table .table {
    margin-bottom: 0;
  }
  .events-card .card-table {
    max-height: 250px;
    overflow-y: scroll;
  }
</style>