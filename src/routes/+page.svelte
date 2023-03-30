<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  import AddPlayerDialog from '../components/AddPlayerDialog.svelte';
  import DeleteDialog from '../components/DeleteDialog.svelte';
  import OptionsDialog from '../components/OptionsDialog.svelte';
	import PlayersContainer from '../components/PlayersContainer.svelte';
  import ActivePlayersContainer from '../components/ActivePlayersContainer.svelte';
	import EditPlayerDialog from '../components/EditPlayerDialog.svelte';
	import SaveGameDialog from '../components/SaveGameDialog.svelte';
	import NewGameDialog from '../components/NewGameDialog.svelte';

  let saveTeamDialog: HTMLDialogElement;
  let loadTeamDialog: HTMLDialogElement;
  onMount(() => {
    saveTeamDialog = document.getElementById('saveTeamDialog') as HTMLDialogElement;
    loadTeamDialog = document.getElementById('loadTeamDialog') as HTMLDialogElement;
  })
</script>
  {#if $page.data.session}
    <SaveGameDialog />
  {/if}
  <NewGameDialog />
<main>
  <DeleteDialog />
  <AddPlayerDialog />
  <OptionsDialog />
  <EditPlayerDialog />
  <PlayersContainer />
  <ActivePlayersContainer />
</main>

<style>
  :global(:root) {
    --danger: #d64545;
    --grey-one: #1F2933;
    --grey-two: #323F4B;
    --grey-three: #3E4C59;
    --grey-four: #52606D;
    --grey-five: #616E7C;
    --grey-six: #7B8794;
    --grey-seven: #9AA5B1;
    --grey-eight: #CBD2D9;
    --grey-nine: #E4E7EB;
    --grey-ten: #F5F7FA;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    padding: 5px 15px;
  }

  main {
    display: flex;
    align-items: baseline;
  }

  @media (max-width: 768px) {
    main {
      flex-direction: column;
    }
  }

  @media (prefers-color-scheme: dark) {
    :global(body) {
      background-color: var(--grey-one);
    }
    :global(article) {
      background-color: var(--grey-three);
    }

    :global(p.message-text) {
      color: var(--grey-nine);
    }
  }
  @media (prefers-color-scheme: light) {
    :global(article) {
      background-color: #eee;
    }
  }
</style>
