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
    <div class="button-wrapper">
      <button value="cancel" on:click={closeDialog}>Cancel</button>
      <button type="submit" value="default" on:click={handleSelectedImage}>Confirm</button>
    </div>
  </div>
</dialog>