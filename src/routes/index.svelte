<script lang="ts">
  import AddPlayerDialog from '../components/AddPlayerDialog.svelte';
  import { onMount } from 'svelte';
  // import DeleteDialog from 'src/components/DeleteDialog.svelte';
  let isInactiveOpen: boolean = true;
  let isActiveOpen: boolean = true;
  let maxActivePlayers: number = 7;
  let playTimeLimit: string = '05:00';

  let deleteDialog: HTMLDialogElement;
  let addPlayerDialog: HTMLDialogElement;
  onMount(() => {
    deleteDialog = document.getElementById('deleteDialog') as HTMLDialogElement;
    addPlayerDialog = document.getElementById('addPlayerDialog') as HTMLDialogElement;
  })

  const showModal = () => {
    addPlayerDialog.showModal();
  }

  const deletePerson = () => {
    deleteDialog.close();
  }
</script>

<main>
  <p>Main Sub Watcher Area</p>
  <!-- <DeleteDialog personToDelete="Zach" deletePerson={deletePerson} /> -->
  <AddPlayerDialog />
  <button class="add" on:click={showModal} >
    Add Player
  </button>
</main>