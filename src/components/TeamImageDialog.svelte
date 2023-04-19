<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { appStateStore } from '../global-store';
	import type { AppStateType } from '../global-types';
  import { handleClickOutside } from '../helpers';

  let teamImageDialog: HTMLDialogElement;
  onMount(() => {
    teamImageDialog = document.getElementById('teamImageDialog') as HTMLDialogElement;
  });

  let appStateData: AppStateType;
  const appStateStoreSub = appStateStore.subscribe((data) => {
    appStateData = { ...data }

    // Only try to open the modal again if it isn't already open
    if (appStateData.showTeamImageDialog && !teamImageDialog.open) {
      teamImageDialog.showModal();
    }
  });

  const closeDialog = () => {
    teamImageDialog.close();
  }

  const handleSelectedImage = () => {
    console.log('Do stuff here...');
  }

  onDestroy(() => {
    appStateStoreSub();
  });
</script>

<dialog id="teamImageDialog" on:click={(e) => handleClickOutside(e, teamImageDialog)}>
  <div class="wrapper">
    <div class="image-grid">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-48 0l-.003-.282-26.064 22.741-62.679-58.5 16.454-84.355 34.303 3.072c-24.889-34.216-60.004-60.089-100.709-73.141l13.651 31.939L256 139l-74.953-41.525 13.651-31.939c-40.631 13.028-75.78 38.87-100.709 73.141l34.565-3.073 16.192 84.355-62.678 58.5-26.064-22.741-.003.282c0 43.015 13.497 83.952 38.472 117.991l7.704-33.897 85.138 10.447 36.301 77.826-29.902 17.786c40.202 13.122 84.29 13.148 124.572 0l-29.902-17.786 36.301-77.826 85.138-10.447 7.704 33.897C442.503 339.952 456 299.015 456 256zm-248.102 69.571l-29.894-91.312L256 177.732l77.996 56.527-29.622 91.312h-96.476z"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-48 0l-.003-.282-26.064 22.741-62.679-58.5 16.454-84.355 34.303 3.072c-24.889-34.216-60.004-60.089-100.709-73.141l13.651 31.939L256 139l-74.953-41.525 13.651-31.939c-40.631 13.028-75.78 38.87-100.709 73.141l34.565-3.073 16.192 84.355-62.678 58.5-26.064-22.741-.003.282c0 43.015 13.497 83.952 38.472 117.991l7.704-33.897 85.138 10.447 36.301 77.826-29.902 17.786c40.202 13.122 84.29 13.148 124.572 0l-29.902-17.786 36.301-77.826 85.138-10.447 7.704 33.897C442.503 339.952 456 299.015 456 256zm-248.102 69.571l-29.894-91.312L256 177.732l77.996 56.527-29.622 91.312h-96.476z"/></svg>
    </div>
    <div class="button-wrapper">
      <button value="cancel" on:click={closeDialog}>Cancel</button>
      <button type="submit" value="default" on:click={handleSelectedImage}>Confirm</button>
    </div>
  </div>
</dialog>

<style>
  dialog {
    border: 2px solid rgb(175, 175, 175);
    border-radius: 5px;
    padding: 0;
    min-width: 300px;
    max-width: 350px;
  }

  dialog::backdrop {
    background-color: rgba(0,0,0,0.2);
  }

  dialog > div.wrapper {
    padding: 16px;
  }

  button {
    color: black;
    font-weight: normal;
    background-color: #fff;
    cursor: pointer;
    border-radius: 5px;
    border: 2px solid #ccc;
    padding: 5px 10px;
    transition: border .2s ease-in;
  }
  button:hover {
    border: 2px solid rgb(129, 129, 129);
  }

  svg {
    width: 50px;
    height: 50px;
  }
  
  .button-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  @media (max-width: 768px) {
    dialog {
      width: 90%;
    }
  }
  @media (prefers-color-scheme: dark) {
    dialog {
      color: var(--grey-nine);
      background-color: var(--grey-four);
      border: 2px solid var(--grey-six);
    }

    dialog::backdrop {
      background-color: rgba(0,0,0,0.4);
    }

    button {
      color: var(--grey-nine);
      background-color: var(--grey-four);
      border: 2px solid var(--grey-six);
    }
  }
</style>