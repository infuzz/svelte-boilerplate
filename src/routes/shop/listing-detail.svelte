<script>
    import * as api from '../../helpers/api.js'
    import { onMount } from 'svelte'
    import Message from '../../components/Message'
    import Loading from '../../components/Ui/LoadingSpinner'
    import defaultImgImg from '../../assets/images/shop-3.jpg'
    import { Swipe, SwipeItem } from 'svelte-swipe'

    let message
    let messageType = 'warning'
    let title
    let defaultImg
    let galleryId
    let desc
    let price
    let gallery = []
    let loading = true

    let autoplay = false
    let delay = 2000 //ms
    let showIndicators = true
    let transitionDuration = 1000 //ms
    let defaultIndex = 0 //start from 0

    export let params = {}

    async function getListing() {
        try {
            const res = await api.get(`shop/listing-detail/${params.id}`)
            if (res.message) {
                loading = false
                return (message = res.messageType)
            }
            loading = false
            if (res.galleryId) {
                galleryId = res.galleryId._id
                gallery = res.galleryId.gallery
            }

            title = res.title
            defaultImg = res.defaultImg
            desc = res.desc
            price = res.price
        } catch (error) {
            loading = false
            return (message = error)
        }
    }

    onMount(() => {
        getListing()
    })

    function closeMessage() {
        message = null
    }
</script>

<style>
    .swipe-holder {
        height: 30vh;
        width: 100%;
    }
    img {
        display: block;
        max-width: 600px;
        width: 100%;
        height: auto;
    }
    .gallery {
        display: flex;
    }
    .gallery img {
        display: block;
        width: 40px;
        height: auto;
        margin-top: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
    }
    .description {
        margin: 20px 0;
    }
</style>

<section>

    {#if loading}
        <Loading />
    {:else}
        {#if message}
            <Message {message} {messageType} on:closeMessage={closeMessage} />
        {/if}

        <div class="card">
            <div class="card-content">

                <div class="swipe-holder">
                    <Swipe {showIndicators} {autoplay} {delay} {transitionDuration} {defaultIndex}>
                        <SwipeItem>
                            <img src={defaultImg} alt="" />
                        </SwipeItem>

                        <SwipeItem>
                            <img src={defaultImg} alt="" />
                        </SwipeItem>

                        <SwipeItem>
                            <img src={defaultImg} alt="" />
                        </SwipeItem>

                        <SwipeItem>
                            <img src={defaultImg} alt="" />
                        </SwipeItem>
                    </Swipe>
                </div>

                <div class="columns">
                    <div class="column is-three-fifths" style="background: gray">
                        {#if galleryId}
                            <img src="http://localhost:8000/{galleryId}/lg/{defaultImg}" alt="Default Image" />
                            <div class="gallery">
                                {#each gallery as img}
                                    <img src="http://localhost:8000/{galleryId}/sm/{img}" alt="Image" />
                                {/each}
                            </div>
                        {:else}
                            <img src="http://localhost:8000/default-img.jpg" alt="Default Image" />
                            <div class="gallery">
                                <img src="http://localhost:8000/default-img.jpg" alt="Default Image" />
                            </div>
                        {/if}
                    </div>
                    <div class="column is-two-fifths" style="background: yellow">
                        <b>{title}</b>
                        <p>${price}</p>
                        <div class="description">
                            {@html desc}
                        </div>
                        <div class="button is-primary is-large">ADD TO CART</div>
                    </div>

                </div>

            </div>
        </div>
    {/if}

</section>
