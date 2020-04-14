<script>
    import TextInput from '../../../components/Ui/TextInput.svelte'
    import Message from '../../../components/Message.svelte'
    import { validateRequired } from '../../../helpers/validate.js'
    import * as api from '../../../helpers/api'
    import Tags from '../../../components/Ui/tags'
    import { onMount } from 'svelte'
    import ls from 'local-storage'
    import FileUpload from '../../../components/Ui/upload'
    import Sortable from 'sortablejs'
    import Editor from 'cl-editor'

    let token = ls.get('jwt')
    let message
    let messageType = 'warning'
    let el
    let formData
    let imgs = []
    let images = []
    let payload
    let nodes
    let imgArray = []
    let defaultImg
    let isDefault
    let elements

    let galleryId
    let freeShipping = false
    let publish = false
    let tags = ['general']
    let title = ''
    let price = ''
    let originalPrice = ''
    let desc = ''
    let qty = 0
    let listingType = 'product'

    onMount(async () => {
        elements = document.getElementsByClassName('svelte-tags-input-tag')
        el = document.getElementById('items')
        payload = document.getElementById('preview')
        const sortable = Sortable.create(el, {
            onEnd: function(e) {
                nodes = el.getElementsByTagName('li')
                imgArray = Array.prototype.map.call(nodes, function(a) {
                    return a.getAttribute('id')
                })

                updateGallery()
            },
        })

        // Initialize editor
        const editor = await new Editor({
            // <HTMLElement> required
            target: document.getElementById('editor'),
            // optional
            props: {
                // <Array[string | Object]> string if overwriting, object if customizing/creating
                // available actions:
                // 'viewHtml', 'undo', 'redo', 'b', 'i', 'u', 'strike', 'sup', 'sub', 'h1', 'h2', 'p', 'blockquote',
                // 'ol', 'ul', 'hr', 'left', 'right', 'center', 'justify', 'a', 'image', 'forecolor', 'backcolor', 'removeFormat'
                actions: [
                    'b',
                    'i',
                    'u',
                    'strike',
                    'ul',
                    'ol',
                    {
                        name: 'copy', // required
                        icon: '<b>C</b>', // string or html string (ex. <svg>...</svg>)
                        title: 'Copy',
                        result: () => {
                            // copy current selection or whole editor content
                            const selection = window.getSelection()
                            if (!selection.toString().length) {
                                const range = document.createRange()
                                range.selectNodeContents(editor.refs.editor)
                                selection.removeAllRanges()
                                selection.addRange(range)
                            }
                            editor.exec('copy')
                        },
                    },
                    'h1',
                    'h2',
                    'p',
                ],
                // default 300px
                height: '300px',
                // initial html
                html: '',
                // remove format action clears formatting, but also removes some html tags.
                // you can specify which tags you want to be removed.
                removeFormatTags: ['h1', 'h2', 'blackquote'], // default
            },
        })

        // Events
        editor.$on('change', e => { 
            console.log(e);
              e.preventDefault()
            desc = e.detail
            console.log('CHANGE DESC ',desc)
        
        }) 

    })

    // updates gallery - imgs sorting position
    async function updateGallery() {
        defaultImg = imgArray[0]

        const obj = {
            galleryId: galleryId,
            gallery: imgArray,
        }

        try {
            const res = await api.patch('update-gallery', obj)
        } catch (error) {
            message = error
        }
    }

    async function gotFiles(file) {
        imgs = file.detail.files

        formData = new FormData()

        if (imgs.length > 0) {
            for (var i = 0; i < imgs.length; i++) {
                var file = imgs[i]
                formData.append('image', file)
            }
        }

        console.log('formData', formData)

        const response = await fetch('http://localhost:8000/api/v1/upload-files', {
            method: 'POST',
            body: formData,
        })

        const res = await response.json()
        if (res.message) return (message = res.message)

        images = res.gallery
        galleryId = res.galleryId
        defaultImg = images[0]
    }

    function handleTags(e) {
        console.log(e)
        tags = e.detail.tags
    }

    async function addListing() {
        const listingForm = document.getElementById('listing-form')
        const listingObject = {
            listingType: listingType,
            title: title,
            desc: desc,
            qty: qty,
            tags: tags,
            price: price,
            originalPrice: originalPrice,
            publish: publish,
            freeShipping: freeShipping,
            galleryId: galleryId,
            defaultImg: defaultImg,
        }

        try {
            const res = await api.post('listing', listingObject, token)
            if (res && res.message) return (message = res.message)
            message = 'Listing was created successfully!'
            messageType = 'success'
            images = []
            tags = []
            removeElementsByClass()
            listingForm.reset()
        } catch (error) {
            message = error
        }
    }

    $: titleValid = !validateRequired(title)
    $: priceValid = !validateRequired(price)
    $: descValid = !validateRequired(desc)
    $: qtyValid = !validateRequired(qty)
    $: formIsValid = titleValid && priceValid && descValid && desc && qty

    // clear listing tags
    function removeElementsByClass() {
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0])
        }
    }
</script>

<style>
    .editor {
        margin: 20px 0 20px 0;
    }
    .clearfix {
        display: table;
        width: 100%;
        clear: both;
    }
    .img-container {
        display: block;
    }
    .helper {
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }

    img {
        background: #3a6f9a;
        vertical-align: middle;
        max-height: 100px;
        max-width: 160px;
        margin: 5px 5px 5px 0;
    }
</style>

<section>

    {#if message}
        <Message {message} {messageType} on:closeMessageEvent={() => (message = null)} />
    {/if}

    <div class="card">
        <header class="card-header">
            <div class="card-header-title">Add Listing</div>
            <div class="card-header-icon">:::</div>
        </header>
        <div class="card-content">
            <form id="listing-form">
                <div class="control">
                    <label class="radio">
                        <input type="radio" bind:group={listingType} value="product" checked />
                        <b>Product</b>
                    </label>
                    <label class="radio">
                        <input type="radio" bind:group={listingType} value="service" />
                        <b>Service</b>
                    </label>
                </div>
                <p>&nbsp;</p>
                <TextInput
                    id="title"
                    label="Title"
                    value={title}
                    valid={titleValid}
                    validityMessage="This field is required"
                    on:input={event => (title = event.target.value)} />

                <div class="columns is-mobile">
                    <div class="column">
                        <TextInput
                            id="price"
                            label="Price"
                            value={price}
                            valid={priceValid}
                            validityMessage="This field is required"
                            on:input={event => (price = event.target.value)} />
                    </div>
                    <div class="column">
                        <TextInput
                            id="original-price"
                            label="Original Price"
                            value={originalPrice}
                            validityMessage="This field is required"
                            on:input={event => (originalPrice = event.target.value)} />
                    </div>

                </div>
                <div class="columns is-mobile">
                    <div class="column">
                        <TextInput
                            id="qty"
                            label="Qty"
                            value={qty}
                            valid={qtyValid}
                            validityMessage="This field is required"
                            on:input={event => (qty = event.target.value)} />
                    </div>
                    <div class="column" />

                </div>

                <label for="free-shipping" class="radio">
                    <input
                        id="free-shipping"
                        type="checkbox"
                        value={freeShipping ? 'true' : 'false'}
                        bind:checked={freeShipping} />
                    <b>Free Shipping &nbsp;</b>
                </label>

                <label for="publish" class="radio">
                    <input id="publish" type="checkbox" value={publish ? 'true' : 'false'} bind:checked={publish} />
                    <b>Publish</b>
                </label>
                <br />
                <br />
                <p>
                    <b>Listing Tags</b>
                    <small>Max number of tags is 5, example (women clothing, skirt)</small>
                </p>
                <Tags
                    on:tags={handleTags}
                    addKeys={[9]}
                    maxTags={5}
                    onlyUnique={true}
                    placeholder={'Click tab to enter product tags'} />
                <!-- <TextInput
                    id="desc"
                    label="Description"
                    controlType="hidden"
                    valid={descValid}
                    validityMessage="This field is required"
                    bind:value={desc} /> -->

                <div id="editor" class="editor" />

                <div class="clearfix">
                    <input type="hidden" name="galleryId" value={galleryId} />
                    <FileUpload let:dragging multiple={true} on:input={gotFiles} />
                    <ul id="items" class="img-container">
                        {#each images as img, i}
                            <li class="helper" id={img}>
                                <img src="http://localhost:8000/{galleryId}/sm/{img}" alt="img" />
                            </li>
                        {/each}
                    </ul>
                    <button
                        class="button is-pulled-right is-primary"
                        on:click|preventDefault={addListing}
                        disabled={!formIsValid}>
                        Add Listing
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>
