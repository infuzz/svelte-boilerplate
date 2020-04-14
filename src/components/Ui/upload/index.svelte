<script>
  import {
    getFilesFromDropEvent,
    getFilesFromInputEvent
  } from "./_input-utils.mjs";
  import { createEventDispatcher } from "svelte";
  export let multiple = true;
  let dragging = false;
  const dispatch = createEventDispatcher();
  function startDragging() {
    dragging = true;
  }
  function stopDragging() {
    dragging = false;
  }
  const onFile = getFilesFunction => event => {
    stopDragging();
    const files = getFilesFunction(event);
    if (files.length) {
      dispatch("input", { files: multiple ? files : files[0] });
    }
  };
</script>

<style>
  input {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
  }
  label:hover {
    cursor: pointer;
  }
  .dropzone{
    min-height: 150px;
    border: 2px dotted rgba(0, 0, 0, 0.3);
    background: white;
    padding: 20px 20px;
    margin-bottom: 20px;
  }
  .dropzone p{
    text-align: center
  }
</style>

<label
  class:dragging
  on:drop|preventDefault={onFile(getFilesFromDropEvent)}
  on:dragover|preventDefault={startDragging}
  on:dragleave|preventDefault={stopDragging}>
  <slot {dragging}>
    <div class="dropzone">
      <p>
      Drag &amp; Drop your file(s) or
      <strong>browse.</strong>
      </p>
    </div>
  </slot>
  <input type="file" {multiple} on:input={onFile(getFilesFromInputEvent)} />
</label>