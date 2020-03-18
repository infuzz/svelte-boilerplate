<script>
    import config from '/src/helpers/config';
    let companyName = config.global.companyName;

    const img = require('/src/assets/images/website-creation-example.jpg');
    const shop3 = require('/src/assets/images/shop-3.jpg');

    var words = ['Hosting Service', 'SEO', 'Admin Panel', 'e-commerce', 'Online Shop'],
            nowPlaying = 'Custom Websites',
            currentWord = 0;

    var getRandom = function () {
        return parseInt(Math.random() * words.length);
    };

    setInterval(function () {
        var newWord = getRandom();
        while (newWord === currentWord) newWord = getRandom();
        currentWord = newWord;
        nowPlaying = words[currentWord];
    }, 5000);

</script>

<svelte:head>
    <title>{companyName} - Web development services</title>
</svelte:head>

<section>

<div class="content">
    <div class="has-text-centered blur">
        <h1><strong>Get your business online with <br> {companyName} Services</strong></h1>
        <h2 class="now-playing">{nowPlaying}</h2>
        <br>
        <a href="#/quote" type="button" class="button is-primary is-large">Start Now</a>
    </div>
</div>

<div class="columns">
    <div class="column">
        <div class="home-card">
            <div class="image">
                <img src="{img}" alt="Web Developer Image">
            </div>
            <div class="content">
                <h1>Do you need to improve your website design?</h1>
                <p><strong>Have an inspiration website?</strong></p>
                <p>{companyName} can customize the design to tailored your industry and all the
                    features you need.</p>
                <a href="#/quote" type="button" class="button is-primary is-large">Start Now</a>
            </div>
        </div>
    </div>
</div>

<div class="clearfixed"></div>

<div class="columns">
    <div class="column">
        <div class="content">
            <div class="heading no-margin-on-mobile">
                <h1 class="lg">Sell on line</h1>
            </div>
            <div class="columns custom">
                <div class="column is-7">
                    <h1>Whether you need a website, online shop or more.</h1>
                    <p>{companyName} can help you get started from a simple blog to a more complex website.</p>
                    <a href="#/quote" type="button" class="button is-primary is-large">Start Now</a>
                </div>
                <div class="column img-container is-5">
                    <img alt="Shoppingbag Image" class="custom-img" src="{shop3}">
                    <p>&nbsp;</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="clearfixed"></div>

<div class="custom-column-spacing">
    <div class="columns colums-spacing">
        <div class="column is-6">
            <div class="custom-card">
                <div class="custom-heading">
                <i class="fa fa-shield" aria-hidden="true"></i>
                <h2>Standard security</h2>
                </div>
                <div class="custom-content">
                    <p>Data is protected by HTTPS encryption.</p>
                </div>

            </div>
        </div>
        <div class="column is-6">
            <div class="custom-card">
                <div class="custom-heading">
                    <i class="fa fa-life-ring" aria-hidden="true"></i>
                    <h2>Excellent support</h2>
                </div>
                <div class="custom-content">
                    <p>We resolve issues usually within the same day.</p>
                </div>

            </div>
        </div>
    </div>

    <div class="columns">
        <div class="column is-6">
            <div class="custom-card">
                <div class="custom-heading">
                    <i class="fa fa-handshake-o" aria-hidden="true"></i>
                    <h2>Customer stisfaction guaranteed</h2>
                </div>
                <div class="custom-content">
                    <p>Our goal is customer retention and loyalty.</p>
                </div>

            </div>
        </div>
        <div class="column is-6">
            <div class="custom-card">
                <div class="custom-heading">
                    <i class="fa fa-server" aria-hidden="true"></i>
                    <h2>Powerfull Hosting Serice</h2>
                </div>
                <div class="custom-content">
                    <p>Maximize your website general performance with our SSD.</p>
                </div>

            </div>
        </div>
    </div>
</div>
</section>

<style>
    .lg{
        display: block;
        color: rgb(29, 43, 54);
        font-size: 40px;
        line-height: 55px;
        letter-spacing: -0.35px;
    }
    .custom-card svg{
        width: 66px;
        height: 66px;
        margin-bottom: 16px;
        color: rgb(112, 235, 181);
    }
    .custom-column-spacing .column{
        padding-top: 0;
        padding-bottom: 0;
    }
    .custom-card{
        background: white;
        padding: 3em;
        box-sizing: border-box;
        box-shadow: rgba(0, 0, 0, 0.06) 0px 4px 12px 0px;
        width: 100%;
        height: 280px;
        margin: 17px 0px;
        border-radius: 4px;
    }
    .custom-heading i{
        font-size: 70px;
        color: #70EBB5;
        margin-bottom: 18px;
    }
    .custom-heading h2{
        font-weight: bold;
        font-size: 22px;
        line-height: 32px;
    }
    .custom-content p{
        font-size: 22px;
        line-height: 32px;
        color: rgb(29, 43, 54);
    }
    .clearfixed{
        display: table;
        width: 100%;
        height: 80px;
    }
    .heading{
        margin: 60px 0;
    }
    .custom{
        background: white;
    }
    .custom .column:last-of-type{
        padding: 0;
        margin: 0;
    }
    .custom .column:first-of-type{
        padding: 4em;
    }
    .img-container{
        overflow:hidden;
        position:relative;
    }
    .custom-img{
        position: absolute;
        min-width: 1000%;
        min-height: 1000%;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%) scale(0.1);
        z-index: 1;
    }
    .home-card {
        position: relative;
        margin-top: 250px;
    }
    .home-card img {
        width: 700px;
        position: absolute;
        left: 0;
        top: -120px;
        z-index: 1;
    }
    .home-card .content {
        padding: 4em;
        float: right;
        clear: both;
        background: white;
        position: relative;
        width: 560px;
        z-index: 2;
    }

    .content p {
        font-size: 20px;
    }

    .blur h1 {
        font-size: 55px;
    }

    @media screen and (max-width: 1024px) {
        .no-margin-on-mobile{
            margin-top: 0;
        }
        .colums-spacing{
            margin-bottom: 31px;
        }
        .custom img{
            position: relative;
            top: 0;
            left: 0;
            width: 400px;
            display: block;
            margin: auto;
            min-width: 400px;
            min-height: 357px;
            transform: none;
        }
        .home-card .content{
            width: 100%;
        }
    
        .home-card{
            margin-top: 80px;
        }
        .home-card img{
            display: block;
            width: 100%;
            height: auto;
            top: 0;
            position: relative;        
        }
        .banner-title {
            top: 145px
        }
    }
</style>
