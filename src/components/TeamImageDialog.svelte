<script lang="ts">
  import { onMount } from 'svelte';
  import { handleClickOutside } from '../helpers';

  let teamImageDialog: HTMLDialogElement;
  onMount(() => {
    teamImageDialog = document.getElementById('teamImageDialog') as HTMLDialogElement;
  });

  const closeDialog = () => {
    teamImageDialog.close();
  }

  const handleSelectedImage = () => {
    console.log('Do stuff here...');
  }
</script>

<dialog id="teamImageDialog" on:click={(e) => handleClickOutside(e, teamImageDialog)}>
  <div class="wrapper">
    <div class="button-wrapper">
      <button value="cancel" on:click={closeDialog}>Cancel</button>
      <button type="submit" value="default" on:click={handleSelectedImage}>Confirm</button>
    </div>
  </div>
</dialog>