<script lang="ts">
  import AddPlayerDialog from '../components/AddPlayerDialog.svelte';
  import { onMount } from 'svelte';
  let isInactiveOpen: boolean = true;
  let isActiveOpen: boolean = true;
  let maxActivePlayers: number = 7;
  let playTimeLimit: string = '05:00';

  let addPlayerDialog: HTMLDialogElement;
  onMount(() => {
    addPlayerDialog = document.getElementById('addPlayerDialog') as HTMLDialogElement;
  })

  const showModal = () => {
    addPlayerDialog.showModal();
  }
</script>

<main>
  <p>Main Sub Watcher Area</p>
  <AddPlayerDialog />
  <button class="add" on:click={showModal} >
    Add Player
  </button>
</main>