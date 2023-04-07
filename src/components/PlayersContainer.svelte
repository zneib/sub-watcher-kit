<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { playerStore, activePlayerStore } from "../global-store";
	import type { PlayerType } from '../global-types';
  import Collapse from "./Collapse.svelte";
  // import DeleteAll from "./DeleteAll.svelte";
  import Helper from "./Helper.svelte";
  import Person from "./Person.svelte";

  let isOpen = true;

  let helperFeaturesOne = [
    'Add new players by clicking on the "Add Player" button.',
    'Configure the max active player limit and play time limits by clicking the Options button.',
    'Clicking on a player name will add them to the "Active Player" list.',
    'Clicking on the "X" will ask you to confirm you want to remove that player.',
    'Collapse and expland the card by clicking on the top left plus and minus buttons.'
  ];

  let optionsDialog: HTMLDialogElement;
  let addPlayerDialog: HTMLDialogElement;
  onMount(() => {
    optionsDialog = document.getElementById('optionsDialog') as HTMLDialogElement;
    addPlayerDialog = document.getElementById('addPlayerDialog') as HTMLDialogElement;
  })

  let playerData: PlayerType[] = [];
  const playerStoreSub = playerStore.subscribe((data) => {
    playerData = data;
  });

  let activePlayerData: PlayerType[] = [];
  const activePlayerStoreSub = activePlayerStore.subscribe((data) => {
    activePlayerData = data;
  });

  const addActivePlayer = (player: PlayerType) => {
    activePlayerStore.update((data) => [...data, player]);

    // Remove the player from the inactive player list
    const people: PlayerType[] = playerData.filter(({playerName}) => playerName !== player.playerName);
    playerStore.update(() => [...people])

    localStorage.setItem('activePlayers', JSON.stringify(activePlayerData));
    localStorage.setItem('players', JSON.stringify(people));
  }

  onDestroy(() => {
    playerStoreSub();
    activePlayerStoreSub();
  });
</script>

<article>
  {#if playerData?.length > 0}
    <Collapse bind:isOpen />
    <!-- <DeleteAll bind:players bind:activePlayers /> -->
  {/if}
  <h2>Inactive Players</h2>
  <Helper text="inactive" title="Inactive Players Features" features={helperFeaturesOne} />
  <div class:collapsed={!isOpen} class="person-container">
    {#if playerData.length > 0}
      {#each playerData as person}
        <Person 
          person={person} 
          addActivePlayer={addActivePlayer}
        />
      {/each}
    {/if}
  </div>
  <button class="add" on:click={() => addPlayerDialog.showModal()}>
    Add Player
  </button>
</article>

<style>
  article {
    position: relative;
    padding: 15px 15px 30px;
    margin: 10px 10px 10px 0;
    max-width: 500px;
    border-radius: 5px;
    flex: 1;
  }
  h2 {
    margin-top: 0;
    text-align: center;
  }
  div.collapsed {
    display: none;
  }

  .add {
    width: 100px;
    position: absolute;
    right: 0;
    left: 0;
    bottom: -15px;
    margin: auto;
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

  @media (max-width: 768px) {
    article {
      width: 95%;
      margin-top: 25px;
    }
    div.person-container {
      max-height: 220px;
      overflow-y: auto;
      padding-right: 5px;
    }
  }

  @media (prefers-color-scheme: dark) {
    h2 {
      color: var(--grey-nine);
    }
    button {
      color: var(--grey-nine);
      background-color: var(--grey-four);
      border: 2px solid var(--grey-six);
    }
  }
</style>