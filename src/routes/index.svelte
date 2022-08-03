<script lang="ts">
  import AddPlayerDialog from '../components/AddPlayerDialog.svelte';
  import { onMount } from 'svelte';
  // import DeleteDialog from 'src/components/DeleteDialog.svelte';
  let isInactiveOpen: boolean = true;
  let isActiveOpen: boolean = true;
  let maxActivePlayers: number = 7;
  let playTimeLimit: string = '05:00';
  let personToDelete: string = '';

  let people = JSON.parse(localStorage.getItem('people') || '{}') ?? [];
  let activePlayers = JSON.parse(localStorage.getItem('activePlayers') || '{}') ?? [];

  $: showMaxLimitMessage = maxActivePlayers - activePlayers?.length <= 0;

  let helperFeaturesOne = [
    'Add new players by clicking on the "Add Player" button.',
    'Configure the max active player limit and play time limits by clicking the Options button.',
    'Clicking on a player name will add them to the "Active Player" list.',
    'Clicking on the "X" will ask you to confirm you want to remove that player.',
    'Collapse and expland the card by clicking on the top left plus and minus buttons.'
  ]

  let helperFeaturesTwo = [
    "Players will start their time as soon as they're added to the list.",
    "Players will reach their max playing time as set by you in Options.",
    "Players who reach their max playing time will turn red and their time will end.",
    "Players can be sent back to the inactive list by clicking on their name.",
    "All players can be sent back to the inactive list by clicking on the Remove All Players button.",
    'Collapse and expland the card by clicking on the top left plus and minus buttons.'
  ]

  let deleteDialog: HTMLDialogElement;
  let addPlayerDialog: HTMLDialogElement;
  let optionsDialog: HTMLDialogElement;
  onMount(() => {
    deleteDialog = document.getElementById('deleteDialog') as HTMLDialogElement;
    addPlayerDialog = document.getElementById('addPlayerDialog') as HTMLDialogElement;
    optionsDialog = document.getElementById('optionsDialog') as HTMLDialogElement;
  })

  const showModal = () => {
    addPlayerDialog.showModal();
  }

  const deletePerson = () => {
    deleteDialog.close();
  }

  const addPlayer = (e: EventTarget) => {
    for (const field of e?.target) {
      if (field?.type !== 'submit') {
       people = [...people, field?.value];
       field.value = '';
       localStorage.setItem('people', JSON.stringify(people));
      }
    }
  }

  const addActivePlayer = (player: string) => {
    activePlayers = [...activePlayers, player];
    people = people.filter((name: string) => name !== player);
    localStorage.setItem('activePlayers', JSON.stringify(activePlayers));
    localStorage.setItem('people', JSON.stringify(people));
  }

  const removeActivePlayer = (player: string) => {
    activePlayers = activePlayers.filter((name: string) => name !== player);
    people = [...people, player];
    localStorage.setItem('activePlayers', JSON.stringify(activePlayers));
    localStorage.setItem('people', JSON.stringify(people));
  }

  const removeAllActivePlayers = () => {
    people = [people, ...activePlayers].flat();
    activePlayers = [];
    localStorage.removeItem('activePlayers');
    localStorage.setItem('people', JSON.stringify(people));
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