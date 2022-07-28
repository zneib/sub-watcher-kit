<script lang="ts">
  import { onMount } from 'svelte';
  import { handleClickOutside } from '../helpers';
  // export let addPlayer: () => {};

  let addPlayerDialog: HTMLDialogElement;
  onMount(() => {
    addPlayerDialog = document.getElementById('addPlayerDialog') as HTMLDialogElement;
  });

  const closeDialog = () => {
    addPlayerDialog.close()
  }
</script>

<dialog id="addPlayerDialog" on:click={(e) => handleClickOutside(e, addPlayerDialog)}>
  <div class="wrapper">
    <form>
      <h3>Add Another Player</h3>
      <div>
        <label for="firstName">Name</label>
        <input type="text" name="firstName">
      </div>
      <div class="button-wrapper">
        <button type="submit">Add</button>
        <button value="cancel" on:click={closeDialog}>Close</button>
      </div>
    </form>
  </div>
</dialog>