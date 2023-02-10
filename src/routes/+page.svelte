<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import globalStore from "../global-store";

  import AddPlayerDialog from '../components/AddPlayerDialog.svelte';
  import DeleteDialog from '../components/DeleteDialog.svelte';
  import OptionsDialog from '../components/OptionsDialog.svelte';
  import Person from '../components/Person.svelte';
  import Collapse from '../components/Collapse.svelte';
  import DeleteAll from '../components/DeleteAll.svelte';
  import Helper from '../components/Helper.svelte';
  import Player from '../components/Player.svelte';
  import SaveTeamDialog from '../components/SaveTeamDialog.svelte';
  import LoadTeamDialog from '../components/LoadTeamDialog.svelte';
  import ActivePlayersContainer from '../components/ActivePlayersContainer.svelte';

  let isInactiveOpen: boolean = true;
  let isActiveOpen: boolean = true;
  let maxActivePlayers: number = 7;
  let playTimeLimit: string = '05:00';
  let personToDelete: string = '';

  let people: string[] = browser && JSON.parse(localStorage.getItem('people') || '[]');
  let activePlayers: string[] = browser && JSON.parse(localStorage.getItem('activePlayers') || '[]');

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
  let saveTeamDialog: HTMLDialogElement;
  let loadTeamDialog: HTMLDialogElement;
  onMount(() => {
    deleteDialog = document.getElementById('deleteDialog') as HTMLDialogElement;
    addPlayerDialog = document.getElementById('addPlayerDialog') as HTMLDialogElement;
    optionsDialog = document.getElementById('optionsDialog') as HTMLDialogElement;
    saveTeamDialog = document.getElementById('saveTeamDialog') as HTMLDialogElement;
    loadTeamDialog = document.getElementById('loadTeamDialog') as HTMLDialogElement;
  })

  const showModal = () => {
    addPlayerDialog.showModal();
  }

  const deletePerson = () => {
    people = people.filter((name) => name !== personToDelete);
    localStorage.setItem('people', JSON.stringify(people));
    deleteDialog.close();
    globalStore.update(data => {
      return {
        ...data,
        players: people
      }
    })
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
  <DeleteDialog personToDelete={personToDelete} deletePerson={deletePerson} />
  <AddPlayerDialog addPlayer={addPlayer} />
  <OptionsDialog bind:maxActivePlayers={maxActivePlayers} bind:playTimeLimit={playTimeLimit} />
  <SaveTeamDialog activePlayers={activePlayers} people={people} />
  <LoadTeamDialog bind:people bind:activePlayers />
  <button on:click={() => saveTeamDialog.showModal()}>Save Team</button>
  <button on:click={() => loadTeamDialog.showModal()}>Load Team</button>
  <button>Edit Teams</button>
  <article>
    {#if people?.length > 0}
      <Collapse onChange={value => isInactiveOpen = value} />
      <DeleteAll bind:people bind:activePlayers />
    {/if}
    <h2>Inactive Players</h2>
    <Helper text="inactive" title="Inactive Players Features" features={helperFeaturesOne} />
    <div class:collapsed={!isInactiveOpen} class="person-container">
      {#if people.length > 0}
        {#each people as person}
          <Person 
            name={person} 
            addActivePlayer={addActivePlayer} 
            showDialogElement={showDialogElement} 
            maxActivePlayers={maxActivePlayers} 
            activePlayers={activePlayers?.length}
            limitMessageShowing={showMaxLimitMessage}
          />
        {/each}
      {/if}
    </div>
    <button class="options" on:click={() => optionsDialog.showModal()}>
      Options
    </button>
    {#if showMaxLimitMessage}
      <p class="limit-message">Active Player Limit Reached</p>
    {/if}
    <button class="add" on:click={() => addPlayerDialog.showModal()}>
      Add Player
    </button>
  </article>
  <article>
    {#if activePlayers?.length > 0}
      <Collapse onChange={value => isActiveOpen = value} />
    {/if}
    <h2>Active Players</h2>
    <Helper text="active" title="Active Players Features" features={helperFeaturesTwo} />
    {#if activePlayers?.length > 0 && isActiveOpen}
      <div class="labels">
        <span>Name</span>
        <span>({playTimeLimit}) MM:SS</span>
      </div>
    {/if}
    <div class:collapsed={!isActiveOpen}>
      {#if activePlayers.length > 0}
        {#each activePlayers as player, index}
          <Player index={index} name={player} removeActivePlayer={removeActivePlayer} playTimeLimit={playTimeLimit} />
        {/each}
      {/if}
    </div>
    {#if maxActivePlayers - activePlayers?.length !== 0}
      <p class="limit-message">
        <span>{maxActivePlayers - activePlayers?.length}</span> spots open
      </p>
    {/if}
    {#if activePlayers?.length > 1 && isActiveOpen}
      <button class="remove-all" on:click={removeAllActivePlayers}>Remove All Players</button>
    {/if}
    {#if activePlayers?.length === 0}
      <p class="message-text">No Players Selected</p>
    {/if}
  </article>
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
    article {
      background-color: var(--grey-three);
    }

    div.labels {
      color: var(--grey-eight);
    }

    p.limit-message {
      color: var(--grey-nine);
    }

    h2 {
      color: var(--grey-nine);
    }

    p.message-text {
      color: var(--grey-nine);
    }

    button {
      color: var(--grey-nine);
      background-color: var(--grey-four);
      border: 2px solid var(--grey-six);
    }
  }
  @media (prefers-color-scheme: light) {
    article {
      background-color: #eee;
    }
  }
</style>
