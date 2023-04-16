<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { appStateStore } from '../global-store';
	import type { AppStateType } from '../global-types';
  import { handleClickOutside } from '../helpers';
  import triangles from '$lib/assets/triangles.svg';

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
      <img src={triangles} alt="icon">
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

  img {
    border: 2px solid var(--grey-five);
    border-radius: 50%;
    width: 75px;
    height: 75px;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.5);
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