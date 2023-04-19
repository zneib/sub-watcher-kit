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
      <div class="emoji-image">&#9917;</div>
      <div class="emoji-image">&#127936;</div>
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

  .emoji-image {
    font-size: 32px;
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