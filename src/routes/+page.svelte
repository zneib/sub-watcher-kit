<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  import AddPlayerDialog from '../components/AddPlayerDialog.svelte';
  import DeleteDialog from '../components/DeleteDialog.svelte';
  import OptionsDialog from '../components/OptionsDialog.svelte';
  import Collapse from '../components/Collapse.svelte';
  import DeleteAll from '../components/DeleteAll.svelte';
  import SaveTeamDialog from '../components/SaveTeamDialog.svelte';
  import LoadTeamDialog from '../components/LoadTeamDialog.svelte';
	import PlayersContainer from '../components/PlayersContainer.svelte';
  import ActivePlayersContainer from '../components/ActivePlayersContainer.svelte';

  let maxActivePlayers: number = 7;
  let playTimeLimit: string = '05:00';
  let personToDelete: string = '';

  let people: string[] = browser && JSON.parse(localStorage.getItem('people') || '[]');
  let activePlayers: string[] = browser && JSON.parse(localStorage.getItem('activePlayers') || '[]');

  let deleteDialog: HTMLDialogElement;
  let addPlayerDialog: HTMLDialogElement;
  let optionsDialog: HTMLDialogElement;
  let saveTeamDialog: HTMLDialogElement;
  let loadTeamDialog: HTMLDialogElement;
  onMount(() => {
    deleteDialog = document.getElementById('deleteDialog') as HTMLDialogElement;
    addPlayerDialog = document.getElementById('addPlayerDialog') as HTMLDialogElement;
    optionsDialog = document.getElementById('optionsDialog') as HTMLDialogElement;
    saveTeamDialog = document.getElementById('saveTeamDialog') as HTMLDialogElement;
    loadTeamDialog = document.getElementById('loadTeamDialog') as HTMLDialogElement;
  })

  // const showModal = () => {
  //   addPlayerDialog.showModal();
  // }

  const deletePerson = () => {
    people = people.filter((name) => name !== personToDelete);
    localStorage.setItem('people', JSON.stringify(people));
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

  const showDialogElement = (person: string) => {
    personToDelete = person;
    deleteDialog.showModal();
  }

  const showOptionsDialog = () => {
    optionsDialog.showModal();
  }

  // const addActivePlayer = (player: string) => {
  //   activePlayers = [...activePlayers, player];
  //   people = people.filter((name: string) => name !== player);
  //   localStorage.setItem('activePlayers', JSON.stringify(activePlayers));
  //   localStorage.setItem('people', JSON.stringify(people));
  // }

  // const removeActivePlayer = (player: string) => {
  //   activePlayers = activePlayers.filter((name: string) => name !== player);
  //   people = [...people, player];
  //   localStorage.setItem('activePlayers', JSON.stringify(activePlayers));
  //   localStorage.setItem('people', JSON.stringify(people));
  // }

  // const removeAllActivePlayers = () => {
  //   people = [people, ...activePlayers].flat();
  //   activePlayers = [];
  //   localStorage.removeItem('activePlayers');
  //   localStorage.setItem('people', JSON.stringify(people));
  // }
</script>

<main>
  <DeleteDialog personToDelete={personToDelete} deletePerson={deletePerson} />
  <AddPlayerDialog addPlayer={addPlayer} />
  <OptionsDialog bind:maxActivePlayers={maxActivePlayers} bind:playTimeLimit={playTimeLimit} />
  <SaveTeamDialog activePlayers={activePlayers} people={people} />
  <LoadTeamDialog bind:people bind:activePlayers />
  <button on:click={() => saveTeamDialog.showModal()}>Save Team</button>
  <button on:click={() => loadTeamDialog.showModal()}>Load Team</button>
  <button>Edit Teams</button>
  <PlayersContainer addPlayerDialog={() => addPlayerDialog.showModal()} showOptionsDialog={showOptionsDialog} showDialogElement={showDialogElement}  />
  <ActivePlayersContainer />
</main>

<style>
  :global(:root) {
    --danger: #d64545;
    --grey-one: #102A43;
    --grey-two: #243B53;
    --grey-three: #334E68;
    --grey-four: #486581;
    --grey-five: #627D98;
    --grey-six: #829AB1;
    --grey-seven: #9FB3C8;
    --grey-eight: #BCCCDC;
    --grey-nine: #D9E2EC;
    --grey-ten: #F0F4F8;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(*) {
    box-sizing: border-box;
  }

  article {
    position: relative;
    padding: 15px 15px 30px;
    margin: 25px;
    max-width: 500px;
    border-radius: 5px;
    flex: 1;
  }

  div.collapsed {
    display: none;
  }

  div.person-container {
    max-height: 220px;
    overflow-y: auto;
    padding-right: 5px;
  }

  div.labels {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  div.labels > span:nth-child(1) {
    margin-left: 40px;
  }
  div.labels > span:nth-child(2) {
    margin-right: 10px;
  }

  .options {
    width: 100px;
    position: absolute;
    left: 35px;
    bottom: -15px;
  }

  .add {
    width: 100px;
    position: absolute;
    right: 35px;
    bottom: -15px;
    margin: auto;
  }

  p.limit-message {
    text-align: center; 
    font-size: 12px; 
    margin: 2px auto
  }

  p.limit-message > span {
    font-weight: bold;
  }
  
  .remove-all {
    width: 150px;
    position: absolute;
    right: 0;
    left: 0;
    bottom: -15px;
    margin: auto;
  }

  h2 {
    margin-top: 0;
    text-align: center;
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

  p.message-text {
    font-size: 12px;
    text-align: center;
  }

  main {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  @media (max-width: 768px) {
    main {
      flex-direction: column;
    }

    article {
      width: 90%;
      margin-top: 25px;
    }
  }

  @media (prefers-color-scheme: dark) {
    :global(body) {
      background-color: var(--grey-one);
    }
    :global(article) {
      background-color: var(--grey-three);
    }

    div.labels {
      color: var(--grey-eight);
    }

    p.limit-message {
      color: var(--grey-nine);
    }

    :global(p.message-text) {
      color: var(--grey-nine);
    }

    button {
      color: var(--grey-nine);
      background-color: var(--grey-four);
      border: 2px solid var(--grey-six);
    }
  }
  @media (prefers-color-scheme: light) {
    :global(article) {
      background-color: #eee;
    }
  }
</style>
